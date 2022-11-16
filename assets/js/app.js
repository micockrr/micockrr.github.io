function addLoadEvent(e) {
    var t = window.onload;
    if (typeof t != "function") window.onload = e;
    else window.onload = function() {
        if (t) t();
        e()
    }
}

function regenbogen() {
    if (document.getElementById) {
        var e, t;
        rainbow = document.getElementById("rainbow");
        raintxt = rainbow.firstChild.nodeValue;
        while (rainbow.childNodes.length) rainbow.removeChild(rainbow.childNodes[0]);
        for (e = 0; e < raintxt.length; e++) {
            t = document.createElement("span");
            t.setAttribute("id", "rain" + e);
            t.appendChild(document.createTextNode(raintxt.charAt(e)));
            rainbow.appendChild(t)
        }
        rainbow = setInterval("raining()", speed)
    }
}

function raining() {
    var e, t;
    for (e = 0; e < raintxt.length; e++) {
        t = raincol[(e + raincnt) % raincol.length];
        document.getElementById("rain" + e).style.color = t;
        if (glow) document.getElementById("rain" + e).style.textShadow = t + " 0px 0px " + glow + "px"
    }
    raincnt++
}
var speed = 120;
var glow = 5;
var raincol = new Array("#ff0000", "#ff5500", "#ffaa00", "#ffff00", "#aaff00", "#55ff00", "#00ff00", "#00ff55", "#00ffaa", "#00ffff", "#00aaff", "#0055ff", "#0000ff", "#5500ff", "#aa00ff", "#ff00ff", "#ff00aa", "#ff0055");
var rainbow, raintxt, raincnt = 0;
addLoadEvent(regenbogen)