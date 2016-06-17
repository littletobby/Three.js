$(function() {
	var camera, scene, renderer;
	var container, mesh;
	container = document.getElementById( 'canvas-frame' );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
	camera.target = new THREE.Vector3( 0, 0, 0 );
	scene = new THREE.Scene();
	var light = new THREE.AmbientLight( 0xff0000 );
	scene.add( light );
	var geometry = new THREE.SphereGeometry( 500, 60, 40 );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	var loader = new THREE.TextureLoader();
	var hill = loader.load('textures/hill.jpg');
	var material = new THREE.MeshBasicMaterial({
		map: hill
	});
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
})