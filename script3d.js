// script3d.js
fetch("3d-assets.json")
.then(res => res.json())
.then(data => {
    const container = document.getElementById("assetList");

    data.assets.forEach(asset => {
        const card = document.createElement("div");
        card.className = "asset-card";

        // Determine if it's a popup link or normal download
        let buttonClass = "download";
        let buttonText = "Download";
        let buttonHref = `models/${asset.file}`;
        let isDownload = true;

        if (asset.popuplink) {
            buttonClass = "download-popup";
            buttonText = "Download (Pop Up Link)";
        }

        if (asset.link) {
            buttonHref = asset.link;
            isDownload = false; // It’s a normal link now
        }

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
        <a class="${buttonClass}" href="${buttonHref}" ${isDownload ? "download" : 'target="_blank"'}>${buttonText}</a>
        `;

        container.appendChild(card);
    });
});
