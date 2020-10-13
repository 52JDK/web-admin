import axios from 'axios';
import router from "@/router";
import {Message, MessageBox} from 'element-ui'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: '/api',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        if (localStorage.getItem('Authorization')) {
            config.headers.Authorization = localStorage.getItem('Authorization');
        }
        return config;
    },
    error => {
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {

        if (response.status === 200) {
            if (response.data.code == '1004' || response.data.code=="1008") {
                Message.error("请登录")
                router.replace({
                    path: '/login',
                })
            }
                else {
                return response.data;
            }
        } else {
            return Promise.reject();
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    this.$store.commit('del_token');
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
                case 404:
                    Message.error("请登录")
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data)

    }
);


export default service;
