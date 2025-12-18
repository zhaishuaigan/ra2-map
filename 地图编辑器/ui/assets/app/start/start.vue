<template>
    <div class="start" ref="start" v-show="show">
        <div class="appList">
            <div class="appItem" v-for="item in appList" :key="item.name" @click="activeOrCreateWindow(item)">
                <img :src="assets + item.path + item.icon" />
                <div class="title">{{ item.title }}</div>
            </div>
        </div>
        <div class="tools">
            <div class="user">
                <img :src="assets + 'images/avatar.png'" alt="">
                <span>Guest</span>
            </div>
            <div class="buttons">
                <a href="javascript:void(0)"><img :src="assets + 'app/start/images/setting.png'" alt=""></a>
                <a href="javascript:void(0)"><img :src="assets + 'app/start/images/power.png'" alt=""></a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["config"],
    components: {
        Window: app.load("system/window.vue"),
    },
    data() {
        return {
            assets: app.assets,
            appList: app.config.appList,
            show: true
        };
    },
    created() {

    },
    mounted() {
        app.windows.push(this);
        this.$refs.start.style.zIndex = ++app.zIndex;
        this.bindHideEvent();
    },
    methods: {
        activeWindow() {
            this.show = !this.show;
            if (this.show) {
                this.$refs.start.style.zIndex = ++app.zIndex;
            }
        },
        activeOrCreateWindow(item) {
            app.desktop.activeOrCreateWindow(item);
        },
        bindHideEvent() {
            document.addEventListener('mouseup', (event) => {
                var className = event.target.className;
                if (className.indexOf('appList') > -1) {
                    return;
                }
                this.show = false;
            });
        }
    }
}
</script>

<style scoped>
.start {
    position: absolute;
    left: 50%;
    margin-left: -320px;
    bottom: 10px;
    width: 640px;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 10px #333;
    user-select: none;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);

}

.start .appList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
}

.start .appList .appItem {
    box-sizing: border-box;
    width: 100px;
    text-align: center;
    padding: 10px;
}

.start .appList .appItem:hover {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 0px 3px #333;
    border-radius: 5px;
}

.start .appList .appItem img {
    width: 70%;
    text-align: center;
    margin: 5px;
}

.start .appList .appItem .title {
    line-height: 20px;
    text-align: center;
    text-overflow: clip;
}

.start .tools {
    box-sizing: border-box;
    height: 65px;
    display: flex;
}

.start .tools .user {
    float: left;
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.start .tools .user img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.start .tools .user span {
    font-size: 14px;
    padding-left: 10px;
}

.start .tools .buttons {
    flex: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
}

.start .tools .buttons a {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.start .tools .buttons a:hover {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 3px;
    box-shadow: 0px 0px 3px #333;
}

.start .tools .buttons img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
</style>