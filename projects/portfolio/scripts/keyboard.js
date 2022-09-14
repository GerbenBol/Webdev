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

    enter.appendChild(createEmptyCol());

    var expectedResult = document.createElement("div");
    expectedResult.className = "col-md-6";
    enter.appendChild(expectedResult);

    var lblResult = document.createElement("p");
    lblResult.id = "expected";
    expectedResult.appendChild(lblResult);

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
}

var directions = "";
let row = 1;
let letterIndex = 0;
let wordIndex = 0;
let keyIndex = 0;
let myWord;

const firstRow = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const lastRow = ["z", "x", "c", "v", "b", "n", "m"];

function remoteControl() {
    var word = document.getElementById("word").value;
    document.getElementById("expected").innerHTML = "Expected result: " + word;

    myWord = word.split("");
    directions = "";
    row = 1;
    letterIndex = 0;
    wordIndex = 0;
    keyIndex = 0;
    
    console.log(myWord);
    myWord.forEach(mover);

    let dir = directions.substring(0, directions.length - 2);
    console.log(dir);
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
        directions += "up, ";
    else if (row == 3)
        directions += "up, up, ";
    
    row = 1;

    // Change index on keyboard
    letterIndex = firstRow.indexOf(myWord[wordIndex]);
    changeIndex();
}

function goToSecondRow() {
    // Change rows
    if (row == 1)
        directions += "down, ";
    else if (row == 3)
        directions += "up, ";
    
    row = 2;

    // Change index on keyboard
    letterIndex = secondRow.indexOf(myWord[wordIndex]);
    changeIndex();
}

function goToLastRow() {
    // Change rows
    if (row == 1)
        directions += "down, down, ";
    else if (row == 2)
        directions += "down, ";
    
    row = 3;

    // Change index on keyboard
    letterIndex = lastRow.indexOf(myWord[wordIndex]);
    changeIndex();
}

function changeIndex() {
    var ready = false;
    
    while (!ready) {
        if (letterIndex < keyIndex) {
            directions += "left, ";
            keyIndex--;
        } else if (letterIndex > keyIndex) {
            directions += "right, ";
            keyIndex++;
        } else {
            directions += "select, ";
            ready = true;
        }
    }
}
