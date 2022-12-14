let keyboardData = [
    {"value":"Q"}, {"value":"W"}, {"value":"E"}, {"value":"R"}, {"value":"T"},
    {"value":"Y"}, {"value":"U"}, {"value":"I"}, {"value":"O"}, {"value":"P"},

    {"value":"A"}, {"value":"S"}, {"value":"D"}, {"value":"F"}, {"value":"G"},
    {"value":"H"}, {"value":"J"}, {"value":"K"}, {"value":"L"}, {"value":";"},

    {"value":"Z"}, {"value":"X"}, {"value":"C"}, {"value":"V"}, {"value":"B"},
    {"value":"N"}, {"value":"M"}, {"value":","}, {"value":"."}, {"value":"/"}
];
var row1;
var row2;
var row3;
let i = 0;
let firstTime = true;
const activeColor = "#1f1e33";

function placeKeyboard() {
    if (firstTime) {
        row1 = document.getElementById("row1");
        row2 = document.getElementById("row2");
        row3 = document.getElementById("row3");
        firstTime = false;
    }

    document.getElementById("deletable").remove();

    keyboardData.forEach(key => {
        var elem = document.createElement("div");

        if (key.value === "Q") {
            elem = selectKey(elem);
        } else {
            elem.style.backgroundColor = "#fff";
        }

        elem.className = "col-md-1 key"
        elem.innerHTML = key.value;
        elem.id = key.value;
        placeElem(elem);

        i++;
    });
    finishKeyboard();
}

function placeElem(elem) {
    var emptycol = createEmptyCol();
    
    if (i == 0)
        row1.appendChild(emptycol);
    else if (i == 10) {
        row1.appendChild(emptycol);
        row2.appendChild(createEmptyCol());
    } else if (i == 20) {
        row2.appendChild(emptycol);
        row3.appendChild(createEmptyCol());
    } else if (i == 30)
        row3.appendChild(emptycol);

    if (i < 10)
        row1.appendChild(elem);
    else if (i >= 10 && i < 20)
        row2.appendChild(elem);
    else if (i >= 20)
        row3.appendChild(elem);
}

function createEmptyCol() {
    if (i == 0 || i == 10 || i == 20 || i == 30) {
        var col = document.createElement("div");
        col.className = "col-md-1";
    }
    return col;
}

function finishKeyboard() {
    row3.appendChild(createEmptyCol());
    var enter = document.getElementById("enter");
    var result = document.getElementById("resultDiv");

    enter.appendChild(createEmptyCol());
    result.appendChild(createEmptyCol());

    var expectedResult = document.createElement("div");
    expectedResult.className = "col-md-6";
    enter.appendChild(expectedResult);

    var lblResult = document.createElement("p");
    lblResult.id = "expected";
    expectedResult.appendChild(lblResult);

    var resultDiv = document.createElement("div");
    resultDiv.className = "col-md-5";
    result.appendChild(resultDiv);

    var inputDiv = document.createElement("div");
    inputDiv.className = "col-md-5";
    result.appendChild(inputDiv);

    var lblResult = document.createElement("p");
    lblResult.id = "result";
    resultDiv.appendChild(lblResult);

    var lblInput = document.createElement("p");
    lblInput.id = "input";
    inputDiv.appendChild(lblInput);

    var uInput = document.createElement("div");
    uInput.className = "col-md-2";
    enter.appendChild(uInput);

    var text = document.createElement("input");
    text.type = "text";
    text.id = "word";
    uInput.appendChild(text);

    var btn = document.createElement("div");
    btn.className = "col-md-2";
    enter.appendChild(btn);

    var button = document.createElement("button");
    button.id = "btn";
    button.innerHTML = "Type word!";
    button.onclick = function() { remoteControl() }
    btn.appendChild(button);

    enter.appendChild(createEmptyCol());
    result.appendChild(createEmptyCol());
}

var directions;
let row;
let letterIndex;
let wordIndex;
let keyIndex;
let myWord;
let wait;

const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
];

