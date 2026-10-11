/* 🎃 Báifo · Efectos de Halloween
   Se prende y se apaga SOLO con el interruptor que ya tienes en el panel
   (Contenido del sitio → "Campaña de Halloween activa"). No toca tu ruleta. */
(function () {
  'use strict';

  var CSS = `
@keyframes hwxGlow{50%{text-shadow:0 0 30px #ff7a00,0 0 56px #ff7a0088}}
@keyframes hwxTw{50%{opacity:.15;transform:scale(.6)}}
@keyframes hwxMoon{to{box-shadow:0 0 56px #ffb15ccc,0 0 120px #ff7a0077,inset -10px -8px 0 #00000014}}
@keyframes hwxFog{to{transform:translateX(12%)}}
@keyframes hwxFlash{0%,92%,100%{opacity:0}93%{opacity:.28}94%{opacity:0}95%{opacity:.16}96%{opacity:0}}
@keyframes hwxFly{0%{transform:translate(0,0)}25%{transform:translate(30vw,-34px)}50%{transform:translate(60vw,20px)}75%{transform:translate(90vw,-26px)}100%{transform:translate(125vw,10px)}}
@keyframes hwxFlap{to{transform:scaleY(.5)}}
@keyframes hwxUp{0%{transform:translateY(0) translateX(0) rotate(-6deg);opacity:0}10%{opacity:.85}50%{transform:translateY(-55vh) translateX(26px) rotate(6deg)}90%{opacity:.7}100%{transform:translateY(-118vh) translateX(-18px) rotate(-6deg);opacity:0}}
@keyframes hwxJack{from{filter:drop-shadow(0 0 6px #ff7a00) brightness(.9)}to{filter:drop-shadow(0 0 22px #ff9a3c) brightness(1.25)}}
@keyframes hwxPop{from{transform:translate(-50%,-50%) scale(.4);opacity:1}to{transform:translate(-50%,-190%) scale(1.5) rotate(18deg);opacity:0}}

/* Tipografía y brillo de terror */
body.halloween header h1,
body.halloween .titulo-seccion h2,
body.halloween .hero-texto h2,
body.halloween .hero-card h3,
body.halloween .beneficios h2,
body.halloween .testimonios h2{font-family:'Creepster',cursive;font-weight:400;letter-spacing:.07em}
body.halloween header h1{font-size:clamp(2.2rem,8vw,3.2rem);color:#ffb15c;text-shadow:0 0 16px #ff7a00cc,0 0 34px #ff7a0066;animation:hwxGlow 2.4s ease-in-out infinite}
body.halloween header p{color:#d9c6f5}
body.halloween .hero-texto h2{font-size:clamp(1.9rem,6vw,2.8rem)}
body.halloween .hero-texto h2 span{color:#ff7a18;text-shadow:0 0 18px #ff7a18aa}
body.halloween .titulo-seccion h2{font-size:clamp(2rem,6vw,2.6rem);color:#ffb15c}
body.halloween .precio{color:#ffb15c;text-shadow:0 0 12px #ff7a1866}
body.halloween .barra-entregas{background:linear-gradient(90deg,#14091f,#2a1240,#14091f);border-bottom-color:#ff7a1888}
body.halloween .input-buscador{border-color:#ff7a1888;background:#140b20}
body.halloween .btn-whatsapp{box-shadow:0 0 18px #25d36633}
body.halloween .beneficio-card,body.halloween .testimonio{background:linear-gradient(180deg,#1d1030,#140a22);border-color:#4a2a6b}
body.halloween .beneficio-card:hover,body.halloween .testimonio:hover{border-color:#ff7a18aa;box-shadow:0 0 22px #ff7a1833}
body.halloween .hw-murcielagos{display:none}

/* Cinta de Halloween bajo la barra superior */
.hwx-banner{text-align:center;padding:.7rem 1rem;background:linear-gradient(135deg,#2a1240,#3a1a05);border-bottom:1px solid #ff7a1866}
.hwx-banner b{display:block;font-family:'Creepster',cursive;font-weight:400;font-size:1.6rem;letter-spacing:.08em;color:#ffb15c;text-shadow:0 0 14px #ff7a00cc;animation:hwxGlow 2.4s ease-in-out infinite}
.hwx-banner span{font-size:.78rem;color:#e6dff0}

/* Escena del header: luna y estrellas */
.hwx-star{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;z-index:1;pointer-events:none;animation:hwxTw 3s ease-in-out infinite}
.hwx-moon{position:absolute;top:16px;right:14px;width:68px;height:68px;border-radius:50%;z-index:1;pointer-events:none;background:radial-gradient(circle at 35% 35%,#fff7e0,#ffd58a 55%,#e8a951);box-shadow:0 0 40px #ffb15c99,0 0 90px #ff7a0055,inset -10px -8px 0 #00000014;animation:hwxMoon 5s ease-in-out infinite alternate}
.hwx-moon::before{content:"";position:absolute;left:16px;top:18px;width:12px;height:12px;border-radius:50%;background:#00000012;box-shadow:23px 16px 0 -2px #0000000f,5px 32px 0 3px #0000000d}

/* Efectos que cruzan toda la pantalla (no bloquean toques) */
#hwxFx,#hwxFx *{pointer-events:none}
.hwx-fog{position:fixed;left:-20%;bottom:0;width:140%;height:200px;z-index:5;background:radial-gradient(ellipse at 28% 60%,#8b2fc944,transparent 60%),radial-gradient(ellipse at 72% 50%,#ff7a0028,transparent 60%);filter:blur(22px);animation:hwxFog 20s ease-in-out infinite alternate}
.hwx-flash{position:fixed;inset:0;z-index:29;background:#d9b8ff;opacity:0;animation:hwxFlash 19s infinite}
.hwx-bat{position:fixed;left:-60px;z-index:30;animation:hwxFly linear infinite}
.hwx-bat svg{width:100%;display:block;fill:#2a1245;stroke:#ff7a00;stroke-width:1;filter:drop-shadow(0 0 6px #ff7a00aa);animation:hwxFlap .28s ease-in-out infinite alternate}
.hwx-float{position:fixed;bottom:-60px;z-index:30;opacity:0;filter:drop-shadow(0 0 8px #c77dffaa);animation:hwxUp linear infinite}
.hwx-jack{position:fixed;left:10px;bottom:14px;z-index:30;font-size:40px;animation:hwxJack 1.6s ease-in-out infinite alternate}
.hwx-pop{position:fixed;z-index:20000;pointer-events:none;font-size:24px;font-style:normal;animation:hwxPop .9s ease-out forwards}

@media (max-width:600px){.hwx-moon{width:52px;height:52px;top:12px;right:10px}.hwx-jack{font-size:32px;bottom:70px}}
@media (prefers-reduced-motion:reduce){#hwxFx *,.hwx-moon,.hwx-star,.hwx-banner b,body.halloween header h1{animation:none!important}}
`;

  var BAT = '<svg viewBox="0 0 64 32"><path d="M32 6C30 6 29 9 28 11 24 7 14 4 2 8 8 11 9 16 8 22 13 19 17 19 20 24 22 20 26 19 29 22L32 28 35 22C38 19 42 20 44 24 47 19 51 19 56 22 55 16 56 11 62 8 50 4 40 7 36 11 35 9 34 6 32 6Z"/></svg>';
  var on = false, tapH = null;

  function r(a, b) { return a + Math.random() * (b - a); }

  function preparar() {
    if (!document.getElementById('hwx-css')) {
      var st = document.createElement('style');
      st.id = 'hwx-css'; st.textContent = CSS;
      document.head.appendChild(st);
      var lk = document.createElement('link');
      lk.rel = 'stylesheet';
      lk.href = 'https://fonts.googleapis.com/css2?family=Creepster&display=swap';
      document.head.appendChild(lk);
    }
  }

  function encender() {
    on = true;
    preparar();

    // Cinta bajo la barra superior
    var tb = document.getElementById('top-bar-lista');
    if (tb && !document.querySelector('.hwx-banner')) {
      var cinta = document.createElement('div');
      cinta.className = 'hwx-banner';
      cinta.innerHTML = '<b>🎃 Noche de Halloween 🎃</b><span>¡Feliz Halloween, familia Báifo! Gira la ruleta y atrévete a ganar 🦇</span>';
      tb.insertAdjacentElement('afterend', cinta);
    }

    // Luna y estrellas dentro del header
    var h = document.querySelector('header');
    if (h && !h.querySelector('.hwx-moon')) {
      var luna = document.createElement('div'); luna.className = 'hwx-moon'; h.appendChild(luna);
      for (var i = 0; i < 18; i++) {
        var s = document.createElement('span');
        s.className = 'hwx-star';
        s.style.cssText = 'left:' + r(0, 100) + '%;top:' + r(4, 90) + '%;animation-delay:-' + r(0, 3) + 's';
        h.appendChild(s);
      }
    }

    // Murciélagos, fantasmas, niebla, relámpago y calabaza
    var html = '<div class="hwx-flash"></div><div class="hwx-fog"></div><div class="hwx-jack">🎃</div>';
    for (var b = 0; b < 6; b++) {
      html += '<div class="hwx-bat" style="top:' + r(6, 60) + 'vh;width:' + r(28, 52) + 'px;animation-duration:' + r(9, 19) + 's;animation-delay:-' + r(0, 19) + 's">' + BAT + '</div>';
    }
    var fl = ['👻', '🎃', '💀', '🕯️', '👻', '🦇'];
    for (var f = 0; f < 8; f++) {
      html += '<span class="hwx-float" style="left:' + r(3, 92) + 'vw;font-size:' + r(20, 34) + 'px;animation-duration:' + r(16, 30) + 's;animation-delay:-' + r(0, 24) + 's">' + fl[f % fl.length] + '</span>';
    }
    var fx = document.createElement('div');
    fx.id = 'hwxFx'; fx.innerHTML = html;
    document.body.appendChild(fx);

    // Al tocar la pantalla salen calabazas, murciélagos y fantasmas
    tapH = function (e) {
      var p = document.createElement('i');
      p.className = 'hwx-pop';
      p.textContent = ['🎃', '🦇', '👻', '🕸️', '🍬'][Math.floor(Math.random() * 5)];
      p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
      document.body.appendChild(p);
      setTimeout(function () { p.remove(); }, 900);
    };
    document.addEventListener('pointerdown', tapH);
  }

  function apagar() {
    on = false;
    var fx = document.getElementById('hwxFx'); if (fx) fx.remove();
    document.querySelectorAll('.hwx-banner,.hwx-moon,.hwx-star').forEach(function (n) { n.remove(); });
    if (tapH) { document.removeEventListener('pointerdown', tapH); tapH = null; }
  }

  function revisar() {
    var h = document.body.classList.contains('halloween');
    if (h && !on) encender();
    else if (!h && on) apagar();
  }

  new MutationObserver(revisar).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  revisar();
})();
