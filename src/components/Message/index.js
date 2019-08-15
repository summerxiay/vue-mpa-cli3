import Message from './Message.vue';

const MESSAGE = {
    duration: 1500,  // 显示时间 ms
    animateTime: 200, // 动画时间， 表示这个组件切换到show所需的时间 ms
    install(Vue) {
        if (typeof window !== 'undefined' && window.Vue) {
            Vue = window.Vue;
        }
        Vue.component('Message', Message);
        let newMessage;
        function msg(type, text, callBack) {
            let msg, 
                duration = MESSAGE.duration;
            close(); // 先关闭之前的对话框
            if (typeof text === 'string') {
                msg = text;
            }
            else if (text instanceof Object) {
                msg = text.text || '';
                text.duration ? duration = text.duration : null;
            }
            let VueMessage = Vue.extend({
                render(h) {
                    let props = {
                        type,
                        text: msg,
                        show: this.show
                    };
                    return h('message', {props});
                },
                data() {
                    return {
                        show: false
                    }
                }
            });
            newMessage = new VueMessage();
            let vm = newMessage.$mount();
            let el = vm.$el;
            document.body.appendChild(el);  // 把生成的提示的dom插入body中
            vm.show = true;
            // 如果是loading不自动关闭
            if (type === 'loading') return;

            let t1 = setTimeout(() => {
                clearTimeout(t1);
                vm.show = false;  // 隐藏提示组件，此时会有300ms的动画效果，等动画效果过了再从body中移除dom
                let t2 = setTimeout(() => {
                    clearTimeout(t2);
                    document.body.removeChild(el);  // 从body中移除dom
                    newMessage.$destroy();
                    vm = null;  // 设置为null，好让js垃圾回收算法回收，释放内存

                    callBack && (typeof callBack === 'function') && callBack();  // 如果有回调函数就执行，没有就不执行，用&&操作符
                }, MESSAGE.animateTime);
            }, duration);
        };

        function close() {
            let vm = newMessage.$mount();
            let el = vm.$el;
            vm.show = false;
            document.body.removeChild(el);
            newMessage.$destroy();
            vm = null;
        };

        // 挂在到Vue原型上，暴露六个方法
        Vue.prototype.$message = {
            loading(text, callBack) {
                msg('loading', text, callBack);
            },
            info(text, callBack) {
                if (!text) return;
                msg('info', text, callBack);
            },
            success(text, callBack) {
                if (!text) return;
                msg('success', text, callBack);
            },
            error(text, callBack) {
                if (!text) return;
                msg('error', text, callBack);
            },
            warning(text, callBack) {
                if (!text) return;
                msg('warning', text, callBack);
            },
            close() {
                close();
            }
        }
    }
};

export default MESSAGE;
