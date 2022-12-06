let fields = [];
let activePlayer = 1;
let wincons = [];
init();

function init() {
    fields = document.getElementsByClassName("field");

    for (let i = 0; i < fields.length; i++) {
        fields[i].addEventListener("click", setField.bind(null, i))
    }

    fetch("assets/data/wincons.json")
        .then((r) => r.json())
        .then((d) => setWincons(d));
}

function setWincons(data) {
    wincons = data;
}

function setField(fieldId) {
    let field = fields[fieldId];
    
    if (field.children.length == 0) {
        // Fill field
        let elem = document.createElement("img");
        elem.src = document.getElementById("player" + activePlayer).src;
        field.appendChild(elem);

        // Next player
        nextPlayer();
    }
}

function nextPlayer() {
    let player1 = document.getElementById("player1");
    let player2 = document.getElementById("player2");

    if (activePlayer == 2) {
        activePlayer = 1;
        player1.className = "";
        player2.className = "inactive";
    } else {
        activePlayer++;
        player2.className = "";
        player1.className = "inactive";
    }
}
