import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer, orbit;
let selectedItem;

init();
render();

function init() {
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e1e1e)
	scene.add( new THREE.GridHelper( 5, 50, 0x565656, 0x444444 ) );

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 5;

    cameraPersp = new THREE.PerspectiveCamera( 50, aspect, 0.1, 100 );
    cameraOrtho = new THREE.OrthographicCamera( - frustumSize * aspect, frustumSize * aspect, frustumSize, - frustumSize, 0.1, 100 );
    currentCamera = cameraPersp;

    orbit = new OrbitControls( currentCamera, renderer.domElement );
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.1;
    orbit.update();

    currentCamera.position.set( 5, 2.5, 5 );

    window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    cameraPersp.aspect = aspect;
    cameraPersp.updateProjectionMatrix();

    cameraOrtho.left = cameraOrtho.bottom * aspect;
    cameraOrtho.right = cameraOrtho.top * aspect;
    cameraOrtho.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();
}

function render() {
    requestAnimationFrame( render );

    orbit.update();
    renderer.render( scene, currentCamera );
}