/* =====================================================================
   CENAS DE FUNDO + FRASES ENTRE AS CENAS  (complemento do index.html)
   Adicione antes de </body>:   <script src="cenas.js"></script>
   ===================================================================== */

// ----- EDITE AQUI --------------------------------------------------------
// Imagem própria de fundo para cada filme (opcional). Deixe "" para usar a ilustração pronta.
// Ex.: transformers: "fotos/fundos/transformers.jpg"
const FUNDOS = {laika: "", httyd: "", transformers: "", godzilla: "", wildrobot: ""};

// Frases: a 1ª aparece depois da 1ª foto do ato, a última fecha o ato. Pode ter 1, 2, 3...
const FRASES = {
  laika: [
    "Os melhores mundos são feitos à mão, devagar, um detalhe de cada vez.",
    "Ninguém precisa ser rápido para criar algo que fica."
  ],
  httyd: [
    "Quem enxerga o que os outros temem consegue ver o que ninguém viu.",
    "Pensar diferente nunca foi um defeito. É assim que as histórias novas começam."
  ],
  transformers: [
    "Nem tudo o que parece comum é comum. Há muito mais dentro de quem a gente conhece.",
    "Mudar não é perder quem você é. É descobrir o tamanho que você já tinha."
  ],
  godzilla: [
    "Algumas coisas parecem grandes demais. Mas quem atravessa tempestades sabe o tamanho que tem.",
    "Cair faz parte de toda história. O que conta é a história que você escreve depois."
  ],
  wildrobot: [
    "Ninguém precisa ser só aquilo que esperaram dele.",
    "Aos 16 anos, você publicou um livro. Isso aconteceu de verdade, e ninguém pode apagar."
  ]
};
// ----- FIM DA ÁREA DE EDIÇÃO --------------------------------------------

