// js/petals.js — 10 floating gold/sakura petals drifting downward
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var COUNT = 10;
  for (var i = 0; i < COUNT; i++) {
    var p = document.createElement('div');
    p.className = 'petal';
    p.style.left = (Math.random() * 100) + 'vw';
    p.style.setProperty('--dur',   (8 + Math.random() * 8)          + 's');
    p.style.setProperty('--delay', (Math.random() * 10)              + 's');
    p.style.setProperty('--sway',  ((Math.random() - 0.5) * 120)    + 'px');
    p.style.setProperty('--spin',  (Math.random() * 360)             + 'deg');
    p.style.width  = (6 + Math.random() * 6) + 'px';
    p.style.height = p.style.width;
    document.body.appendChild(p);
  }
})();
