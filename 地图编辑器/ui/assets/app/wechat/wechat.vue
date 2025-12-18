<template>
    <div class="wechat" ref="wechat" @mousedown="activeWindow()" v-resize="true" v-drag="0">
        <div class="left" ref="left" v-drag="1">
        </div>
        <div class="center" ref="center">
            <div class="top" v-drag="2"></div>
        </div>
        <div class="right" ref="right">
            <div class="top" v-drag="2"></div>
        </div>
        <div class="ctrl">
            <div class="min" @click.prevent="minWindow()">🗕</div>
            <div class="max" @click.prevent="maxWindow()">⬜︎</div>
            <div class="close" @click.prevent="closeWindow()">✖</div>
        </div>
        <div class="mask" v-if="mask"></div>
    </div>
</template>

<script>
export default {
    props: ['config'],
    components: {},
    data() {
        return {
            assets: app.assets,
            mask: false,
        };
    },
    created() {

    },
    mounted() {
        this.initWindowPosition();
        this.bindMoveWindowEvent();
        this.activeWindow();
        app.windows.push(this);

    },
    methods: {
        activeWindow() {
            if (this.$refs.wechat.style.display == "none") {
                this.$refs.wechat.style.display = this.$refs.wechat.dataset.display;
            }
            if (this.$refs.wechat.style.zIndex == app.zIndex) {
                return;
            }
            this.$refs.wechat.style.zIndex = ++app.zIndex;
            document.dispatchEvent(new Event("document.activeWindow"));
        },
        initWindowPosition() {
            this.centerWindow();
            var window = this.$refs.wechat;
            var desktop = document.querySelector(".desktop");
            var screenHeight = desktop.offsetHeight;
            var screenWidth = desktop.offsetWidth;
            if (this.left) {
                this.$refs.wechat.style.left = this.left + "px";
            }
            if (this.top) {
                this.$refs.wechat.style.top = this.top + "px";
            }
            if (this.right) {
                var left = screenWidth - window.offsetWidth - this.right;
                this.$refs.wechat.style.left = left + "px";
            }
            if (this.bottom) {
                var top = screenHeight - window.offsetHeight - this.bottom;
                this.$refs.wechat.style.top = top + "px";
            }
        },
        closeWindow() {
            this.$refs.wechat.dataset.display = this.$refs.wechat.style.display;
            this.$refs.wechat.style.display = "none";
            if (this.config) {
                app.taskbar.removeApp(this.config);
            } else {
                app.taskbar.removeApp(this);
            }

        },
        minWindow() {
            this.$refs.wechat.dataset.display = this.$refs.wechat.style.display;
            this.$refs.wechat.style.display = "none";
        },
        maxWindow() {
            if (this.$refs.wechat.style.display == "none") {
                this.$refs.wechat.style.display = this.$refs.wechat.datast.display;
            }
            if (this.$refs.wechat.style.width == "100%") {
                this.$refs.wechat.style.width = this.$refs.wechat.dataset.width;
                this.$refs.wechat.style.height = this.$refs.wechat.dataset.height;
                this.centerWindow();
            } else {
                this.$refs.wechat.dataset.width = this.$refs.wechat.style.width;
                this.$refs.wechat.dataset.height = this.$refs.wechat.style.height;
                this.$refs.wechat.style.width = "100%";
                this.$refs.wechat.style.height = "100%";
                this.$refs.wechat.style.left = "0px";
                this.$refs.wechat.style.top = "0px";
            }
        },
        centerWindow() {
            var win = this.$refs.wechat;
            var left = document.body.offsetWidth / 2 - win.offsetWidth / 2;
            var top = document.body.offsetHeight / 2 - win.offsetHeight / 2;
            left = left < 0 ? 0 : left;
            top = top < 0 ? 0 : top;
            win.style.left = `${left}px`;
            win.style.top = `${top}px`;
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
.wechat {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 800px;
    height: 600px;
    /* border: 1px solid #CCCCCC; */
    /* border-radius: 10px; */
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
    /* overflow: hidden; */
    max-width: 100%;
    max-height: 100%;
    background: #F5F5F5;
}

.wechat>.left {
    width: 55px;
    height: 100%;
    background: #2E2E2E;
    overflow: visible;
}

.wechat>.center {
    width: 250px;
    height: 100%;
    background: #f7f7f7;
    overflow: hidden;
    border-right: 1px solid #D6D6D6;
}

.wechat>.center>.top {
    height: 60px;
    border-bottom: 1px solid #D6D6D6;
}

.wechat>.right {
    height: 100%;
    flex: auto;
}

.wechat>.right>.top {
    height: 60px;
    border-bottom: 1px solid #D6D6D6;
}

.wechat>.ctrl {
    position: absolute;
    top: 0px;
    right: 0px;
    display: flex;
}

.wechat>.ctrl>div {
    width: 34px;
    height: 100%;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    color: #000;
    user-select: none;
}

.wechat>.ctrl>div:hover {
    background: #E9E9E9;
}

.wechat>.ctrl>div.close:hover {
    background: #C42B1C;
    color: #FFF;
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