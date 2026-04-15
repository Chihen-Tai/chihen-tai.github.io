// js/cursor.js — sparkle cursor trail: ◈ ✦ ◆ ✧ in gold/blue/purple
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var GLYPHS = ['◈', '✦', '◆', '✧', '◈', '✦'];
  var COLORS = ['#ffdd88', '#88ccff', '#c8aaff', '#fff8cc', '#ffdd88', '#88ccff'];
  var MAX    = 20;
  var active = 0;
  var tick   = 0;

  document.addEventListener('mousemove', function (e) {
    tick++;
    if (tick % 3 !== 0) return;
    if (active >= MAX) return;

    var idx        = Math.floor(Math.random() * GLYPHS.length);
    var el         = document.createElement('span');
    el.className   = 'sparkle-glyph';
    el.textContent = GLYPHS[idx];
    el.style.color = COLORS[idx];
    el.style.left  = e.clientX + 'px';
    el.style.top   = e.clientY + 'px';
    el.style.setProperty('--r', (Math.random() * 360) + 'deg');

    document.body.appendChild(el);
    active++;

    el.addEventListener('animationend', function () {
      el.remove();
      active--;
    });
  }, { passive: true });
})();
