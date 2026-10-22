/* =====================================================================
   PRÓLOGO: ÁUDIO + TRANSCRIÇÃO QUE ACENDE PALAVRA POR PALAVRA
   Aparece depois do clique no ingresso e antes do conteúdo principal.
   Se "audio" e "texto" estiverem vazios, o site funciona como antes.
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
const PROLOGO = {
  audio: "",                       // ex.: "fotos/mensagem.mp3"
  json: "",                        // (opcional) saída do Whisper, ex.: "fotos/mensagem.json" -> tempo exato de cada palavra
  texto: "Escreva aqui a sua mensagem para o Davi. Se não usar o JSON, o tempo de cada palavra é calculado automaticamente.",
  titulo: "Antes de começar",
  volumeFundo: 0.12                // volume da trilha enquanto a mensagem toca
};
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

(() => {
  const css = `
  #pro{position:fixed;inset:0;z-index:60;background:radial-gradient(ellipse at 50% 40%,#1a1710 0%,#000 70%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:4.5rem 1.5rem 2rem;opacity:0;transition:opacity 1.2s ease}
  #pro.on{opacity:1}
  #pro .k{font:400 .72rem Cinzel,serif;letter-spacing:.4em;text-transform:uppercase;color:rgba(232,207,138,.75);margin-bottom:2rem}
  #pro .tx{max-width:42rem;max-height:56vh;overflow-y:auto;text-align:center;font:300 clamp(1.3rem,3.6vw,2rem)/1.9 Inter,sans-serif;scrollbar-width:none}
  #pro .tx::-webkit-scrollbar{display:none}
  #pro .pw{cursor:pointer;color:rgba(255,255,255,.26);transition:color .3s,text-shadow .3s}
  #pro .pw.l{color:rgba(255,255,255,.82)}
  #pro .pw.a{color:#fff;text-shadow:0 0 20px rgba(232,207,138,.75)}
  #pro .pl{display:flex;align-items:center;gap:1rem;width:min(30rem,100%);margin-top:2.4rem}
  #pro .pb{flex:none;width:52px;height:52px;border-radius:50%;border:1px solid rgba(255,255,255,.35);font-size:1.1rem;color:#fff;background:none;cursor:pointer}
  #pro .pb:hover{background:rgba(255,255,255,.1)}
  #pro .bar{flex:1;height:3px;background:rgba(255,255,255,.15);border-radius:2px;overflow:hidden}
  #pro .bar i{display:block;height:100%;width:0;background:#e8cf8a}
  #pro .tm{font:300 .75rem Inter,sans-serif;color:rgba(255,255,255,.45);min-width:2.8rem;text-align:right}
  #pro .sk{position:absolute;top:1.2rem;right:1.2rem;font:300 .75rem Inter,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5);background:none;border:0;padding:.6rem .9rem;cursor:pointer}
  #pro .sk:hover{color:#fff}
  #pro .go{margin-top:2rem;font:400 1rem Cinzel,serif;letter-spacing:.25em;text-transform:uppercase;color:#e8cf8a;border:1px solid rgba(232,207,138,.5);padding:.9rem 2rem;border-radius:2px;background:none;cursor:pointer;opacity:0;pointer-events:none;transition:opacity 1.2s}
  #pro .go.on{opacity:1;pointer-events:auto}
  #pro .go:hover{background:rgba(232,207,138,.12)}
  @media (prefers-reduced-motion:reduce){#pro,#pro .pw,#pro .go{transition:none}}`;

  const fmt = s => isFinite(s) ? Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0") : "0:00";
  const esc = s => String(s).replace(/[&<>]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;"}[c]));

  // Whisper (--word_timestamps True) -> lista simples de palavras
  const doWhisper = j => (j.segments || []).flatMap(sg => (sg.words || []).map(w => ({w: w.word.trim(), s: w.start, e: w.end}))).filter(x => x.w);
  // Só texto -> palavras sem tempo (o tempo é calculado quando o áudio carrega)
  const doTexto = t => t.split(/\s+/).filter(Boolean).map(w => ({w, s: null, e: null}));
  function autoTempo(W, dur) {
    const peso = x => x.w.length + (/[.!?…]$/.test(x.w) ? 6 : /[,;:]$/.test(x.w) ? 3 : 0);
    const total = W.reduce((a, x) => a + peso(x), 0), ini = Math.min(.6, dur * .05), uteis = dur - ini - .4;
    let acc = 0; W.forEach(x => { x.s = ini + uteis * acc / total; acc += peso(x); x.e = ini + uteis * acc / total; });
  }

  async function abrir(depois) {
    const P = PROLOGO;
    if (!P.audio && !P.json && !/\S/.test(P.texto || "")) return depois();
    if (!document.getElementById("pro-css")) { const st = document.createElement("style"); st.id = "pro-css"; st.textContent = css; document.head.appendChild(st); }

    let W = [], exato = false;
    if (P.json) { try { W = doWhisper(await (await fetch(P.json)).json()); exato = W.length > 0; } catch (e) { console.warn("JSON do Whisper não carregou:", e); } }
    if (!W.length) W = doTexto(P.texto || "");
    if (!W.length) return depois();

    const bgm = document.getElementById("bgm"), vol0 = bgm ? bgm.volume : 0;
    if (bgm) bgm.volume = Math.min(vol0, P.volumeFundo);

    const el = document.createElement("div"); el.id = "pro"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", P.titulo);
    el.innerHTML = `<button class="sk">Pular</button><p class="k">${esc(P.titulo)}</p>
      <div class="tx">${W.map((x, i) => `<span class="pw" data-i="${i}">${esc(x.w)}</span>`).join(" ")}</div>
      <div class="pl"><button class="pb" aria-label="Tocar">▶</button><div class="bar"><i></i></div><span class="tm">0:00</span></div>
      <button class="go">Continuar</button>`;
    document.body.appendChild(el); requestAnimationFrame(() => el.classList.add("on"));

    const $ = s => el.querySelector(s), words = [...el.querySelectorAll(".pw")], tx = $(".tx");
    const aud = new Audio(); let semAudio = !P.audio, raf = 0, cur = -2, fim = false;
    if (P.audio) aud.src = P.audio;

    const pintar = idx => {
      if (idx === cur) return; cur = idx;
      words.forEach((w, k) => w.className = "pw" + (k < idx ? " l" : k === idx ? " a" : ""));
      const w = words[idx]; if (w) { const r = w.getBoundingClientRect(), t = tx.getBoundingClientRect(); if (r.bottom > t.bottom - 20 || r.top < t.top + 20) tx.scrollTo({top: tx.scrollTop + r.top - t.top - t.height / 3, behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth"}); }
    };
    const idxAt = t => { let n = -1; for (let k = 0; k < W.length; k++) { if (W[k].s != null && W[k].s <= t) n = k; else break; } return n; };
    const tick = () => {
      const t = aud.currentTime; pintar(idxAt(t));
      $(".bar i").style.width = (aud.duration ? t / aud.duration * 100 : 0) + "%"; $(".tm").textContent = fmt(t);
      if (!aud.paused && !aud.ended) raf = requestAnimationFrame(tick);
    };
    const mostrarContinuar = () => { fim = true; pintar(W.length); $(".go").classList.add("on"); $(".pb").textContent = "↺"; };

    aud.addEventListener("loadedmetadata", () => { if (!exato) autoTempo(W, aud.duration); $(".tm").textContent = fmt(0); });
    aud.addEventListener("play", () => { $(".pb").textContent = "⏸"; cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });
    aud.addEventListener("pause", () => { if (!aud.ended) $(".pb").textContent = "▶"; });
    aud.addEventListener("ended", () => { cancelAnimationFrame(raf); mostrarContinuar(); });
    aud.addEventListener("error", () => { semAudio = true; $(".pb").style.display = "none"; $(".bar").style.display = "none"; $(".tm").style.display = "none"; mostrarContinuar(); });
    if (semAudio) { $(".pb").style.display = "none"; $(".bar").style.display = "none"; $(".tm").style.display = "none"; mostrarContinuar(); }

    $(".pb").onclick = () => { if (fim) { aud.currentTime = 0; fim = false; $(".go").classList.remove("on"); } aud.paused ? aud.play().catch(() => {}) : aud.pause(); };
    words.forEach((w, k) => w.onclick = () => { if (W[k].s != null && !semAudio) { aud.currentTime = W[k].s; if (aud.paused) { aud.play().catch(() => {}); } else tick(); } });

    let saiu = false;
    const sair = () => {
      if (saiu) return; saiu = true; cancelAnimationFrame(raf); aud.pause();
      if (bgm) bgm.volume = vol0;
      el.classList.remove("on"); setTimeout(() => { el.remove(); depois(); }, 1200);
    };
    $(".go").onclick = sair; $(".sk").onclick = sair;
  }

  window.Prologo = {abrir};
})();
