import 'ASSETS/css/common.less';

import Vue from 'vue';
import App from './item.vue';
import store from 'VIEWS/web/store'

// 引入全局metainfo，更改页面title，meta信息
import MetaInfo from 'vue-meta-info';
Vue.use(MetaInfo);

// 把封装的api挂载到vue上
import api from 'API';
Vue.prototype.$api = api;

// 引入全局message提示方法
import vMessage from '@/Message/index';
Vue.use(vMessage)

// 图片懒加载
import VueLazyload from 'vue-lazyload';
const loadingImg = '//img.zaozuo.com/928e19b258d64af5416f84781a894ae7';
Vue.use(VueLazyload, {
    error: loadingImg,
    loading: loadingImg,
    attempt: 1,
    listenEvents: [ 'scroll', 'touchmove', 'transitionend', 'animationend' ]
});

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');