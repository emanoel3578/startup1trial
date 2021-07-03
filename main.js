import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


// Setup

let rocket
let rocket1
let planet1
let planet2
let planet3

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
camera.position.setY(3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add();

// Rocket Try

let loader = new GLTFLoader();
  loader.load( "https://www.stivaliserna.com/assets/rocket/rocket.gltf",
    (gltf) => {
      gltf.scene.scale.set(0.01, 0.01, 0.01)
      rocket = gltf.scene;
      rocket.position.y = 3;
      rocket.position.x = 15;
      rocket.position.z = -20;
      rocket.rotation.y = 1
      rocket.rotation.z = 1.5
      
      scene.add(rocket);
    }
  );

  let loader1 = new GLTFLoader();
  loader1.load( "https://www.stivaliserna.com/assets/rocket/rocket.gltf",
    (gltf) => {
      gltf.scene.scale.set(0.01, 0.01, 0.01)
      rocket1 = gltf.scene;
      rocket1.position.y = 3;
      rocket1.position.x = -15;
      rocket1.position.z = -20;
      rocket1.rotation.y = -4
      rocket1.rotation.z = 1.5
      
      scene.add(rocket1);
    }
  );


// Planets

let loaderPlanet1 = new GLTFLoader();
  loaderPlanet1.load( "../3DFab/planet1/scene.gltf",
    (gltf) => {
      gltf.scene.scale.set(0.2, 0.2, 0.2)
      planet1 = gltf.scene;
      planet1.position.y = 1;
      planet1.position.x = 3;
      planet1.position.z = 8;
      planet1.rotation.y = 1
      planet1.rotation.z = 1.5
      
      scene.add(planet1);
    }
  );

  let loaderPlanet2 = new GLTFLoader();
    loaderPlanet2.load( "../3DFab/planet2/scene.gltf",
    (gltf) => {
      gltf.scene.scale.set(3, 3, 3)
      planet2 = gltf.scene;
      planet2.position.y = 4;
      planet2.position.x = 10;
      planet2.position.z = -10;
      planet2.rotation.y = 1
      planet2.rotation.z = 1.5
      
      scene.add(planet2);
    }
  );

  let loaderPlanet3 = new GLTFLoader();
    loaderPlanet3.load( "../3DFab/planet3/scene.gltf",
    (gltf) => {
      gltf.scene.scale.set(0.005, 0.005, 0.005)
      planet3 = gltf.scene;
      planet3.position.y = 3;
      planet3.position.x = 10;
      planet3.position.z = -10;
      planet3.rotation.y = 1
      planet3.rotation.z = 1.5
      
      scene.add(planet3);
    }
  );

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add()

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const manelTexture = new THREE.TextureLoader().load('manel.jpg');

const manel = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ map: manelTexture }));

scene.add();

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 32;
moon.position.x =-10;
moon.position.y = 3;

manel.position.z = -20;
manel.position.x = 14;
manel.position.y = 2;

// Scroll Animation


/*
*/
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  manel.rotation.y += 0.01;
  manel.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  rocket.position.z += 0.06
  rocket.position.x -= 0.06

  setTimeout(function(){
    rocket1.position.z += 0.06
    rocket1.position.x += 0.06
  },5000)
  
  if (rocket1.position.x > 16) {
      rocket1.position.x = -15;
      rocket1.position.z = -20;
  }

  if (rocket.position.x < -18) {
    rocket.position.x = 15;
    rocket.position.z = -20;
  }

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.009;
  planet1.rotation.x += 0.009;
  planet2.rotation.y += 0.009;
  planet3.rotation.z += 0.009;

  //controls.update();

  renderer.render(scene, camera);
}


animate()