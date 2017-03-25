import Vue from 'vue';
import VueRouter from 'vue-router';
/* eslint-disable */
import MyApi from 'MyApi';
/* eslint-enable */
import './styles/main.scss';

const Properties = {
    props: ['entity'],
    template: `
        <div>
            <div class="mui-panel">
                <div class="mui-form">
                    Showing {{ items.length }} of {{ length }} properties
                    <div  class="mui-textfield">
                        <input v-on:keyup="search" v-model="q" type="text" placeholder="Filter properties" value="">
                    </div>
                </div>
            </div>
            <table class="mui-table mui-table--bordered">
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.name }}</td>
                        <td>{{ item.type }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    methods: {
        search() {
            this.items = this.api.search(this.q);
        }
    },
    data: function () {
        const api = MyApi.aggegate(this.entity);
        return {
            q: '',
            api,
            items: api.items,
            length: api.items.length
        };
    }
};

////
// @see vue-router examples: https://github.com/vuejs/vue-router/tree/dev/examples
////

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

// 2. Define route components
const Home = {
    components: { Properties },
    template: '<div><h1>Window properties</h1><properties v-bind:entity="entity" /></div>',
    data() {
        return {
            entity: window
        };
    }
};

const Document = {
    components: { Properties },
    template: '<div><h1>Document properties</h1><properties v-bind:entity="entity" /></div>',
    data() {
        return {
            entity: window.document
        };
    }
};

const Navigator = {
    components: { Properties },
    template: '<div><h1>Navigator properties</h1><properties v-bind:entity="entity" /></div>',
    data() {
        return {
            entity: window.navigator
        };
    }
};

const getStyles = function () {
    const r = {};
    const styles = window.getComputedStyle(document.body);
    for (let i = 0; i < styles.length; i += 1) {
        r[styles[i]] = styles.getPropertyValue(styles[i]);
    }
    return r;
};

const StyleSheets = {
    components: { Properties },
    template: '<div><h1>Navigator properties</h1><properties v-bind:entity="entity" /></div>',
    data() {
        return {
            entity: getStyles()
        };
    }
};

// 3. Create the router
const router = new VueRouter({
    mode: 'hash', //'history',
    base: __dirname,
    routes: [
        { path: '/', component: Home },
        { path: '/document', component: Document },
        { path: '/navigator', component: Navigator },
        { path: '/stylesheets', component: StyleSheets }
    ]
});

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
new Vue({
    router,
    template: `
    <div id="app">
        <div id="sidebar" class="mui--text-light">
            <h1>Demo</h1>
            <ul>
                <li><router-link to="/">/Window</router-link></li>
                <li><router-link to="/navigator">/Navigator</router-link></li>
                <li><router-link to="/document">/Document</router-link></li>
                <li><router-link to="/stylesheets">/StyleSheets</router-link></li>
            </ul>
        </div>
        <div id="content" class="mui-container-fluid">
            <div class="mui-row">
                <div class="mui-col-sm-10 mui-col-sm-offset-1">
                    <router-view class="view"></router-view>
                </div>
            </div>
        </div>
    </div>
  `
}).$mount('#app');
