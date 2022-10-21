function CheckParameters() {
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let error = urlParams.get('error');
    let id = urlParams.get('id');
    let fname = urlParams.get('fname');
    let lname = urlParams.get('lname');
    let gender = urlParams.get('gender');
    let email = urlParams.get('email');

    let form = document.getElementById("form");

    if (error != null) {
        document.getElementById("fname").value = fname;
        document.getElementById("lname").value = lname;
        document.getElementById("gender").value = gender;
        document.getElementById("email").value = email;

        let p = document.createElement("p");
        p.innerHTML = "Your information is already in our databases. ";
        p.className = "errorP";

        let a = document.createElement("a");
        a.innerHTML = "Would you like to view it?";
        a.className = "errorA";
        a.href = "form.php?id=" + id;

        p.appendChild(a);
        form.appendChild(p);
    }
}
