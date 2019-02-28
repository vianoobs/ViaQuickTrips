import Vue from 'vue';
import Vuetify from 'vuetify'
import App from './App.vue';
import router from './router';
import store from './store/store';
import 'vuetify/dist/vuetify.min.css'
// import './registerServiceWorker';
// import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@fortawesome/fontawesome-free/css/all.css';
Vue.config.productionTip = false;
Vue.use(Vuetify);

var app = new Vue({
    router: router,
    store: store,
    render: function (h) { return h(App); },
}).$mount('#app');
export default app;
//# sourceMappingURL=main.js.map


