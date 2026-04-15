(function () {
  var screen = document.getElementById('loading-screen');
  var el     = document.getElementById('loading-text');

  new Typed(el, {
    strings: [
      'ALLEN SYSTEM INITIALIZING...',
      'LOADING QUANTUM MODULES...',
      'SUMMONING ELDEN LORD...',
      'READY.'
    ],
    typeSpeed: 40,
    backSpeed: 20,
    backDelay: 400,
    startDelay: 200,
    loop: false,
    showCursor: false,
    onComplete: function () {
      setTimeout(function () {
        screen.classList.add('fade-out');
        setTimeout(function () { screen.style.display = 'none'; }, 700);
      }, 600);
    }
  });

  // Nav scroll-spy
  var nav = document.getElementById('main-nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();
