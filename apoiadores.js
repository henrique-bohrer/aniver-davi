/* =====================================================================
   HALL DOS APOIADORES  (complemento do index.html)
   Vídeos de quem quer mandar uma mensagem para o Davi.
   Adicione antes de </body>:   <script src="apoiadores.js"></script>
   Para incluir mais pessoas: copie uma linha em "pessoas" e mude os dados.
   Coloque os vídeos na pasta "videos", ao lado do index.html.
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
const APOIADORES = {
  kicker: "Mensagens para o Davi",
  titulo: "HALL DOS APOIADORES",
  pessoas: [
    {nome: "Ghioni Romanovski", relacao: "Amigo da família", video: "videos/ghioni.mp4", capa: ""}
    // {nome: "Nome da pessoa", relacao: "Quem é para o Davi", video: "videos/nome.mp4", capa: ""},
  ]
};
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const lista = APOIADORES.pessoas || [];
  const alvo = document.getElementById("ex-bast") || document.getElementById("credits-section");
  if (!lista.length || !alvo) return;

  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const css = `
  .ap-sec{position:relative;z-index:10;padding:7rem 1.5rem;max-width:72rem;margin:0 auto;text-align:center}
  .ap-kick{font:400 .72rem Inter,sans-serif;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.45)}
  .ap-h{font:400 clamp(2rem,6vw,3.4rem) Cinzel,serif;letter-spacing:.12em;color:#e8cf8a;margin:.8rem 0 .6rem}
  .ap-n{font:300 .95rem Inter,sans-serif;color:rgba(255,255,255,.6);margin-bottom:3rem}
  .ap-grid{display:grid;gap:1.6rem;grid-template-columns:repeat(auto-fit,minmax(min(100%,19rem),1fr));justify-items:center}
  .ap-card{width:100%;max-width:26rem;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);text-align:left;opacity:0;transform:translateY(26px);transition:opacity 1.4s ease,transform 1.4s ease}
  .ap-card.on{opacity:1;transform:none}
  .ap-v{position:relative;background:#000;min-height:12rem;display:grid;place-items:center}
  .ap-v video{display:block;width:100%;max-height:70vh;object-fit:contain;background:#000}
  .ap-v .ph{padding:1.5rem;text-align:center;font:300 .85rem Inter,sans-serif;color:rgba(255,255,255,.35)}
  .ap-info{padding:1rem 1.2rem 1.2rem;border-top:1px solid rgba(255,255,255,.08)}
  .ap-nome{font:400 1.3rem Cinzel,serif;letter-spacing:.06em;color:#fff}
  .ap-rel{font:300 .72rem Inter,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#e8cf8a;margin-top:.3rem}
  @media (prefers-reduced-motion:reduce){.ap-card{opacity:1;transform:none;transition:none}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const n = lista.length;
  const sec = document.createElement("section"); sec.className = "ap-sec"; sec.id = "hall-apoiadores";
  sec.innerHTML = `<p class="ap-kick">${esc(APOIADORES.kicker)}</p><h2 class="ap-h">${esc(APOIADORES.titulo)}</h2>
    <p class="ap-n">${n} ${n === 1 ? "pessoa torcendo" : "pessoas torcendo"} por você</p>
    <div class="ap-grid">${lista.map(p => `<article class="ap-card"><div class="ap-v">
        <video src="${esc(p.video)}" ${p.capa ? `poster="${esc(p.capa)}"` : ""} controls playsinline preload="metadata" aria-label="Mensagem de ${esc(p.nome)}"></video></div>
      <div class="ap-info"><p class="ap-nome">${esc(p.nome)}</p><p class="ap-rel">${esc(p.relacao)}</p></div></article>`).join("")}</div>`;
  alvo.parentNode.insertBefore(sec, alvo);

  // Se o arquivo de vídeo ainda não existir, mostra um aviso no lugar
  sec.querySelectorAll("video").forEach((v, i) => v.addEventListener("error", () => {
    const box = v.parentNode; v.remove(); box.innerHTML = `<p class="ph">Coloque o vídeo em ${esc(lista[i].video)}</p>`;
  }));

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), {threshold: .15});
  sec.querySelectorAll(".ap-card").forEach(c => io.observe(c));
});