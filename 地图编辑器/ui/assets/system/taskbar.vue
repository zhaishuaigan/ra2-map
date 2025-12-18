<template>
    <div class="taskbar" ref="taskbar">
        <a v-for="(item, index) in appList" @click="activeWindow(item)" :key="index" :title="item.title"
            href="javascript:void(0)" :class="{ selected: current && current.title == item.title }">
            <img v-if="item.icon" :src="assets + item.path + item.icon" :alt="item.title" />
            <span v-html="item.title"></span>
        </a>
        <Contextmenu v-if="contextmenu.show" :items="contextmenu.items" :event="contextmenu.event"></Contextmenu>
    </div>
</template>
<script>
export default {
    components: {
        Contextmenu: app.load("components/contextmenu.vue"),
    },
    data() {
        return {
            assets: app.assets,
            current: null,
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
        this.appList = app.config.taskbar.map(_ => _);
    },
    mounted() {
        this.bindContextmenuEvent();
        app.taskbar = this;
    },
    methods: {
        addApp(item) {
            var find = false;
            this.appList.map((current) => {
                if (current.title == item.title) {
                    find = true;
                    return;
                }
            });
            if (!find) {
                this.appList.push(item);
            }
        },
        removeApp(item) {
            var newList = [];
            var find = false;
            app.config.taskbar.map((current) => {
                if (current.title == item.title) {
                    find = true;
                    return;
                }
            });

            if (find) {
                return;
            }

            this.appList.map((current) => {
                if (current.title != item.title) {
                    newList.push(current);
                }
            });
            this.appList = newList;
        },
        activeWindow(item) {
            app.desktop.activeOrCreateWindow(item);
        },
        bindContextmenuEvent() {
            var taskbar = this.$refs.taskbar;
            document.addEventListener('click', (event) => {
                this.contextmenu.show = false;
            });
            document.addEventListener('mousedown', (event) => {
                this.contextmenu.show = false;
            });
            taskbar.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                if (event.target.className != 'taskbar') {
                    return;
                }
                this.contextmenu.show = true;
                this.contextmenu.event.clientX = event.clientX;
                this.contextmenu.event.clientY = event.clientY - taskbar.offsetTop;
                this.contextmenu.items = [
                    {
                        title: '任务栏设置',
                        click: () => {

                        }
                    }
                ];
            });
        }
    }
}
</script>
<style scoped>
.taskbar {
    box-sizing: border-box;
    height: 50px;
    text-align: center;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    box-shadow: 0px 0px 3px #333;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    position: relative;
    user-select: none;
    -webkit-user-drag: none;
}

.taskbar a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #FFF;
    height: 44px;
    /* width: 44px; */
    margin: 0px 5px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0);
    padding: 0px 6px;
}

.taskbar a:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid #CCC;
    border-radius: 3px;
    user-select: none;
    -webkit-user-drag: none;
}


.taskbar a.selected {
    color: #333333;
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid #CCC;
    border-radius: 3px;
}


.taskbar a img {
    width: 32px;
    height: 32px;
    user-select: none;
    -webkit-user-drag: none;
}

.taskbar a span {
    padding: 0px 5px;
    user-select: none;
    -webkit-user-drag: none;
    text-shadow:0px 0px 3px #333;
}
</style>