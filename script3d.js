import * as THREE from "https://unpkg.com/three@0.158.0/build/three.module.js";
import { OBJLoader } from "https://unpkg.com/three@0.158.0/examples/jsm/loaders/OBJLoader.js";

fetch("3d-assets.json")
.then(res => res.json())
.then(data => {

const container = document.getElementById("assetList");

data.assets.forEach(asset => {

const card = document.createElement("div");
card.className = "asset-card";

const viewer = document.createElement("div");
viewer.className = "model-viewer";

card.innerHTML = `
<h3>${asset.name}</h3>
<p>${asset.description}</p>
<a class="download" href="models/${asset.file}" download>Download</a>
`;

card.prepend(viewer);
container.appendChild(card);

loadModel(viewer, "models/" + asset.file);

});

});


function loadModel(container, url){

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
container.clientWidth / 200,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(container.clientWidth,200);

container.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,2);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);

const loader = new OBJLoader();

loader.load(url,function(object){

const box = new THREE.Box3().setFromObject(object);
const center = box.getCenter(new THREE.Vector3());

object.position.sub(center);

scene.add(object);

});

camera.position.z = 5;

function animate(){
requestAnimationFrame(animate);
scene.rotation.y += 0.01;
renderer.render(scene,camera);
}

animate();

}
