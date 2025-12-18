<template>
    <Window :config="config" width="500" height="300">
        <div class="setting">
            这里是设置页面
        </div>
    </Window>
</template>
<script>
export default {
    props: ["config"],
    components: {
        Window: app.load("system/window.vue"),
    },
    data() {
        return {};
    }
}
</script>