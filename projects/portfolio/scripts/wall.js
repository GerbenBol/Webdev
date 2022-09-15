var wall;

function createWall() {
    wall = document.getElementById("wall");

    for (var i = 0; i < 10; i++)
        createRow(i);
}

function createRow(index) {
    var row = document.createElement("div");
    row.className = "wallRow";
    wall.appendChild(row);

    if (index % 2 == 0) {
        // Even
        var stone = createStoneStart();
        row.appendChild(stone);

        for (var i = 0; i < 3; i++) {
            stone = createStoneNormal();
            row.appendChild(stone);
        }

        stone = createStoneEndNormal();
        row.appendChild(stone);
    } else {
        // Odd
        for (var i = 0; i < 4; i++) {
            var stone = createStoneNormal();

            if (index == 9)
                stone.style.marginBottom = 0;

            row.appendChild(stone);
        }

        var stone = createStoneEnd();

        if (index == 9)
            stone.style.marginBottom = 0;
            
        row.appendChild(stone);
    }
}

function createStoneStart() {
    var stone = document.createElement("div");
    stone.className = "stone smallStone";
    return stone;
}

function createStoneNormal() {
    var stone = document.createElement("div");
    stone.className = "stone";
    return stone;
}

function createStoneEnd() {
    var stone = document.createElement("div");
    stone.className = "stone smallStone stoneEnd";
    return stone;
}

function createStoneEndNormal() {
    var stone = document.createElement("div");
    stone.className = "stone stoneEnd";
    return stone;
}
