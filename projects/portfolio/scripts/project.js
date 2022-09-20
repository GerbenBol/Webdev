function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getIndex() {
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id') - 1;
}

function printPage() {
    var data = null;


    readTextFile("../../data/projects.json", function(text) {
        data = JSON.parse(text);
        var index = getIndex();

        if (data === null) {
            console.log("no data found...");
            return;
        }

        printer(data[index]);
    });
}

function printer(data) {
    var main = document.getElementById("main");

    // Jumbotron
    var jumbo = document.createElement("div");
    jumbo.className = "jumbotron";
    var jumbotext = document.createElement("h1");
    jumbotext.innerHTML = data.projectName;
    jumbo.appendChild(jumbotext);
    main.appendChild(jumbo);

    // Divider (hr)
    var hr = document.createElement("hr");
    main.appendChild(hr);

    // Content
    var divider = document.createElement("div");
    divider.className = "big-div";
    main.appendChild(divider);

    // Description
    if (data.amountProjects > 1)
        for (var i = 1; i < data.amountProjects; i++)
            printDoubleContent(data, divider);
    else
        printContent(data, divider)
}

function printContent(data, divider) {
    // Description
    // Left side
    var blockl = document.createElement("div");
    blockl.className = "block-left";
    divider.appendChild(blockl);

    var gridl = document.createElement("div");
    gridl.className = "grid";
    blockl.appendChild(gridl);

    var textl = document.createElement("div");
    textl.className = "text";
    gridl.appendChild(textl);

    for (var i = 0; i < data.paragraphs; i++) {
        var pl = document.createElement("p");
        pl.innerHTML = data.description[i];
        textl.appendChild(pl);
    }

    // Right side
    var blockr = document.createElement("div");
    blockr.className = "block-right";
    divider.appendChild(blockr);

    var gridr = document.createElement("div");
    gridr.className = "grid";
    blockr.appendChild(gridr);

    var textr = document.createElement("div");
    textr.className = "text";
    gridr.appendChild(textr);

    var pr = document.createElement("p");
    pr.className = "nicep";
    pr.innerHTML = data.language;
    textr.appendChild(pr);
    
    //img(?)
}

function printDoubleContent(data, divider) {

}
