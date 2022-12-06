let math = document.getElementById("math");
let answer = document.getElementById("answer");
init();

function init() {
    let buttons = document.getElementsByClassName("button");

    for (i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", buttonPress.bind(null, buttons[i].innerHTML));
    }
    keyPress();
}

function buttonPress(id) {
    activate(id.substring(3, 4));
}

function keyPress() {
    document.addEventListener("keydown", (event) => {
        if (event.defaultPrevented) {
            return; // Cancel if event is already processed
        }
        
        let id = event.key;

        if (id == "1" || id == "2" || id == "3" || id == "4" ||
            id == "5" || id == "6" || id == "7" || id == "8" || 
            id == "9" || id == "+" || id == "-" || id == "*" || 
            id == "*" || id == "/" || id == "=" || id == "Enter") {
            activate(id);
        }
    })
}

function activate(id) {
    let iHTML = math.innerHTML;
    let lastChar = iHTML.substring(iHTML.length - 1);

    if (id == "=" || id == "Enter") {
        let add = iHTML.includes("+");
        let sub = iHTML.includes("-");
        let multiply = iHTML.includes("*");
        let divide = iHTML.includes("/");

        if (!isOperator(lastChar)) {
            if (add) {
                addition(iHTML);
            } else if (sub) {
                subtraction(iHTML);
            } else if (multiply) {
                multiplication(iHTML);
            } else if (divide) {
                division(iHTML);
            }
        }
    } else {
        if (iHTML == "0") {
            if (id == ".") {
                math.innerHTML += ".";
            } else if (!isOperator(id)) {
                math.innerHTML = id;
            }
        } else {
            if (isInt(id) || !isOperator(lastChar)) {
                math.innerHTML += id;
            }
        }
    }
}

function isInt(c) {
    let bool = true;

    if (c == "+" || c == "-" || c == "*" || c == "/") {
        bool = false;
    }
    return bool;
}

function isOperator(c) {
    let bool = true;

    if (c != "+" && c != "-" && c != "*"  && c != "/") {
        bool = false;
    }
    return bool;
}

function addition(string) {
    let vals = string.split("+");
    answer.innerHTML = Number(vals[0]) + Number(vals[1]);
}

function subtraction(string) {
    let vals = string.split("-");
    answer.innerHTML = Number(vals[0]) - Number(vals[1]);
}

function multiplication(string) {
    let vals = string.split("*");
    answer.innerHTML = Number(vals[0]) * Number(vals[1]);
}

function division(string) {
    let vals = string.split("/");
    answer.innerHTML = Number(vals[0]) / Number(vals[1]);
}
