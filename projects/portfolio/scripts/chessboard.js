var board;

function printChessboard() {
    board = document.getElementById("board");

    for (var y = 1; y < 9; y++) {
        for (var x = 1; x < 9; x++) {
            if (y % 2 != 0) {
                if (x % 2 != 0)
                    createWhiteBox(); // Odd odd (1, 1)
                else
                    createGreyBox(); // Odd even (1, 2)
            } else {
                if (x % 2 != 0)
                    createGreyBox(); // Even odd (2, 1)
                else
                    createWhiteBox(); // Even even (2, 2)
            }
        }
    }
}

function createWhiteBox() {
    var block = document.createElement("div");
    block.className = "white";
    board.appendChild(block);
}

function createGreyBox() {
    var block = document.createElement("div");
    block.className = "grey";
    board.appendChild(block);
}
