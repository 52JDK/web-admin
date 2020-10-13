<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              type="password"
              placeholder="password"
              v-model="param.password"
              @keyup.enter.native="submitForm()"
          >
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button type="primary" @click="dialogVisible = true">运营账号</el-button>
          <el-dialog
              title="关注公众号，回复“运营账号”"
              :visible.sync="dialogVisible"
              width="24%"
          >
            <el-image
                src="http://ftp.52jdk.com/qrcode.jpg"/>
            <span slot="footer" class="dialog-footer">
  </span>
          </el-dialog>
        </div>
        <p class="login-tips">Tips : 游客账号直接登录即可(只能浏览)<br/>Tips : 运营账号(关注公众号，可以操作)</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import {userLogin} from "@/api";

export default {
  data: function () {
    return {
      dialogVisible: false,
      param: {
        username: 'user',
        password: 'root',
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
      },
    };
  },
  methods: {
    ...mapMutations(['changeLogin']),
    submitForm() {

      this.$refs.login.validate(valid => {
        if (valid) {
          let data = this.param;
          userLogin(data).then(res => {
            if (res.code == '0000') {
              this.userToken = 'Bearer ' + res.data.token;
              this.changeLogin({Authorization: this.userToken});
              this.$message.success('登录成功');
              localStorage.setItem('ms_username', res.data.userName);
              localStorage.setItem('ms_img', res.data.img);
              localStorage.setItem('ms_role', res.data.role);
              this.$router.push('/');
            } else {
              this.$message.error("登录失败");
            }
          })
        } else {
          this.$message.error('请输入账号和密码');
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 48%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>