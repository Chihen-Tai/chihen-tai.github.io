// js/boot.js — 3-phase transformation loading sequence
(function () {
  var screen = document.getElementById('loading-screen');
  var el     = document.getElementById('loading-text');
  var burst  = document.getElementById('loading-burst');

  // Phase 1: Gold radial particle burst (0–0.8s)
  var COLORS = ['#ffdd88', '#ffcc44', '#fff8cc', '#c8aaff', '#88ccff'];
  var COUNT  = 28;
  for (var i = 0; i < COUNT; i++) {
    var p = document.createElement('div');
    p.className = 'burst-particle';
    var angle = (i / COUNT) * 360;
    var dist  = 60 + Math.random() * 120;
    p.style.setProperty('--angle', angle + 'deg');
    p.style.setProperty('--dist',  dist  + 'px');
    p.style.background = COLORS[i % COLORS.length];
    p.style.animationDelay = (Math.random() * 0.3) + 's';
    burst.appendChild(p);
  }

  // Phase 2: Typed.js 3-line sequence (starts at 0.8s)
  setTimeout(function () {
    var lines = [
      '<span style="color:#88ccff">LOADING TRAVELER DATA...<br></span>',
      '<span style="color:#c8aaff">RESONANCE SYNCHRONIZED<br></span>',
      '<span style="color:#ffdd88">WELCOME BACK, ALLEN ✦</span>',
    ];
    new Typed(el, {
      strings: [lines.join('')],
      typeSpeed: 38,
      startDelay: 0,
      loop: false,
      showCursor: false,
      contentType: 'html',
      onComplete: function () {
        // Phase 3: fade out, then reveal hero subtitle
        setTimeout(function () {
          screen.classList.add('fade-out');
          setTimeout(function () {
            screen.style.display = 'none';
            var sub = document.querySelector('.hero-sub');
            if (sub) sub.textContent = '✦ TRAVELER · RESONATOR · SWORDSMAN · CHEMIST · ELDEN LORD ✦';
          }, 500);
        }, 300);
      }
    });
  }, 800);

  // Nav scroll-spy
  var nav = document.getElementById('main-nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();
