var board = {
    "rows":[
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        },
        {
            "empty": false,
            "stacks":[
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":false, "visible":false, "selected":false },
                { "cards":[], "grabable":true, "visible":true, "selected":false }
            ]
        }
    ]
};
let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let cardsAmounts = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
let completedStacks = 0;
let newStacks = 5;
let selected = null;

// ---- Main functions ----

async function init() {
    // Create rows for the cards/stacks to be in
    for (let i = 0; i < 10; i++)
        printRow(i);

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
        await new Promise(r => setTimeout(r, 50));
    }

    printStacks();
    restStacks();
    console.log(board);
}

function update(sender) {
    // Did new stack send this?
    if (sender == "new") {
        // Is a stack selected?
        if (selected != null) {
            // Deselect stack
            selected.className = "stack";
            selected = null;
        }

        // Open new stack
        openStack();
    } else {
        let r = sender.substr(1, 1), s = sender.substr(3, 1);

        // Is this stack grabable?
        if (board.rows[r].stacks[s].grabable) {
            // Is a stack selected?
            if (selected != null) {
                let thisCards = board.rows[r].stacks[s].cards;
                let tLow = thisCards[thisCards.length - 1];
                let oHigh = selected.children[0].children[0];
                let oLow = selected.children[selected.children.length - 1].children[0];

                let thisLow = cards.indexOf(tLow);
                let otherHigh = cards.indexOf(oHigh.innerHTML);
                let otherLow = cards.indexOf(oLow.innerHTML);

                console.log(thisLow + ", " + otherHigh + ", " + otherLow);

                // Is this stack's lowest 1 higher than other stack's highest?
                if (thisLow - 1 == otherHigh) {
                    // Place other stack on this stack
                    combineStacks(r, s, 0);
                } else if (thisLow > otherLow) { // Is this stack's lowest higher than other stack's lowest?
                    // Check where it goes under, then place part of other stack on this stack
                    console.log(thisLow + " > " + otherLow);
                } else {
                    // Alert the player and select this stack
                    console.log("couldn't combine stacks!");
                    let row = selected.id.substr(1, 1), stack = selected.id.substr(3, 1);
                    board.rows[row].stacks[stack].selected = false;
                    let selstack = board.rows[r].stacks[s];
                    selstack.selected = true;
                    selected = selstack;
                }
            } else {
                // Select stack
                let stack = document.getElementById("r" + r + "s" + s);
                selected = stack;
                board.rows[r].stacks[s].selected = true;
            }
        } else {
            // Alert the player and deselect stack
            console.log("that stack isn't grabable!");
            
            if (selected != null) {
                let r = selected.id.substr(1, 1), s = selected.id.substr(3, 1);
                board.rows[r].stacks[s].selected = false;
                selected = null;
            }
        }
    }

    // Update stacks (new stacks + completed stacks)
    restStacks();
    printStacks();
}

// ---- Init functions ----

function printRow(id) {
    let row = document.createElement("div");
    row.id = "row" + id;
    row.className = "playrow";

    document.getElementById("playingboard").appendChild(row);
}

function addCardToStack(row, stack) {
    let card = getRandomCard();

    let completed = false, i = 0;

    while (!completed) {
        if (board.rows[row].stacks[stack] != undefined && card != undefined) {
            board.rows[row].stacks[stack].cards[0] = card;
            completed = true;
        }

        if (i === 10) {
            completed = true;
        } else {
            i++;
        }
    }
}

function getRandomCard() {
    let okay = false, rand = "";

    while (!okay) {
        rand = Math.floor(Math.random() * 13);

        if (cardsAmounts[rand] != 0) {
            okay = true;
            cardsAmounts[rand]--;
        } else {
            okay = false;
        }
    }
    return cards[rand];
} // algorithm needs optimalization for playability/difficulty

// ---- Helper functions ----

