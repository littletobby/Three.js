var renderer;
function initThree() {
	width = document.getElementById('canvas-frame').clientWidth;
	height = document.getElementById('canvas-frame').clientHeight;
	renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	renderer.setSize(width, height);
	document.getElementById('canvas-frame').appendChild(renderer.domElement);
	renderer.setClearColor(0xFFFFFF, 1.0);
}
var camera;
function initCamera() {
	camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
	camera.position.x = 0;
	camera.position.y = 1000;
	camera.position.z = 0;
	camera.up.x = 0;
	camera.up.y = 0;
	camera.up.z = 1;
	camera.lookAt({
		x : 0,
		y : 0,
		z : 0
	});
}
var scene;
function initScene() {
	scene = new THREE.Scene();
}
var light;
function initLight() {
	//light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
	//light.position.set(100, 100, 200);
	//scene.add(light);
}
//var cube;
function initObject() {
	/*var geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
    geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

    for ( var i = 0; i <= 20; i ++ ) {

        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
        line.position.z = ( i * 50 ) - 500;
        scene.add( line );

        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
        line.position.x = ( i * 50 ) - 500;
        line.rotation.y = 90 * Math.PI / 180;
        scene.add( line );

    }*/
    /*cubemap = THREE.ImageUtils.loadTextureCube(urls);
    var material = new THREE.MeshLambertMaterial({
    	color: 0xffffff,
    	envMap: cubemap
  	});*/
	var geometry = new THREE.SphereGeometry( 500, 60, 40 );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
	var loader = new THREE.TextureLoader();
	var hill = loader.load('textures/hill.jpg');
	var material = new THREE.MeshBasicMaterial({
		map: hill
	});
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
}
function threeStart() {
	initThree();
	initCamera();
	initScene();
	initLight();
	initObject();
	renderer.clear();
	renderer.render(scene, camera);
}
/*var urls = [
  'path/to/pos-x.png',
  'path/to/neg-x.png',
  'path/to/pos-y.png',
  'path/to/neg-y.png',
  'path/to/pos-z.png',
  'path/to/neg-z.png'
];*/

