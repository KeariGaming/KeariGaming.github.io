fetch("assets.json")
.then(response => response.json())
.then(data => {

    const container = document.getElementById("assetList");
    container.innerHTML = "";

    data.assets.forEach(asset => {

        const card = document.createElement("div");
        card.className = "asset-card";

        let downloadURL = "";
        let buttonClass = "download";
        let buttonText = "Download";
        let downloadAttr = "";
        let sizeText = "Loading...";

        if (asset.file) {
            downloadURL = "assets/" + asset.file;
            downloadAttr = "download";

            // Fetch file size automatically
            fetch(downloadURL, { method: "HEAD" })
            .then(res => {
                const bytes = res.headers.get("Content-Length");
                if (bytes) {
                    const mb = (bytes / (1024 * 1024)).toFixed(2);
                    const sizeElem = card.querySelector(".asset-size");
                    if (sizeElem) sizeElem.textContent = mb + " MB";
                }
            });

        }

        if (asset.link) {
            downloadURL = asset.link;
            sizeText = asset.size || "Unknown size";
        }

        if (asset.popuplink) {
            buttonClass = "download-popup";
            buttonText = "Download (Pop Up Link)";
        }

        const button = `
        <a class="${buttonClass}" href="${downloadURL}" ${downloadAttr}>
        ${buttonText}
        </a>
        `;

        card.innerHTML = `
            <h3>${asset.name}</h3>
            <p>${asset.description}</p>
            <p class="asset-size">${sizeText}</p>
            ${button}
        `;

        container.appendChild(card);

    });

});
