import Vuex from 'vuex';
import Vue from 'vue';
import design from './modules/design'; // 装修模块
import page from './modules/page'; // 页面公共信息模块

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },

    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin(state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        }
    },
    modules: {
        design,
        page,
    }
});

export default store;
