export default {
    mounted(el, binding, vnode, prevVnode) {
        var win = el;
        var resize = document.createElement('div');
        win.appendChild(resize);
        console.log(win);
        console.log(resize);
        resize.style.position = 'absolute';
        resize.style.overflow = 'hidden';
        resize.style.userSelect = 'none';
        var resizeDown = false;
        var resizeStyle = '';
        var startX = 0;
        var startY = 0;
        var startWidth = 0;
        var startHeight = 0;
        resize.addEventListener("mousedown", (e) => {
            e.cancelBubble = true;
            console.log("resize start");
            resizeDown = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = win.offsetWidth;
            startHeight = win.offsetHeight;
            document.dispatchEvent(new CustomEvent("document.drag.start", e));
        });
        document.addEventListener("mousemove", (e) => {
            if (resizeDown) {
                e.preventDefault();
                var widthFix = e.clientX - startX;
                var heightFix = e.clientY - startY;
                switch (resizeStyle) {
                    case "l":
                        win.style.left = e.clientX + "px";
                        win.style.width = startWidth - widthFix + "px";
                        break;
                    case "r":
                        win.style.width = startWidth + widthFix + "px";
                        break;
                    case "t":
                        win.style.top = e.clientY + "px";
                        win.style.height = startHeight - heightFix + "px";
                        break;
                    case "b":
                        win.style.height = startHeight + heightFix + "px";
                        break;
                    case "lt":
                        win.style.left = e.clientX + "px";
                        win.style.top = e.clientY + "px";
                        win.style.width = startWidth - widthFix + "px";
                        win.style.height = startHeight - heightFix + "px";
                        break;
                    case "rt":
                        win.style.top = e.clientY + "px";
                        win.style.width = startWidth + widthFix + "px";
                        win.style.height = startHeight - heightFix + "px";
                        break;
                    case "lb":
                        win.style.left = e.clientX + "px";
                        win.style.width = startWidth - widthFix + "px";
                        win.style.height = startHeight + heightFix + "px";
                        break;
                    case "rb":
                        win.style.width = startWidth + widthFix + "px";
                        win.style.height = startHeight + heightFix + "px";
                        break;
                    default:
                        win.style.left = "0px";
                        win.style.top = "0px";
                        win.style.width = "0px";
                        win.style.height = "0px";
                        break;
                }
            } else {
                var l = e.clientX < win.offsetLeft + 5;
                var r = e.clientX > win.offsetLeft + win.offsetWidth - 5;
                var t = e.clientY < win.offsetTop + 5;
                var b = e.clientY > win.offsetTop + win.offsetHeight - 5;
                switch (true) {
                    case l && t:
                        resizeStyle = "lt";
                        resize.style.left = '-5px';
                        resize.style.top = '-5px';
                        resize.style.right = 'auto';
                        resize.style.bottom = 'auto';
                        resize.style.width = '10px';
                        resize.style.height = '10px';
                        resize.style.cursor = 'nwse-resize';
                        break;
                    case r && t:
                        resizeStyle = "rt";
                        resize.style.left = 'auto';
                        resize.style.top = '-5px';
                        resize.style.right = '-5px';
                        resize.style.bottom = 'auto';
                        resize.style.width = '10px';
                        resize.style.height = '10px';
                        resize.style.cursor = 'nwse-resize';
                        break;
                    case l && b:
                        resizeStyle = "lb";
                        resize.style.left = '-5px';
                        resize.style.top = 'auto';
                        resize.style.right = 'auto';
                        resize.style.bottom = '-5px';
                        resize.style.width = '10px';
                        resize.style.height = '10px';
                        resize.style.cursor = 'nesw-resize';
                        break;
                    case r && b:
                        resizeStyle = "rb";
                        resize.style.left = 'auto';
                        resize.style.top = 'auto';
                        resize.style.right = '-5px';
                        resize.style.bottom = '-5px';
                        resize.style.width = '10px';
                        resize.style.height = '10px';
                        resize.style.cursor = 'nwse-resize';
                        break;
                    case l:
                        resizeStyle = "l";
                        resize.style.left = '-5px';
                        resize.style.top = '-5px';
                        resize.style.right = 'auto';
                        resize.style.bottom = '-5px';
                        resize.style.width = '10px';
                        resize.style.height = 'auto';
                        resize.style.cursor = 'ew-resize';
                        break;
                    case r:
                        resizeStyle = "r";
                        resize.style.left = 'auto';
                        resize.style.top = '-5px';
                        resize.style.right = '-5px';
                        resize.style.bottom = '-5px';
                        resize.style.width = '10px';
                        resize.style.height = 'auto';
                        resize.style.cursor = 'ew-resize';
                        break;
                    case t:
                        resizeStyle = "t";
                        resize.style.left = '-5px';
                        resize.style.top = '-5px';
                        resize.style.right = '-5px';
                        resize.style.bottom = 'auto';
                        resize.style.width = 'auto';
                        resize.style.height = '10px';
                        resize.style.cursor = 'ns-resize';
                        break;
                    case b:
                        resizeStyle = "b";
                        resize.style.left = '-5px';
                        resize.style.top = 'auto';
                        resize.style.right = '-5px';
                        resize.style.bottom = '-5px';
                        resize.style.width = 'auto';
                        resize.style.height = '10px';
                        resize.style.cursor = 'ns-resize';
                        break;
                    default:
                        resizeStyle = "";
                        resize.style.left = '0';
                        resize.style.top = '0';
                        resize.style.right = 'auto';
                        resize.style.bottom = 'auto';
                        resize.style.width = '0';
                        resize.style.height = '0';
                        resize.style.cursor = 'default';
                        break;

                }
            }
        });
        document.addEventListener("mouseup", (e) => {
            resizeDown = false;
            document.dispatchEvent(new CustomEvent("document.drag.end", e));
        });
    }
}