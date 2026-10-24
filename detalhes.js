/* =====================================================================
   DETALHES DE CADA FILME  (complemento do seu index.html)
   Como usar: coloque este arquivo na mesma pasta do index.html e adicione
   a linha abaixo logo ANTES de </body>, depois do seu <script> principal:
       <script src="detalhes.js"></script>
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
const DETALHES = {
  laika: {
    cor: "#c4b5fd",
    chips: ["Stop-motion feito à mão", "Coraline", "ParaNorman", "Os Boxtrolls", "Kubo e as Cordas Mágicas", "Link Perdido"],
    nota: "Em um filme de stop-motion, os bonecos são movidos um pouquinho de cada vez e fotografados. Um único segundo de tela pode levar até 24 poses diferentes.",
    davi: "",
    clima: { tipo: "papel", cor: "#d9c9ff", qtd: 14 }
  },
  httyd: {
    cor: "#6ee7b7",
    chips: ["Soluço e Banguela", "Fúria da Noite", "Ilha de Berk", "Trilogia animada (2010–2019)", "DreamWorks"],
    nota: "Tudo começa quando um garoto escolhe não ferir um dragão e descobre que o medo pode virar uma amizade que muda o mundo inteiro.",
    davi: "",
    clima: { tipo: "brasa", cor: "#fbbf24", qtd: 16 }
  },
  transformers: {
    cor: "#93c5fd",
    chips: ["Autobots", "Decepticons", "Optimus Prime", "Bumblebee", "Robôs que viram veículos"],
    nota: "A graça está no disfarce: o que parece um carro comum pode esconder um herói gigante.",
    davi: "",
    clima: { tipo: "hud", cor: "#60a5fa", cor2: "#ef4444" }
  },
  godzilla: {
    cor: "#22d3ee",
    chips: ["Gojira (1954)", "Rei dos Monstros", "Produção japonesa (Toho)", "Raio atômico"],
    nota: "O primeiro filme é de 1954, no Japão, e deu início a uma das maiores franquias de monstros da história do cinema.",
    davi: "",
    clima: { tipo: "brasa", cor: "#22d3ee", qtd: 14, brilho: true }
  },
  wildrobot: {
    cor: "#fdba74",
    chips: ["Roz (ROZZUM 7134)", "Baseado no livro de Peter Brown", "Filme da DreamWorks (2024)", "Natureza e família"],
    nota: "Uma robô naufraga em uma ilha selvagem, aprende a viver com os animais e acaba construindo uma família inesperada.",
    davi: "",
    clima: { tipo: "folha", cor: "#86a85a", qtd: 12 }
  }
};
const TEXTO_DAVI_PADRAO = "Escreva aqui, com as suas palavras, o que esse filme tem a ver com o Davi.";
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const css = `
  .fx-amb{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1}
  .fx-card{position:relative;z-index:10;max-width:56rem;margin:0 auto 5rem;padding:1.6rem 1.8rem;border:1px solid rgba(255,255,255,.1);border-left:2px solid var(--ac);background:rgba(0,0,0,.3);opacity:0;transform:translateY(24px);transition:opacity 1.4s ease,transform 1.4s ease}
  .fx-card.in{opacity:1;transform:none}
  .fx-tag{font-family:Cinzel,serif;letter-spacing:.35em;font-size:.7rem;color:var(--ac);text-transform:uppercase}
  .fx-chips{display:flex;flex-wrap:wrap;gap:.5rem;margin:1rem 0}
  .fx-chips span{font:300 .8rem Inter,sans-serif;letter-spacing:.08em;padding:.3rem .75rem;border:1px solid rgba(255,255,255,.16);border-radius:999px;color:rgba(255,255,255,.78)}
  .fx-note{font:300 1rem/1.7 Inter,sans-serif;color:rgba(255,255,255,.82)}
  .fx-davi{margin-top:1.1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.1);font:300 .95rem/1.7 Inter,sans-serif;color:rgba(255,255,255,.7)}
  .fx-davi.vazio{font-style:italic;color:rgba(255,255,255,.35)}
  .fx-davi b{display:block;font:400 .72rem Cinzel,serif;letter-spacing:.18em;color:var(--ac);text-transform:uppercase;margin-bottom:.3rem}
  .fx-amb i{position:absolute;display:block;opacity:0}
  .fx-hud-c{position:absolute;width:46px;height:46px;border:0 solid var(--ac);opacity:.35}
  .fx-hud-c.a{top:5%;left:4%;border-width:2px 0 0 2px}.fx-hud-c.b{bottom:4%;right:4%;border-width:0 2px 2px 0}
  .fx-scan{position:absolute;left:0;right:0;height:1px;top:0;opacity:.18;background:linear-gradient(90deg,transparent,var(--ac),var(--ac2),transparent)}
  .fx-glow{position:absolute;left:0;right:0;bottom:0;height:40%;background:radial-gradient(ellipse at 50% 100%,rgba(34,211,238,.18),transparent 70%);opacity:.5}
  @media (prefers-reduced-motion:no-preference){
    .fx-amb i{animation-duration:var(--d);animation-delay:var(--dl);animation-iteration-count:infinite;animation-timing-function:linear}
    .fx-brasa{animation-name:fxRise}.fx-folha{animation-name:fxFall}
    .fx-papel{animation-name:fxRise;animation-timing-function:steps(36)!important}
    .fx-scan{animation:fxScan 16s linear infinite}
    .fx-glow{animation:fxPulse 8s ease-in-out infinite}
  }
  @media (prefers-reduced-motion:reduce){.fx-card{opacity:1;transform:none;transition:none}.fx-amb i{opacity:.35}}
  @keyframes fxRise{0%{top:104%;opacity:0;transform:translateX(0)}12%{opacity:.7}88%{opacity:.5}100%{top:-4%;opacity:0;transform:translateX(24px)}}
  @keyframes fxFall{0%{top:-4%;opacity:0;transform:translateX(0) rotate(0)}12%{opacity:.6}88%{opacity:.5}100%{top:104%;opacity:0;transform:translateX(-30px) rotate(320deg)}}
  @keyframes fxScan{from{top:0}to{top:100%}}
  @keyframes fxPulse{0%,100%{opacity:.25}50%{opacity:.6}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const rnd = (a, b) => a + Math.random() * (b - a);
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold: .2});

  function clima(sec, c, d) {
    const amb = document.createElement("div"); amb.className = "fx-amb"; amb.style.setProperty("--ac", d.cor); amb.style.setProperty("--ac2", c.cor2 || d.cor);
    if (c.tipo === "hud") {
      amb.innerHTML = '<div class="fx-hud-c a"></div><div class="fx-hud-c b"></div><div class="fx-scan"></div>';
    } else {
      if (c.brilho) amb.insertAdjacentHTML("beforeend", '<div class="fx-glow"></div>');
      for (let n = 0; n < (c.qtd || 12); n++) {
        const el = document.createElement("i"), s = c.tipo === "papel" ? rnd(7, 12) : c.tipo === "folha" ? rnd(9, 15) : rnd(3, 6);
        el.className = "fx-" + c.tipo;
        el.style.cssText = `left:${rnd(2, 98)}%;width:${s}px;height:${c.tipo === "folha" ? s * .6 : s}px;background:${c.cor};--d:${rnd(28, 55)}s;--dl:-${rnd(0, 50)}s;` +
          (c.tipo === "brasa" ? `border-radius:50%;box-shadow:0 0 ${s * 3}px ${c.cor};` : c.tipo === "folha" ? "border-radius:0 100% 0 100%;" : "border-radius:1px;");
        amb.appendChild(el);
      }
    }
    sec.insertBefore(amb, sec.firstChild);
  }

  (typeof CONFIG !== "undefined" ? CONFIG.acts : []).forEach((act, i) => {
    const d = DETALHES[act.id], sec = document.getElementById("act-" + (i + 1));
    if (!d || !sec) return;
    clima(sec, d.clima, d);
    const intro = sec.querySelector(".act-intro"); if (!intro) return;
    const davi = d.davi && d.davi.trim();
    intro.insertAdjacentHTML("afterend",
      `<div class="fx-card" style="--ac:${d.cor}"><p class="fx-tag">Ficha do filme</p>
        <div class="fx-chips">${d.chips.map(t => `<span>${t}</span>`).join("")}</div>
        <p class="fx-note">${d.nota}</p>
        <p class="fx-davi${davi ? "" : " vazio"}"><b>Por que é a cara do Davi</b>${davi || TEXTO_DAVI_PADRAO}</p></div>`);
    io.observe(sec.querySelector(".fx-card"));
  });

  // Pausa a trilha enquanto um vídeo estiver tocando e retoma depois
  const bgm = document.getElementById("bgm"); let tocava = false;
  document.addEventListener("play", e => { if (e.target.tagName === "VIDEO" && bgm) { tocava = !bgm.paused; bgm.pause(); } }, true);
  ["pause", "ended"].forEach(ev => document.addEventListener(ev, e => { if (e.target.tagName === "VIDEO" && bgm && tocava) { bgm.play().catch(() => {}); tocava = false; } }, true));
});
