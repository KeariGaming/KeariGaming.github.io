// script3d.js
fetch("3d-assets.json")
.then(res => res.json())
.then(data => {
    const container = document.getElementById("assetList");

    data.assets.forEach(asset => {
        const card = document.createElement("div");
        card.className = "asset-card";

        card.innerHTML = `
        <model-viewer class="model-viewer"
            src="models/${asset.file}"
            camera-controls
            auto-rotate
            shadow-intensity="1">
        </model-viewer>

        <h3>${asset.name}</h3>
        <p>${asset.description}</p>
        <div class="asset-size">${asset.size}</div>
        <a class="download" href="models/${asset.file}" download>Download</a>
        `;

        container.appendChild(card);
    });
});
