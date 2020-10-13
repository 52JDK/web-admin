<template>
  <div class="sidebar">
    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="collapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                  v-if="subItem.subs"
                  :index="subItem.index"
                  :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                    v-for="(threeItem,i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                >{{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item
                  v-else
                  :index="subItem.index"
                  :key="subItem.index"
              >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus';

export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-lx-home',
          index: 'dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-reading',
          index: 'pages',
          title: '页面管理',
          subs: [
            {
              index: 'design',
              title: '首页装修'
            }
          ]
        },
        {
          icon: 'el-icon-shopping-bag-1',
          index: 'product',
          title: '商品管理',
          subs: [
            {
              index: 'productList',
              title: '商品列表'
            }, {
              index: 'addProduct',
              title: '新增商品',
            }
          ]
        },
        {
          icon: 'el-icon-tickets',
          index: 'order',
          title: '订单管理',
          subs: [
            {
              index: 'orderList',
              title: '订单列表'
            }
          ]
        },
        {
          icon: 'el-icon-lx-vipcard',
          index: 'coupon',
          title: '优惠券管理',
          subs: [
            {
              index: 'couponList',
              title: '优惠券列表'
            }, {
              index: 'addCoupon',
              title: '新增优惠券'
            }, {
              index: 'sendCoupon',
              title: "发送优惠券"
            }
          ]
        },
        {
          icon: 'el-icon-suitcase',
          index: 'activity',
          title: '活动管理',
          subs: [
            {
              index: 'coding1',
              title: '团购活动'
            }, {
              index: 'coding2',
              title: '邀请有奖'
            }, {
              index: 'coding3',
              title: "秒杀活动"
            }
          ]
        },
        {
          icon: 'el-icon-s-custom',
          index: 'permission',
          title: '权限管理',
          subs:[
            {
              index: 'permissionList',
              title: '权限列表'
            },{
              index: 'routeList',
              title: '路由管理'
            }
          ]
        },
        {
          icon: 'el-icon-lx-redpacket_fill',
          index: '/donate',
          title: '支持作者',
        },
        {
          icon: 'el-icon-lx-rechargefill',
          index: '/donateList',
          title: '赞赏列表',
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
      bus.$emit('collapse-content', msg);
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.sidebar > ul {
  height: 100%;
}
</style>
