import { remoteControl } from "./remoteControl.js";

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
    button.onclick = "remoteControl()";
    btn.appendChild(button);

    enter.appendChild(createEmptyCol());
}
