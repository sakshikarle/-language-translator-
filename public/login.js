function login(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const user =
    JSON.parse(localStorage.getItem("user"));

    if(
        user &&
        user.email === email &&
        user.password === password
    ){

        localStorage.setItem(
            "loggedIn",
            "true"
        );
localStorage.setItem("userName", user.name);
        window.location.href =
        "index.html";

    }else{

        alert("Invalid Credentials");

    }
}