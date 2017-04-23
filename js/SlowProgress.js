function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    if (exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
    }
    else
        var expires = "";
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}

$(function(){
    var cookieVal = document.cookie;  //grab the cookie  
    if (document.cookie != ""){
        var cookieValue = getCookie("selfcounter");
        cookieValue++;
        setCookie("selfcounter", cookieValue, "365");
    }
    else{
        setCookie("selfcounter", "1", "365");
    }
});

/*$(function(){
    if (typeof $.cookie('counter') === null) {
        $.cookie("test", 1, { expires : 365 });
    }
    else {
        var cookieValue = parseInt($.cookie("test"));
        $.cookie("test", cookieValue+1, { expires : 365 });
    }
});*/