<template>
  <div class="warp-main">
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <!--表格数据-->
      <el-col :span="24" class="table-wrapper">
        <el-table :data="infoData" stripe style="width: 100%">
          <el-table-column label="序号" type="index"  width="50"></el-table-column>
          <el-table-column label="联系人" prop="visitorName"></el-table-column>
          <el-table-column label="联系电话" prop="phone"></el-table-column>
          <el-table-column label="身份">
            <template slot-scope="scope">
                <span v-if="scope.row.visitorType=='1'">企业</span>
                <span v-if="scope.row.visitorType=='2'">培训机构</span>
                <span v-if="scope.row.visitorType=='3'">导师</span>
                <span v-if="scope.row.visitorType=='4'">合伙人</span>
            </template>
          </el-table-column>
          <el-table-column label="提交时间" prop="sumbitTime">
            <template slot-scope="scope">
                {{scope.row.sumbitTime | formatDateTime}}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="visitorStatus"></el-table-column>
          <el-table-column label="操作" >
                  <template slot-scope="scope">
                      <span class="demonstration" @click="del(scope.row.id)">删除</span>
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
        API.getAllVisitor(params).then((res)=>{
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
      del(id){
        let st = new URLSearchParams;
        st.append("id",id);
        API.delAllUser(st).then((res)=>{
          if(res.statusCode=='0'){
            this.$message({
               message: '操作成功！',
               type: 'success'
             });
             this.handleSearch();
          }else{
            this.$message.error(res.message);
          }
        })
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
