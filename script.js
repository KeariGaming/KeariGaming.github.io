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
        let extensionText = "Unknown";
        let thumbnailHTML = "";

        if (asset.thumbnail) {
            thumbnailHTML = `<img class="asset-thumb" src="thumbnails/${asset.thumbnail}">`;
        }

        if (asset.file) {
            downloadURL = "assets/" + asset.file;
            downloadAttr = "download";

            const parts = asset.file.split(".");
            const ext = parts[parts.length - 1].toUpperCase();
            extensionText = "." + ext + " File";

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

        if (asset.extension) {
            extensionText = asset.extension;
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
            ${thumbnailHTML}
            <h3>${asset.name}</h3>
            <p>${asset.description}</p>
            <p class="asset-meta">${extensionText}</p>
            <p class="asset-size">${sizeText}</p>
            <p class="downloads">Loading downloads...</p>
            ${button}
        `;

        container.appendChild(card);

        // Counter ID (use id if defined, otherwise filename)
        const counterId = asset.id || asset.file || asset.link;

        const counterElement = card.querySelector(".downloads");
        const buttonElement = card.querySelector("a");

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

        // Increment counter when download button is clicked
        buttonElement.addEventListener("click", () => {

            fetch(`https://api.counterapi.dev/v2/keari_archive/${counterId}/up`);

        });

    });

});
