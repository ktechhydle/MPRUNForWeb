import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let camera;
let scene, renderer, orbit, sky;
let selectedItem;

init();
createScene();
render();

function init() {
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();
	const light = new THREE.AmbientLight(0xffffff, 1); // Soft white light
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const aspect = window.innerWidth / window.innerHeight;

    camera = new THREE.PerspectiveCamera( 50, aspect, 0.1, 1000 );
    camera.position.set( 5, 2.5, 5 );

    orbit = new OrbitControls( camera, renderer.domElement );
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.1;
    orbit.update();

    window.addEventListener( 'resize', onWindowResize );
    window.addEventListener( 'keydown',  onWindowKey );
}

function createScene() {
    sky = new Sky();
    sky.scale.setScalar( 450000 );

    const phi = THREE.MathUtils.degToRad( 90 );
    const theta = THREE.MathUtils.degToRad( 180 );
    const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, phi, theta );

    sky.material.uniforms.sunPosition.value = sunPosition;

    scene.add( sky );

    const geometry = new THREE.PlaneGeometry( 64000, 64000 );
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.9,
        metalness: 0, 
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh( geometry, material );
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add( plane );
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();
}

function onWindowKey(event) {
    
}

function render() {
    requestAnimationFrame( render );

    orbit.update();
    renderer.render( scene, camera );
}