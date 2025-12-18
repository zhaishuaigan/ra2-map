<template>
    <div class="login" ref="login">
        <div class="login-box">
            <div class="login-logo">
                <img :src="assets + 'images/avatar.png'" alt="">
            </div>
            <div class="login-username">
                <input type="text" placeholder="用户名" v-model="user.username">
            </div>
            <div class="login-password">
                <input type="password" placeholder="密码" v-model="user.password">
            </div>
            <div class="login-submit">
                <button class="submit" @click="login">登录</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    components: {

    },
    props: ["config"],
    data() {
        return {
            assets: app.assets,
            user: {
                username: "",
                password: ""
            }
        };
    },
    mounted() {
        // 调试模式直接登录
        if (app.config.debug) {
            // this.$emit("login");
        }
    },
    methods: {
        login() {
            this.$emit("login");
        }
    }
}
</script>
<style scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login .login-box {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.login input[type="text"],
.login input[type="password"] {
    width: 200px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    margin: 5px 0px;
    border: 1px solid #CCCCCC;
    outline: none;
    border-radius: 3px;
    color: #fff;
}

.submit {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    margin: 5px 0px;
    border: 1px solid #CCCCCC;
    outline: none;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
}
</style>