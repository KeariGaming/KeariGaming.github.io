fetch("assets.json")
.then(response => response.json())
.then(data => {

    const container = document.getElementById("assetList");

    data.assets.forEach(asset => {

        const card = document.createElement("div");
        card.className = "asset-card";

        let downloadURL = "";
        let buttonClass = "download";
        let buttonText = "Download";
        let downloadAttr = "";

        if(asset.file){
            downloadURL = "assets/" + asset.file;
            downloadAttr = "download";
        }
        else if(asset.link){
            downloadURL = asset.link;
        }

        if(asset.popuplink === "true"){
            buttonClass = "download-popup";
            buttonText = "Download (Pop Up Link)";
        }

        card.innerHTML = `
            <h3>${asset.name}</h3>
            <p>${asset.description}</p>
            <a class="${buttonClass}" href="${downloadURL}" ${downloadAttr}>
            ${buttonText}
            </a>
        `;

        container.appendChild(card);

    });

});
