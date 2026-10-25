/* =====================================================================
   HALL DOS APOIADORES  (complemento do index.html)
   - "Apoiadores de Honra": bloco especial no topo, com nomes em dourado
   - Demais apoiadores logo abaixo
   Os cartões se adaptam ao formato de cada vídeo (vertical, horizontal ou quadrado).
   Adicione antes de </body>:   <script src="apoiadores.js"></script>
   Coloque os vídeos na pasta "videos", ao lado do index.html.
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
const APOIADORES = {
  kicker: "Mensagens para o Davi",
  titulo: "HALL DOS APOIADORES",

  // Bloco especial (mãe e padrasto)
  honra: {
    kicker: "Quem esteve ao seu lado em tudo",
    titulo: "APOIADORES DE HONRA",
    pessoas: [
      {nome: "Clarice Lourdes Bressiani e Romulo Scherer Baldissera", relacao: "Mãe e Padrasto do Davi", video: "videos/mãe-e-romulo.mp4", capa: ""}
    ]
  },

  tituloOutros: "Todos que torcem por você",
  pessoas: [
    {nome: "Ghioni Romanovski", relacao: "Amigo da família", video: "videos/ghioni.mp4", capa: ""},
    {nome: "Dinda Preta", relacao: "Dinda do Davi", video: "videos/tia-preta.mp4", capa: ""},
    {nome: "Nayara", relacao: "Prima do Davi", video: "videos/nayara.mp4", capa: ""},
    {nome: "Vó Maria", relacao: "Vó do Davi", video: "videos/vó-maria.mp4", capa: ""},
    {nome: "Tia Leo", relacao: "Tia do Davi", video: "videos/tia-leo.mp4", capa: ""},
    {nome: "Pacheco", relacao: "Amigo do Davi", video: "videos/pacheco.mp4", capa: ""},
    {nome: "Pedro", relacao: "Primo do Davi", video: "videos/pedro.mp4", capa: ""}
  ]
};
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const honra = (APOIADORES.honra && APOIADORES.honra.pessoas) || [], lista = APOIADORES.pessoas || [];
  const alvo = document.getElementById("ex-bast") || document.getElementById("credits-section");
  if (!(honra.length + lista.length) || !alvo) return;

  // Fonte nobre para os nomes de honra (cai para Cinzel/serif se não carregar)
  const fl = document.createElement("link"); fl.rel = "stylesheet";
  fl.href = "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&display=swap"; document.head.appendChild(fl);

  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const css = `
  .ap-sec{position:relative;z-index:10;padding:7rem 1.5rem;max-width:80rem;margin:0 auto;text-align:center}
  .ap-kick{font:400 .72rem Inter,sans-serif;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.45)}
  .ap-h{font:400 clamp(2rem,6vw,3.4rem) Cinzel,serif;letter-spacing:.12em;color:#e8cf8a;margin:.8rem 0 .6rem}
  .ap-n{font:300 .95rem Inter,sans-serif;color:rgba(255,255,255,.6);margin-bottom:3rem}
  .ap-sub{font:400 clamp(1.1rem,3vw,1.5rem) Cinzel,serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.75);margin:4.5rem 0 2rem}
  .ap-div{display:flex;align-items:center;gap:1rem;max-width:32rem;margin:0 auto 2.4rem;color:#d4af37}
  .ap-div::before,.ap-div::after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,#d4af37)}
  .ap-div::after{background:linear-gradient(270deg,transparent,#d4af37)}
  .ap-grid{display:flex;flex-wrap:wrap;gap:1.6rem;justify-content:center;align-items:flex-start}
  .ap-card{--w:26rem;width:min(100%,var(--w));border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);text-align:left;opacity:0;transform:translateY(26px);transition:opacity 1.4s ease,transform 1.4s ease,width .6s ease,border-color .5s,box-shadow .5s}
  .ap-card.on{opacity:1;transform:none}
  .ap-card[data-f=v]{--w:20rem}.ap-card[data-f=h]{--w:38rem}.ap-card[data-f=q]{--w:26rem}
  .ap-card.tocando{border-color:#e8cf8a;box-shadow:0 0 0 1px rgba(232,207,138,.35),0 18px 50px rgba(0,0,0,.6)}
  .ap-v{position:relative;width:100%;background:#000;aspect-ratio:var(--ar,16/9);max-height:80vh;display:grid;place-items:center}
  .ap-v video{display:block;width:100%;height:100%;object-fit:contain;background:#000}
  .ap-v .ph{padding:1.5rem;text-align:center;font:300 .85rem Inter,sans-serif;color:rgba(255,255,255,.35)}
  .ap-info{padding:1rem 1.2rem 1.2rem;border-top:1px solid rgba(255,255,255,.08)}
  .ap-nome{font:400 1.3rem Cinzel,serif;letter-spacing:.06em;color:#fff}
  .ap-rel{font:300 .72rem Inter,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#e8cf8a;margin-top:.3rem}

  /* Apoiadores de Honra: moldura dourada, tamanho maior e nome em ouro */
  .ap-card.honra{--w:30rem;border:1px solid #d4af37;background:radial-gradient(ellipse at 50% 0%,rgba(212,175,55,.14),rgba(0,0,0,.4) 70%);box-shadow:0 0 0 6px #000,0 0 0 7px rgba(212,175,55,.55),0 24px 60px rgba(0,0,0,.65);margin:7px}
  .ap-card.honra[data-f=v]{--w:23rem}.ap-card.honra[data-f=h]{--w:46rem}.ap-card.honra[data-f=q]{--w:32rem}
  .ap-card.honra.tocando{box-shadow:0 0 0 6px #000,0 0 0 7px #f6e27a,0 0 40px rgba(212,175,55,.35),0 24px 60px rgba(0,0,0,.65)}
  .ap-card.honra .ap-info{text-align:center;padding:1.4rem 1.2rem 1.6rem;border-top:1px solid rgba(212,175,55,.4)}
  .ap-ouro{font:900 clamp(1.5rem,4.2vw,2.4rem)/1.2 "Cinzel Decorative",Cinzel,"Times New Roman",serif;letter-spacing:.05em;color:#d4af37;filter:drop-shadow(0 0 12px rgba(212,175,55,.35))}
  @supports ((-webkit-background-clip:text) or (background-clip:text)){
    .ap-ouro{background:linear-gradient(100deg,#8a6a1f 0%,#f6e27a 25%,#d4af37 48%,#fff3b0 62%,#b8860b 85%,#f6e27a 100%);background-size:220% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
  }
  .ap-card.honra .ap-rel{font:700 .8rem "Cinzel Decorative",Cinzel,serif;letter-spacing:.3em;color:#f6e27a;margin-top:.6rem}
  @media (prefers-reduced-motion:no-preference){.ap-ouro{animation:apBrilho 9s ease-in-out infinite alternate}}
  @keyframes apBrilho{from{background-position:0% 50%}to{background-position:100% 50%}}
  @media (prefers-reduced-motion:reduce){.ap-card{opacity:1;transform:none;transition:none}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const cartao = (p, esp) => `<article class="ap-card${esp ? " honra" : ""}"><div class="ap-v">
      <video src="${esc(p.video)}" ${p.capa ? `poster="${esc(p.capa)}"` : ""} controls playsinline preload="metadata" aria-label="Mensagem de ${esc(p.nome)}"></video></div>
    <div class="ap-info"><p class="ap-nome${esp ? " ap-ouro" : ""}">${esc(p.nome)}</p><p class="ap-rel">${esc(p.relacao)}</p></div></article>`;

  const total = honra.length + lista.length, H = APOIADORES.honra || {};
  const sec = document.createElement("section"); sec.className = "ap-sec"; sec.id = "hall-apoiadores";
  sec.innerHTML = `<p class="ap-kick">${esc(APOIADORES.kicker)}</p><h2 class="ap-h">${esc(APOIADORES.titulo)}</h2>
    <p class="ap-n">${total} ${total === 1 ? "pessoa torcendo" : "pessoas torcendo"} por você</p>
    ${honra.length ? `<div class="ap-div">✦</div><p class="ap-kick">${esc(H.kicker)}</p><h3 class="ap-h" style="font-size:clamp(1.6rem,4.6vw,2.6rem);margin-bottom:2.4rem">${esc(H.titulo)}</h3>
      <div class="ap-grid">${honra.map(p => cartao(p, true)).join("")}</div>` : ""}
    ${lista.length ? `<p class="ap-sub">${esc(APOIADORES.tituloOutros)}</p><div class="ap-grid">${lista.map(p => cartao(p, false)).join("")}</div>` : ""}`;
  alvo.parentNode.insertBefore(sec, alvo);

  const todos = [...honra, ...lista];
  sec.querySelectorAll(".ap-card").forEach((card, i) => {
    const v = card.querySelector("video");
    // O cartão se adapta ao formato do vídeo: vertical = estreito, horizontal = largo, quadrado = médio
    v.addEventListener("loadedmetadata", () => {
      if (!v.videoWidth || !v.videoHeight) return;
      const r = v.videoWidth / v.videoHeight;
      card.dataset.f = r < 0.9 ? "v" : r > 1.2 ? "h" : "q";
      card.querySelector(".ap-v").style.setProperty("--ar", v.videoWidth + "/" + v.videoHeight);
    });
    // Destaca o cartão que está tocando e pausa os outros vídeos
    v.addEventListener("play", () => {
      card.classList.add("tocando");
      document.querySelectorAll("video").forEach(o => { if (o !== v && !o.paused) o.pause(); });
    });
    ["pause", "ended"].forEach(ev => v.addEventListener(ev, () => card.classList.remove("tocando")));
    // Se o arquivo ainda não existir, mostra um aviso no lugar
    v.addEventListener("error", () => { const box = v.parentNode; v.remove(); box.innerHTML = `<p class="ph">Coloque o vídeo em ${esc(todos[i].video)}</p>`; });
  });

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), {threshold: .1});
  sec.querySelectorAll(".ap-card").forEach(c => io.observe(c));
});