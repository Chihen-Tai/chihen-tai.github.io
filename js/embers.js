// js/embers.js — rising ember and ash particles
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var COUNT = 10;
  for (var i = 0; i < COUNT; i++) {
    var e = document.createElement('div');
    e.className = 'ember';

    var isAsh = Math.random() < 0.3;
    var colors = isAsh
      ? ['rgba(136,136,136,0.4)', 'rgba(100,100,100,0.35)']
      : ['rgba(255,68,34,0.55)', 'rgba(204,34,0,0.45)', 'rgba(255,100,40,0.5)'];
    var color = colors[Math.floor(Math.random() * colors.length)];
    var size = (2 + Math.random() * 4) + 'px';

    e.style.left             = (Math.random() * 100) + 'vw';
    e.style.width            = size;
    e.style.height           = size;
    e.style.background       = color;
    e.style.setProperty('--dur',          (6 + Math.random() * 8)         + 's');
    e.style.setProperty('--delay',        (Math.random() * 12)            + 's');
    e.style.setProperty('--rise',         '-' + (60 + Math.random() * 60) + 'vh');
    e.style.setProperty('--sway',         ((Math.random() - 0.5) * 80)    + 'px');
    e.style.setProperty('--spin',         (Math.random() * 360)           + 'deg');
    e.style.setProperty('--peak-opacity', (isAsh ? 0.35 : 0.55).toString());

    document.body.appendChild(e);
  }
})();
