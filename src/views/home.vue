<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/images/logo.png" style="padding-left:8px;"></a>
      </div>
      <!-- <div class="topbar-logos">
        <a href="/" style="color: #fff;margin-left:10px"><span v-show="!$store.state.collapsed">浙江军梦网络科技有限公司后台管理系统</span></a>
      </div> -->
      <div class="topbar-title" style="display:none">
        <el-row v-show="$store.state.topNavState==='home'">
          <el-col :span="24">
            <el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
              <el-menu-item index="/dashboard">工作台</el-menu-item>
              <el-menu-item index="/enterpriseManager">企业管理</el-menu-item>
              <el-menu-item index="/orderManager">订单管理</el-menu-item>
              <el-menu-item index="/systemManager">系统管理</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i> 您好，{{nickname}}   <i class="el-icon-caret-bottom"></i></span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>
              <div @click="jumpTo('/login')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item> -->
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <transition name="fade" mode="out-in">
      <router-view ></router-view>
    </transition>
  </el-row>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        defaultActiveIndex: "/",
        loading: false,
        nickname: ''
      }
    },
    created() {// 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchNavData();
    },
    methods: {
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      fetchNavData () { // 初始化菜单激活项
        var cur_path = this.$route.path; //获取当前路由
        var routers = this.$router.options.routes; // 获取路由对象
        var nav_type = "", nav_name = "";
        for (var i = 0; i < routers.length; i++) {
          var children = routers[i].children;
          if(children){
            for (var j = 0; j < children.length; j++) {
              var grand_children = children[j].children;
              if(grand_children){
                for (var k = 0; k < grand_children.length; k++) {
                  if (grand_children[k].path === cur_path) {
                    nav_type = routers[i].type;
                    nav_name = routers[i].name;
                    break;
                  }
                  // 如果该菜单下还有子菜单
                  if(children[j].children) {
                    let grandChildren = children[j].children;
                    for(let z=0; z<grandChildren.length; z++) {
                      if(grandChildren[z].path === cur_path) {
                        nav_type = routers[i].type;
                        nav_name = routers[i].name;
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        this.$store.state.topNavState = nav_type;  // 改变topNavState状态的值
        this.$store.state.leftNavState = nav_name;  // 改变leftNavState状态的值
        if(nav_type == "home"){
          this.defaultActiveIndex = "/";
        } else {
          this.defaultActiveIndex = "/" + nav_name + "Manager";
        }
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout(){
        //logout
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          sessionStorage.removeItem('userName');
          that.$router.push("/login");
        }).catch(() => {});
      }
    },
    mounted() {
      let user = sessionStorage.getItem('userName');
      if (user) {
        this.nickname = user|| '';
      }
    },
    watch: {
      '$route': 'fetchNavData'  //监听router值改变时，改变导航菜单激活项
    }
  }
</script>
