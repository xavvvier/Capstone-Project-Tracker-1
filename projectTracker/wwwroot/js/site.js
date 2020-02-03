function startAutoLogout() {
    window.setTimeout(function() {
        // session has expired!
        document.location = "/";

    }, 1200000);
    
    window.setTimeout(function() {
        // session has expired!
        document.getElementById("lblExpire").innerHTML = "Warning : Session is about to expire!";
    }, 1080000);
}