<template>
    <Window title="关于" width="500" height="300">
        这里是关于内容
    </Window>
</template>
<script>
export default {
    components: {
        Window: app.load("system/window.vue"),
    },
    data() {
        return {
            assets: app.assets,
            config: {
                title: "关于",
                width: 500,
                height: 300
            }
        };
    },
    mounted() {
    },
    methods: {
    }
}
</script>
<style scoped>

</style>