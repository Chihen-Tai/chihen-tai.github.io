// js/stars.js — 900 stars: 70% white, 20% gold-tinted, 10% blue-tinted
(function () {
  var canvas = document.getElementById('star-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 1;

  var TOTAL = 900;
  var groups = [
    { count: Math.round(TOTAL * 0.65), color: 0x9933cc, size: 0.016 },
    { count: Math.round(TOTAL * 0.25), color: 0xcc44ff, size: 0.018 },
    { count: Math.round(TOTAL * 0.10), color: 0x440066, size: 0.017 },
  ];

  groups.forEach(function (g) {
    var positions = new Float32Array(g.count * 3);
    for (var i = 0; i < g.count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    var mat = new THREE.PointsMaterial({ color: g.color, size: g.size, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(geo, mat));
  });

  var mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', function (e) {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  }, { passive: true });

  window.addEventListener('resize', function () {
    var w = canvas.offsetWidth, h = canvas.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  (function animate() {
    requestAnimationFrame(animate);
    if (!prefersReduced) {
      scene.children.forEach(function (pts) {
        pts.rotation.x += (mouseY - pts.rotation.x) * 0.04;
        pts.rotation.y += (mouseX - pts.rotation.y) * 0.04;
        pts.rotation.z += 0.0003;
      });
    }
    renderer.render(scene, camera);
  })();
})();
