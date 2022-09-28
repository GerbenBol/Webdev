function CheckParameters() {
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    let connect = urlParams.get('connect');
    let error = urlParams.get('error');

    let form = document.getElementById("form");

    if (connect != null) {
        let p = document.createElement("p");
        p.innerHTML = "Something went wrong when connecting to database.";
        p.className = "errorP";

        let a = document.createElement("a");
        a.innerHTML = "Click here to try again.";
        a.className = "errorP";
        a.href = "storeinfo.php";

        form.appendChild(p);
    } else if (error != null) {
    }
}
