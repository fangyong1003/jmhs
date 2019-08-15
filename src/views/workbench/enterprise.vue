<template>
  <div class="warp-main">
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <!--表格数据-->
      <el-col :span="24" >
        <el-form :inline="true">
            <el-form-item style="float:right">
                <el-button type="primary" size="medium" @click="add">新增企业用户</el-button>
            </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" class="table-wrapper">
        <el-table :data="infoData" stripe style="width: 100%">
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="联系人" prop="userName"></el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
          <el-table-column label="身份" prop="socialId"></el-table-column>
          <el-table-column label="提交时间" prop="joinTime"></el-table-column>
          <el-table-column label="状态" prop="content"></el-table-column>
          <el-table-column label="操作" >
                  <template slot-scope="scope">
                      <span class="demonstration" @click="edit(scope.row)">删除</span>
                  </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--分页-->
      <el-col :span="24" class="toolbar">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog  :title="addtitle" width="540px" class="diashow" :visible.sync="adddialog"  :close-on-click-modal="false">
      <el-form :model="upform" ref="upform" :rules="rules" label-width="120px">
        <el-form-item label="企业名称：" prop="companyName">
           <el-input v-model="upform.companyName"></el-input>
         </el-form-item>
         <el-form-item label="企业账号：" prop="account">
            <el-input v-model="upform.account"></el-input>
          </el-form-item>
          <el-form-item label="企业密码：" prop="password">
             <el-input v-model="upform.password"></el-input>
           </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submits('upform')">确 定</el-button>
       </span>
    </el-dialog>
    <el-dialog  :title="edittitle" width="540px" class="diashow" :visible.sync="editdialog"  :close-on-click-modal="false">
      <el-form :model="editform" ref="editform" :rules="rules" label-width="120px">
        <el-form-item label="企业名称：" prop="companyName">
           <el-input v-model="editform.companyName"></el-input>
         </el-form-item>
         <el-form-item label="企业账号：" prop="account">
            <el-input v-model="editform.account"></el-input>
          </el-form-item>
          <el-form-item label="企业密码：" prop="password">
             <el-input v-model="editform.password"></el-input>
           </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="submit('editform')">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>
<script>
  import API from '../../api/api_enterprise'
  export default {
    data (){
      return {
        loading: false, // 加载loading
        total: 5,
        currentPage: 1,
        pageSize: 10,
        infoData: [],
        adddialog:false,
        addtitle:'添加企业',
        editdialog:false,
        edittitle:'编辑企业',
        upform:{
          companyName:'',
          account:'',
          password:'',
        },
        editform:{
          roleId:'',
          companyName:'',
          account:'',
          password:'',
        },
        rules:{
         companyName:[
           { required: true, message: '请填写企业名称', trigger: 'blur' }
         ],
         account:[
            { required: true, message: '请填写企业账户', trigger: 'blur' }
         ],
         password:[
            { required: true, message: '请填写密码', trigger: 'blur' }
         ],
        },
      }
    },
    created(){
      this.handleSearch();
    },
    methods: {
      // search data
      handleSearch() {
        this.loading=true;
        let params = new URLSearchParams;
        params.append("pageSize",this.pageSize);
        params.append("currentPage",this.currentPage);
        API.getAllCompany(params).then((res)=>{
          if(res.statusCode=='0'){
            this.loading=false;
            this.total = Number(res.total);
            this.infoData = res.results;
          }else{
            this.$message.error(res.message);
          }
        })
      },
      // 选择每页显示条数
      handleSizeChange(val){
       this.pageSize = val;
       this.currentPage = 1;
       this.handleSearch();
      },
      // 跳转页
      handleCurrentChange(val){
       this.currentPage = val;
       this.handleSearch();
      },
      edit(obj){
        this.editdialog = true;
        this.editform = {
          roleId:obj.companyId,
          companyName:obj.companyName,
          account:obj.account,
          password:obj.password,
        }
      },
      add(){
        this.adddialog = true;
        this.upform = {
          companyName:'',
          account:'',
          password:'',
        }
      },
      submits(formName){
        this.$refs[formName].validate((valid) => {
              if (valid) {
                API.newCompanyRole(this.upform).then((res)=>{
                  if(res.statusCode=='0'){
                    this.$message({
                      type: 'success',
                      message: res.msg
                    });
                    this.adddialog =false;
                    this.handleSearch();
                  }else{
                    this.$message({
                      type: 'error',
                      message: res.msg
                    });
                  }
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      submit(formName){
        this.$refs[formName].validate((valid) => {
              if (valid) {
                API.updateCompanyRole(this.editform).then((res)=>{
                  if(res.statusCode=='0'){
                    this.$message({
                      type: 'success',
                      message: res.msg
                    });
                    this.editdialog =false;
                    this.handleSearch();
                  }else{
                    this.$message({
                      type: 'error',
                      message: res.msg
                    });
                  }
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      }
    }
  }
</script>
<style>
  .info-table-expand {
    font-size: 0;
  }
  .info-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .info-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
