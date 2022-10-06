var board = [];
let cards = ["K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "A"];
let cardsAmounts = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
let completedStacks = 0;
let newStacks = 5;

// ---- Main functions ----

async function init() {
    /*readTextFile("../../../data/solitairestart.json", function(text) {
        data = JSON.parse(text);

        if (data === null) {
            console.log("no data found...");
            return;
        }

        for (let i = 0; i < data.length; i++)
            board[i] = data[i];
    });*/

    fetch("../../../data/solitairestart.json")
        .then((response) =>response.json())
        .then((data) => createBoard(data));

    await new Promise(r => setTimeout(r, 7000));

    // Create rows for the cards/stacks to be in
    for (let i = 0; i < 10; i++)
        printRow(i + 1);

    // Create cards and put them in the stacks
    for (let row = 0; row < 10; row++) {
        if (row < 5) {
            for (let stack = 0; stack < 5; stack++) {
                addCardToStack(row, stack);
            }
        } else {
            for (let stack = 0; stack < 4; stack++) {
                addCardToStack(row, stack);
            }
        }
    }

    restStacks();
    console.log(board);
}

function update() {
    // make flowchart of what needs to be checked/done first

    // Update stacks (new stacks + completed stacks)
    restStacks();
}

// ---- Init functions ----

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200")
            callback(rawFile.responseText);
    }
    rawFile.send(null);
}

function createBoard(data) {
    board = data;
}

function printRow(id) {
    let row = document.createElement("div");
    row.className = "row" + id;

    document.getElementById("playingboard").appendChild(row);
}

function addCardToStack(row, stack) {
    let card = getRandomCard();

    console.log(board);
    board[row][stack].cards[0] = card;
}

function getRandomCard() {
    let okay = false;
    let rand = "";

    while (!okay) {
        rand = Math.floor(Math.random() * 14);

        if (cardsAmounts[rand] != 0)
            okay = true;
        else {
            okay = false;
        }
    }
    return cards[rand];
}

// ---- Helper functions ----

function restStacks() {
    // New stacks stack
    var elem = document.getElementById("newstackcard");

    if (newStacks != 0)
        if (elem == null) {
            var d = document.createElement("div");
            d.className = "diff-card";
            d.id = "newstackcard";
            document.getElementById("newstack").appendChild(d);
        }
    else
        elem.style.backgroundColor = "#1f1e33";

    // Completed stacks stack
    var elem = document.getElementById("comstackcard");

    if (completedStacks === 0)
        if (elem == null) {
            var d = document.createElement("div");
            d.className = "diff-card";
            d.id = "comstackcard";
            d.style.backgroundColor = "#1f1e33";
            document.getElementById("completed").appendChild(d);
        }
    else
        elem.style.backgroundColor = "#dad9dd";
}

init();