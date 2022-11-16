function printPage() {
    let account = localStorage.getItem("account");

    if (account == null) {
        notLoggedIn();
    } else {
        loggedIn();
    }
}

function notLoggedIn() {
    let main = document.getElementById("contents");

    // Let the user know they aren't logged in
    let header = document.createElement("h1");
    header.innerHTML = "You aren't logged in";
    main.appendChild(header);

    let subheader = document.createElement("p");
    subheader.innerHTML = "Please create an account";
    subheader.id = "subheader";
    main.appendChild(subheader);

    // Create "form"
    let form = document.createElement("div");
    form.className = "form";
    form.id = "form";
    main.appendChild(form);

    // New account
    // Name
    let iname = document.createElement("p");
    iname.className = "inputheader";
    iname.innerHTML = "Name";
    form.appendChild(iname);

    let name = document.createElement("div");
    name.className = "flex";
    form.appendChild(name);

    // First name
    let fname = document.createElement("input");
    fname.type = "text";
    fname.placeholder = "First Name*";
    fname.name = "fname";
    fname.id = "fname";
    name.appendChild(fname);

    // Between
    let bet = document.createElement("input");
    bet.type = "text";
    bet.name = "bet";
    bet.id = "bet";
    name.appendChild(bet);

    // Last name
    let lname = document.createElement("input");
    lname.type = "text";
    lname.placeholder = "Last Name*";
    lname.name = "lname";
    lname.id = "lname";
    name.appendChild(lname);

    // Living place
    let iplace = document.createElement("p");
    iplace.className = "inputheader";
    iplace.innerHTML = "Place of residence";
    form.appendChild(iplace);

    let place = document.createElement("div");
    place.className = "flex";
    form.appendChild(place);

    // Street
    let street = document.createElement("input");
    street.type = "text";
    street.placeholder = "Street*";
    street.name = "street";
    street.id = "street";
    place.appendChild(street);

    // Housenumber
    let number = document.createElement("input");
    number.type = "text";
    number.placeholder = "House number*";
    number.name = "number";
    number.id = "number";
    place.appendChild(number);

    let place2 = document.createElement("div");
    place2.className = "flex";
    form.appendChild(place2);

    // Postal code
    let postal = document.createElement("input");
    postal.type = "text";
    postal.placeholder = "Postal Code*";
    postal.name = "postal";
    postal.id = "postal";
    place2.appendChild(postal);

    // City
    let city = document.createElement("input");
    city.type = "text";
    city.placeholder = "City*";
    city.name = "city";
    city.id = "city";
    place2.appendChild(city);

    // Phone
    let iphone = document.createElement("p");
    iphone.className = "inputheader";
    iphone.innerHTML = "Phone number";
    form.appendChild(iphone);

    let phone = document.createElement("input");
    phone.type = "tel";
    phone.name = "phone";
    phone.placeholder = "Phone number";
    phone.id = "phone";
    form.appendChild(phone);

    // Email
    let imail = document.createElement("p");
    imail.className = "inputheader";
    imail.innerHTML = "Email address";
    form.appendChild(imail);

    let email = document.createElement("input");
    email.type = "email";
    email.name = "email";
    email.placeholder = "Email address";
    email.id = "email";
    form.appendChild(email);

    // Button
    let button = document.createElement("div");
    button.className = "button";
    button.addEventListener("click", logIn.bind(null, true));
    form.appendChild(button);

    let txt = document.createElement("p");
    txt.innerHTML = "Submit";
    button.appendChild(txt);

    // Divider
    let hr1 = document.createElement("hr");
    form.appendChild(hr1);

    let or = document.createElement("p");
    or.innerHTML = "OR";
    form.appendChild(or);

    let hr2 = document.createElement("hr");
    form.appendChild(hr2);

    // Existing account
    // (Sub)Header
    let sub = document.createElement("p");
    sub.innerHTML = "Or log in";
    sub.id = "loginheader";
    form.appendChild(sub);

    // Name
    let iname2 = document.createElement("p");
    iname2.className = "inputheader";
    iname2.innerHTML = "Name";
    form.appendChild(iname2);

    let name2 = document.createElement("input");
    name2.type = "text";
    name2.placeholder = "Name*";
    name2.name = "name2";
    name2.id = "name2";
    form.appendChild(name2);

    // Button
    let btn = document.createElement("div");
    btn.className = "button";
    btn.addEventListener("click", logIn.bind(null, false));
    form.appendChild(btn);

    let btntext = document.createElement("p");
    btntext.innerHTML = "Submit";
    btn.appendChild(btntext);
}

function loggedIn() {
    let button = document.createElement("div");
    button.className = "button";
    button.addEventListener("click", logOut);
    document.getElementById("contents").appendChild(button);

    let text = document.createElement("p");
    text.innerHTML = "Log out";
    button.appendChild(text);

    /*let footer = document.getElementById("footer");
    footer.style.width = "99.9%";
    footer.style.position = "absolute";
    footer.style.bottom = 0;*/
}

function logIn(inew) {
    if (inew) {
        let fname = document.getElementById("fname").value;
        let bet = document.getElementById("bet").value;
        let lname = document.getElementById("lname").value;
        let street = document.getElementById("street").value;
        let number = document.getElementById("number").value;
        let postal = document.getElementById("postal").value;
        let city = document.getElementById("city").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;

        let account = fname + " ";

        if (bet != null) {
            account += bet + " ";
        }
        account += lname + "&" +
            street + "&" + number + "&" +
            postal + "&" + city + "&" +
            phone + "&" + email;

        console.log(account);

        localStorage.setItem("account", account);
        window.location.href = "products.html";
    } else {
        let error = document.createElement("p");
        error.className = "errorP";
        error.innerHTML = "We couldn't find your account in our databases (because they don't exist). Consider making a new account.";
        document.getElementById("form").appendChild(error);
    }
}

function logOut() {
    localStorage.removeItem("account");
    window.location.href = "products.html";
}
