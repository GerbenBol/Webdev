init();

function init() {
    let imgs = document.getElementsByName("img");

    for (let i = 0; i < 2; i++) {
        imgs[i].addEventListener("click", changeIcon.bind(null, i));
    }

    document.getElementById("button").addEventListener("click", start);
}

function changeIcon(player) {
}

function start() {
}
