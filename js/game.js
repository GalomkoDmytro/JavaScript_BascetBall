(function(){
            window.addEventListener("load", init, false);

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
                }

                function upHandler(e) {
                    if (!e) e = window.event; 

                    document.removeEventListener("mouseup", upHandler, true);
                    document.removeEventListener("mousemove", moveHandler, true);
                }
            }
        })()