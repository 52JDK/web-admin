# web-admin
小R商城 后台管理系统 的前端项目，基于Element+Vue 进行实现的 主要包括 装修页面、商品管理、订单管理、活动管理、优惠券管理、权限管理等，小R是一个后端工程师，只掌握了Vue一些基本用法，请大佬多多见谅！有建议或者疑问的话，大家可以提出来哦，欢迎一起讨论


[![image](https://img.shields.io/badge/QQ%E7%BE%A4-446227807-green)](http://qm.qq.com/cgi-bin/qm/qr?k=V8ZVep1J7__ZtMKrtVIAyyd16t4A_-NF&authKey=zIwYl0p5Xtaz%2FuRv9VYXcdmLkFwrJydeTL1iLzhBj9qKMqvTSpeJj8Yhb8eXqxJb&noverify=0&group_code=446227807)
[![image](https://img.shields.io/badge/%E5%B0%8FR-%E5%8D%9A%E5%AE%A2-orange)](http://52jdk.com)
[![image](https://img.shields.io/badge/CSDN-%E7%A8%8B%E5%BA%8F%E5%91%98%E5%B0%8FR-red)](https://blog.csdn.net/robot_sh)
### 项目预览
（1）在线预览地址：http://admin.52jdk.com

（2）后端代码地址：

### 项目截图
![首页](http://ftp.52jdk.com/%25Q%5B%5B18CTJ~AXPO5%29VM%25X%60YS.png)

![商品管理](http://ftp.52jdk.com/SLI0G7%7DPTLZG%5DUN8%7BT2JGIE.png)
![订单管理](http://ftp.52jdk.com/TA8U2%7BZHX%7D238%5DMDPAR4CLB.png)

### 项目目录
```shell
web-admin
├── public
│   ├── index.html              index.html
├── src
│   ├── api                     //api
│   │   ├── interface                //装修页接口
│   │   ├── coupon.js                //优惠券接口
│   │   ├── index.js                 //首页接口
│   │   ├── order.js                 //订单接口
│   │   ├── role.js                  //角色接口
│   │   └── router.js                //路由接口
│   ├── components              //公共组件
│   │   ├── common                   //头部侧边栏
│   │   └── page                     //公共页面
│   ├── html                    //html
│   │   └── index.html               //index.html
│   ├── layout
│   ├── resource                //资源
│   │   └── images                   //图片
│   ├── router                  //路由
│   │   └── index.js                 //index.js
│   ├── store                   //装修页资源
│   │   ├── modules                 
│   │   └── index.js
│   ├── system-components       //装修页公共组件
│   ├── ui-component            //装修页资源
│   ├── utils                   //util
│   │   └── request.js
│   ├── views                   //页面
│   │   ├── coupon                   //优惠券
│   │   ├── order                    //订单
│   │   ├── page                     //页面
│   │   ├── permission               //权限
│   │   └── product                  //路由
│   ├── App.vue                 //APP
│   └── main.js                 //main


```

### 项目运行


>（1）code 代码到本地

>（2）执行 npm install （前提有node环境）

>（3）执行 npm run dev （开发环境执行这个），生产环境（npm run build，将dist包丢到nginx中，配置好路由即可访问，有问题可以联系作者哦）

### 关于作者
> 微信群分享有限制，可以加我好友，或者关注公众号,回复“加群”即可

<img src="http://ftp.52jdk.com/ercode.jpg" width = "300px" height = "300px" alt=""  />


### 打赏
> 如果该项目对你有用可以请作者喝杯咖啡

<img src="http://ftp.52jdk.com/df6cd1778a5eccee391a8aad37a2206.jpg" width = "300px" height = "300px" alt=""  />


### 鸣谢

[lin-xin](https://github.com/lin-xin)

[CullenNg](https://github.com/CullenNg)

[element](https://github.com/ElemeFE/element)