function changeScreen() {
    let screen = document.getElementById("screen");
    let vid = document.getElementById("vid");
    let button = document.getElementById("button");

    if (vid == undefined || vid == null) {
        console.log("starting teenagers...");
        vid = document.createElement("video");
        vid.src = "assets/vid/ornn.mp4";
        vid.id = "vid";
        screen.appendChild(vid);
        vid.volume = 0.1;
        vid.play();
        screen.style.background = "black";
        button.style.background = "linear-gradient(lightgreen, 50%, green)";
        document.title = "An accurate description of Ornn by LS - Television";
    } else if (vid.src.substring(vid.src.length - 8) == "ornn.mp4") {
        vid.src = "assets/vid/teenagers.mp4";
        vid.style.marginTop = "6%";
        vid.play();
        document.title = "My Chemical Romance - Teenagers - Television";
    } else if (vid.src.substring(vid.src.length - 13) == "teenagers.mp4") {
        screen.removeChild(vid);
        screen.style.background = "";
        button.style.background = "";
        document.title = "Television";
    }
}
