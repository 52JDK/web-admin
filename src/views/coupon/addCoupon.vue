<template>
  <div>
    <div class="container">
      <div content="container-form" class="container-form-coupon">
        <el-form ref="form" label-position="left" :rules="rule" :model="form" label-width="100px">
          <el-form-item label="优惠券名称" prop="couponName">
            <el-input v-model="form.couponName" placeholder="优惠券名称" label-width="50px"
                      class="form-active-input"></el-input>
          </el-form-item>

          <el-form-item label="优惠券简介" prop="content">
            <el-input
                type="textarea"
                :rows="2"
                placeholder="优惠券简介"
                v-model="form.content"
                style="width: 200px">
            </el-input>
          </el-form-item>
          <el-form-item label="优惠券类型" prop="type">
            <el-radio-group v-model="form.type" @change="changeType">
              <el-radio label="1">满减券</el-radio>
              <el-radio label="2">满折券</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优惠券折扣" v-if="viewType==1" prop="discount">
            <el-input v-model="form.amount" placeholder="单位元" label-width="50px" class="form-active-input"></el-input>
          </el-form-item>
          <el-form-item label="优惠券折扣" v-if="viewType==2" prop="amount">
            <el-input v-model="form.discount" placeholder="单位折" label-width="50px" class="form-active-input"></el-input>
          </el-form-item>
          <el-form-item label="优惠券门槛" prop="threshold">
            <el-input v-model="form.threshold" placeholder="优惠券门槛" label-width="50px"
                      class="form-active-input"></el-input>
          </el-form-item>

          <el-form-item label="优惠券数量" prop="quantity">
            <el-input v-model="form.quantity" placeholder="优惠券数量" label-width="50px" class="form-active-input">

            </el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="validDate">
            <div class="block">
              <el-date-picker
                  v-model="form.validDate"
                  type="datetime"
                  placeholder="选择开始日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="结束时间" prop="invalidDate">
            <el-date-picker
                v-model="form.invalidDate"
                type="datetime"
                placeholder="选择结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="back-class">
          <el-button type="primary" style="width: 80px" @click="back">返回</el-button>
          <el-button type="danger" style="width: 80px" :loading="false" @click="onSubmit('form')">保存</el-button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

import {addCoupon, findCouponById} from "@/api/coupon";
import Message from "element-ui/packages/message/src/main";

export default {

  data() {
    return {
      viewType: 1,
      usableNum: 0,
      form: {
        id: '',
        couponName: '',
        type: '',
        validDate: '',
        invalidDate: '',
        quantity: 0,
        content: '',
        threshold: '',
        discount: '',
        amount: '',
      },
      rule: {
        couponName: [
          {required: true, message: '请输入优惠券名称', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '请输入优惠券简介', trigger: 'blur'},
        ],
        threshold: [
          {required: true, message: '请输入优惠券门槛', trigger: 'blur'}
        ],
        quantity: [
          {required: true, message: '请输入优惠券数量', trigger: 'blur'}
        ],
        validDate: [
          {required: true, message: '请输入优惠券开始时间', trigger: 'blur'}
        ],
        invalidDate: [
          {required: true, message: '请输入优惠券结束时间', trigger: 'blur'}
        ],
      },
    }
  },
  filters: {},
  created() {
    let couponId = this.$route.params.couponId
    this.form.id = couponId;
    findCouponById(couponId).then(res => {
      if (res.code == "0000") {
        this.form = res.data
        this.form.type = res.data.type + "";
      } else {
        Message.error(res.message);
      }
    })

  },
  methods: {
    changeType() {
      this.viewType = this.form.type;

    },
    back() {
      this.$router.go(-1);
    },
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          addCoupon(this.form).then(res => {
            if (res.code == "0000") {
              this.$router.push({path: 'couponList'});
              this.$message({
                message: '添加成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '添加失败',
                type: 'error'
              });
            }
          })
        }
      })
    },
  },

}
</script>

<style>
.el-date-picker__editor-wrap .el-input__inner {
  width: 150px;
}

.container-form-coupon .el-input__inner {
  width: 220px !important;
}

.container-form-coupon .el-textarea__inner {
  width: 220px !important;
}

.back-class {
  padding-top: 50px;
  margin-left: 150px
}

</style>

