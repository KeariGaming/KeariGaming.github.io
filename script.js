fetch("assets.json")
.then(response => response.json())
.then(data => {

    const container = document.getElementById("assetList");

    data.assets.forEach(asset => {

        const card = document.createElement("div");
        card.className = "asset-card";

        let downloadURL = asset.file ? "assets/" + asset.file : asset.link;

        let buttonClass = "download";
        let buttonText = "Download";

        if (asset.popuplink === true) {
            buttonClass = "download-popup";
            buttonText = "Download (Pop Up Link)";
        }

        card.innerHTML = `
            <h3>${asset.name}</h3>
            <p>${asset.description}</p>
            <a class="${buttonClass}" href="${downloadURL}">
            ${buttonText}
            </a>
        `;

        container.appendChild(card);

    });

});

});
