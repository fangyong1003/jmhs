<template>
  <div  class="body-bg loginPage">
    <div class="header-content">
      <div class="logo-part" >
        <span>浙江军梦网络科技有限公司后台管理系统</span>
      </div>
    </div>
    <el-form ref="account" :model="account" :rules="rules" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">登录后台管理系统</h3>
      <el-form-item prop="loginName">
        <el-input type="text" v-model="account.loginName" auto-complete="off" placeholder="请输入6位数的账号"></el-input>
      </el-form-item>
      <el-form-item prop="loginPwd">
        <el-input type="password" v-model="account.loginPwd" :autofocus="pwdFocus" auto-complete="off" placeholder="请输入登录密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin('account')"  :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  	<div class="footer">
        <footer-copyright></footer-copyright>
    </div>
  </div>
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
    methods: {
      handleLogin(formName){
        let that = this;
        that.loading = true;
        // let params = new FormData();
        // params.append("loginName",that.account.loginName);
        // params.append("loginPwd",that.account.loginPwd);

        // let params = {
        //   loginName:that.account.loginName,
        //   loginPwd:that.account.loginPwd
        // }

        //后台post只接受x-wwww-form-urlencoded
        let params = `loginName=${that.account.loginName}&loginPwd=${that.account.loginPwd}`;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            API.login(params).then((res)=>{
              if(res.statusCode == '0'){
                that.loading = false;
                sessionStorage.setItem('userName',res.message);
                that.$store.dispatch('userInfoAction',res.message);
                that.$router.push({path: '/'});
              } else {
                  that.loading = false;
                  that.$message.error(res.message);
              }
            })

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
<style scoped>
  body {
    background: #DFE9FB;
  }
  .body-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../assets/images/background.jpg') no-repeat;
    background-size:cover;
}
  .header-content {
    position: fixed;
    top: 0;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 0 2px #ddd;
  }
  .header-content .logo-part {
    padding-left: 20px;
    font-size: 18px;
    line-height: 70px;
    color: #fff;
    background:#409EFF
  }
  .header-content .logo-part img {
    vertical-align: middle;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background: -ms-linear-gradient(top, #ace, #00C1DE); /* IE 10 */
    background: -moz-linear-gradient(top, #ace, #00C1DE); /*火狐*/
    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ace), to(#00C1DE)); /*谷歌*/
    background: -webkit-linear-gradient(top, #ace, #00C1DE); /*Safari5.1 Chrome 10+*/
    background: -o-linear-gradient(top,#ace, #00C1DE); /*Opera 11.10+*/
    opacity:0.8
  }
  .login-container .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #fff;
  }
  .login-container .remember {
    margin: 0px 0px 35px 0px;
  }
  .extra-text {
    position: relative;
    margin-bottom: 0;
    padding-left: 2px;
  }
  .extra-text a {
    font-size: 12px;
    color: #aaa;
  }
  .extra-text a:hover {
    color: #29e;
  }
  .extra-text .reg-text {
    position: absolute;
    top: 4px;
    right: 2px;
  }
</style>
