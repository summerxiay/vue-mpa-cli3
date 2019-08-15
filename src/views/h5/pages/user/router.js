import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/user/me',
        component: () => import('./userModules.vue')
    },
    {
        path: '/user/presonal',
        name: 'presonal',
        component: () => import('./personal.vue')
    },
];

export default new VueRouter({
    mode: 'history',
    routes
});