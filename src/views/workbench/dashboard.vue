<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
        <div class="text item">
          <div class="boxtitle">累计注册军人</div>
          <div class="num">{{userNum}}人</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div  class="text item">
          <div class="boxtitle">今日新增注册军人</div>
          <div class="num">{{newUserNum}}人</div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>
<script>
  import API from '../../api/api_enterprise'
  export default {
    data() {
      return {
        userNum:0,
        newUserNum:0,
      };
    },
    created() {
      this.getUser();
      this.getNewUser();
    },
    methods: {
        getNewUser(){
          API.getNewUserCount().then((res)=>{
            if(res.statusCode=='0'){
              this.newUserNum = Number(res.message);
            }else{
              this.$message.error(res.message);
            }
          })
        },
        getUser(){
          API.getUserCount().then((res)=>{
            if(res.statusCode=='0'){
                this.userNum = Number(res.message);
            }else{
              this.$message.error(res.message);
            }
          })
        },
    }
  }
</script>
<style>
.boxtitle{
  font-weight:bold;
  line-height:60px;
  font-size:18px;
}
.num{
  color: red
}
</style>
