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

        if (asset.file) {
            downloadURL = "assets/" + asset.file;
            downloadAttr = "download";
        }

        if (asset.link) {
            downloadURL = asset.link;
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
            ${button}
        `;

        container.appendChild(card);

    });

});
