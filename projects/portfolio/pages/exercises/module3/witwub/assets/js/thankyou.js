let account;
let userProducts;
let allProducts;
let start;
let table;
let end;
let total1 = 0;
let total2 = 0;

async function fillInDetails() {
    account = localStorage.getItem("account").split("&");
    userProducts = localStorage.getItem("cart").split("&");
    start = document.getElementById("start");
    table = document.getElementById("table");
    end = document.getElementById("end");

    await fetch("assets/data/products.json")
        .then((r) => r.json())
        .then((d) => getProducts(d));

    fillInStart();
    fillInTable();
    fillInEnd();

    // Delete local storage
    localStorage.removeItem("cart");
}

function getProducts(data) {
    allProducts = data;
}

function fillInStart() {
    // Start
    // Create string
    let string = "Dear " + account[0] + ",<br>" +
        "Thank you for your order at WitWub.<br>" +
        "This is what you ordered:";

    // Create HTML element
    let p = document.createElement("p");
    p.innerHTML = string;
    start.appendChild(p);
}

function fillInTable() {
    // Table
    // Create table headers
    let ordernumber = document.createElement("div");
    ordernumber.innerHTML = "#" + Math.floor(Math.random() * 1000);
    ordernumber.id = "ordernumber";
    table.appendChild(ordernumber);

    let date = document.createElement("div");
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth()).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    date.innerHTML = today;
    table.appendChild(date);

    // Fill in every product the user ordered
    userProducts.forEach(key => printProduct(key));

    // Create table footer
    let footer = document.createElement("div");

    if (total2 == 0) {
        total2 = "-";
    }

    footer.innerHTML = "&euro;" + total1 + "," + total2;
    footer.id = "table-footer";
    table.appendChild(footer);
}

function fillInEnd() {
    // End
    // Create string
    let string = "We will deliver your product(s) at the following address:<br>" +
        account[1] + " " + account[2] + "<br>" +
        account[3] + " " + account[4];

    // Create HTML element
    let p = document.createElement("p");
    p.innerHTML = string;
    end.appendChild(p);
}

function printProduct(key) {
    let currentProduct;
    allProducts.forEach(prods => {
        if (prods.id == key.substring(0, 1)) {
            currentProduct = prods;
        }
    });
    
    // Product name
    let prodName = document.createElement("div");
    prodName.className = "prod-name";
    prodName.innerHTML = currentProduct.name;
    table.appendChild(prodName);

    // Product price
    let prodPrice = document.createElement("div");
    prodPrice.className = "prod-price";
    prodPrice.innerHTML = "&euro;" + currentProduct.price;
    table.appendChild(prodPrice);

    // Amount
    let amount = document.createElement("div");
    amount.className = "amount";
    amount.innerHTML = key.substring(key.length - 1, key.length);
    table.appendChild(amount);

    // Total price
    let totPrice = document.createElement("div");
    let price = currentProduct.price.split(",");
    price[0] *= Number(key.substring(key.length - 1, key.length));
    price[1] *= Number(key.substring(key.length - 1, key.length));

    total1 += price[0];
    total2 += price[1];

    if (price[1] == 0) {
        price[1] = "-";
    }

    totPrice.className = "tot-price";
    totPrice.innerHTML = "&euro;" + price[0] + "," + price[1];
    table.appendChild(totPrice);
}
