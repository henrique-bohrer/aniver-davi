/* =====================================================================
   INTRODUÇÃO ESTILO UNDERTALE  (aparece depois do clique no ingresso)
   Estrutura: diálogo (parte 1) -> legenda "Pressione em qualquer lugar"
              -> texto rolando (parte 2) -> falas finais -> música some -> site
   Adicione antes de </body>:   <script src="dialogo.js"></script>
   Arquivos usados (na mesma pasta do index.html):
       fontes/DeterminationMono.ttf   e   audio/his-theme.mp3
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
const DIALOGO = {
  musica: "audio/his-theme.mp3",
  volumeMusica: 0.05,
  fonte: "fontes/DeterminationMono.ttf",
  voz: {freq: 520, variacao: 70, volume: 0.05},   // "barulhinho" de cada letra (volume baixo e suave)

  // Parte 1: falas digitadas, uma por uma (clicar ou apertar Enter/Espaço adianta)
  parte1: [
    "Davi...",
    "Hoje você completa 18 anos.",
    "Antes de começar, a gente preparou uma coisa pra você."
  ],

  legenda: "Pressione em qualquer lugar pra continuar",

  // Parte 2: "rolar" = texto subindo pela tela | "falas" = falas digitadas, uma por clique
  parte2: {
    modo: "rolar",
    velocidade: 40,                // pixels por segundo, só no modo "rolar"
    linhas: [
      "Você escreveu um livro aos 16 anos.",
      "Você já passou por muita coisa.",
      "Teve dias difíceis.",
      "E mesmo assim, aqui está você.",
      "Você é o melhor irmão que alguém poderia ter.",
      "Você é uma pessoa incrível.",
      "E nós temos muito orgulho de você.",
      "Sempre estaremos aqui para você.",
      "Todos os dias, seu grande irmão Henrique, se orgulha de você.",
      "Ele sabe que você tem um grande coração, cheio de bondade, amor e muita determinação.",
      "Ele sabe que você é uma pessoa incrível, e que você merece tudo de bom na vida.",
      "Nunca se esqueça disso, Davi.",
      "Você é uma pessoa incrível, e nós te amamos muito.",
      "Feliz aniversário, Davi!"
    ]
  },

  // Falas finais (a música só começa a sumir depois da última)
  final: [
    "Apesar de tudo, ainda é você.",
    "Continua sendo essa pessoa incrível."
  ]
};
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

(() => {
  const PARAR = Symbol("parar");
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const reduz = matchMedia("(prefers-reduced-motion:reduce)").matches;
  let ctx = null, musica = null, el, txt, box, leg, cr;
  let estado = "", resolver = null, rapido = false, parou = false, iniciou = false, anim = null;

  const css = () => `
  @font-face{font-family:"DeterminationMono";src:url("${DIALOGO.fonte}") format("truetype");font-display:swap}
  #dlg{position:fixed;inset:0;z-index:70;background:#000;color:#fff;font-family:"DeterminationMono","Courier New",monospace;-webkit-font-smoothing:none;opacity:0;transition:opacity 1.2s ease;overflow:hidden;cursor:pointer}
  #dlg.on{opacity:1}
  #dlg .dbox{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(44rem,90vw);min-height:9.5rem;border:6px solid #fff;padding:1.4rem 1.6rem;background:#000;display:none}
  #dlg .dtx{font-size:clamp(1.5rem,4.2vw,2.1rem);line-height:1.5;white-space:pre-wrap;color:#fff;margin:0}
  #dlg .dleg{position:absolute;inset:0;display:none;align-items:center;justify-content:center;text-align:center;padding:2rem;font-size:clamp(1.3rem,3.6vw,1.9rem);color:#fff;animation:dlgp 3.2s ease-in-out infinite}
  #dlg .dcr{position:absolute;left:0;right:0;top:0;margin:0 auto;width:min(40rem,88vw);text-align:center;display:none;will-change:transform}
  #dlg .dcr p{font-size:clamp(1.4rem,3.8vw,2rem);line-height:1.5;margin:0 0 2.4rem;color:#fff}
  #dlg .dk{position:absolute;right:1rem;bottom:1rem;font:inherit;font-size:1rem;color:#fff;background:none;border:0;opacity:.55;padding:.6rem .9rem;cursor:pointer}
  #dlg .dk:hover,#dlg .dk:focus-visible{opacity:1;outline:2px solid #fff}
  @keyframes dlgp{50%{opacity:.5}}
  @media (prefers-reduced-motion:reduce){#dlg{transition:none}#dlg .dleg{animation:none}}`;

  // Barulhinho de cada letra (gerado no navegador, sem arquivo)
  function blip() {
    if (!ctx || ctx.state !== "running") return;
    const v = DIALOGO.voz, o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
    o.type = "square"; o.frequency.value = v.freq + (Math.random() - .5) * v.variacao;
    g.gain.setValueAtTime(v.volume, t); g.gain.exponentialRampToValueAtTime(0.0001, t + .06);
    o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + .07);
  }

  // Chamado no clique do ingresso: libera o som no navegador (não toca nada ainda)
  function preparar() {
    try { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); ctx.resume(); } catch (e) {}
    if (DIALOGO.musica && !musica) {
      musica = new Audio(DIALOGO.musica); musica.loop = true; musica.preload = "auto"; musica.muted = true;
      const p = musica.play();
      if (p) p.then(() => { if (!iniciou) { musica.pause(); musica.currentTime = 0; } musica.muted = false; }).catch(() => { musica.muted = false; });
    }
  }

  function volTo(v, ms) {
    if (!musica) return Promise.resolve();
    const a = musica.volume, t0 = performance.now();
    return new Promise(res => (function f(t) { const k = Math.min(1, (t - t0) / ms); musica.volume = a + (v - a) * k; k < 1 ? requestAnimationFrame(f) : res(); })(t0));
  }

  function aguardar(ms, est) {
    return new Promise(res => {
      estado = est || "espera";
      const t = ms ? setTimeout(fim, ms) : 0;
      function fim() { clearTimeout(t); resolver = null; res(); }
      resolver = fim;
    });
  }
  function acionar() {
    if (estado === "digitando") rapido = true;
    else if (estado === "rolando" && anim) anim.playbackRate = anim.playbackRate > 1 ? 1 : 3;
    else if (resolver) resolver();
  }

  async function digitar(texto) {
    const full = "* " + texto; txt.textContent = ""; rapido = false; estado = "digitando";
    for (const ch of full) {
      if (parou) throw PARAR;
      if (rapido) { txt.textContent = full; break; }
      txt.textContent += ch;
      if (ch.trim() && ch !== "*") blip();
      await sleep(/[.,!?…]/.test(ch) ? 230 : 40);
    }
    estado = "";
  }
  async function falar(linhas, pausaFinal) {
    box.style.display = "block";
    for (let i = 0; i < linhas.length; i++) {
      await digitar(linhas[i]);
      await aguardar(i === linhas.length - 1 && pausaFinal ? pausaFinal : 1300 + linhas[i].length * 28);
      if (parou) throw PARAR;
    }
  }

  async function rolar(linhas, vel) {
    box.style.display = "none"; cr.innerHTML = linhas.map(l => `<p>${l.replace(/[&<>]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[c]))}</p>`).join("");
    cr.style.display = "block"; estado = "rolando";
    const h = cr.offsetHeight, vh = innerHeight;
    if (reduz) { cr.style.top = Math.max(20, (vh - h) / 2) + "px"; await sleep(Math.max(6000, linhas.length * 2500)); }
    else {
      anim = cr.animate([{transform: `translateY(${vh}px)`}, {transform: `translateY(${-h}px)`}], {duration: (h + vh) / vel * 1000, easing: "linear", fill: "forwards"});
      try { await anim.finished; } catch (e) {}
    }
    anim = null; cr.style.display = "none"; estado = "";
    if (parou) throw PARAR;
  }

  async function abrir(depois) {
    const D = DIALOGO;
    if (!document.getElementById("dlg-css")) { const st = document.createElement("style"); st.id = "dlg-css"; st.textContent = css(); document.head.appendChild(st); }
    el = document.createElement("div"); el.id = "dlg"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "Introdução");
    el.innerHTML = `<button class="dk" aria-label="Pular introdução">Pular</button><div class="dbox"><p class="dtx"></p></div><p class="dleg"></p><div class="dcr"></div>`;
    document.body.appendChild(el);
    box = el.querySelector(".dbox"); txt = el.querySelector(".dtx"); leg = el.querySelector(".dleg"); cr = el.querySelector(".dcr");
    leg.textContent = D.legenda;
    requestAnimationFrame(() => el.classList.add("on"));

    el.addEventListener("click", e => { if (e.target.closest(".dk")) return; acionar(); });
    const tecla = e => { if (["Enter", " ", "z", "Z"].includes(e.key)) { e.preventDefault(); acionar(); } if (e.key === "Escape") pular(); };
    document.addEventListener("keydown", tecla);
    const pular = () => { parou = true; rapido = true; if (anim) anim.finish(); if (resolver) resolver(); };
    el.querySelector(".dk").onclick = pular;

    preparar(); iniciou = true;
    if (musica) { musica.currentTime = 0; musica.volume = 0; musica.muted = false; musica.play().catch(() => {}); volTo(D.volumeMusica, 2500); }

    let saidaRapida = false;
    try {
      await sleep(900);
      await falar(D.parte1);
      box.style.display = "none"; leg.style.display = "flex"; await aguardar(0, "legenda"); leg.style.display = "none";
      if (parou) throw PARAR;
      if (D.parte2.modo === "falas") await falar(D.parte2.linhas); else await rolar(D.parte2.linhas, D.parte2.velocidade || 55);
      await sleep(600);
      await falar(D.final, 3200);
    } catch (e) { if (e !== PARAR) console.error(e); saidaRapida = true; }

    // A música só começa a sumir agora (depois da última frase)
    await volTo(0, saidaRapida ? 700 : 3000);
    if (musica) { musica.pause(); musica = null; }
    document.removeEventListener("keydown", tecla);
    el.classList.remove("on"); await sleep(reduz ? 0 : 1200); el.remove();
    depois();
  }

  window.Dialogo = {preparar, abrir};
})();