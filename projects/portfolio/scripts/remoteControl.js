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
        elem.className = "col-md-1 key";
        elem.innerHTML = key.value;
        elem.style.backgroundColor = "#" + getRandomColor();
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

function getRandomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
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

const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const lastRow = ["z", "x", "c", "v", "b", "n", "m"];

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
    
    myWord.forEach(mover);

    let dir = directions.substring(0, directions.length - 1);
    console.log(dir);

    row = 1;
    keyIndex = 0;
    var i = 0;

    while (i < 1) {
        dir = nextInput(dir, res, inp);
        
        if (dir == "")
            i++;
        
        await new Promise(r => setTimeout(r, 1500));
    }
    inp.innerHTML = "Next input: NONE";
    document.getElementById("btn").disabled = false;
}

function mover() {
    if (firstRow.includes(myWord[wordIndex]))
        goToFirstRow();
    else if (secondRow.includes(myWord[wordIndex]))
        goToSecondRow();
    else if (lastRow.includes(myWord[wordIndex]))
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
    letterIndex = firstRow.indexOf(myWord[wordIndex]);
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
    letterIndex = secondRow.indexOf(myWord[wordIndex]);
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
    letterIndex = lastRow.indexOf(myWord[wordIndex]);
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

function select(res, inp) {
    inp.innerHTML = "Next input: SELECT";
    console.log(row);

    if (row == 1)
        res.innerHTML += firstRow[keyIndex];
    else if (row == 2)
        res.innerHTML += secondRow[keyIndex];
    else if (row == 3)
        res.innerHTML += lastRow[keyIndex];
}

function deleteInput(dir) {
    return dir.substring(2);
}
