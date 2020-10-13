<template>
    <div >
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-redpacket_fill"></i> 支持作者
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container1">
          <div class="plugins-tips">本后台基于 <a href="https://github.com/lin-xin/vue-manage-system">lin-xin </a>框架开发 , 如果该后台对你有帮助，可以请作者喝杯咖啡吧！有问题可以添加作者微信，拉你进群一起探讨问题，关注公众号回复 <a>“666”</a> 可以获取1000页+面试题</div>
            <div class="image-class">
              <span class="demonstration">赞赏二维码</span>
              <el-image
                  style="width: 200px; height: 200px"
                  src="http://ftp.52jdk.com/zanshang.JPG"
                 ></el-image>
            </div>
          <div class="image-class">
            <span class="demonstration">作者微信</span>
            <el-image
                style="width: 200px; height: 200px"
                src="http://ftp.52jdk.com/wx.jpg"
            ></el-image>
          </div>
          <div class="image-class">
            <span class="demonstration">公众号</span>
            <el-image
                style="width: 200px; height: 200px"
                src="http://ftp.52jdk.com/qrcode.jpg"
            ></el-image>
          </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.container1{
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  height: 500px;
}
.image-class{
  width: 250px;
  height: 250px;
  float: left;

}

.demonstration{
  margin-left: 60px;
  font-size: 18px;
}
</style>