var LoginClick = function () {
    console.log("Login:");
    var un = document.getElementById('username').value;
    var pw = document.getElementById('password').value;
    var url = "./Home/Login?username=" + un + "&password=" + pw;
    console.log("url:", url);

    document.getElementById("username").style.visibility = 'hidden';
    document.getElementById("password").style.visibility = 'hidden';
    document.getElementById("submit").style.visibility = 'hidden';
    document.getElementById("forgot").style.visibility = 'hidden';
    document.getElementById("loading").style.visibility = 'visible';

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = 'text';
    xmlHttp.open("POST", url, true);
    xmlHttp.onload = function () {
        if (xmlHttp.response != "404") {
            loadPin(xmlHttp.response);
        }
        else {
            document.getElementById("username").style.visibility = 'visible';
            document.getElementById("password").style.visibility = 'visible';
            document.getElementById("submit").style.visibility = 'visible';
            document.getElementById("forgot").style.visibility = 'visible';
            document.getElementById("loading").style.visibility = 'hidden';
            console.log("login failed");
            // TODO: Add pop-up
        }
            
    }
    xmlHttp.send();
}

function loadPin(friendlist) {

    var friends = JSON.parse(friendlist);

    user = friends[0]
    console.log("user: ", user);
    addMyPin(user.name, user.lon, user.lat, '../images/me.jpg');

    console.log(friends.length);
    for (index = 1; index < friends.length; index++) {
        console.log(friends[index]);
        addFriendPin(friends[index].name, friends[index].lon, friends[index].lat, '../images/me.jpg');
    }

    document.getElementById("logoImg").style.visibility = 'hidden';
    document.getElementById("loginLogo").style.visibility = 'hidden';
    document.getElementById("loginDiv").style.visibility = 'hidden';
}