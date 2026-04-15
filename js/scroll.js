// js/scroll.js
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.bento-block').forEach(function (block, i) {
    gsap.fromTo(block,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        duration: 0.65,
        delay: (i % 3) * 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: block, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  gsap.utils.toArray('.section-label').forEach(function (label) {
    gsap.fromTo(label,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: label, start: 'top 90%' } }
    );
  });
})();

// Sticker scroll-spy — highlights active section sticker
(function () {
  var SECTIONS = [
    { section: 'about',     sticker: 'sticker-wiz'   },
    { section: 'projects',  sticker: 'sticker-bot'   },
    { section: 'skills',    sticker: 'sticker-chem'  },
    { section: 'elden',     sticker: 'sticker-sword' },
    { section: 'favorites', sticker: 'sticker-wiz'   },
    { section: 'journey',   sticker: 'sticker-chem'  },
    { section: 'status',    sticker: 'sticker-bot'   },
    { section: 'contact',   sticker: 'sticker-mail'  },
  ];

  function onScroll() {
    var scrollY = window.scrollY + window.innerHeight * 0.4;
    var active  = null;
    SECTIONS.forEach(function (s) {
      var el = document.getElementById(s.section);
      if (el && el.offsetTop <= scrollY) active = s.sticker;
    });
    SECTIONS.forEach(function (s) {
      var btn = document.getElementById(s.sticker);
      if (btn) btn.classList.toggle('active', s.sticker === active);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
