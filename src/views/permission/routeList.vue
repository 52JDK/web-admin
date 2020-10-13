<template>
  <div class="container">
    <div style="margin-bottom: 20px">
      <el-button type="success" @click="showCreate">添加菜单
      </el-button>
    </div>
    <el-table :data="tableData" :span-method="objectSpanMethod">
      <el-table-column prop="menuName" label="菜单名称" align="center">

      </el-table-column>

      <el-table-column prop="permissionsName" label="操作名称" align="center">

      </el-table-column>
      <el-table-column prop="permissionsCode" label="操作编码" align="center">

      </el-table-column>
      <el-table-column label="是否必选" align="center">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.requiredPermission"
              :active-value=1
              :inactive-value=2
              active-color="#13ce66"
              disabled
          >
          </el-switch>
        </template>

      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateTable(scope.$index)">修 改</el-button>
          <el-popconfirm
              confirmButtonText='好的'
              cancelButtonText='不用了'
              icon="el-icon-info"
              iconColor="red"
              title="确定删除吗？"
              @onConfirm="onConfirm(scope.$index)"
          >
            <el-button style="margin-left: 20px" type="danger" slot="reference">删除</el-button>

          </el-popconfirm>

        </template>
      </el-table-column>

    </el-table>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
    >
      <el-form class="small-space" :model="tempForm" :rules="rules" ref="tempForm" label-position="left"
               label-width="100px"
               style='width: 600px; margin-left:50px;'>
        <el-form-item label="菜单名称">
          <el-input v-model="tempForm.menuName" style="width: 250px;">
          </el-input>
        </el-form-item>
        <el-form-item label="菜单编码">
          <el-input v-model="tempForm.menuCode" style="width: 250px;">
          </el-input>
        </el-form-item>
        <el-form-item label="操作名称">
          <el-input v-model="tempForm.permissionsName" style="width: 250px;">
          </el-input>
        </el-form-item>
        <el-form-item label="操作编码">
          <el-input v-model="tempForm.permissionsCode" style="width: 250px;">
          </el-input>
        </el-form-item>
        <el-form-item label="是否必选">
          <el-switch
              v-model="tempForm.requiredPermission"
              :active-value=1
              :inactive-value=2
              active-color="#13ce66"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span></span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('tempForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {routerDelete, routerList, routerUpdate} from "@/api/router";

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      value: 1,
      rules: {
        menuName: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        menuCode: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        permissionsCode: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        permissionsName: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
      },
      tempForm: {
        id: '',
        menuName: '',
        menuCode: '',
        permissionsCode: '',
        permissionsName: '',
        requiredPermission: 2
      },
    }
  },
  created() {
    this.getList();
  },
  methods: {
    objectSpanMethod({row, column, rowIndex, columnIndex}) {
      const span = column['property'] + '-span'
      if (row[span]) {
        return row[span]
      }
    },
    getList() {
      routerList().then(res => {
        this.tableData = res.data
        this.tableData = mergeTableRow(this.tableData, ["menuName"])
      })

    },
    updateTable(index) {
      this.tempForm = this.tableData[index];
      this.dialogVisible = true
    },
    submitForm(tempForm) {
      this.$refs[tempForm].validate((valid) => {
        if (valid) {
          routerUpdate(this.tempForm).then(res => {
            if (res.code == '0000') {
              this.$message.success("操作成功")
              this.getList();
            } else {
              this.$message.error(res.message)
            }
          })
          this.dialogVisible = false
        }
      })
    },
    showCreate() {
      this.tempForm = {};
      this.dialogVisible = true
    },
    onConfirm(index) {
      this.tempForm = this.tableData[index];

      routerDelete(this.tempForm).then(res => {
        if (res.code == '0000') {
          this.$message.success("删除成功")
          this.getList()
        } else if(res.code=="1007"){
          this.$message.error("用户权限不足")
        } else{
          this.$message.error(res.message)
        }
      })
    },
  }
}

/**
 * 方法二
 * 改良后（不相邻的数据相互不受影响）
 *  table合并行通用 */
export function mergeTableRow(data, merge) {
  if (!merge || merge.length === 0) {
    return data
  }
  merge.forEach((m) => {
    const mList = {}
    data = data.map((v, index) => {
      const rowVal = v[m]
      if (mList[rowVal] && mList[rowVal].newIndex === index) {
        mList[rowVal]['num']++
        mList[rowVal]['newIndex']++
        data[mList[rowVal]['index']][m + '-span'].rowspan++
        v[m + '-span'] = {
          rowspan: 0,
          colspan: 0
        }
      } else {
        mList[rowVal] = {num: 1, index: index, newIndex: index + 1}
        v[m + '-span'] = {
          rowspan: 1,
          colspan: 1
        }
      }
      return v
    })
  })
  return data
}
</script>

<style>

</style>