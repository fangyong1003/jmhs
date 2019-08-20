<template>
  <div class="warp-main">
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <!--表格数据-->
      <el-col :span="24" class="table-wrapper">
        <el-table :data="infoData" stripe style="width: 100%">
          <el-table-column label="序号" type="index"  width="50"></el-table-column>
          <el-table-column label="ID" prop="userId"></el-table-column>
          <el-table-column label="姓名" prop="userName"></el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
          <el-table-column label="身份证号" prop="socialId"></el-table-column>
          <el-table-column label="户籍所在地" prop="resident"></el-table-column>
          <el-table-column label="军官证件照" prop="resident">
            <template slot-scope="scope">
                <a target="_blank" class="demonstration" :href="scope.row.officerImage">查看</a>
            </template>
          </el-table-column>
          <el-table-column label="提交时间" prop="joinTime">
            <template slot-scope="scope">
                {{scope.row.joinTime | formatDateTime}}
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
        infoData: []
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
        API.getAllUser(params).then((res)=>{
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
