fetch("assets.json")
.then(response => response.json())
.then(data => {

    const container = document.getElementById("assetList");

    data.assets.forEach(asset => {

        const card = document.createElement("div");
        card.className = "asset-card";

        let downloadURL = "";
        let downloadAttr = "";

        if(asset.file){
            downloadURL = "assets/" + asset.file;
            downloadAttr = "download";
        }
        else if(asset.link){
            downloadURL = asset.link;
        }

        card.innerHTML = `
            <h3>${asset.name}</h3>
            <p>${asset.description}</p>
            <a class="download" href="${downloadURL}" ${downloadAttr}>
            Download
            </a>
        `;

        container.appendChild(card);

    });

});
