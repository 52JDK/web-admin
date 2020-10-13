<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 订单管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box-order">
        <el-input v-model="query.uid" placeholder="uid" style="width: 180px;"></el-input>
        <el-input v-model="query.orderCode" placeholder="订单号" style="width: 180px;"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
          :data="tableData"
          border
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="orderCode" label="订单号" align="center"></el-table-column>
        <el-table-column prop="uid" label="uid" align="center"></el-table-column>
        <el-table-column prop="point" label="使用积分" align="center"></el-table-column>
        <el-table-column label="实付金额" align="center">
          <template slot-scope="scope">￥{{ scope.row.orderAmount }}</template>
        </el-table-column>
        <el-table-column label="订单总额" align="center">
          <template slot-scope="scope">￥{{ scope.row.orderAmount }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100px">
          <template slot-scope="scope">
            <el-tag :type="orderStatusType( scope.row.orderStatus)">
              {{ scope.row.orderStatus | orderStatusFilter }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" align="center" width="150px"
                         :formatter="dateFormat"></el-table-column>
        <el-table-column prop="name" label="收货人姓名" align="center"></el-table-column>
        <el-table-column prop="phone" label="收货人电话" align="center"></el-table-column>
        <el-table-column prop="marks" label="备注" align="center"></el-table-column>
        <el-table-column prop="marks" label="操作">
          <template slot-scope="scope">
            <el-button
                type="text"
                icon="el-icon-document"
                style="color: #78C850"
                @click="handleCheck(scope.$index, scope.row)"
            >查看
            </el-button>
            <el-button
                type="text"
                icon="el-icon-lx-present"
                style="color: #ffc300"
                v-if="scope.row.orderStatus===2"
                @click="handleSend(scope.$index, scope.row)"
            >发货
            </el-button>
            <el-button
                type="text"
                icon="el-icon-lx-redpacket"
                style="color: red"
                v-if="scope.row.orderStatus===4"
            >退款
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="query.pageIndex"
            :page-size="query.pageSize"
            :total="pageTotal"
            @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="500px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="订单号:">
          <label v-model="form.orderCode">{{ form.orderCode }}</label>
        </el-form-item>
        <el-form-item label="快递公司:">
          <el-select v-model="form.expressCompany" placeholder="请选择">
            <el-option
                v-for="item in expressCompany"
                :key="item.value"
                :label="item.value"
                :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号:">
          <el-input v-model="form.expressCode" style="width: 187px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import {OrderDelivery, orderList} from "@/api/order";
import moment from "moment";
import Message from "element-ui/packages/message/src/main";

export default {

  data() {
    return {
      query: {
        uid: '',
        orderCode: '',
        pageIndex: 1,
        pageSize: 10
      },
      dialogVisible: false,
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      expressCompany: [
        {
          value: "顺丰"
        }, {
          value: "圆通"
        }, {
          value: "申通"
        }, {
          value: "韵达"
        }, {
          value: "中通"
        }, {
          value: "EMS"
        }, {
          value: "邮政"
        }, {
          value: "天天"
        }
      ]
    };
  },
  filters: {
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
    this.getData();
  },
  methods: {
    handleCheck(index, row) {
      this.$router.push({
        name: 'orderDetail',
        params: {
          orderCode: this.tableData[index].orderCode,
          saveView: 1
        }
      })
    },
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

    getData() {
      orderList(this.query).then(res => {
        if (res.code == "0000") {
          this.tableData = res.data.list;
          this.pageTotal = res.data.total
        } else {
          Message.error(res.message)
        }
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
          .then(() => {
            this.$message.success('删除成功');
            this.tableData.splice(index, 1);
          })
          .catch(() => {
          });
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    dateFormat: function (row, column) {

      var date = row[column.property];

      if (date == undefined) {
        return ''
      }
      ;

      return moment(date).format("YYYY-MM-DD HH:mm:ss")

    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleSend(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      OrderDelivery(this.form).then(res => {
        if (res.code === "0000") {
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
        this.editVisible = false;
      })
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
};
</script>

<style>
.handle-box-order {
  margin-bottom: 20px;
}

.handle-box-order .el-input__inner {
  width: 150px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}

.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
