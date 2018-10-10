
window.addEventListener("load", init, false);
var legalZone = false;
var ballInBascet = false;
var ballInThrowZone = false;
var elScope = document.getElementById("scope");
var scope = 0;
var dropZone;

var inBasket = false;
var ballAboveBucket = false;

function init() {
    var elem = document.getElementById("divBall");
    elem.addEventListener("mousedown", function (e) {
        drag(this, e);
    })
}

function drag(elementToDrag, event) {
                // координаты мыши в начале перетаскивания.
    var startX = event.clientX,
        startY = event.clientY;

            // начальные координаты элемента, который будет перемещаться.
    var origX = elementToDrag.offsetLeft,
        origY = elementToDrag.offsetTop;

                // разница между координатами мыши и координатами перетаскиваемого элемента.
    var deltaX = startX - origX,
        deltaY = startY - origY;

                // Регистрация событий mouseup и mousemove
    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);

    function moveHandler(e) {
        if (!e) e = window.event;

        // перемещаем элемент с учетом отступа от первоначального клика.
        elementToDrag.style.left = (e.clientX - deltaX) + "px";
        elementToDrag.style.top = (e.clientY - deltaY) + "px";
        
        // check if ball in area above busket
        if(isBallInView(elementToDrag, "trhowZone")) {
            ballAboveBucket = true;
            legalZone = true;
        } else {
            ballAboveBucket = false;
        }
        
        // check if ball in basket area
        if(isBallInView(elementToDrag, "legalZone")) {
           if(!ballAboveBucket && legalZone) {
               inBasket = true;;
            }
        } else {
            legalZone = false;
        }
        
        if(inBasket) {
             if(!isBallInView(elementToDrag, "legalZone")) {
                scopeUp();
                replaceElem(elementToDrag);  
                legalZone = false;
                upHandler();
                inBasket =false;
             }
        }
        
    }

    function upHandler(e) {
        if (!e) e = window.event; 

        document.removeEventListener("mouseup", upHandler, true);
        document.removeEventListener("mousemove", moveHandler, true);
    }
    
    function isBallInView(el, elementName) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;
        
        var el = document.getElementById(elementName);
        var elTop = el.offsetTop;
        var elWidth = el.offsetWidth;
        var elHeight = el.offsetHeight;
        var elLeft = el.offsetLeft;
       
        return top >= elTop 
            && (top + height) <= (elHeight + elTop) 
            && left >= elLeft
            && (left + width) <= (elLeft + elWidth);
    }
    
    function scopeUp() {
        scope++;
        
        document.getElementById("scope").innerHTML = scope;
    }
    
    function replaceElem(el) {
        var elemenStyle = el.style;
        var body = document.body,
        html = document.documentElement;

        var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
        
        elemenStyle.top = (height - el.offsetTop) + "px";
        console.log((el.offsetTop ) + "px");
        elemenStyle.left = "10px";
    }
}




