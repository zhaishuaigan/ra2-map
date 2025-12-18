<template>
    <Webview :config="config" src="http://ngapp.net/jianli.html" :width="1024" :height="600">
    </Webview>
</template>

<script>
export default {
    props: ["config"],
    components: {
        Webview: app.load("system/webview.vue"),
    },
    created() {
        // console.log(this.config);
    },
    data() {
        return {};
    }
}
</script>