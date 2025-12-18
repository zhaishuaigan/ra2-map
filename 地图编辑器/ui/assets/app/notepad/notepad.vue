<template>
    <Window :config="config" width="500" height="300">
        <div class="notepad">
            <textarea v-model="content"></textarea>
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
        return {
            content: ""
        };
    }
}
</script>

<style scoped>
.notepad {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.notepad textarea {
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    box-sizing: border-box;
    padding: 5px;
    resize: none;
    outline: none;
    border: 0px;
}
</style>