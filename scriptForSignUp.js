
getAllUsersData();
//var pass = document.getElementById('password').value
var validName = 0;
var validPassLength = 0;
var validPassComlexity = 0;
var validPassRpass = 0;
var emailInUse = 0;
var usersData = [];
function nameValidity(name) {
    if (!/^[a-zA-Z_]{3,15}$/.test(name)) {
        alert("bad name , your name must only include letters and underscores");
        validName = 0;
    } else {
        validName = 1;
    }
}
function checkPasswordComplixty(password) {
    if (password.length < 8) {
        alert("bad password length must be 8 or more charcters");
        validPassLength = 0;
    } else {
        validPassLength = 1;
    }
    var hasUpperCase = /[A-Z]/.test(password);
    var hasLowerCase = /[a-z]/.test(password);
    var hasNumbers = /\d/.test(password);
    var hasNonalphas = /\W/.test(password);
    if (hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas < 4) {
        alert("bad password , you must use lower and upper and special charcaters in your password");
        validPassComlexity = 0;
    } else {
        validPassComlexity = 1;
    }

}
function checkPasswordAndRpassword() {
    if (document.getElementById('password').value !== document.getElementById('rpassword').value) {
        alert("password and repeat password are not the same");
        validPassRpass = 0;
    } else {
        validPassRpass = 1;
    }
}
function checkFormData(e) {
    getAllUsersData();
    checkIfEmailExists();
    if (!(validName == 1 && validPassLength == 1 && validPassComlexity == 1 && validPassRpass == 1)) {
        console.log(validName, validPassLength, validPassComlexity, validPassRpass)
        alert("wrong signup data please refill it agian")
        e.preventDefault();
    } else if (!(emailInUse == 1)) {
        alert("this email already in use please try sign in or use another email");
        console.log(emailInUse);
        e.preventDefault();
    } else {
        AddUser();
        localStorage.setItem("emailAddress", document.getElementById('email').value)
        location.replace("./index.html");
    }
}
function AddUser() {
    var XHR = new XMLHttpRequest();
    XHR.open("post", "https://ecomdb2-default-rtdb.firebaseio.com/users.json", true);
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            console.log(XHR.responseText);
        }
    }

    var name = document.getElementById("name").value;
    var pass = document.getElementById("password").value;
    var email = document.getElementById("email").value;
    var data = { UserName: name, UserPass: pass, UserEmail: email };

    XHR.send(JSON.stringify(data));

}

function getAllUsersData() {

    var XHR = new XMLHttpRequest();
    XHR.open("get", "https://ecomdb2-default-rtdb.firebaseio.com/users.json", false);
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            usersData = this.responseText;
        }
    }
    XHR.send();
}
function checkIfEmailExists() {
    var email = document.getElementById('email').value;
    if (usersData.includes(email)) {
        emailInUse = 0;
    } else {
        emailInUse = 1;
    }
}