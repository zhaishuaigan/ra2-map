var app = {
    assets: "",
    zIndex: 1,
    config: null,
    desktop: null,
    windows: [],
    appList: [],
    vue: null,
    load(url) {
        const { loadModule } = window['vue3-sfc-loader'];
        return Vue.defineAsyncComponent(() => loadModule(this.assets + url, this.getOptions()))
    },
    loadJson(url) {
        return fetch(this.assets + url).then(res => res.json());
    },
    getAssetsPath() {
        if (this.assets) {
            return this.assets;
        }
        document.querySelectorAll("script").forEach((script) => {
            if (script.src.indexOf("init.js") > -1) {
                this.assets = script.src.replace('/common/init.js', '/');
            }
        });
        return this.assets;
    },
    getAssetsUrl(path) {
        return this.getAssetsPath() + path;
    },
    async loadDirective(name) {
        return (await import(this.getAssetsUrl('directives/' + name + '.js'))).default;
    },
    getOptions() {
        return {
            moduleCache: {
                vue: Vue
            },
            async getFile(url) {
                const res = await fetch(url);
                if (!res.ok)
                    throw Object.assign(new Error(res.statusText + ' ' + url), { res });
                return {
                    getContentData: asBinary => asBinary ? res.arrayBuffer() : res.text(),
                }
            },
            addStyle(textContent) {
                const style = Object.assign(document.createElement('style'), { textContent });
                const ref = document.head.getElementsByTagName('style')[0] || null;
                document.head.insertBefore(style, ref);
            },
        }
    },
    async run() {
        this.getAssetsPath();
        this.createApp();
    },
    async createApp() {
        this.config = await this.loadJson("app/config.json");
        this.components = {};
        this.config.appList.forEach(item => {
            this.components[item.name] = this.load(`${item.path}${item.index}`);
        });
        this.config.taskbar.forEach(item => {
            this.components[item.name] = this.load(`${item.path}${item.index}`);
        });
        this.vue = Vue.createApp({
            components: {
                Screen: this.load('system/screen.vue'),
            }
        });
        var drag = await this.loadDirective('drag');
        console.log(drag);
        this.vue.directive('drag', await this.loadDirective('drag'));
        this.vue.directive('resize', await this.loadDirective('resize'));
        this.vue.mount('#app')
    }
};

app.run();
window.app = app;