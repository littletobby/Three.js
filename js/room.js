$(function() {
	init();
	animate();
});

var camera, scene, renderer;

var fov = 70,
texture_placeholder,
isUserInteracting = false,
onMouseDownMouseX = 0, onMouseDownMouseY = 0,
lon = 180, onMouseDownLon = 180, // Originally 0
lat = 0, onMouseDownLat = 0,
phi = 0, theta = 0;


url = [
	'downtown.jpg',
	'grass.jpg',
	'hill.jpg',
	'lake.jpg',
	'snow.jpg',
	'texture2.jpeg',
	'urban.jpg',
	'block.jpg',
	'park.jpg'
]
function init() {

	var container, mesh;

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, 1, 1100 );
	camera.target = new THREE.Vector3( 0, 0, 0 );

	scene = new THREE.Scene();

	loader = new THREE.TextureLoader();
	textures = new Array(url.length);
	for (var i = 0; i < url.length; i++)
		textures[i] = loader.load('textures/' + url[i]);
	var current = 0;
	//var texture = loader.load('textures/downtown.jpg');
	var material = new THREE.MeshBasicMaterial( { map: textures[current] } );
	mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 60, 40 ), material );
	mesh.scale.x = -1;
	scene.add( mesh );

	document.onkeydown = function(ev) {
		keyCode = ev.keyCode;
		console.log("keyboard: " + keyCode);
		switch(keyCode) {
			case 37 :
				current = (current - 1 + url.length) % url.length;
				break;
			case 39 :
				current = (current + 1) % url.length;
				break;
		}
		material.map = textures[current];
	}

	document.onkeyup = function(ev) {

	}

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
	document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	isUserInteracting = true;

	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;

	onPointerDownLon = lon;
	onPointerDownLat = lat;

}

function onDocumentMouseMove( event ) {

	if ( isUserInteracting ) {

		lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
		lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

	}
}

function onDocumentMouseUp( event ) {

	isUserInteracting = false;

}

function onDocumentMouseWheel( event ) {

	// WebKit

	if ( event.wheelDeltaY ) {

		fov -= event.wheelDeltaY * 0.05;

	// Opera / Explorer 9

	} else if ( event.wheelDelta ) {

		fov -= event.wheelDelta * 0.05;

	// Firefox

	} else if ( event.detail ) {

		fov += event.detail * 1.0;

	}

	camera.projectionMatrix.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1100 );
	render();

}

function animate() {

	requestAnimationFrame( animate );
	render();

}

function render() {

	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = ( 90 - lat ) * Math.PI / 180;
	theta = lon * Math.PI / 180;

	camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
	camera.target.y = 500 * Math.cos( phi );
	camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

	camera.lookAt( camera.target );

	/*
	// distortion
	camera.position.x = - camera.target.x;
	camera.position.y = - camera.target.y;
	camera.position.z = - camera.target.z;
	*/

	renderer.render( scene, camera );

}