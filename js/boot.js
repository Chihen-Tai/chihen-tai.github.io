(function () {
  var screen = document.getElementById('loading-screen');
  var el     = document.getElementById('loading-text');

  new Typed(el, {
    strings: ['ALLEN.SYS — ONLINE ✦'],
    typeSpeed: 55,
    startDelay: 100,
    loop: false,
    showCursor: false,
    onComplete: function () {
      setTimeout(function () {
        screen.classList.add('fade-out');
        setTimeout(function () { screen.style.display = 'none'; }, 500);
      }, 300);
    }
  });

  // Nav scroll-spy
  var nav = document.getElementById('main-nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();
