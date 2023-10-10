var usersData = '';
var emailExists = 0;
var passMatchDB = 0;
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
getAllUsersData();
function cehckIfEmailExixts() {
     var email = document.getElementById('email').value;
    if (usersData.includes(email)) {
        emailExists = 1;
        emailAddress = email;
    } else {
        emailExists = 0;
    }
}
function cehckIfPasswordMatchDB() {
    var email = document.getElementById('email').value;
    var pass = document.getElementById('password').value;
    var indexOfUserEmail = usersData.indexOf(email);
    var cutTheStrStartFromEmail = usersData.slice(indexOfUserEmail);
    var getIndexOfUserPass = cutTheStrStartFromEmail.indexOf('UserPass');
    var cutStartFromUserPass = cutTheStrStartFromEmail.slice(getIndexOfUserPass);
    var getTheSignInPass = cutStartFromUserPass.indexOf(':');
    var cutStrFromTheSign = cutStartFromUserPass.slice(getTheSignInPass + 2);
    var getTheIndexOfEndSign = cutStrFromTheSign.indexOf('"');
    var cutTheStrToOnlyPass = cutStrFromTheSign.slice(0, getTheIndexOfEndSign);
    var userPassInDB = cutTheStrToOnlyPass;
    if (pass == userPassInDB) {
        passMatchDB = 1;
    } else {
        passMatchDB = 0;
    }
}
function checKFormData(e) {
    cehckIfPasswordMatchDB();
    e.preventDefault();
    if (!(emailExists == 1)) {
        alert("wrong email please try again");
    } else if (!(passMatchDB == 1)) {
        alert("wrong password please try again");

    } else {
        localStorage.setItem("emailAddress", document.getElementById('email').value)
        location.replace("./index.html");
    }
}

console.log("heelo");