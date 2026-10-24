/* =====================================================================
   HALL DOS APOIADORES  (complemento do index.html)
   Vídeos de quem quer mandar uma mensagem para o Davi.
   Os cartões se adaptam ao formato de cada vídeo (vertical, horizontal ou quadrado).
   Adicione antes de </body>:   <script src="apoiadores.js"></script>
   Para incluir mais pessoas: copie uma linha em "pessoas" e mude os dados.
   Coloque os vídeos na pasta "videos", ao lado do index.html.
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
const APOIADORES = {
  kicker: "Mensagens para o Davi",
  titulo: "HALL DOS APOIADORES",
  pessoas: [
    {nome: "Ghioni Romanovski", relacao: "Amigo da família", video: "videos/ghioni.mp4", capa: ""},
    {nome: "Tia Preta", relacao: "Tia do Davi", video: "videos/tia-preta.mp4", capa: ""},
    {nome: "Nayara", relacao: "Prima do Davi", video: "videos/nayara.mp4", capa: ""},
    {nome: "Vó Maria", relacao: "Vó do Davi", video: "videos/vó-maria.mp4", capa: ""}
  ]
};
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const lista = APOIADORES.pessoas || [];
  const alvo = document.getElementById("ex-bast") || document.getElementById("credits-section");
  if (!lista.length || !alvo) return;

  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const css = `
  .ap-sec{position:relative;z-index:10;padding:7rem 1.5rem;max-width:80rem;margin:0 auto;text-align:center}
  .ap-kick{font:400 .72rem Inter,sans-serif;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.45)}
  .ap-h{font:400 clamp(2rem,6vw,3.4rem) Cinzel,serif;letter-spacing:.12em;color:#e8cf8a;margin:.8rem 0 .6rem}
  .ap-n{font:300 .95rem Inter,sans-serif;color:rgba(255,255,255,.6);margin-bottom:3rem}
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
    v.addEventListener("error", () => { const box = v.parentNode; v.remove(); box.innerHTML = `<p class="ph">Coloque o vídeo em ${esc(lista[i].video)}</p>`; });
  });

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), {threshold: .1});
  sec.querySelectorAll(".ap-card").forEach(c => io.observe(c));
});