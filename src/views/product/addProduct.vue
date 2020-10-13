<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 商品
        </el-breadcrumb-item>
        <el-breadcrumb-item>新增商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>


    <div class="container">
      <div style="width: 80%" >
        <el-steps :active="actived">
          <el-step title="基本信息" icon="el-icon-edit">

          </el-step>

          <el-step title="上传图片" icon="el-icon-upload">

          </el-step>
          <el-step title="商品绑定" icon="el-icon-picture"></el-step>
        </el-steps>
      </div>

      <!-- 编辑商品的基本信息-->
      <el-form ref="form" :rules="rules" label-position="left" :model="form" label-width="100px">
        <div class="form-active" v-if="actived===1">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="form.name" label-width="50px" class="form-active-input"></el-input>
          </el-form-item>
          <el-form-item label="商品ID" prop="productId">
            <el-input v-model="form.productId" label-width="50px"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="form.price" label-width="50px" placeholder="单位：元"></el-input>
          </el-form-item>
          <el-form-item label="种类品牌">
            <el-select v-model="form.brandId" placeholder="请选择">
              <el-option
                  v-for="specie in species"
                  :key="specie.id"
                  :label="specie.name"
                  :value="specie.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="虚拟购买量">
            <el-input v-model="form.virtualNum" label-width="50px"></el-input>
          </el-form-item>
          <el-form-item label="商品排序">
            <el-input v-model="form.sort" label-width="50px"></el-input>
          </el-form-item>
          <el-form-item label="首页推荐">
            <el-switch
                v-model="form.recommend"
            >
            </el-switch>

          </el-form-item>
          <el-form-item label="权益">
            <el-checkbox-group v-model="form.rights">
              <el-checkbox label="1" name="type">全站自营</el-checkbox>
              <el-checkbox label="2" name="type">正品货源</el-checkbox>
              <el-checkbox label="3" name="type">权威鉴定</el-checkbox>
              <el-checkbox label="4" name="type">顺丰配送</el-checkbox>
              <el-checkbox label="5" name="type">假一赔十，100%保证</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5}"
                placeholder="请输入内容"
                v-model="form.introduction">
            </el-input>
          </el-form-item>

          <el-button type="primary" @click="next('form')">下一步</el-button>
        </div>


        <div v-if="actived===2" class="form-active">
          <el-form-item label="商品主图">
            <el-upload
                action="/api/product/uploadFile"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemoveMain"
                :on-exceed="exceed"
                :on-success="uploadSuccess"
                :on-error="uploadError"
                name="files"
                :file-list="imgValue"
                :limit="limit">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

          </el-form-item>

          <el-form-item label="轮播图">

            <el-upload
                action="/api/product/uploadFile"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemoveRoll"
                name="files"
                :file-list="rollImgValue"
                :on-error="uploadError"
                :on-success="uploadSuccessRoll"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="详情图" class="detail-img">
            <el-upload
                list-type="picture-card"
                action="/api/product/uploadFile"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemoveDetail"
                name="files"
                :on-success="uploadSuccessDetail"
                :file-list="detailImgValue"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-button @click="next('form')">下一步</el-button>
          <el-button type="primary" @click="back">上一步</el-button>
        </div>


        <div v-if="actived===3" class="form-active">

          <el-form-item label="一级规格" class="el-option-input">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
              >
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="checkboxGroup" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in selection" :key="item.optionId" :label="item" border>
                {{ item.optionName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="二级规格" class="el-option-input">
            <el-select v-model="value2" placeholder="请选择">
              <el-option
                  v-for="item in options2"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
              >
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item>
            <el-checkbox-group v-model="checkboxGroup2" @change="handleCheckedCitiesChange2">
              <el-checkbox v-for="item2 in selection2" :key="item2.optionId" :label="item2" border>
                {{ item2.optionName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-button type="text" @click="addTable">增加规格</el-button>

          <el-table :data="form.tableData" width="300px">
            <el-table-column label="sku" width="100px" class="sku-input" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.sku" placeholder="sku"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="attrOne" width="100px" label="规格一ID" v-if="show===true"
                             align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.attrOne" placeholder="sku"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="attrTwo" width="100px" label="规格二ID" v-if="show===true"
                             align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.attrTwo" placeholder="sku"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="attr_one_name" width="100px" label="规格一" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.attrOneName" placeholder="规格一"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="attr_two_name" width="100px" label="规格二" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.attrTwoName" placeholder="规格二"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="stock" width="100px" label="库存" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stock" placeholder="库存"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="warningStock" width="100px" label="库存预警" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.warningStock" placeholder="库存预警"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="price" width="100px" label="售价" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.price" placeholder="售价"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="marketPrice" width="100px" label="划线价" align="center">
              <template slot-scope="scope">
                <el-input v-model="scope.row.marketPrice" placeholder="划线价"></el-input>
              </template>
            </el-table-column>

            <el-table-column width="200px" label="选项图" align="center">
              <template slot-scope="scope">
                <el-upload
                    class="upload-demo"
                    action="/api/product/uploadFile"
                    :on-success="file=>uploadSuccessChoose(file,scope.$index)"
                    name="files"
                    :limit="limit"
                    :on-exceed="exceed"
                    :file-list="indexImg(scope.$index)"
                    :on-remove="fileList=>handleRemoveIndex(scope.$index,fileList)"
                >
                  <el-button size="small" type="text">点击上传</el-button>
                </el-upload>
                <el-input v-model="scope.row.image" placeholder="划线价" v-if="true!==true"></el-input>
              </template>
            </el-table-column>
            <el-table-column width="100px" label="操作" align="center">
              <el-button @click="deleteTable">删除</el-button>
            </el-table-column>

          </el-table>
          <div>
            <div class="back-class">
              <el-button type="primary" @click="back">上一步</el-button>
              <el-button type="danger" :loading="false" v-if="saveView!==1" @click="onSubmit('form')">保存商品</el-button>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {addProduct, findSpecies, productDetail, uploadFile} from "@/api";

export default {
  name: 'addProduct',
  data() {
    return {
      options: [],
      options2: [],
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
        ],
        productId: [
          {required: true, message: '请输入商品Id', trigger: 'blur'},
        ],
        price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'}
        ],
        sku: [
          {required: true, message: '请输入商品sku', trigger: 'blur'}
        ],
      },
      show: false,
      value: '',
      value2: '',
      oneValue: '',
      oneCheck: '',
      actived: 1,
      sku: '',
      stock: 0,
      warningStock: 0,
      price: 0,
      marketPrice: 0,
      saveView:0,
      limit: 1,
      checkboxGroup: [],
      checkboxGroup2: [],
      chooseOne: 'choose-one',
      imageNum: 0,
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      species: [],
      files: '',
      imgValue: [],
      rollImgValue: [],
      detailImgValue: [],
      form: {
        id:0,
        name: '',
        recommend: false,
        productId: '',
        img: '',
        rollImg: "",
        detailImg: "",
        introduction: '',
        virtualNum: 0,
        brandId: '',
        sort: 0,
        rights: [],
        tableData: [],
      }
    }
  },
  created() {
    let productId = this.$route.params.productId
    let id = this.$route.params.id
    let saveView=this.$route.params.saveView
    this.form.productId = productId;
    this.saveView=saveView;
    if (productId !== undefined) {
      productDetail(productId).then(res => {
        if (res.code === "0000") {
          this.form = res.data
          this.form.id = id;
          this.form.rights = res.data.rights.split(',')
          this.rollImgValue = res.data.rollImg
          this.imgValue = res.data.mainImg
          this.detailImgValue = res.data.detailImg;

        }else{
          this.$message.error(res.message)
        }
      })
    }
    findSpecies().then(res => {
      this.species = res.data.speciesOption
      this.options = res.data.attributeOne
      this.options2 = res.data.attributeTwo
    })
  },
  computed: {
    selection: function () {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].name === this.value) {
          return this.options[i].productAttributeOptions;
        }
      }
    },

    selection2: function () {
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].name === this.value2) {
          return this.options2[i].productAttributeOptions;
        }
      }
    }
  },
  watch: {
    '$route': 'getParams'
  },
  methods: {
    indexImg(index) {
      return this.form.tableData[index].imageInfoList
    },
    next(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.actived = this.actived + 1;
        } else {
          return false;
        }
      });
    },
    back() {
      this.actived = this.actived - 1;
    },
    addTable() {
      if (this.checkboxGroup[0] === undefined) {
        this.$message.error('请添加规格');
      }
      let newCheckboxGroup = [];
      for (let i = 0; i < this.checkboxGroup.length; i++) {
        if (this.checkboxGroup2.length === 0) {
          let obj = {};
          obj.attrOne = this.checkboxGroup[i].optionId;
          obj.attrOneName = this.checkboxGroup[i].optionName;
          newCheckboxGroup.push(obj);
        } else {
          for (let j = 0; j < this.checkboxGroup2.length; j++) {
            let obj = {};
            obj.attrOne = this.checkboxGroup[i].optionId;
            obj.attrTwo = this.checkboxGroup2[j].optionId;
            obj.attrOneName = this.checkboxGroup[i].optionName;
            obj.attrTwoName = this.checkboxGroup2[j].optionName;
            newCheckboxGroup.push(obj);
          }
        }
      }
      this.form.tableData = [...this.form.tableData, ...newCheckboxGroup];
      console.log(this.form.tableData)
    },
    uploadSuccess(response) {
      let imgList = {
        name: response.data,
        url: response.data
      }
      this.imgValue.push(imgList)
    },
    uploadSuccessRoll(response) {
      let imgList = {
        name: response.data,
        url: response.data
      }
      this.rollImgValue.push(imgList)
    },
    uploadSuccessDetail(response) {
      let imgList = {
        name: response.data,
        url: response.data
      }
      this.detailImgValue.push(imgList)
    },
    uploadError(err, file, fileLis){

    },

    uploadSuccessChoose(response, index) {
      this.form.tableData[index].image = response.data
    },
    handleCheckedCitiesChange(value) {

    },
    handleCheckedCitiesChange2(value) {

    },
    deleteTable() {
      this.form.tableData.splice(this.form.tableData[0].xh - 1, 1);
    },
    handleRemoveIndex(index,fileList){
      this.form.tableData[index].image=fileList;
    },
    handleRemoveMain(file,fileList){
      this.imgValue=fileList;
    },
    handleRemoveRoll(file, fileList) {
      this.rollImgValue = fileList;
    },
    handleRemoveDetail(file, fileList) {
      this.detailImgValue=fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    exceed(file, fileList) {
      if (fileList.length >= 1) {
        this.$message.error("请上传一张图片");
      }
    },

    handleCommand(command) {
      this.form.brandId = command;
    },
    onSubmit() {
      console.log(this.form)
      this.form.img = this.imgValue[0].url
      this.form.rollImg = this.rollImgValue
      this.form.detailImg = this.detailImgValue
      addProduct(this.form).then(res => {

        if (res.code === "0000") {
          this.form.recommend = false,
              this.form.productId = '',
              this.form.name = ''
              this.form.price = '',
              this.imgValue = [],
              this.rollImgValue = [],
              this.detailImgValue = [],
              this.form.img = '',
              this.form.rollImg = "",
              this.form.detailImg = "",
              this.form.introduction = '',
              this.form.virtualNum = 0,
              this.form.brandId = '',
              this.form.sort = 0,
              this.form.rights = [],
              this.form.tableData = [],
              this.actived = 1,
              this.checkboxGroup = [],
              this.checkboxGroup2 = [],
              this.$router.push({path: 'productList'});
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        }else{
          this.$message.error(res.message)
        }
      })
    },
    handleChange(file, index) {

    },
  }
};
</script>
<style >
.form-active {
  padding-top: 50px;
}

.form-active .el-input__inner {
  width: 350px;
}

.form-active .el-textarea__inner {
  width: 350px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-option-input .el-input__inner {
  width: 150px;
}

.cell .el-input__inner {
  width: 90px !important;
}

.back-class {
  width: 55%;
  margin-top: 30px;
}

.form-save {
  float: right;
}

.el-upload-list__item is-success {
  width: 100px !important;
}

.upload-choose {
  width: 80px;
  height: 52px;
}

.file-upload {
  width: 60px;
  height: 26px;
  position: relative;
  overflow: hidden;
  border: 1px solid #0F996B;
  display: inline-block;
  border-radius: 4px;
  font-size: 12px;
  color: #0F996B;
  text-align: center;
  line-height: 26px;
  float: right;
  margin: 10px 0 auto auto;
}

.file-upload-input {
  background-color: transparent;
  position: absolute;
  width: 999px;
  height: 999px;
  top: -10px;
  right: -10px;
  cursor: pointer;
}

.el-upload--text {
  width: 80px !important;
  height: 32px !important;
  border: 0px !important;
}

.detail-img .el-upload-list__item{
  width: 60px!important;
}
</style>