import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let cameraPersp, cameraOrtho, currentCamera;
let scene, renderer, orbit, axesHelper;
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
	scene.add( new THREE.GridHelper( 100, 50, 0x565656, 0x444444 ) );
	const light = new THREE.AmbientLight(0xffffff, 1); // Soft white light
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7).normalize();
    scene.add(directionalLight);

    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 5;

    cameraPersp = new THREE.PerspectiveCamera( 50, aspect, 0.1, 1000 );
    cameraOrtho = new THREE.OrthographicCamera(
        -frustumSize * aspect,
        frustumSize * aspect,
        frustumSize,
        -frustumSize,
        -100, 1000
    );
    currentCamera = cameraPersp;

    orbit = new OrbitControls( currentCamera, renderer.domElement );
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.1;
    orbit.update();

    currentCamera.position.set( 5, 2.5, 5 );

    window.addEventListener( 'resize', onWindowResize );

    window.addEventListener( 'keydown',  function (event) {
        switch ( event.key ) {
            case 'c':
                toggleCamera();
        };
    })
}

function toggleCamera() {
    const position = currentCamera.position.clone();

    currentCamera = currentCamera.isPerspectiveCamera ? cameraOrtho : cameraPersp;
    currentCamera.position.copy( position );
    currentCamera.updateProjectionMatrix();

    orbit.object = currentCamera;

    currentCamera.lookAt( orbit.target.x, orbit.target.y, orbit.target.z );
    onWindowResize();

    render();
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;

    cameraPersp.aspect = aspect;
    cameraPersp.updateProjectionMatrix();

    cameraOrtho.left = -frustumSize * aspect;
    cameraOrtho.right = frustumSize * aspect;
    cameraOrtho.top = frustumSize;
    cameraOrtho.bottom = -frustumSize;
    cameraOrtho.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();
}

function render() {
    requestAnimationFrame( render );

    orbit.update();
    renderer.render( scene, currentCamera );
}

window.toggleCamera = toggleCamera;