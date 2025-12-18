export default {
    mounted(el, binding, vnode, prevVnode) {
        var title = el;
        var win = el.parentNode;
        switch (binding.value) {
            case 'parentNode':
                win = title.parentNode;
                break;
            case 'this':
            case 0:
                win = title;
                break;
            case 1:
                win = title.parentNode;
                break;
            case 2:
                win = title.parentNode.parentNode;
                break;
            default:
                win = title.parentNode;
                break;
        }
        var moveDown = false;
        var startX = 0;
        var startY = 0;
        var startLeft = 0;
        var startTop = 0;

        // pc端拖拽
        title.addEventListener("mousedown", (e) => {
            moveDown = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = win.offsetLeft;
            startTop = win.offsetTop;
            document.dispatchEvent(new CustomEvent("document.drag.start", e));
        });
        document.addEventListener("mousemove", (e) => {
            if (moveDown) {
                var left = startLeft + e.clientX - startX;
                var top = startTop + e.clientY - startY;
                left = left < 0 ? 0 : left;
                top = top < 0 ? 0 : top;
                win.style.left = `${left}px`;
                win.style.top = `${top}px`;
            }
        });
        document.addEventListener("mouseup", (e) => {
            moveDown = false;
            document.dispatchEvent(new CustomEvent("document.drag.end", e));
        });

        // 移动端拖拽
        title.addEventListener("touchstart", (e) => {
            e.preventDefault();
            moveDown = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startLeft = win.offsetLeft;
            startTop = win.offsetTop;
            document.dispatchEvent(new CustomEvent("document.drag.start", e.touches[0]));
        });
        document.addEventListener("touchmove", (e) => {
            if (moveDown) {
                var left = startLeft + e.touches[0].clientX - startX;
                var top = startTop + e.touches[0].clientY - startY;
                left = left < 0 ? 0 : left;
                top = top < 0 ? 0 : top;
                win.style.left = `${left}px`;
                win.style.top = `${top}px`;
            }
        });
        document.addEventListener("touchend", (e) => {
            document.dispatchEvent(new CustomEvent("mouseup", e.touches[0]));
        });
    },

}