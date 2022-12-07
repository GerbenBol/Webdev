let fields = [];
let cn;
let activePlayer = 1;
let wincons = [];
init();

function init() {
    fields = document.getElementsByClassName("field");
    cn = document.getElementById("console");

    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", activate.bind(null, i))
    }

    document.getElementById("reset").addEventListener("click", reset);

    fetch("assets/data/wincons.json")
        .then((r) => r.json())
        .then((d) => setWincons(d));

    writeToConsole("Game initialized");
    writeToConsole("Player 1's turn");
}

function setWincons(data) {
    wincons = data;
}

function activate(id) {
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

    console.log(cons);

    if (!cons.includes(true)) {
        endGame("draw");
    }
}

function endGame(winOrDraw) {
    let msg = "";

    if (winOrDraw == "win") {
        msg = "Player " + activePlayer + " wins!";
    } else {
        msg = "It's a draw!";
    }
    writeToConsole(msg);
}

function nextPlayer() {
    let player1 = document.getElementById("player1");
    let player2 = document.getElementById("player2");

    if (activePlayer == 2) {
        activePlayer = 1;
        player1.className = "";
        player2.className = "inactive";
        writeToConsole("Player 1's turn");
    } else {
        activePlayer++;
        player2.className = "";
        player1.className = "inactive";
        writeToConsole("Player 2's turn");
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
