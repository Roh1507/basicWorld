import './style.css'

import * as THREE from 'three';

import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
let scene, camera, renderer;


scene = new THREE.Scene();
const fov = 60;
const aspect = 1920 / 1080;
const near = 1.0;
const far = 1000.0;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(75, 20, 20);

renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Lights
let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;
scene.add(light);

light = new THREE.AmbientLight(0x101010);
scene.add(light);


//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 20, 0);

//Plane
const geometry = new THREE.PlaneGeometry(100, 100, 10, 10);
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(geometry, material);
plane.castShadow = false;
plane.recieveShadow = true;
scene.add(plane);

//loader/Texture
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  './resources/posx.jpg',
  './resources/negx.jpg',
  './resources/posy.jpg',
  './resources/negy.jpg',
  './resources/posz.jpg',
  './resources/negz.jpg',
]);
scene.background = texture;

//box
const geometry2 = new THREE.BoxGeometry(4, 4, 4);
const material2 = new THREE.MeshStandardMaterial({
  color: 0x00ff00
});
const box = new THREE.Mesh(geometry2, material2);
box.position.set(0, 1, 0);
box.castShadow = true;
box.recieveShadow = true;
scene.add(box);


for(let x=-8;x<8;x++){
  for(let y=-8;y<8;y++){
    const geometry3 = new THREE.BoxGeometry(2, 2, 2);
    const material3 = new THREE.MeshStandardMaterial({
      color: 0x9145B6
    });
    const box2 = new THREE.Mesh(geometry3, material3);
    box2.position.set(Math.random() + x * 5, Math.random() * 4.0 + 2.0, Math.random() + y * 5);
    box2.castShadow = true;
    box2.recieveShadow = true;
    scene.add(box2);
  }
}



//Animation
function animate() {
  requestAnimationFrame(animate);
  plane.rotation.x = -Math.PI / 2;

  controls.update();
  renderer.render(scene, camera);
}

function windowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

windowResize, addEventListener('windowResize', windowResize, false);
animate();
