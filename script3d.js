function loadModel(container, url){

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
60,
container.clientWidth / 200,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
renderer.setSize(container.clientWidth,200);
container.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff,0.8);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(3,3,3);
scene.add(light);

const loader = new THREE.GLTFLoader();

let model;

loader.load(url,function(gltf){

model = gltf.scene;

const box = new THREE.Box3().setFromObject(model);
const center = box.getCenter(new THREE.Vector3());

model.position.sub(center);

scene.add(model);

});

camera.position.z = 3;

function animate(){

requestAnimationFrame(animate);

if(model){
model.rotation.y += 0.01;
}

renderer.render(scene,camera);

}

animate();

}
