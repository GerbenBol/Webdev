let board = [];
let completedStacks = 0;
let newStacks = 5;

function initBoard() {
    const totalRows = 10;

    for (let i = 0; i < totalRows; i++) {
        if (i < 5) {
            // Should get 5 cards at start
            addRow(i, 4);
        } else {
            // Should get 4 cards at start
            addRow(i, 3);
        }
    }
    
    for (let i = 0; i < 11; i++) {
        printCard(); 
    }
    let card = document.createElement("div");
    card.className = "diff-card";

    document.getElementById("completed").appendChild(card);
    let card2 = document.createElement("div");
    card2.className = "diff-card";

    document.getElementById("newstack").appendChild(card2);

    console.log(board);
}

function addRow(index, max) {
    let row = [];
    let x = 0;

    while (x < max) {
        row = addStackToRow(x, row, false);
        x++;
    }
    row = addStackToRow(x, row, true);
    board[index] = row;
}

function addStackToRow(index, row, _grabable) {
    let stack = {
        cards: [],
        grabable: _grabable,
        visible: _grabable
    };

    stack = addCardToStack(0, stack);
    row[index] = stack;
    return stack;
}

function addCardToStack(index, stack) {
    let card = getRandomCard();

    stack.cards[index] = card;
    return stack;
}

function getRandomCard() {
    return "A";
}

function printCard() {
    let card = document.createElement("div");
    card.className = "card-active";

    document.getElementById("playingboard").appendChild(card);
}

function update() {
    console.log(newStacks);

    if (newStacks != 0) {
        document.getElementById("newstack").style.backgroundColor = "#dad9dd";
    }
}
