import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
Vue.use(Router);
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/selection',
            name: 'selection',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: function () { return import(/* webpackChunkName: "about" */ './views/Selection.vue');
            },
        },
        {
            path: '/routepreview/:card',
            name: 'routepreview',
            component: function () { return import('./views/RoutePreview.vue');
            },
        },
        {
            path:'/profile',
            name:'profile',
            component: function () {return import('./views/Profile')}
        }
    ],
});
//# sourceMappingURL=router.js.map