let fields = [];
let cn;
let activePlayer = 1;
let wincons = [];
let p1i;
let p1n;
let p2i;
let p2n;
let sfx;
let bgm;
let gameOver = false;
init();

function init() {
    fields = document.getElementsByClassName("field");
    cn = document.getElementById("console");
    sfx = document.getElementById("sfx");
    bgm = document.getElementById("bgm");
    sfx.volume = 0.1;
    bgm.volume = 0.1;
    document.addEventListener("mousedown", function() { bgm.play(); });

    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", activate.bind(null, i))
    }

    document.getElementById("reset").addEventListener("click", reset);

    fetch("assets/data/wincons.json")
        .then((r) => r.json())
        .then((d) => setWincons(d));

    params = window.location.href.split("?");
    params = params[1].split("&");

    p1i = params[0].split("=")[1].replace("%20", " ");
    p1n = params[1].split("=")[1].replace("%20", " ");
    p2i = params[2].split("=")[1].replace("%20", " ");
    p2n = params[3].split("=")[1].replace("%20", " ");

    writeToConsole("Game initialized");
    writeToConsole(p1n + "'s turn");
}

function setWincons(data) {
    wincons = data;
}

function activate(id) {
    if (!gameOver) {
        let field = fields[id];

        if (field.children.length == 0) {
            setField(field);
            checkWin();
            checkDraw();
            let lastMsg = cn.children[cn.children.length - 1].innerHTML;

            if (lastMsg.substring(lastMsg.length - 5) != "wins!" && lastMsg.substring(lastMsg.length - 5) != "draw!") {
                nextPlayer();
            }
        }
    }
}

function setField(field) {
    // Fill field
    let elem = document.createElement("img");
    elem.src = document.getElementById("player" + activePlayer).src;
    field.appendChild(elem);
}

function checkWin() {
    // Check for each "win-condition" if it's met
    wincons.forEach(condition => {
        let win = true;

        condition.forEach(field => {
            if (fields[field].children.length == 0 ||
                fields[field].children[0].src != document.getElementById("player" + activePlayer).src) {

                win = false;
            }
        });

        if (win) {
            endGame("win");
        }
    });
}

function checkDraw() {
    // Check for each "win-condition" if it's possible to still get it
    let cons = [];

    wincons.forEach(condition => {
        // Check for each field if the field is filled and with what
        let possible = true;
        let src = "";

        condition.forEach(field => {
            if (possible && fields[field].children.length != 0) {
                if (src == "") {
                    src = fields[field].children[0].src;
                } else if (fields[field].children[0].src != src) {
                    possible = false;
                }
            }
        });

        cons[cons.length] = possible;
    });

    if (!cons.includes(true)) {
        endGame("draw");
    }
}

function endGame(winOrDraw) {
    let msg = "";

    if (winOrDraw == "win") {
        if (activePlayer == 1) {
            msg = p1n + " wins!";
            sfx.src = "assets/audio/" + p1i + ".mp3";
        } else {
            msg = p2n + " wins!";
            sfx.src = "assets/audio/" + p2i + ".mp3";
        }
    } else {
        msg = "It's a draw!";
    }
    writeToConsole(msg);
    killBoard();
    bgm.pause();
    sfx.play();
    sfx.addEventListener("ended", function() { bgm.play(); });
}

function nextPlayer() {
    let player1 = document.getElementById("player1");
    let player2 = document.getElementById("player2");

    if (activePlayer == 2) {
        activePlayer = 1;
        player1.className = "";
        player2.className = "inactive";
        writeToConsole(p1n + "'s turn");
    } else {
        activePlayer++;
        player2.className = "";
        player1.className = "inactive";
        writeToConsole(p2n + "'s turn");
    }
}

function writeToConsole(message) {
    let elem = document.createElement("p");
    elem.innerHTML = message;
    cn.appendChild(elem);
}

function reset() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].children.length != 0) {
            if (confirm("Are you sure you want to reset?")) {
                window.location.href = "index.html";
            }
        }
    }
}

function killBoard() {
    gameOver = true;
    let css = ".field:hover { cursor: initial; }";
    let style = document.createElement("style");

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName("head")[0].appendChild(style);
}
