let elems = [
    "naam", "email",
    "tel", "adres",
    "msg"
];

function sendData() {
    let storage = getData(elems[0]) + addToString(elems[1]) +
        addToString(elems[2]) + addToString(elems[3]) +
        addToString(elems[4]);

    localStorage.setItem("form_data", storage);
    document.getElementById("sentp").style.display = "initial";

    for (let i = 0; i < elems.length; i++) {
        document.getElementById(elems[i]).value = "";
    }
}

function addToString(elem) {
    return "," + getData(elem);
}

function getData(elem) {
    return document.getElementById(elem).value;
}
