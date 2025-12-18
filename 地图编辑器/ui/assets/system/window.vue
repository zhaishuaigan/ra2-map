<template>
    <div class="window" ref="window" @mousedown="activeWindow()" v-resize="true">
        <div class="title" ref="title" v-show="!hideTitle" v-drag="">
            <div class="icon" v-if="icon || config && config.icon">
                <img :src="assets + (icon || config.path + config.icon)" alt="">
            </div>
            <div class="text" v-html="title || config && config.title" @dblclick="maxWindow()"></div>
            <div class="ctrl">
                <div class="min" @click.prevent="minWindow()">🗕</div>
                <div class="max" @click.prevent="maxWindow()">⬜︎</div>
                <div class="close" @click.prevent="closeWindow()">✖</div>
            </div>
        </div>
        <div class="box" ref="box">
            <slot></slot>
        </div>
        <div class="mask" v-if="mask"></div>
    </div>
</template>

<script>
export default {
    props: ["config", "title", "hideTitle", "icon", "width", "height", "left", "right", "top", "bottom", "hideTitle", "background"],
    components: {},
    data() {
        return {
            assets: app.assets,
            resizeDown: false,
            moveDown: false,
            mask: false,
            resizeStyle: '',
        };
    },
    created() {

    },
    mounted() {
        this.initWindowSize();
        this.initWindowPosition();
        this.bindResizeEvent();
        this.bindMoveWindowEvent();
        this.activeWindow();
        this.setBackgroud(this.background);
        app.windows.push(this);

    },
    methods: {
        activeWindow() {
            if (this.$refs.window.style.display == "none") {
                this.$refs.window.style.display = this.$refs.window.dataset.display;
            }
            if (this.$refs.window.style.zIndex == app.zIndex) {
                return;
            }
            this.$refs.window.style.zIndex = ++app.zIndex;
            document.dispatchEvent(new Event("document.activeWindow"));
        },
        setBackgroud(color) {
            if (color) {
                this.$refs.box.style.background = color;
            }
        },
        initWindowSize() {
            if (this.width) {
                this.$refs.window.style.width = this.width + "px";
            }

            if (this.height) {
                this.$refs.window.style.height = this.height + "px";
            }
        },
        initWindowPosition() {
            this.centerWindow();
            var window = this.$refs.window;
            var desktop = document.querySelector(".desktop");
            var screenHeight = desktop.offsetHeight;
            var screenWidth = desktop.offsetWidth;
            if (this.left) {
                this.$refs.window.style.left = this.left + "px";
            }
            if (this.top) {
                this.$refs.window.style.top = this.top + "px";
            }
            if (this.right) {
                var left = screenWidth - window.offsetWidth - this.right;
                this.$refs.window.style.left = left + "px";
            }
            if (this.bottom) {
                var top = screenHeight - window.offsetHeight - this.bottom;
                this.$refs.window.style.top = top + "px";
            }
        },
        closeWindow() {
            this.$refs.window.dataset.display = this.$refs.window.style.display;
            this.$refs.window.style.display = "none";
            if (this.config) {
                app.taskbar.removeApp(this.config);
            } else {
                app.taskbar.removeApp(this);
            }

        },
        minWindow() {
            this.$refs.window.dataset.display = this.$refs.window.style.display;
            this.$refs.window.style.display = "none";
        },
        maxWindow() {
            if (this.$refs.window.style.display == "none") {
                this.$refs.window.style.display = this.$refs.window.datast.display;
            }
            if (this.$refs.window.style.width == "100%") {
                this.$refs.window.style.width = this.$refs.window.dataset.width;
                this.$refs.window.style.height = this.$refs.window.dataset.height;
                this.centerWindow();
            } else {
                this.$refs.window.dataset.width = this.$refs.window.style.width;
                this.$refs.window.dataset.height = this.$refs.window.style.height;
                this.$refs.window.style.width = "100%";
                this.$refs.window.style.height = "100%";
                this.$refs.window.style.left = "0px";
                this.$refs.window.style.top = "0px";
            }
        },
        centerWindow() {
            var win = this.$refs.window;
            var left = document.body.offsetWidth / 2 - win.offsetWidth / 2;
            var top = document.body.offsetHeight / 2 - win.offsetHeight / 2;
            left = left < 0 ? 0 : left;
            top = top < 0 ? 0 : top;
            win.style.left = `${left}px`;
            win.style.top = `${top}px`;
        },
        resizeWindow() {

        },
        bindResizeEvent() {
            document.addEventListener("document.drag.start", (e) => {
                this.mask = true;
            });
            document.addEventListener("document.drag.end", (e) => {
                this.mask = false;
            });
        },
        bindMoveWindowEvent() {
            document.addEventListener("document.drag.start", (e) => {
                this.mask = true;
            });
            document.addEventListener("document.drag.end", (e) => {
                this.mask = false;
            });
        }
    },

}
</script>

<style scoped>
.window {
    position: absolute;
    top: 50%;
    left: 50%;
    flex: auto;
    border: 1px solid #CCCCCC;
    /* border-radius: 10px; */
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.4);
    /* overflow: hidden; */
    max-width: 100%;
    max-height: 100%;
}

.window>.title {
    height: 34px;
    line-height: 34px;
    padding: 0px 0px 0px 10px;
    color: #000;
    background: rgb(239, 244, 249, 0.8);
    backdrop-filter: blur(8px);
    user-select: none;
    -webkit-user-drag: none;
    display: flex;

}

.window>.title>.icon {
    -webkit-user-drag: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.window>.title>.icon>img {
    -webkit-user-drag: none;
    width: 16px;
    height: 16px;
}

.window>.title>.text {
    flex: auto;
    padding-left: 10px;
}

.window>.title>.ctrl {
    display: flex;
}

.window>.title>.ctrl>div {
    width: 48px;
    height: 100%;
    line-height: 34px;
    text-align: center;
    font-size: 12px;
    color: #000;
}

.window>.title>.ctrl>div:hover {
    background: #E9E9E9;
}

.window>.title>.ctrl>div.close:hover {
    background: #C42B1C;
}

.window>.box {
    flex: auto;
    overflow: auto;
    background: #FFFFFF;
}

.window .mask {
    position: absolute;
    left: 0px;
    top: 34px;
    right: 0px;
    bottom: 0px;
    /* background: rgba(0, 0, 0, 0.2); */
}
</style>