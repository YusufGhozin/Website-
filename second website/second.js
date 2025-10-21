// Menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menuBody = document.querySelector('.menu-body');
menuToggle.addEventListener('click', () => {
  menuBody.classList.toggle('active');
});

// Universe with Three.js
let scene, camera, renderer, stars = [];

initUniverse();
animateUniverse();

function initUniverse() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('universe'), antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Stars
  for (let i = 0; i < 1000; i++) {
    const geometry = new THREE.SphereGeometry(0.01, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    star.position.set(
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100,
      (Math.random() - 0.5) * 100
    );
    scene.add(star);
    stars.push(star);
  }

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateUniverse() {
  requestAnimationFrame(animateUniverse);
  stars.forEach(star => {
    star.rotation.x += 0.001;
    star.rotation.y += 0.001;
  });
  renderer.render(scene, camera);
}

// Explore Universe button
document.getElementById('explore-universe').addEventListener('click', () => {
  let tl = { z: camera.position.z };
  let interval = setInterval(() => {
    if (tl.z > 0.5) {
      tl.z -= 0.1;
      camera.position.z = tl.z;
    } else clearInterval(interval);
  }, 16);
});
