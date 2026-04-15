// js/stars.js
(function () {
  var canvas = document.getElementById('star-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  var scene  = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.z = 1;

  var STAR_COUNT = 600;
  var positions  = new Float32Array(STAR_COUNT * 3);
  for (var i = 0; i < STAR_COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  var geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  var mat   = new THREE.PointsMaterial({ color: 0xffffff, size: 0.018, transparent: true, opacity: 0.85 });
  var stars = new THREE.Points(geo, mat);
  scene.add(stars);

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
      stars.rotation.x += (mouseY - stars.rotation.x) * 0.04;
      stars.rotation.y += (mouseX - stars.rotation.y) * 0.04;
      stars.rotation.z += 0.0003;
    }
    renderer.render(scene, camera);
  })();
})();
