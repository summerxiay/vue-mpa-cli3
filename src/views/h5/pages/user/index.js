import 'ASSETS/css/common.less';

import Vue from 'vue';
import App from './user.vue';
import router from './router';

// 引入全局metainfo，更改页面title，meta信息
import MetaInfo from 'vue-meta-info';
Vue.use(MetaInfo);

// 把封装的api挂载到vue上
import api from 'API';
Vue.prototype.$api = api;

// 引入全局message提示方法
import vMessage from '@/Message';
Vue.use(vMessage)

// 移动端点击延迟300ms兼容处理
import FastClick from 'fastclick';
FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');