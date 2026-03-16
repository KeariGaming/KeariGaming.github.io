// script3d.js

fetch("3d-assets.json")
.then(res => res.json())
.then(data => {

    const container = document.getElementById("assetList");

    data.assets.forEach(asset => {

        const card = document.createElement("div");
        card.className = "asset-card";

        // Determine button behavior
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
            isDownload = false;
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
        <div class="asset-size">${asset.size || ""}</div>

        <a class="${buttonClass}" href="${buttonHref}" ${isDownload ? "download" : 'target="_blank"'}>${buttonText}</a>

        <div class="downloads">Loading downloads...</div>
        `;

        container.appendChild(card);

        // Counter ID (use id if provided, otherwise filename)
        const counterId = asset.id || asset.file || asset.link;

        const counterElement = card.querySelector(".downloads");
        const button = card.querySelector("a");

        // Fetch current download count
        fetch(`https://api.counterapi.dev/v2/keari_archive/${counterId}`)
        .then(res => res.json())
        .then(data => {

            const downloads = data.data.up_count || 0;
            counterElement.innerText = downloads + " downloads";

        })
        .catch(() => {
            counterElement.innerText = "0 downloads";
        });

        // Increase counter on click
        button.addEventListener("click", () => {

            fetch(`https://api.counterapi.dev/v2/keari_archive/${counterId}/up`);

        });

    });

});
