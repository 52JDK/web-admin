<template>
  <div class="container">
    <div class="container-center">

      <div class="people-receive">
        <div class="container-people">
          <i class="el-icon-user-solid" style="font-size: 20px"> 收货信息 </i>
        </div>
        <el-table :data="orderAddress">
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="tel" label="电话" align="center"></el-table-column>
          <el-table-column prop="province" label="省" align="center"></el-table-column>
          <el-table-column prop="city" label="市" align="center"></el-table-column>
          <el-table-column prop="county" label="区" align="center"></el-table-column>
          <el-table-column prop="addressDetail" label="详细地址" align="center"></el-table-column>
        </el-table>
      </div>

      <div class="container-title">
        <i class="el-icon-s-goods" style="font-size: 20px"> 商品行信息</i>
      </div>
      <div class="container-order">
        <el-table :data="orderLineTable">
          <el-table-column prop="sku" label="sku" align="center"></el-table-column>
          <el-table-column prop="productName" label="商品名称" width="160px"></el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <el-image
                  class="table-td-thumb"
                  :src="scope.row.image"
                  :preview-src-list="[scope.row.image]"

              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="" label="商品属性"></el-table-column>
          <el-table-column prop="quantity" label="商品数量" align="center"></el-table-column>
          <el-table-column prop="price" label="商品单价" align="center"></el-table-column>
          <el-table-column prop="price" label="小计" align="center"></el-table-column>
        </el-table>
        <div class="order-total">
          <a>共计:</a>{{ orderTable.totalNum }}件 <a>应付:</a>{{ orderTable.orderAmount }}元
        </div>
      </div>
      <div class="order-message">
        <div class="container-title">
          <i class="el-icon-s-order" style="font-size: 20px"> 订单信息 </i>
        </div>
        <table class="mailTable" cellspacing="0" cellpadding="0">
          <tr>
            <td class="column">uid</td>
            <td>{{ orderTable.uid }}</td>
            <td class="column">订单编号</td>
            <td>{{ orderTable.orderCode }}</td>
          </tr>
          <tr>
            <td class="column">订单状态</td>
            <td>
              <el-tag :type="orderStatusType( orderTable.orderStatus)">
                {{ orderTable.orderStatus | orderStatusFilter }}
              </el-tag>
            </td>
            <td class="column">运费</td>
            <td>￥{{ orderTable.freightAmount }}</td>
          </tr>
          <tr>
            <td class="column" style="color: red">应付金额</td>
            <td style="color: red">￥{{ orderTable.orderAmount }}</td>
            <td class="column" style="color: #00a854">积分抵现</td>
            <td style="color: #00a854"> ￥{{ orderTable.point / 100 }}</td>
          </tr>
          <tr>
            <td class="column" style="color: red;font-weight:bold">实付金额</td>
            <td style="color: red; ">￥{{ orderTable.payAmount }}</td>
            <td class="column" style="color: #00a854">优惠券优惠</td>
            <td style="color: #00a854">￥{{
                orderTable.discountAmount === undefined ? 0 : orderTable.discountAmount
              }}
            </td>
          </tr>
          <tr>
            <td class="column">快递公司</td>
            <td>{{ orderTable.expressCompany }}</td>
            <td class="column">快递单号</td>
            <td>{{ orderTable.expressCode }}</td>
          </tr>
          <tr>
            <td class="column">备注</td>
            <td colspan="3">{{ orderTable.remarks }}</td>
          </tr>
          <tr>
            <td class="column">订单创建时间</td>
            <td>{{ orderTable.createTime | dateFormat }}</td>
            <td class="column">订单支付时间</td>
            <td>{{ orderTable.payTime | dateFormat }}</td>
          </tr>
          <tr>
            <td class="column">快递发货时间</td>
            <td>{{ orderTable.shipTime | dateFormat }}</td>
            <td class="column">用户收货时间</td>
            <td>{{ orderTable.receiptTime | dateFormat }}</td>
          </tr>
        </table>
      </div>
      <div class="order-log">
        <div class="order-log-icon">
          <i class="el-icon-s-tools" style="font-size: 20px"> 操作日志 </i>
        </div>
        <el-table :data="orderLog">
          <el-table-column label="序号" type="index" align="center"></el-table-column>
          <el-table-column label="管理员" prop="manager" align="center"></el-table-column>
          <el-table-column label="操作内容" prop="controlLog" align="center"></el-table-column>
          <el-table-column label="操作时间" prop="createTime" :formatter="dateFormat" align="center"></el-table-column>
        </el-table>
      </div>


    </div>
  </div>

</template>
<script>
import {orderDetail} from "@/api/order";
import moment from "moment";

export default {
  data() {
    return {
      orderLineTable: [],
      orderTable: {},
      orderAddress: [],
      orderLog: [],
    }
  },
  filters: {
    dateFormat(date) {
      if (date === undefined || date === null) {
        return ''
      }
      ;
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },

    orderStatusFilter(orderStatus) {
      if (orderStatus === 0) {
        return "未支付"
      }
      if (orderStatus === 2) {
        return "已支付"
      }
      if (orderStatus === 3) {
        return "已发货"
      }
      if (orderStatus === 4) {
        return "取消中"
      }
      if (orderStatus === 5) {
        return "已退货"
      }
      if (orderStatus === 6) {
        return "已收货"
      }
    }
  },
  created() {
    orderDetail(this.$route.params.orderCode).then(res => {
      if (res.code == "0000") {
        this.orderTable = res.data.order
        this.orderLineTable = res.data.orderLineList
        this.orderAddress = res.data.userAddress
        this.orderLog = res.data.orderLogs;
      } else {
        this.$message.error(res.message)
      }
    })
  },
  methods: {
    orderStatusType(status) {
      if (status === 0) {
        return "warning"
      }
      if (status === 2 || status === 3 || status === 6) {
        return "success"
      }
      if (status === 4 || status === 5) {
        return "danger"
      }

    },
    dateFormat: function (row, column) {

      var date = row[column.property];

      if (date == undefined) {
        return ''
      }
      ;

      return moment(date).format("YYYY-MM-DD HH:mm:ss")

    },
  }
}
</script>
<style>
.container-order {
  width: 80%;
  margin-left: 10%;
}

.container-people {
  margin-top: 20px;
  margin-bottom: 20px;
}

.container-center {
  width: 80%;
  height: 100%;
  margin-left: 10%;

}

.people-receive {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
  margin-bottom: 20px;
}

.container-title {
  width: 80%;
  margin-left: 10%;
  margin-top: 50px;
  margin-bottom: 20px;
}

.order-log {
  width: 80%;
  margin-left: 10%;
  margin-top: 50px;
}

.mailTable {
  width: 80%;
  border-top: 1px solid #E6EAEE;
  border-left: 1px solid #E6EAEE;
  margin-left: 10%;
}

.mailTable tr td {
  width: 30%;
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  padding: 0 10px;
  text-align: center;
  border-bottom: 1px solid #E6EAEE;
  border-right: 1px solid #E6EAEE;
}

.order-log-icon {
  margin-top: 20px;
  margin-bottom: 20px;
}

.mailTable tr td.column {
  background-color: #F5F7FA;
  color: #393C3E;
  width: 20%;
  font-family: verdana, arial, sans-serif;

}

.order-total {
  margin: 20px;
  float: right;
  color: red !important;
  font-family: SimHei, serif;
  font-size: 18px;
}

.order-message {
  margin-top: 80px;
}

</style>