function printStacks() {
    // Clean rows
    cleanRows();

    // Print stacks
    for (let row = 0; row < board.rows.length; row++) {
        for (let stack = 0; stack < board.rows[row].stacks.length; stack++) {
            printStack(row, stack);
        }
    }
}

function cleanRows() {
    for (let r = 0; r < 10; r++) {
        let row = document.getElementById("row" + r);
        let count = row.childElementCount;

        for (let s = 0; s < count; s++) {
            row.removeChild(document.getElementById("r" + r + "s" + s));
        }
    }
}

function printStack(row, stack) {
    let stackDiv = document.createElement("div");

    if (stack + 1 >= board.rows[row].stacks.length) {
        if (board.rows[row].stacks[stack].selected) {
            stackDiv.className = "stack selected";
        } else {
            stackDiv.className = "stack";
        }
    } else {
        stackDiv.className = "stack-small";
    }

    stackDiv.addEventListener("click", update.bind(null, "r" + row + "s" + stack));
    stackDiv.id = "r" + row + "s" + stack;
    document.getElementById("row" + row).appendChild(stackDiv);
    
    let currentStack = board.rows[row].stacks[stack];
    
    for (let i = 0; i < currentStack.cards.length; i++) {
        printCard(row, stack, i);
    }
}

function printCard(row, stack, index) {
    let card = document.createElement("div");
    let txt = document.createElement("p");
    
    if (board.rows[row].stacks[stack].visible) {
        card.className = "card card-active";
        txt.innerHTML = board.rows[row].stacks[stack].cards[index];
    } else {
        card.className = "card card-invis";
    }

    card.appendChild(txt);
    document.getElementById("r" + row + "s" + stack).appendChild(card);
}

function restStacks() {
    // New stacks stack
    var elem = document.getElementById("newstackcard");

    if (newStacks != 0) {
        if (elem == null) {
            var d = document.createElement("div");
            d.className = "diff-card";
            d.id = "newstackcard";
            d.addEventListener("click", update.bind(null, "new"));
            document.getElementById("newstack").appendChild(d);
        }
    } else
        elem.style.backgroundColor = "#1f1e33";

    // Completed stacks stack
    var elem = document.getElementById("compstackcard");

    if (completedStacks === 0) {
        if (elem == null) {
            var d = document.createElement("div");
            d.className = "diff-card";
            d.id = "compstackcard";
            d.style.backgroundColor = "#1f1e33";
            document.getElementById("completed").appendChild(d);
        }
    } else
        elem.style.backgroundColor = "#dad9dd";
    
    // Deselect button
    var elem = document.getElementById("deselectbtn");

    if (elem == null) {
        var d = document.createElement("div");
        d.className = "diff-card";
        d.id = "deselectbtn";
        d.addEventListener("click", deselect);
        document.getElementById("deselect").appendChild(d);
    }
}

function openStack() {
    console.log("opening new stack...");
}

function combineStacks(r, s, index) {
    if (s == 0) {
        document.getElementById("row" + r).className = "playrow";
    }

    let row = selected.id.substr(1, 1), stack = selected.id.substr(3, 1);
    let topStack = board.rows[r].stacks[s];
    let bottomStack = board.rows[row].stacks[stack];

    while (bottomStack.cards.length > 0) {
        topStack.cards[topStack.cards.length] = bottomStack.cards[0];
        bottomStack.cards.shift();
        console.log(bottomStack.cards.length);
    }
    board.rows[row].stacks.pop();

    if (s != 0) {
        let next = board.rows[row].stacks[stack - 1];
        next.visible = true;
        next.grabable = true;
    } else {
        document.getElementById("row" + r).className += " empty";
    }

    selected = null;
}

function deselect() {
    if (selected != null) {
        let r = selected.id.substr(1, 1), s = selected.id.substr(3, 1);
        board.rows[r].stacks[s].selected = false;
        selected = null;
    }
}

// ---- Init ----
init();
