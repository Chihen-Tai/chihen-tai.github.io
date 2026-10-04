// js/motion.js — scroll reveal + active nav highlight
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sections = document.querySelectorAll('.section');

  if (!reduce) {
    document.documentElement.classList.add('js-reveal');
    var revealer = new IntersectionObserver(function (items) {
      items.forEach(function (it) {
        if (it.isIntersecting) { it.target.classList.add('in'); revealer.unobserve(it.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    sections.forEach(function (s) { revealer.observe(s); });
  }

  var links = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) { links[a.hash.slice(1)] = a; });
  var spy = new IntersectionObserver(function (items) {
    items.forEach(function (it) {
      var a = links[it.target.id];
      if (a && it.isIntersecting) {
        Object.values(links).forEach(function (l) { l.classList.remove('active'); });
        a.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { spy.observe(s); });
})();
