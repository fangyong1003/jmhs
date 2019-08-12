<template>
  <el-row class="wrap">
    <el-col :span="24" class="wrap-breadcrumb">
      <el-breadcrumb seporate="/">
        <el-breadcrumb-item :to="{ path: '/'}"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="24" class="wrap-main">



      </el-col>
    </el-col>
  </el-row>
</template>
<script>
  import API from '../api/api_user'
  export default {
    data() {
      return {
        loading: false,
        account: {
          loginName: '',
          loginPwd: ''
        },
        rules: {
          loginName: [
           { required: true, message: '请输入登录名', trigger: 'blur' },
          ],
          loginPwd: [
             { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        pwdFocus: false,
        checked: true
      };
    },
    created() {
      let reg_user = JSON.parse(window.localStorage.getItem('register-user'));
      if (reg_user) {
        this.account.loginName = reg_user.loginName;
        this.account.loginPwd = '';
        this.pwdFocus = true;
      }
    },
    methods: {
      handleLogin(formName){
        let that = this;
        that.loading = true;
        let result = {
          loginName: that.account.loginName,
           loginPwd: that.account. loginPwd,
        };
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let status = API.login(result);
            if(status.statusCode == '0'){
              that.loading = false;
              localStorage.setItem('access-user', JSON.stringify(result));
              window.localStorage.removeItem('register-user');
              that.$router.push({path: '/'});
            } else {
                that.loading = false;
                that.$message.error("登录失败，账号或密码错误");
            }
          } else {
            that.loading = false;
            console.log('error submit!!');
            return false;
          }
        });





      },
    }
  }
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
</style>
<script>
  import echarts from 'echarts'
  export default {
    name: 'dashboard',
    data(){
      return {
        chartColumn: null,
        chartBar: null
      }
    },
    mounted (){
      this.drawShape();
    },
    methods: {
      drawShape(){
        this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        this.chartBar = echarts.init(document.getElementById('chartBar'));

        this.chartColumn.setOption({
          title: { text: 'Column Chart' },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        });

        this.chartBar.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330, 220]
            }
          ]
        });
      }
    }
  }
</script>