async function remoteControl() {
    document.getElementById("btn").disabled = true;

    var word = document.getElementById("word").value;
    document.getElementById("expected").innerHTML = "Expected result: " + word;

    var res = document.getElementById("result");
    res.innerHTML = "Result: ";
    var inp = document.getElementById("input");

    myWord = word.split("");
    directions = "";
    row = 1;
    letterIndex = 0;
    wordIndex = 0;
    keyIndex = 0;
    wait = false;
    
    myWord.forEach(mover);

    let dir = directions.substring(0, directions.length - 1);

    row = 1;
    keyIndex = 0;
    var i = 0;

    while (i < 1) {
        var firstkey = document.getElementById(rows[row - 1][keyIndex].toUpperCase());
        firstkey.style.backgroundColor = "#fff";
        firstkey.style.color = "initial";

        dir = nextInput(dir, res, inp);

        if (wait) {
            await new Promise(r => setTimeout(r, 50));
            selectKey(document.getElementById(rows[row - 1][keyIndex].toUpperCase()));
            wait = false;
        }

        var elem = document.getElementById(rows[row - 1][keyIndex].toUpperCase());
        elem = selectKey(elem);
        
        if (dir == "")
            i++;
        
        await new Promise(r => setTimeout(r, 1500));
    }

    inp.innerHTML = "Next input: NONE";
    var elem = document.getElementById(rows[row - 1][keyIndex].toUpperCase());
    elem.style.backgroundColor = "#fff";
    elem.style.color = "initial";
    selectKey();

    document.getElementById("btn").disabled = false;
}

function mover() {
    if (rows[0].includes(myWord[wordIndex]))
        goToFirstRow();
    else if (rows[1].includes(myWord[wordIndex]))
        goToSecondRow();
    else if (rows[2].includes(myWord[wordIndex]))
        goToLastRow();
    else
        console.log("wtf how did we get here");

    wordIndex++;
}

function goToFirstRow() {
    // Change rows
    if (row == 2)
        directions += "u,";
    else if (row == 3)
        directions += "u,u,";
    
    row = 1;

    // Change index on keyboard
    letterIndex = rows[0].indexOf(myWord[wordIndex]);
    changeIndex();
}

function goToSecondRow() {
    // Change rows
    if (row == 1)
        directions += "d,";
    else if (row == 3)
        directions += "u,";
    
    row = 2;

    // Change index on keyboard
    letterIndex = rows[1].indexOf(myWord[wordIndex]);
    changeIndex();
}

function goToLastRow() {
    // Change rows
    if (row == 1)
        directions += "d,d,";
    else if (row == 2)
        directions += "d,";
    
    row = 3;

    // Change index on keyboard
    letterIndex = rows[2].indexOf(myWord[wordIndex]);
    changeIndex();
}

function changeIndex() {
    var ready = false;
    
    while (!ready) {
        if (letterIndex < keyIndex) {
            directions += "l,";
            keyIndex--;
        } else if (letterIndex > keyIndex) {
            directions += "r,";
            keyIndex++;
        } else {
            directions += "s,";
            ready = true;
        }
    }
}

function nextInput(dir, res, inp) {
    if (dir.substring(0, 1) == "u") {
        inputUp(inp);
    } else if (dir.substring(0, 1) == "d") {
        inputDown(inp);
    } else if (dir.substring(0, 1) == "l") {
        inputLeft(inp);
    } else if (dir.substring(0, 1) == "r") {
        inputRight(inp);
    } else if (dir.substring(0, 1) == "s") {
        select(res, inp);
    } else {
        console.log("no hit");
    }
    return deleteInput(dir);
}

function inputUp(inp) {
    inp.innerHTML = "Next input: UP";
    row--;
}

function inputDown(inp) {
    inp.innerHTML = "Next input: DOWN";
    row++;
}

function inputLeft(inp) {
    inp.innerHTML = "Next input: LEFT";
    keyIndex--;
}

function inputRight(inp) {
    inp.innerHTML = "Next input: RIGHT";
    keyIndex++;
}

async function select(res, inp) {
    inp.innerHTML = "Next input: SELECT";

    var elem = document.getElementById(rows[row - 1][keyIndex].toUpperCase());
    elem.style.backgroundColor = "#E0E1CC";
    elem.style.color = "initial";
    
    res.innerHTML += rows[row - 1][keyIndex];
    wait = true;
}

function deleteInput(dir) {
    return dir.substring(2);
}

function selectKey(elem = null) {
    if (elem == null)
        elem = document.getElementById("Q");

    elem.style.backgroundColor = activeColor;
    elem.style.color = "white";
    return elem;
}
