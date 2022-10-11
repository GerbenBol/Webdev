var board = {
    "rows":[
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        },
        {
            "stacks":[
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":false, "visible":false },
                { "cards":[], "grabable":true, "visible":true }
            ]
        }
    ]
};
let cards = ["K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2", "A"];
let cardsAmounts = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
let completedStacks = 0;
let newStacks = 5;
let selected = null;

// ---- Main functions ----

async function init() {
    //alert("Preparing board...");

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
        let r = sender.substr(1, 1);
        let s = sender.substr(2, 1);

        // Is this stack grabable?
        if (board.rows[r].stacks[s].grabable) {
            // Is a stack selected?
            if (selected != null) {
                let thisCards = board.rows[r].stacks[s].cards;
                let thisLow = thisCards[thisCards.length];
                let otherHigh = selected.children[0];
                let otherLow = selected.children[selected.children - 1];

                // Is this stack's lowest 1 higher than other stack's highest?
                if (thisLow == otherHigh) {
                    // Place other stack on this stack
                } else if (thisLow > otherLow) { // Is this stack's lowest higher than other stack's lowest?
                    // Check where it goes under, then place part of other stack on this stack
                } else {
                    // Alert the player and select this stack
                    console.log("couldn't combine stacks!");
                    selected.className = "stack";
                    selected = document.getElementById("r" + r + "s" + s);
                    selected.className = "stack selected";
                }
            } else {
                // Select stack
                let stack = document.getElementById("r" + r + "s" + s);
                selected = stack;
                stack.className = "stack selected";
            }
        } else {
            // Alert the player and deselect stack
            console.log("that stack isn't grabable!");
            
            if (selected != null) {
                selected.className = "stack";
                selected = null;
            }
        }
    }

    // Update stacks (new stacks + completed stacks)
    restStacks();
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

    let completed = false;
    let i = 0;

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
    let okay = false;
    let rand = "";

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
        stackDiv.className = "stack";
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
}

function openStack() {
    console.log("opening new stack...");
}

// ---- Init ----
init();
