fetch("3d-assets.json")
.then(res => res.json())
.then(data => {

const container = document.getElementById("assetList");

data.assets.forEach(asset => {

let modelURL = "";
let downloadURL = "";
let buttonClass = "download";
let buttonText = "Download";
let downloadAttr = "";

if(asset.file){
    modelURL = "models/" + asset.file;
    downloadURL = "models/" + asset.file;
    downloadAttr = "download";
}

if(asset.link){
    modelURL = asset.link;
    downloadURL = asset.link;
}

if(asset.popuplink){
    buttonClass = "download-popup";
    buttonText = "Download (Pop Up Link)";
}

const card = document.createElement("div");
card.className = "asset-card";

card.innerHTML = `

<model-viewer
src="${modelURL}"
camera-controls
auto-rotate
shadow-intensity="1">
</model-viewer>

<h3>${asset.name}</h3>

<p>${asset.description}</p>

<div class="size">${asset.size || ""}</div>

<a class="${buttonClass}" href="${downloadURL}" ${downloadAttr}>
${buttonText}
</a>

`;

container.appendChild(card);

});

});

animate();

}
