let product;
let specNames;
let specs;
let currentDisplayImg = 2;

// Get the products
function getProduct() {
    fetch("assets/data/products.json")
        .then((r) => r.json())
        .then((d) => setProduct(d));
}

// Set the current product we are looking at
async function setProduct(data) {
    let parameters = window.location.href.split("=");
    let searchId = parameters[1];

    data.forEach(key => {
        if (key.id == searchId) {
            product = key;
        }
    });

    // Set document title
    document.title += " " + product.name;

    // Print page
    printProduct();

    await fetch("assets/data/specs.json")
        .then((r) => r.json())
        .then((d) => setSpecs(d));

    printSpecs();
}

function setSpecs(data) {
    data.forEach(key => {
        if (key.forid == -1) {
            specNames = key.values;
        } else if (key.forid == product.id) {
            specs = key.values;
        }
    });
}

// Print the product (images, specs, price and add to cart button)
function printProduct() {
    let main = document.getElementById("content");

    // Top, contains images, price and add to cart button
    let top = document.createElement("div");
    top.id = "top";
    main.appendChild(top);

    // Images
    let images = document.createElement("div");
    images.id = "images";
    top.appendChild(images);

    placeImages(images);

    // Right-side
    let right = document.createElement("div");
    right.id = "right-side";
    top.appendChild(right);

    placeRightSide(right);
}

function printSpecs() {
    let main = document.getElementById("content");
    
    // Rest, contains specs
    let rest = document.createElement("div");
    rest.id = "rest";
    main.appendChild(rest);

    // Loop through specs
    for (let i = 0; i < specNames.length; i++) {
        placeSpec(rest, i);
    }
}

function placeImages(main) {
    let bigimg = document.createElement("img");
    let iname = product.img.split(".");
    bigimg.id = "bigimg";
    bigimg.src = iname[0] + "_2." + iname[1];
    main.appendChild(bigimg);

    let container = document.createElement("div");
    container.id = "imgcontainer";
    main.appendChild(container);

    for (let i = 2; i < 5; i++) {
        placeSmallImage(container, i);
    }
}

function placeSmallImage(container, id) {
    let img = document.createElement("img");
    
    if (id == currentDisplayImg) {
        img.className = "active smallimg";
    } else {
        img.className = "smallimg";
        img.addEventListener("click", changeBigImg.bind(null, id));
    }

    img.id = "img" + id;
    let iname = product.img.split(".");
    img.src = iname[0] + "_" + id + "." + iname[1];
    container.appendChild(img);
}

function changeBigImg(newid) {
    let oldimg = document.getElementById("img" + currentDisplayImg);
    oldimg.className = "smallimg";
    oldimg.addEventListener("click", changeBigImg.bind(null, currentDisplayImg));
    document.getElementById("img" + newid).className = "active smallimg";
    let iname = product.img.split(".");
    document.getElementById("bigimg").src = iname[0] + "_" + newid + "." + iname[1];
    currentDisplayImg = newid;
}

function placeRightSide(side) {
    // Product name
    let header = document.createElement("h1");
    header.innerHTML = product.name;
    side.appendChild(header);

    let hr = document.createElement("hr");
    side.appendChild(hr);

    // Price
    let price = document.createElement("p");
    price.className = "txt";
    price.innerHTML = "&euro;" + product.price;
    side.appendChild(price);

    // Amount
    let txt = document.createElement("p");
    txt.className = "txt";
    txt.innerHTML = "Amount of products: ";
    side.appendChild(txt);

    let amount = document.createElement("input");
    amount.type = "number";
    amount.id = "inp";
    amount.value = 1;
    amount.max = 100; amount.min = 1;
    txt.appendChild(amount);

    // Add to cart button
    let buttonadd = document.createElement("div");
    buttonadd.className = "button";
    buttonadd.id = "buttonAdd";
    buttonadd.addEventListener("click", addToCart);
    side.appendChild(buttonadd);

    let gocart = document.createElement("p");
    gocart.className = "txt";
    gocart.innerHTML = "Add to cart! &rsaquo;";
    gocart.id = "addtocart";
    buttonadd.appendChild(gocart);

    // Or
    let hr1 = document.createElement("hr");
    hr1.className = "orhr";
    side.appendChild(hr1);

    let flex = document.createElement("div");
    flex.id = "flex";
    side.appendChild(flex);

    let or = document.createElement("p");
    or.className = "txt";
    or.id = "or";
    or.innerHTML = "OR";
    flex.appendChild(or);

    let hr2 = document.createElement("hr");
    hr2.className = "orhr";
    side.appendChild(hr2);

    // Get at a store button
    let buttonget = document.createElement("div");
    buttonget.className = "button";
    buttonget.id = "buttonGet";
    buttonget.addEventListener("click", getAtStore);
    side.appendChild(buttonget);

    let getstore = document.createElement("p");
    getstore.className = "txt";
    getstore.innerHTML = "Get at a store! &rsaquo;";
    getstore.id = "getatstore";
    buttonget.appendChild(getstore);
}

function addToCart() {
    // Check if there's already cart data
    let cart = localStorage.getItem("cart");
    let changed = false;
    
    if (cart != null) {
        // Check if this item is already in the cart
        let parsedCart = cart.split("&");
        cart = "";

        parsedCart.forEach(key => {
            if (key.substring(0, 1) == product.id) {
                let newAmount = Number(key.substring(2, 3)) + Number(document.getElementById("inp").value);
                let newKey = product.id + "," + newAmount;
                cart += newKey + "&";
                changed = true;
            } else {
                cart += key + "&";
            }
        });

        cart = cart.substring(0, cart.length - 1);

        // Update data
        if (!changed) {
            localStorage.setItem("cart", cart + "&" + product.id + "," + document.getElementById("inp").value);
        } else {
            localStorage.setItem("cart", cart);
        }
    } else {
        // Create new data
        localStorage.setItem("cart", product.id + "," + document.getElementById("inp").value);
    }
}

function getAtStore() {
    window.location.href = "error.html";
}

function placeSpec(parent, id) {
    // Make flexbox
    let flex = document.createElement("div");
    flex.className = "spec spec-";

    if (id % 2 == 0) {
        // Even
        flex.className += "even";
    } else {
        // Odd
        flex.className += "odd";
    }
    parent.appendChild(flex);

    // Put spec name (specNames[id]) and spec value (specs[id]) in flexbox
    let name = document.createElement("p");
    name.className = "spec-name";
    name.innerHTML = specNames[id];
    flex.appendChild(name);

    let value = document.createElement("p");
    value.className = "spec-value";
    value.innerHTML = specs[id];
    flex.appendChild(value);
}
