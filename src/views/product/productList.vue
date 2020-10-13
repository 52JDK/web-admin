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
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="商品名称" style="width: 180px;"></el-input>
          <el-input v-model="query.productId" placeholder="商品id" style="width: 180px;" ></el-input>
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
        <el-table-column prop="name" label="商品名称" width="220px"></el-table-column>
        <el-table-column prop="productId" label="商品id" width="150px"></el-table-column>
        <el-table-column prop="title" label="商品简介"></el-table-column>
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <el-image
                class="table-td-thumb"
                :src="scope.row.img"
                :preview-src-list="[scope.row.img]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column width="80px" label="商品价格">
          <template slot-scope="scope">￥{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column width="100px" label="上下架" :formatter="dateFormat"
        >
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.enable"
                @change="change(scope.row)"
                :inactive-value="0"
                :active-value="1">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" width="150px" label="创建时间" :formatter="dateFormat"
        ></el-table-column>
        <el-table-column prop="updateTime" width="150px" label="修改时间" :formatter="dateFormat"
        ></el-table-column>
        <el-table-column label="操作" width="180" align="center">
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
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
            >删除
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

  </div>
</template>

<script>
import moment from 'moment'
import {deleteProduct, editProductEnable, fetchData, productDetail} from '@/api';
import Message from "element-ui/packages/message/src/main";

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },

      tableData: [{
      }
      ],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      fetchData(this.query).then(res => {
        if(res.code=="0000") {
          this.tableData = res.data.list;
          this.pageTotal = res.data.total;
        }else{
          Message.error(res.message)
        }
      });
    },
    dateFormat: function (row, column) {

      var date = row[column.property];

      if (date == undefined) {
        return ''
      }
      ;

      return moment(date).format("YYYY-MM-DD HH:mm:ss")

    },
    change(scope){
      editProductEnable(scope).then(res=>{
        if(res.code==="0000"){
          this.$message.success('修改成功');
        }else{
          this.$message.error(res.message);
        }
      })
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },


    handleCheck(index, row) {
      this.$router.push({
        name: 'addProduct',
        params: {
          productId: this.tableData[index].productId,
          saveView: 1
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

            deleteProduct(this.tableData[index].productId).then(res => {
              if (res.code === "0000") {
                this.$message.success('删除成功');
                this.tableData.splice(index, 1);
              }else{
                this.$message.error(res.message);
              }
            })
          })
          .catch(() => {
          });
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    handleEdit(index, row) {
      this.$router.push({
        name: 'addProduct',
        params: {
          productId: this.tableData[index].productId,
          id: this.tableData[index].id,
          saveView: 2
        }
      })
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
};
</script>

<style >
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
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
.handle-box{
  display: inline-block;
}
.handle-box .el-input__inner{
  width: 150px !important;
}
</style>
