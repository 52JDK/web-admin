<template>
  <div>
    <div class="container">
      <div class="handle-box-list">
        <el-input v-model="query.couponName" placeholder="优惠券名称" style="width: 180px;"></el-input>
        <el-select v-model="query.type" placeholder="优惠券类型" style="margin-left: 20px !important">
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
            style="margin-left: 20px">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 20px !important;" @click="handleSearch">搜索</el-button>
      </div>
      <div class="coupon-table">
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
                  type="text"
                  icon="el-icon-document"
                  style="color: #E6A23C"
                  @click="handleCheck(scope.$index, scope.row)"
              >查看
              </el-button>
              <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
              >编辑
              </el-button>
              <el-button
                  type="text"
                  icon="el-icon-delete"
                  style="color: red"
                  @click="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
  </div>
</template>
<script>
import {couponList, deleteCoupon} from "@/api/coupon";
import moment from "moment";
import {deleteProduct} from "@/api";
import Message from "element-ui/packages/message/src/main";

export default {
  name: "couponList",
  data() {
    return {
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
  created() {
    this.getData(this.query);
  },
  methods: {
    getData(params) {
      couponList(params).then(res => {
        if(res.code=="0000"){
          this.couponList = res.data.list;
          this.pageTotal = res.data.total
        }else{
          Message.error(res.message)
        }
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        name: 'addCoupon',
        params: {
          couponId: this.couponList[index].id,
        }
      })

    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
          .then(() => {
            deleteCoupon(this.couponList[index].id).then(res => {
              if (res.code === "0000") {
                this.$message.success('删除成功');
                this.couponList.splice(index, 1);
              } else {
                this.$message.error(res.message);
              }
            })
          })
          .catch(() => {
            this.$message.error("删除失败");
          });
    },
    handleCheck(index, row) {
      this.$router.push({
        name: 'addCoupon',
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
    handleSearch() {
      if (this.query.time == null) {
        let time = [];
        this.query.time = time
      }
      this.getData(this.query);
    },

    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    },
    dateFormat: function (row, column) {
      let date = row[column.property];
      if (date === undefined) {
        return ''
      }
      ;

      return moment(date).format("YYYY-MM-DD HH:mm:ss")

    },
  }
}

</script>
<style scoped >
.handle-box-list .el-input__inner {
  width: 150px !important;
}

.handle-box-list {
  padding-bottom: 20px;
  width: 100%;
}

.handle-box-list .el-date-editor {
  width: 400px !important;
}

.handle-box-list .el-range-input {
  width: 300px !important;
}

</style>