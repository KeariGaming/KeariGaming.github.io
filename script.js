fetch("assets.json")
.then(response => response.json())
.then(data => {

    const container = document.getElementById("assetList");

    data.assets.forEach(asset => {

        const card = document.createElement("div");
        card.className = "asset-card";

        card.innerHTML = `
            <h3>${asset.name}</h3>
            <p>${asset.description}</p>
            <a class="download" href="assets/${asset.file}" download>
            Download
            </a>
        `;

        container.appendChild(card);
    });

});
