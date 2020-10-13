import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export const constantRouterMap = [

    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: {title: '自述文件'},
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                meta: {title: '系统首页'}
            },
            {
                path: '/page',
                component: () => import(/* webpackChunkName: "page" */ '../views/page/HomePage.vue'),
                meta: {title: '首页管理'}
            },
            {
                path: '/orderList',
                component: () => import(/* webpackChunkName: "order" */ '../views/order/orderList.vue'),
                meta: {title: '订单管理'}
            },
            {
                path: '/orderDetail',
                name: 'orderDetail',
                component: () => import(/* webpackChunkName: "order" */ '../views/order/orderDetail.vue'),
                meta: {title: '订单详情'}
            },
            {
                path: '/productList',
                component: () => import(/* webpackChunkName: "product" */ '../views/product/productList.vue'),
                meta: {title: '商品列表'}
            },
            {
                path: '/couponList',
                name: 'couponList',
                component: () => import(/* webpackChunkName: "coupon" */ '../views/coupon/couponList.vue'),
                meta: {title: '优惠券列表'}
            }, {
                path: '/addCoupon',
                name: 'addCoupon',
                component: () => import(/* webpackChunkName: "coupon" */ '../views/coupon/addCoupon.vue'),
                meta: {title: '新增优惠券'}
            },
            {
                path: '/sendCoupon',
                name: 'sendCoupon',
                component: () => import(/* webpackChunkName: "coupon" */ '../views/coupon/sendCoupon.vue'),
                meta: {title: '发送优惠券'}
            },

            {
                path: '/addProduct',
                name: 'addProduct',
                component: () => import(/* webpackChunkName: "product" */'../views/product/addProduct.vue'),
                meta: {title: '新增商品'}
            },
            {
                path: '/permissionList',
                name: 'permissionList',
                component: () => import(/* webpackChunkName: "permission" */'../views/permission/permissionList.vue'),
                meta: {title: '权限列表'}
            },
            {
                path: '/routeList',
                name: 'routeList',
                component: () => import(/* webpackChunkName: "route" */'../views/permission/routeList.vue'),
                meta: {title: '路由管理'}
            },
            {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: {title: '404'}
            },
            {
                path: '/403',
                component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                meta: {title: '403'}
            },
            {
                path: '/donate',
                component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                meta: {title: '支持作者'}
            },
            {
                path: '/donateList',
                component: () => import(/* webpackChunkName: "donate" */ '../components/page/DonateList.vue'),
                meta: {title: '赞赏列表'}
            },
            {
                path: '/design',
                meta: {title: '装修页'},
                component: () => import(/* webpackChunkName: "design" */'../views/page/design/index.vue')
            },
            {
                path: '/tabs',
                meta: {title: '消息页'},
                component: () => import(/* webpackChunkName: "tabs" */'../components/page/Tabs.vue')
            },
            {
                path: '/coding',
                meta: {title: '敬请期待'},
                component: () => import(/* webpackChunkName: "coding" */'../components/page/Coding.vue')
            },
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
        meta: {title: '登录'}
    },
    {
        path: '*',
        redirect: '/404'
    },
    {path: '*', redirect: '/404', hidden: true}
]


// 路由实例
const router = new Router({
    routes: constantRouterMap,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    next();
});

export default router;
