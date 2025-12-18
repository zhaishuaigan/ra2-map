<template>
    <div class="desktop" ref="desktop">
        <component v-for="item in appList" :key="item.name" v-show="item.display || item.debug" :is="item.name"
            :config="item">
        </component>
        <Contextmenu v-if="contextmenu.show" :items="contextmenu.items" :event="contextmenu.event"></Contextmenu>
    </div>
</template>

<script>
export default {
    components: {
        Contextmenu: app.load("components/contextmenu.vue"),
        About: app.load("system/about.vue"),
        ...app.components
    },
    data() {
        return {
            appList: [],
            contextmenu: {
                show: false,
                items: [],
                event: {
                    clientX: 0,
                    clientY: 0
                }
            }
        };
    },
    async created() {
        app.desktop = this;
    },
    mounted() {
        this.bindContextmenuEvent();
        this.loadDebugApp();
    },
    methods: {
        loadDebugApp() {
            var debug = app.config.debug;
            if (!debug) {
                return;
            }
            app.config.appList.map(item => item.debug && this.appList.push(item));
            app.config.taskbar.map(item => item.debug && this.appList.push(item));
        },
        hideWindow(item) {
            app.windows.map((current) => {
                if (current.title == item.title) {
                    current.minWindow();
                }
            });
        },
        activeOrCreateWindow(item) {
            var find = false;
            app.taskbar.addApp(item);
            app.windows.map((current) => {
                if (current.title == item.title || current.config.title == item.title) {
                    current.activeWindow();
                    find = true;
                }
            });
            if (find) {
                return;
            }
            item.display = true;
            this.appList.push(item);
        },
        bindContextmenuEvent() {
            var desktop = this.$refs.desktop;
            document.addEventListener('click', (event) => {
                this.contextmenu.show = false;
            });
            desktop.oncontextmenu = (e) => {
                e.preventDefault();
                if (e.target.className != 'desktop') {
                    return;
                }
                if (this.contextmenu.show) {
                    this.contextmenu.show = false;
                    setTimeout(() => {
                        this.contextmenu.show = true;
                    }, 100);
                } else {
                    this.contextmenu.show = true;
                }
                this.contextmenu.event.clientX = e.clientX;
                this.contextmenu.event.clientY = e.clientY;
                this.contextmenu.items = [
                    {
                        title: "刷新",
                        icon: "refresh",
                        click: () => {
                            // window.location.reload();
                        }
                    },
                    {
                        title: "属性",
                        icon: "setting",
                        click: () => {
                            // app.activeOrCreateWindow(app.setting);
                        }
                    },
                    {
                        title: "关于",
                        icon: "about",
                        click: () => {
                            this.activeOrCreateWindow({
                                name: "About",
                                title: "关于",
                                display: true
                            });
                        }
                    }
                ];
            }
        }
    },
}
</script>

<style scoped>
.desktop {
    position: relative;
    flex: auto;
    /* color: #00FF00; */
}
</style>