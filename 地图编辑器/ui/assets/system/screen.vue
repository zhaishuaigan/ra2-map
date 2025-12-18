<template>
    <div class="screen" ref="screen">
        <Login v-if="!isLogin" @login="login" />
        <Desktop v-show="isLogin" />
        <Taskbar v-show="isLogin" />
    </div>
</template>

<script>
export default {
    components: {
        Login: app.load("system/login.vue"),
        Desktop: app.load("system/desktop.vue"),
        Taskbar: app.load("system/taskbar.vue")
    },
    data() {
        return {
            isLogin: false
        };
    },
    mounted() {
        this.setBackground();
        this.disableContextMenu();
    },
    methods: {
        login() {
            this.isLogin = true;
        },
        setBackground() {
            var screen = this.$refs.screen;
            screen.style.background = `url('${app.assets}images/bg.jpg') no-repeat center center`;
            screen.style.backgroundSize = `cover`;
        },
        disableContextMenu() {
            document.oncontextmenu = function () {
                return false;
            }
        }
    }
}
</script>

<style scoped>
.screen {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>