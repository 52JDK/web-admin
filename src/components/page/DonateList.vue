<template>
  <div>
    <div class="container">
      <div class="coupon-table">
        <el-table
            :data="donateList"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
        >
          <el-table-column label="序号" prop="id" align="center" width="50px"></el-table-column>
          <el-table-column label="昵称" prop="name" align="center"></el-table-column>
          <el-table-column label="备注" prop="remarks" width="180px" align="center"></el-table-column>
          <el-table-column label="赞赏金额" prop="money" align="center"></el-table-column>
          <el-table-column label="创建时间" :formatter="dateFormat" prop="createTime" width="150px"
                           align="center"></el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import {donateList} from "@/api";
import Message from "element-ui/packages/message/src/main";

export default {
  name: "donateList",
  data() {
    return {
      donateList: [],
    }

  },
  methods: {
    dateFormat: function (row, column) {

      var date = row[column.property];

      if (date == undefined) {
        return ''
      }
      ;
      return moment(date).format("YYYY-MM-DD HH:mm:ss")

    },
  },
  created() {
    donateList().then(res => {
      if (res.code == "0000") {
        this.donateList = res.data.list;
        this.pageTotal = res.data.total
      } else {
        Message.error(res.message)
      }
    })
  },

}

</script>
<style scoped>
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