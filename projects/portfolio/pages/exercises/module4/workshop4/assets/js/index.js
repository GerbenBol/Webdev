init();

function init() {
    document.getElementById("button").addEventListener("click", start);
}

function start() {
    let p1i = document.getElementById("img1").src.split("img/");
    let p1n = document.getElementById("name1").value;
    let p2i = document.getElementById("img2").src.split("img/");
    let p2n = document.getElementById("name2").value;

    p1i = p1i[1].substring(0, p1i[1].length - 4);
    p2i = p2i[1].substring(0, p2i[1].length - 4);

    if (p1n == "") {
        p1n = "Player 1";
    }
    if (p2n == "") {
        p2n = "Player 2";
    }

    window.location.href = "game.html?p1i=" + p1i + "&p1n=" + p1n + "&p2i=" + p2i + "&p2n=" + p2n;
}