// Ilustrações originais (silhuetas inspiradas na atmosfera de cada filme)
const CENAS = {
  laika: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="cL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#160f38"/><stop offset="1" stop-color="#4a3480"/></linearGradient></defs>
    <rect width="1600" height="900" fill="url(#cL)"/><circle cx="1180" cy="230" r="120" fill="#f3e9ff" opacity=".9"/>
    <g fill="#fff" opacity=".7"><circle cx="200" cy="120" r="2.5"/><circle cx="420" cy="260" r="2"/><circle cx="640" cy="90" r="3"/><circle cx="860" cy="200" r="2"/><circle cx="1400" cy="140" r="2.5"/><circle cx="300" cy="380" r="2"/></g>
    <path d="M0 640 Q300 520 620 620 T1240 600 T1600 640 V900 H0Z" fill="#2c1f58"/><path d="M0 730 Q400 640 800 720 T1600 700 V900 H0Z" fill="#1d1442"/><path d="M0 820 Q500 760 1000 820 T1600 810 V900 H0Z" fill="#120c2b"/>
    <g fill="#120c2b"><polygon points="140,740 170,640 200,740"/><polygon points="190,750 225,620 260,750"/><polygon points="1330,730 1360,630 1390,730"/><polygon points="1380,740 1415,610 1450,740"/></g>
    <circle cx="560" cy="700" r="46" fill="#ffcf7a" opacity=".22"/><circle cx="560" cy="700" r="12" fill="#ffd98f"/><circle cx="520" cy="712" r="9" fill="#07041a"/><rect x="513" y="720" width="14" height="34" rx="5" fill="#07041a"/></svg>`,
  httyd: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="cH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b3a3c"/><stop offset=".6" stop-color="#d9955a"/><stop offset="1" stop-color="#f6c47d"/></linearGradient></defs>
    <rect width="1600" height="900" fill="url(#cH)"/><circle cx="420" cy="560" r="95" fill="#ffe3ab"/>
    <rect y="640" width="1600" height="260" fill="#0a2c30"/><path d="M200 650 H640 L600 690 H240Z" fill="#ffe3ab" opacity=".25"/>
    <path d="M1100 650 L1150 430 L1200 480 L1250 380 L1330 650Z" fill="#06191c"/><path d="M1380 650 L1420 520 L1470 560 L1520 470 L1580 650Z" fill="#06191c"/>
    <g fill="#06191c" transform="translate(820 280)"><ellipse rx="70" ry="22"/><path d="M68 -8 L122 0 L70 16Z"/><path d="M-66 2 Q-150 28 -215 -20 L-208 -2 Q-150 44 -62 16Z"/><path d="M-6 -14 Q-60 -170 -250 -190 Q-170 -120 -140 -64 Q-90 -94 -50 -40Z"/><path d="M14 -14 Q90 -150 250 -170 Q175 -110 150 -60 Q100 -84 56 -34Z"/><circle cx="6" cy="-34" r="11"/><rect x="0" y="-26" width="12" height="16" rx="4"/></g></svg>`,
  transformers: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="cT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2146"/><stop offset=".55" stop-color="#c4503a"/><stop offset="1" stop-color="#ffb35c"/></linearGradient></defs>
    <rect width="1600" height="900" fill="url(#cT)"/><circle cx="1130" cy="650" r="150" fill="#ffdca3" opacity=".92"/>
    <path d="M0 770 L260 700 L520 745 L820 690 L1120 740 L1380 700 L1600 750 V900 H0Z" fill="#12142a" opacity=".85"/>
    <g fill="#06070e"><polygon points="290,900 340,800 740,790 800,900"/>
      <rect x="470" y="652" width="40" height="148"/><rect x="530" y="652" width="40" height="148"/><rect x="460" y="790" width="60" height="18"/><rect x="520" y="790" width="60" height="18"/><rect x="468" y="612" width="104" height="42"/>
      <polygon points="450,420 590,420 572,612 468,612"/><rect x="408" y="400" width="62" height="72"/><rect x="570" y="400" width="62" height="72"/>
      <rect x="410" y="472" width="38" height="150"/><rect x="404" y="618" width="50" height="38"/>
      <polygon points="575,412 632,412 704,332 692,272 726,272 728,352 640,456 575,452"/><rect x="688" y="248" width="42" height="38"/>
      <polygon points="495,348 545,348 552,328 540,306 500,306 488,328"/><rect x="488" y="288" width="6" height="26"/><rect x="546" y="288" width="6" height="26"/></g></svg>`,
  godzilla: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="cG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#01121a"/><stop offset="1" stop-color="#05404d"/></linearGradient><radialGradient id="cGg" cx=".5" cy=".7" r=".5"><stop offset="0" stop-color="#22d3ee" stop-opacity=".5"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient></defs>
    <rect width="1600" height="900" fill="url(#cG)"/><ellipse cx="900" cy="560" rx="520" ry="260" fill="url(#cGg)"/>
    <g fill="#020b0f"><rect x="0" y="540" width="60" height="140"/><rect x="70" y="480" width="50" height="200"/><rect x="130" y="580" width="80" height="100"/><rect x="220" y="510" width="44" height="170"/><rect x="1330" y="520" width="56" height="160"/><rect x="1400" y="470" width="48" height="210"/><rect x="1460" y="560" width="90" height="120"/></g>
    <g fill="#031419" stroke="#22d3ee" stroke-opacity=".55" stroke-width="3"><polygon points="640,670 690,520 735,670"/><polygon points="720,670 790,440 855,670"/><polygon points="830,670 915,400 985,670"/><polygon points="960,670 1035,470 1090,670"/><polygon points="1070,670 1125,565 1170,670"/></g>
    <rect y="665" width="1600" height="235" fill="#01080b" opacity=".92"/></svg>`,
  wildrobot: `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="cW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b1e0b"/><stop offset=".6" stop-color="#e08a46"/><stop offset="1" stop-color="#f6c88a"/></linearGradient></defs>
    <rect width="1600" height="900" fill="url(#cW)"/><circle cx="520" cy="470" r="110" fill="#ffe6b8" opacity=".85"/>
    <g fill="#ffe6b8" opacity=".12"><polygon points="520,470 100,900 360,900"/><polygon points="520,470 560,900 820,900"/></g>
    <g fill="#1d2a12"><rect x="1000" y="300" width="36" height="420"/><circle cx="1018" cy="290" r="130"/><circle cx="930" cy="360" r="90"/><circle cx="1110" cy="350" r="95"/><rect x="1380" y="380" width="30" height="340"/><circle cx="1395" cy="370" r="100"/><rect x="150" y="420" width="26" height="300"/><circle cx="163" cy="410" r="90"/></g>
    <path d="M0 720 Q400 680 800 730 T1600 710 V900 H0Z" fill="#1a1d0e"/>
    <g fill="#0b0a05"><circle cx="1210" cy="540" r="40"/><ellipse cx="1210" cy="650" rx="62" ry="88"/><rect x="1140" y="610" width="22" height="80" rx="10"/><rect x="1258" y="610" width="22" height="80" rx="10"/><ellipse cx="1330" cy="730" rx="24" ry="17"/><circle cx="1352" cy="716" r="10"/></g>
    <g fill="#ffd98f" opacity=".8"><circle cx="760" cy="640" r="3"/><circle cx="860" cy="590" r="2.5"/><circle cx="700" cy="560" r="2"/><circle cx="940" cy="650" r="3"/></g></svg>`
};
const COR = {laika: "#c4b5fd", httyd: "#6ee7b7", transformers: "#93c5fd", godzilla: "#22d3ee", wildrobot: "#fdba74"};

