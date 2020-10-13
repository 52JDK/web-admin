`
<template>
  <div>
    <div class="container">
      <el-form ref="form" label-position="left" :model="form" label-width="100px">
        <div class="select-form">
          <el-form-item label="优惠券名称" prop="discount">
            <el-input v-model="form.couponName" label-width="50px" class="form-active-input" disabled>
            </el-input>
            <el-button type="text" icon="el-icon-search" style="margin-left: 20px;" @click="handleChoose">选择优惠券
            </el-button>
          </el-form-item>
        </div>

        <el-form-item label="uid" prop="discount">
          <el-input v-model="form.uidList" placeholder="多个uid用英文逗号隔开" type="textarea" label-width="50px"
                    class="form-active-input"></el-input>
        </el-form-item>
        <el-button type="primary" @click="sendCoupon">发 送</el-button>
      </el-form>

    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="80%"
    >
      <div class="handle-box" style="margin-bottom: 20px">
        <el-input v-model="query.couponName" placeholder="优惠券名称" style="width: 180px;"></el-input>
        <el-select v-model="query.type" placeholder="优惠券类型" style="margin-left: 40px">
          <el-option
              v-for="item in options"
              :key="item.label"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-date-picker
            v-model="query.time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            style="margin-left: 20px">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 20px;" @click="handleSearch">搜索</el-button>
      </div>
      <div>
        <el-table
            :data="couponList"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
          <el-table-column label="序号" prop="id" align="center" width="50px"></el-table-column>
          <el-table-column label="优惠券名称" prop="couponName" align="center"></el-table-column>
          <el-table-column label="优惠券简介" prop="content" width="180px" align="center"></el-table-column>
          <el-table-column label="优惠券类型" prop="type" align="center">
            <template slot-scope="scope">
              <el-tag :type="couponType( scope.row.type)">
                {{ scope.row.type | couponType }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="优惠券面额" align="center">
            <template slot-scope="scope">
              {{ scope.row | couponDiscount }}
            </template>
          </el-table-column>
          <el-table-column label="优惠券门槛" prop="threshold" align="center"></el-table-column>
          <el-table-column label="已发送" prop="sendQuantity" align="center">
            <template slot-scope="scope">
              {{ scope.row.sendQuantity == null ? 0 : scope.row.sendQuantity }}
            </template>
          </el-table-column>
          <el-table-column label="总数量" prop="quantity" align="center"></el-table-column>
          <el-table-column label="开始时间" :formatter="dateFormat" prop="validDate" width="150px"
                           align="center"></el-table-column>
          <el-table-column label="结束时间" :formatter="dateFormat" prop="invalidDate" width="150px"
                           align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  @click="handleCheck(scope.$index, scope.row)"
              >选择
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {couponList, sendCoupon} from "@/api/coupon";
import moment from "moment";

export default {
  name: "couponList",
  data() {
    return {
      form: {
        couponId: '',
        couponName: '',
        uidList: '',
      },
      query: {
        pageIndex: 1,
        pageSize: 10,
        couponName: '',
        type: '',
        time: [],
      },
      options: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '满减券'
        }, {
          value: '2',
          label: '满折券'
        },
      ],
      pageTotal: 0,
      dialogVisible: false,
      couponList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: ''
    }
  },
  methods: {
    handleChoose() {
      couponList(this.query).then(res => {
        if (res.code == "0000") {
          this.couponList = res.data.list;
          this.pageTotal = res.data.total
        } else {
          this.$message.error(res.message)
        }
      })
      this.dialogVisible = true

    },
    handleCheck(index, row) {
      this.dialogVisible = false
      this.form.couponId = row.id
      this.form.couponName = row.couponName
    },
    sendCoupon() {
      sendCoupon(this.form).then(res => {
        if (res.code == '0000') {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    couponType(status) {
      if (status === 1) {
        return "danger"
      }
      if (status === 2) {
        return "success"
      }
    },
    dateFormat: function (row, column) {
      let date = row[column.property];
      if (date === undefined) {
        return ''
      }
      ;

      return moment(date).format("YYYY-MM-DD HH:mm:ss")

    },
    handleSearch() {
      if (this.query.time == null) {
        let time = [];
        this.query.time = time
      }
      couponList(this.query).then(res => {
        if (res.code == "0000") {
          this.couponList = res.data.list;
          this.pageTotal = res.data.total
        } else {
          this.$message.error(res.message)
        }

      })
    },
  },
  filters: {
    couponType(type) {
      if (type === 1) {
        return "满减券"
      } else {
        return "满折券"
      }
    },

    couponDiscount(row) {
      if (row.type === 1) {
        return row.amount + "元"
      } else {
        return row.discount + "折"
      }
    },
  },
}
</script>

<style>
.form-active-input {
  width: 200px;
}

.container .el-input__inner {
  width: 200px;
}

.select-form {
  display: inline-block;
}
</style>
