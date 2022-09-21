const headerValues = [
    "_gerben",
    "_bol",
    "gerben_bol",
    "$gerben_bol",
    "gerbenBol",
    "GerbenBol",
    "Gerben Bol"
];

async function headerFunk() {
    var header = document.getElementById("header");

    for (var i = 0; i < headerValues.length; i++) {
        header.innerHTML = headerValues[i];
        await new Promise(r => setTimeout(r, 150));
    }
}
