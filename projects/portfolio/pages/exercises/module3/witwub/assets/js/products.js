let specs = [];
let products = [];

async function getSpecs() {
    await fetch("assets/data/specifics.json")
        .then((r) => r.json())
        .then((d) => showSpecs(d));
}

function showSpecs(data) {
    specs = data;

    let main = document.getElementById("specs");

    for (let i = 0; i < specs.length; i++) {
        newSpec(main, i);
    }
}

function newSpec(main, index) {
    let spec = document.createElement("div");
    spec.className = "spec";
    main.appendChild(spec);

    let type = document.createElement("h4");
    type.innerHTML = specs[index].type;
    type.className = "type";
    spec.appendChild(type);

    for (let i = 0; i < specs[index].contains.length; i++) {
        specButton(spec, index, i);
    }
}

function specButton(parent, type, index) {
    let button = document.createElement("input");
    button.type = "checkbox";
    button.name = specs[type].type;

    let label = document.createElement("label");
    label.htmlFor = specs[type].type;

    let txt = " " + specs[type].contains[index];
    button.addEventListener("change", onChangeSpec.bind(null, button, txt.substring(1, txt.length)));

    if (specs[type].type == "Memory")
        txt += " GB";

    label.innerHTML = txt;

    parent.appendChild(button);
    parent.appendChild(label);
    parent.appendChild(document.createElement("br"));


    //localStorage.removeItem("Brand");
}

function onChangeSpec(elem, text) {
    if (elem.checked) {
        let stor = localStorage.getItem(elem.name);

        if (stor != null) {
            stor += "," + text;
        } else {
            stor = text;
        }

        localStorage.setItem(elem.name, stor);
    } else {
        let stor = localStorage.getItem(elem.name).split(",");
        let newstor = "";
        
        for (let i = 0; i < stor.length; i++) {
            if (stor[i] == text) {
                stor.splice(i, 0);
            } else {
                if (newstor == "") {
                    newstor += stor[i];
                } else {
                    newstor += "," + stor[i];
                }
            }
        }

        if (newstor != "") {
            localStorage.setItem(elem.name, newstor);
        } else {
            localStorage.removeItem(elem.name);
        }
    }

    reprintProducts();
}

async function getProducts() {
    await fetch("assets/data/products.json")
        .then((r) => r.json())
        .then((d) => showProducts(d));
}

function showProducts(data) {
    products = data;

    let main = document.getElementById("products");

    for (let i = 0; i < products.length; i++) {
        newProduct(main, i);
    }
}

function reprintProducts() {
    let main = document.getElementById("products");

    while (main.childElementCount > 0) {
        main.removeChild(main.children[0]);
    }

    let product;

    for (let i = 0; i < products.length; i++) {
        product = products[i];
        let allowed = true;

        for (let x = 0; x < specs.length; x++) {
            let ret = checkSpec(specs[x].type, product);

            if (ret == false) {
                allowed = false;
            }
        }

        if (allowed) {
            newProduct(main, i);
        }
    }
}

function checkSpec(specname, prod) {
    let stor = localStorage.getItem(specname);
    let prodIsAllowed = true;

    if (stor != null) {
        let values = stor.split(",");

        for (let i = 0; i < values.length; i++) {
            switch (specname) {
                case "Brand":
                    if (values[i] != prod.brand) {
                        prodIsAllowed = false;
                    }
                    break;
                case "Price":
                    if (values[i] != prod.price) {
                        prodIsAllowed = false;
                    }
                    break;
                case "Memory Type":
                    if (values[i] != prod.memtype) {
                        prodIsAllowed = false;
                    }
                    break;
                case "Memory":
                    if (values[i] != prod.memory) {
                        prodIsAllowed = false;
                    }
                    break;
                case "Length":
                    if (values[i] != prod.len) {
                        prodIsAllowed = false;
                    }
                    break;
                case "Max Resolution":
                    if (values[i] != prod.res) {
                        prodIsAllowed = false;
                    }
                    break;
            }
        }
    }
    return prodIsAllowed;
}

function newProduct(main, index) {
    let product = products[index];

    let prod = document.createElement("div");
    prod.className = "product";
    main.appendChild(prod);

    let img = document.createElement("img");
    let iname = product.img.split(".");
    img.src = iname[0] + "_1." + iname[1];
    prod.appendChild(img);

    let inside = document.createElement("div");
    inside.className = "inside";
    prod.appendChild(inside);

    let name = document.createElement("h4");
    name.innerHTML = product.name;
    name.className = "name";
    inside.appendChild(name);
    
    let p = document.createElement("p");
    p.innerHTML = product.memtype + ", " + product.memory + " GB, " + product.len + "mm, " + product.res;
    inside.appendChild(p);

    let bottom = document.createElement("div");
    bottom.className = "bottom";
    prod.appendChild(bottom);

    let price = document.createElement("p");
    price.innerHTML = "???" + product.price;
    bottom.appendChild(price);

    let button = document.createElement("div");
    let link = "product.html?id=" + product.id;
    button.className = "button";
    button.innerHTML = "<a href='" + link + "'>Go &raquo;</a>"
    bottom.appendChild(button);
}
