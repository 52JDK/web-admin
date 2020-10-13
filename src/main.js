import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {messages} from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
// ant-design
import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios';
Vue.use(Antd);

import Moment from 'vue-moment'

Vue.use(Moment);

import {Modal, message} from 'ant-design-vue/es';

Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;
// axios.defaults.withCredentials = true

// 前端数据中心
import store from './store/index.js'

// 新统一样式弹出层
import dialog from './system-components/dialog/dialog.vue'

Vue.component('design-dialog', dialog);

// 接口
import api from './api/interface/index.js'

Vue.prototype.$api = api;

// 所有的UI组件的公共控件
import All_form_unit from './system-components/form-unit/index.js';

Vue.use(All_form_unit);

import All_ui_unit from './ui-component/component-unit/index.js'; // 所有的UI组件的公共控件
Vue.use(All_ui_unit);

// 组件级别懒加载
import VueLazyComponent from '@xunlei/vue-lazy-component';

Vue.use(VueLazyComponent);

// pixel 转 rem
Vue.prototype.$px2rem = function (pixel = 0) {
    return (pixel / 75) + 'rem';
};


Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title}`;
    const role = localStorage.getItem('ms_username');
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
        next('/login');
    } else if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});


new Vue({
    el: '#app',
    router,
    store: store,
    render: h => h(App)
});

// new Vue({
//     router,
//     i18n,
//     store,
//     render: h => h(App)
// }).$mount('#app');
