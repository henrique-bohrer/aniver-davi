/* =====================================================================
   CLIMA DE CADA FILME  (complemento do index.html)
   Efeitos discretos de fundo em cada ato (papel, brasas, HUD, folhas...)
   e a trilha pausa sozinha quando um vídeo toca.
   Adicione antes de </body>:   <script src="detalhes.js"></script>
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
// tipo: papel | brasa | folha | hud     qtd: quantidade de partículas
const DETALHES = {
  laika:        {cor: "#c4b5fd", clima: {tipo: "papel", cor: "#d9c9ff", qtd: 14}},
  httyd:        {cor: "#6ee7b7", clima: {tipo: "brasa", cor: "#fbbf24", qtd: 16}},
  transformers: {cor: "#93c5fd", clima: {tipo: "hud",   cor: "#60a5fa", cor2: "#ef4444"}},
  godzilla:     {cor: "#22d3ee", clima: {tipo: "brasa", cor: "#22d3ee", qtd: 14, brilho: true}},
  wildrobot:    {cor: "#fdba74", clima: {tipo: "folha", cor: "#86a85a", qtd: 12}}
};
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const css = `
  .fx-amb{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:1}
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
  @media (prefers-reduced-motion:reduce){.fx-amb i{opacity:.35}}
  @keyframes fxRise{0%{top:104%;opacity:0;transform:translateX(0)}12%{opacity:.7}88%{opacity:.5}100%{top:-4%;opacity:0;transform:translateX(24px)}}
  @keyframes fxFall{0%{top:-4%;opacity:0;transform:translateX(0) rotate(0)}12%{opacity:.6}88%{opacity:.5}100%{top:104%;opacity:0;transform:translateX(-30px) rotate(320deg)}}
  @keyframes fxScan{from{top:0}to{top:100%}}
  @keyframes fxPulse{0%,100%{opacity:.25}50%{opacity:.6}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const rnd = (a, b) => a + Math.random() * (b - a);

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
    if (d && sec) clima(sec, d.clima, d);
  });

  // Pausa a trilha enquanto QUALQUER vídeo estiver tocando; só volta quando nenhum estiver
  const bgm = document.getElementById("bgm"); let tocava = false;
  const algumTocando = () => [...document.querySelectorAll("video")].some(v => !v.paused && !v.ended);
  document.addEventListener("play", e => { if (e.target.tagName === "VIDEO" && bgm) { if (!bgm.paused) tocava = true; bgm.pause(); } }, true);
  ["pause", "ended"].forEach(ev => document.addEventListener(ev, e => {
    if (e.target.tagName === "VIDEO" && bgm && tocava && !algumTocando()) { bgm.play().catch(() => {}); tocava = false; }
  }, true));
});