document.addEventListener("DOMContentLoaded", () => {
  const css = `
  .cn-bg{position:absolute;inset:0;z-index:0;pointer-events:none}
  .cn-stick{position:sticky;top:0;height:100vh;overflow:hidden}
  .cn-stick .sc{position:absolute;inset:0;opacity:.55;background-size:cover;background-position:center bottom}
  .cn-stick .sc svg{width:100%;height:100%;display:block}
  .cn-stick::after{content:"";position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.12) 28%,rgba(0,0,0,.12) 65%,rgba(0,0,0,.7))}
  .cn-fr{position:relative;z-index:10;min-height:70vh;display:flex;align-items:center;justify-content:center;padding:4rem 1.5rem}
  .cn-fr p{max-width:44rem;text-align:center;font:italic 400 clamp(1.4rem,3.8vw,2.5rem)/1.6 Cinzel,serif;color:rgba(255,255,255,.92);padding:2.2rem 1rem;border-block:1px solid rgba(255,255,255,.14);text-shadow:0 2px 18px rgba(0,0,0,.6);opacity:0;transform:translateY(20px);transition:opacity 1.6s ease,transform 1.6s ease}
  .cn-fr.on p{opacity:1;transform:none}
  .cn-fr p::before{content:"";display:block;width:2.2rem;height:2px;background:var(--ac);margin:0 auto 1.4rem}
  @media (prefers-reduced-motion:reduce){.cn-fr p{opacity:1;transform:none;transition:none}}`;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), {threshold: .35});
  const acts = typeof CONFIG !== "undefined" ? CONFIG.acts : [];

  acts.forEach((act, i) => {
    const sec = document.getElementById("act-" + (i + 1)); if (!sec) return;

    // Cena de fundo (fica parada enquanto você rola o ato, como um cenário de cinema)
    const bg = document.createElement("div"); bg.className = "cn-bg";
    bg.innerHTML = `<div class="cn-stick"><div class="sc">${CENAS[act.id] || ""}</div></div>`;
    sec.insertBefore(bg, sec.firstChild);
    const src = FUNDOS[act.id];
    if (src) { const im = new Image(); im.onload = () => { const sc = bg.querySelector(".sc"); sc.innerHTML = ""; sc.style.backgroundImage = `url("${src}")`; }; im.src = src; }

    // Frases entre as cenas
    const blocks = [...sec.querySelectorAll(".media-block")], fr = FRASES[act.id] || [], last = new Map();
    fr.forEach((txt, k) => {
      const anchor = blocks.length ? (k === fr.length - 1 ? blocks[blocks.length - 1] : blocks[Math.min(k, blocks.length - 1)]) : sec.querySelector(".act-intro");
      if (!anchor) return;
      const el = document.createElement("div"); el.className = "cn-fr"; el.style.setProperty("--ac", COR[act.id] || "#e8cf8a");
      const p = document.createElement("p"); p.textContent = txt; el.appendChild(p);
      (last.get(anchor) || anchor).insertAdjacentElement("afterend", el); last.set(anchor, el); io.observe(el);
    });
  });
});
