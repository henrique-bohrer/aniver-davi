/* =====================================================================
   EXTRAS EMOCIONAIS  (complemento do index.html, junto com detalhes.js)
   Adicione antes de </body>, depois dos outros scripts:
       <script src="extras.js"></script>
   Tudo que ficar vazio ou começando com "Escreva" aparece em cinza claro,
   para você lembrar de trocar. Itens vazios em "narracao" não aparecem.
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
const EXTRAS = {
  autor: {
    capa: "fotos/livro.jpg",                    // foto da capa do livro
    titulo: "Rasuras de uma Mente Juvenil",
    idade: 16,
    exemplares: 203,
    resumo: "Leitores e psicólogos comentaram que o texto parecia escrito por alguém bem mais velho, com muita experiência de vida.",
    criticas: [   // coloque aqui frases REAIS de quem leu (e o nome de quem disse)
      {texto: "Escreva aqui uma frase real de alguém que leu o livro.", autor: "Nome, profissão"},
      {texto: "Escreva aqui outra frase real.", autor: "Nome, profissão"}
    ]
  },
  bastidores: [  // vídeo é opcional: "fotos/mamae.mp4"
    {nome: "Mamãe", texto: "Escreva aqui um momento específico em que você viu o Davi conseguir algo difícil.", video: ""},
    {nome: "Alexandre e Clenir", texto: "Meu Davi, Hoje você completa 18 anos! Ver você chegar à vida adulta é um misto de orgulho imenso e da certeza de que o tempo voa, mas o meu amor por você só cresce a cada dia. Quero que você saiba que o amor que sinto por você é gigante e infinito. Você merece conquistar o mundo e receber de volta tudo de melhor que a vida tem a oferecer. Entrar nessa nova fase é dar passos importantes, mas saiba que você nunca estará sozinho: estou sempre orando por você, pedindo a Deus que ilumine seus caminhos e torcendo com todo o meu coração pelo seu sucesso em cada escolha que fizer. Que o seu novo ciclo seja repleto de realizações, alegrias e muita sabedoria. Feliz 18 anos! Amo muito você! ❤️🎉✨", video: ""},
    {nome: "Henrique", texto: "Escreva aqui um momento específico em que você viu o Davi conseguir algo difícil.", video: ""}
  ],
  epilogo: "Todo bom filme tem um momento difícil antes da virada. O terceiro ato do Davi ainda está sendo escrito.",
  // narração opcional (áudio com a sua voz), por filme. Deixe "" para não mostrar o botão.
  narracao: {laika: "", httyd: "", transformers: "", godzilla: "", wildrobot: ""},
  ingresso: {
    titulo: "Vale uma sessão",
    texto: "Válido para: 1 sessão de cinema com o Henrique, no filme que você escolher.",
    validade: "Sem data de validade"
  }
};
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const css = `
  .ex-sec{position:relative;z-index:10;padding:7rem 1.5rem;max-width:64rem;margin:0 auto;text-align:center}
  .ex-kick{font:400 .72rem Inter,sans-serif;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.45)}
  .ex-h{font:400 clamp(2rem,6vw,3.4rem) Cinzel,serif;letter-spacing:.12em;color:#e8cf8a;margin:.8rem 0 2.5rem}
  .ex-in{opacity:0;transform:translateY(26px);transition:opacity 1.4s ease,transform 1.4s ease}
  .ex-in.on{opacity:1;transform:none}
  .ex-book{display:flex;flex-wrap:wrap;gap:2.5rem;justify-content:center;align-items:center;text-align:left}
  .ex-cover{width:210px;aspect-ratio:2/3;background:linear-gradient(160deg,#2a241e,#050505);border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 50px rgba(0,0,0,.7);display:grid;place-items:center;overflow:hidden;font:400 .8rem Inter,sans-serif;color:rgba(255,255,255,.3);text-align:center;padding:1rem}
  .ex-cover img{width:100%;height:100%;object-fit:cover}
  .ex-info{max-width:25rem}
  .ex-bt{font:400 1.7rem Cinzel,serif;letter-spacing:.06em;color:#fff}
  .ex-stats{display:flex;gap:2rem;margin:1.4rem 0}
  .ex-stats b{display:block;font:400 2.6rem Cinzel,serif;color:#e8cf8a;line-height:1}
  .ex-stats span{font:300 .72rem Inter,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5)}
  .ex-res{font:300 1rem/1.7 Inter,sans-serif;color:rgba(255,255,255,.78)}
  .ex-crit{display:grid;gap:1rem;margin-top:3rem;grid-template-columns:repeat(auto-fit,minmax(15rem,1fr))}
  .ex-card{padding:1.4rem;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);text-align:left}
  .ex-star{color:#e8cf8a;letter-spacing:.2em;font-size:.8rem}
  .ex-q{font:italic 400 1.05rem/1.6 Cinzel,serif;color:#fff;margin:.6rem 0}
  .ex-q.v{color:rgba(255,255,255,.3)}
  .ex-by{font:300 .75rem Inter,sans-serif;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.5)}
  .ex-card video{width:100%;margin-bottom:.8rem;background:#000;aspect-ratio:16/9}
  .ex-epi{max-width:36rem;margin:4rem auto 0;font:italic 400 1.35rem/1.7 Cinzel,serif;color:rgba(255,255,255,.8)}
  .ex-nar{margin-top:1.6rem;font:400 .75rem Inter,sans-serif;letter-spacing:.25em;text-transform:uppercase;color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.25);padding:.6rem 1.2rem;border-radius:2px;transition:background .3s}
  .ex-nar:hover{background:rgba(255,255,255,.08)}
  .ex-tk{max-width:30rem;margin:0 auto;padding:2.4rem 1.6rem}
  .ex-tk .tt{font:400 clamp(1.8rem,6vw,2.6rem) Cinzel,serif;letter-spacing:.12em;color:#fff;text-transform:uppercase}
  .ex-tk p{font:300 1rem/1.7 Inter,sans-serif;color:rgba(255,255,255,.75)}
  .ex-tk .vv{margin-top:1.4rem;font-size:.72rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(232,207,138,.7)}
  @media (prefers-reduced-motion:reduce){.ex-in{opacity:1;transform:none;transition:none}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const E = EXTRAS, vazio = t => !t || /^Escreva/.test(t);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const reduz = matchMedia("(prefers-reduced-motion:reduce)").matches;

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; e.target.classList.add("on"); io.unobserve(e.target);
    e.target.querySelectorAll("[data-n]").forEach(n => {
      const alvo = +n.dataset.n; if (reduz) { n.textContent = alvo; return; }
      const t0 = performance.now(); (function f(t) { const k = Math.min(1, (t - t0) / 2600); n.textContent = Math.round(alvo * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
    });
  }), {threshold: .25});

  // ---- Ato especial: O Autor ----
  const a = E.autor;
  const autor = `<section class="ex-sec" id="ex-autor">
    <p class="ex-kick ex-in">Ato especial</p><h2 class="ex-h ex-in">O AUTOR</h2>
    <div class="ex-book ex-in">
      <div class="ex-cover"><img src="${esc(a.capa)}" alt="Capa do livro ${esc(a.titulo)}" onerror="this.outerHTML='Coloque a capa em ${esc(a.capa)}'"></div>
      <div class="ex-info"><p class="ex-bt">${esc(a.titulo)}</p>
        <div class="ex-stats"><div><b data-n="${a.idade}">0</b><span>anos ao publicar</span></div><div><b data-n="${a.exemplares}">0</b><span>exemplares vendidos</span></div></div>
        <p class="ex-res">${esc(a.resumo)}</p></div>
    </div>
    <div class="ex-crit">${a.criticas.map(c => `<div class="ex-card ex-in"><div class="ex-star">★★★★★</div><p class="ex-q${vazio(c.texto) ? " v" : ""}">${esc(c.texto)}</p><p class="ex-by">${esc(c.autor)}</p></div>`).join("")}</div>
  </section>`;

  // ---- Bastidores (depoimentos) ----
  const bast = `<section class="ex-sec" id="ex-bast">
    <p class="ex-kick ex-in">Quem esteve nessa história</p><h2 class="ex-h ex-in">BASTIDORES</h2>
    <div class="ex-crit">${E.bastidores.map(b => `<div class="ex-card ex-in">${b.video ? `<video src="${esc(b.video)}" controls playsinline preload="metadata"></video>` : ""}<p class="ex-q${vazio(b.texto) ? " v" : ""}">${esc(b.texto)}</p><p class="ex-by">${esc(b.nome)}</p></div>`).join("")}</div>
    <p class="ex-epi ex-in">${esc(E.epilogo)}</p>
  </section>`;

  const cred = document.getElementById("credits-section");
  if (cred) {
    cred.insertAdjacentHTML("beforebegin", autor + bast);
    // ---- Ingresso final (volta o ingresso do começo) ----
    const t = E.ingresso;
    cred.insertAdjacentHTML("afterend", `<section class="ex-sec" style="padding-top:2rem"><div class="ticket ex-tk ex-in" style="border-radius:12px;text-align:center">
      <p class="ex-kick" style="color:rgba(232,207,138,.7)">Ingresso especial</p><p class="tt" style="margin:.8rem 0 1rem">${esc(t.titulo)}</p>
      <p>${esc(t.texto)}</p><p class="vv">${esc(t.validade)}</p></div></section>`);
    document.querySelectorAll(".ex-in").forEach(el => io.observe(el));
  }

  // ---- Narração opcional por filme (nunca toca sozinha) ----
  const bgm = document.getElementById("bgm"); let voz = null, tocava = false;
  const parar = () => { if (voz) { voz.pause(); voz = null; } document.querySelectorAll(".ex-nar").forEach(b => b.textContent = "▶ Ouvir narração"); if (bgm && tocava) { bgm.play().catch(() => {}); tocava = false; } };
  (typeof CONFIG !== "undefined" ? CONFIG.acts : []).forEach((act, i) => {
    const src = E.narracao[act.id], intro = document.querySelector(`#act-${i + 1} .act-intro`); if (!src || !intro) return;
    const b = document.createElement("button"); b.className = "ex-nar"; b.textContent = "▶ Ouvir narração";
    b.onclick = () => {
      if (voz && voz.src.endsWith(src.split("/").pop()) && !voz.paused) return parar();
      parar(); if (bgm) { tocava = !bgm.paused; bgm.pause(); }
      voz = new Audio(src); voz.onended = parar; voz.onerror = parar; voz.play().then(() => b.textContent = "⏸ Pausar narração").catch(parar);
    };
    intro.appendChild(b);
  });
});
