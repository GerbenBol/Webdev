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

function printProjects() {
    var data = null;

    readTextFile("../data/projects.json", function(text) {
        data = JSON.parse(text);
        console.log(data);
        var parent = document.getElementById("projects");

        if (data === null) {
            console.log("no data found...");
            return;
        }

        var index = 1;
        
        data.forEach(key => {
            var elem = document.createElement("div");
            elem.className = "project";
            var header = document.createElement("h1");
            header.innerHTML = key.projectName;
            elem.appendChild(header);
            var text = document.createElement("p");
            text.innerHTML = key.description;
            elem.appendChild(text);
            parent.appendChild(elem);

            if (index >= 3)
                index = 1;
            else
                index++;
        })
    });
}
