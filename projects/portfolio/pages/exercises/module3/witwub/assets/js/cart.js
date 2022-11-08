let main;
let cart;
let products;
let account;

async function printProducts() {
    main = document.getElementById("contents");

    await fetch("assets/data/products.json")
        .then((r) => r.json())
        .then((d) => allProducts(d));

    cart = localStorage.getItem("cart").split("&");
    account = localStorage.getItem("account").split("&");

    // Header
    let header = document.createElement("h1");
    header.innerHTML = "Your cart";
    header.className = "header";
    main.appendChild(header);

    // Subheader
    let sub = document.createElement("p");
    sub.innerHTML = "The following items are in your cart:";
    sub.className = "sub";
    main.appendChild(sub);

    // Overview of products
    cart.forEach(key => printProd(key));

    // Overview of account
    // Subheader
    let subh = document.createElement("p");
    subh.innerHTML = "These are your account details relevant to the order:";
    subh.className = "sub";
    main.appendChild(subh);

    let acc = document.createElement("div");
    acc.className = "acc";
    main.appendChild(acc);

    // Name
    let iname = document.createElement("p");
    iname.innerHTML = "Name:";
    iname.className = "grid-item";
    acc.appendChild(iname);

    let name = document.createElement("p");
    name.innerHTML = account[0];
    name.className = "grid-item";
    acc.appendChild(name);

    // Street
    let istreet = document.createElement("p");
    istreet.innerHTML = "Street:";
    istreet.className = "grid-item";
    acc.appendChild(istreet);

    let street = document.createElement("p");
    street.innerHTML = account[1] + " " + account[2];
    street.className = "grid-item";
    acc.appendChild(street);
    
    // Postal code
    let ipostal = document.createElement("p");
    ipostal.innerHTML = "Postal code:";
    ipostal.className = "grid-item";
    acc.appendChild(ipostal);

    let postal = document.createElement("p");
    postal.innerHTML = account[3];
    postal.className = "grid-item";
    acc.appendChild(postal);

    // City/village
    let icity = document.createElement("p");
    icity.innerHTML = "City/ Village:";
    icity.className = "grid-item";
    acc.appendChild(icity);

    let city = document.createElement("p");
    city.innerHTML = account[4];
    city.className = "grid-item";
    acc.appendChild(city);

    // Order button
    let button = document.createElement("div");
    button.className = "button";
    button.addEventListener("click", submit);
    acc.appendChild(button);

    let text = document.createElement("p");
    text.innerHTML = "Place order!";
    button.appendChild(text);
}

function allProducts(data) {
    products = data;
}

function printProd(prod) {
    let currentProd;

    products.forEach(key => {
        if (key.id == prod.substring(0, 1)) {
            currentProd = key;
        }
    })

    // Container
    let container = document.createElement("div");
    container.className = "container";
    main.appendChild(container);

    // Img
    let img = document.createElement("img");
    let iname = currentProd.img.split(".");
    img.src = iname[0] + "_1." + iname[1];
    img.width = 200;
    container.appendChild(img);

    // Name + amount
    let info = document.createElement("div");
    info.className = "info";
    container.appendChild(info);

    let name = document.createElement("h3");
    name.innerHTML = currentProd.name;
    name.className = "header";
    info.appendChild(name);

    let amount = document.createElement("p");
    amount.className = "sub";
    amount.innerHTML = prod.substring(prod.length - 1, prod.length);
    info.appendChild(amount);

    // Total price
    let iprice = currentProd.price.split(",");
    iprice[0] *= Number(prod.substring(prod.length - 1, prod.length));
    iprice[1] *= Number(prod.substring(prod.length - 1, prod.length));
    
    if (iprice[1] == 0) {
        iprice[1] = "-";
    }

    let price = document.createElement("p");
    price.innerHTML = "&euro;" + iprice[0] + "," + iprice[1];
    price.className = "price";
    container.appendChild(price);
}

function submit() {
    window.location.href = "thankyou.html";
}
