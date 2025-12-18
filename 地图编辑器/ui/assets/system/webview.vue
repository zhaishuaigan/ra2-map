<template>
    <Window :config="config" :width="width || config.width" :height="height || config.height">
        <div class="webview">
            <iframe :src="src" frameborder="0"></iframe>
        </div>
    </Window>
</template>

<script>
export default {
    props: ["config", "title", "icon", "src", "width", "height"],
    components: {
        Window: app.load("system/window.vue"),
    },
    data() {
        return {};
    }
}
</script>

<style scoped>
.webview {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.webview iframe {
    width: 100%;
    height: 100%;
}
</style>
