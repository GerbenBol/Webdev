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
            text.innerHTML = key.shortDesc;
            elem.appendChild(text);

            var button = document.createElement("div");
            button.className = "btn";
            elem.appendChild(button);

            var buttontext = document.createElement("a");
            var loc = window.location.href;
            buttontext.href = loc.substring(0, loc.lastIndexOf('/')) + "/projects/" + key.file + "?id=" + key.index;
            buttontext.innerHTML = "Go to this project! &raquo;";
            button.appendChild(buttontext);

            parent.appendChild(elem);

            if (index >= 3)
                index = 1;
            else
                index++;
        })
    });
}
