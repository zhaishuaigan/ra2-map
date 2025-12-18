<template>
    <div class="contextmenu" ref="contextmenu" :style="style">
        <div class="contextmenu-item" v-for="(item, index) in items" :key="index" @click="item.click">
            <span>{{ item.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["items", 'event'],
    components: {
    },
    data() {
        return {
            style: {
                left: 0,
                top: 0
            }
        };
    },
    mounted() {
        this.setContextmenuPosition();
    },
    methods: {
        setContextmenuPosition() {
            var left = this.event.clientX;
            var top = this.event.clientY;
            var menu = this.$refs.contextmenu;
            if (left + menu.offsetWidth > menu.parentNode.offsetWidth) {
                left -= menu.offsetWidth;
            }
            if (top + menu.offsetHeight > menu.parentNode.offsetHeight) {
                top -= menu.offsetHeight;
            }
            if (left < 0) {
                left = 0;
            }
            if (top < 0) {
                top = 0;
            }
            this.style.left = left + 'px';
            this.style.top = top + 'px';
        }
    }
}
</script>

<style scoped>
.contextmenu {
    position: absolute;
    top: 0px;
    left: 0px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 0px 0px 3px #333;
    z-index: 99999;
    min-width: 80px;
    user-select: none;
}

.contextmenu .contextmenu-item {
    padding: 0px 10px;
    cursor: pointer;
    line-height: 30px;
}

.contextmenu .contextmenu-item:hover {
    background: #eee;
}
</style>