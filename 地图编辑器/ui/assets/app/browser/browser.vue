<template>
    <Webview src="https://cn.bing.com/" :config="config" :width="1200" :height="600">
    </Webview>
</template>

<script>
export default {
    props: ["config"],
    data() {
        return {}
    },
    components: {
        Webview: app.load("system/webview.vue"),
    },
    created() {
        // console.log(this.config);
    },
}
</script>