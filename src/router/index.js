import Vue from 'vue'
import Router from 'vue-router'
import LeftNav from '@/components/nav/leftNav.vue'
import Home from '@/views/home.vue'
import Dashboard from '@/views/workbench/dashboard.vue'
import Enterprise from '@/views/workbench/enterprise.vue'
import Static from '@/views/workbench/static.vue'
import Armyman from '@/views/workbench/armyman.vue'
import EnterpriseList from '@/views/enterprise/index.vue'
import EnterpriseAdd from '@/views/enterprise/add.vue'
import EnterpriseDetail from '@/views/enterprise/detail.vue'
import EnterpriseValidate from '@/views/enterprise/validate.vue'
import VehicleManage from '@/views/vehicle/index.vue'
import DeptManager from '@/views/dept/index.vue'
import NotFound from '@/components/404.vue'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      type: 'login',
      component: Login
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      type: 'home', // 根据type区分不同模块（顶部导航）
      name: 'home', // 根据name区分不同子模块（左侧导航）
      redirect: '/dashboard',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/dashboard',
          component: LeftNav,
          name: 'dashboard', // 当前路由的name
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/dashboard', component: Dashboard, name: '首页', menuShow: true }
          ]
        },
        {
          path: '/statistics',
          component: LeftNav,
          name: '信息统计',
          leaf: true, // 只有一个节点
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/statistics', component: Static, name: '信息统计', menuShow: true },
          ]
        },
        {
          path: '/userManage',
          component: LeftNav,
          name: '人员管理',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/userManage/enterprise', component: Enterprise, name: '企业管理', menuShow: true },
            { path: '/userManage/armyman', component: Armyman, name: '军人管理', menuShow: true }
          ]
        }
      ]
    },
    {
      path: '/enterpriseManager',
      type: 'enterprise',
      name: 'enterprise',
      component: Home,
      redirect: '/enterprise/list',
      menuShow: true,
      children: [
        {
          path: '/enterpriseList',
          component: LeftNav,
          name: 'enterpriseList',
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/enterprise/list', component: EnterpriseList, name: '企业列表', menuShow: true },
            { path: '/enterprise/detail', component: EnterpriseDetail, name: '企业详情', menuShow: false }
          ]
        },
        {
          path: '/enterpriseAdd',
          component: LeftNav,
          name: 'enterpriseAdd',
          leaf: true, // 只有一个节点
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/enterprise/add', component: EnterpriseAdd, name: '企业添加', menuShow: true }
          ]
        },
        {
          path: '/enterpriseValidate',
          component: LeftNav,
          name: 'enterpriseValidate',
          leaf: true, // 只有一个节点
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/enterprise/validate', component: EnterpriseValidate, name: '企业认证', menuShow: true }
          ]
        }
      ]
    },
    {
      path: '/vehicleManager',
      type: 'enterprise',
      name: 'vehicle',
      component: Home,
      redirect: '/vehicle/list',
      menuShow: true,
      children: [
        {
          path: '/vehicleList',
          component: LeftNav,
          name: 'vehicleList',
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/vehicle/list', component: VehicleManage, name: '车辆信息', menuShow: true }
          ]
        }
      ]
    },
    {
      path: '/deptManager',
      type: 'enterprise',
      name: 'dept',
      component: Home,
      redirect: '/dept/list',
      menuShow: true,
      children: [
        {
          path: '/deptList',
          component: LeftNav,
          name: 'deptList',
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/dept/list', component: DeptManager, name: '部门信息', menuShow: true }
          ]
        }
      ]
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = window.sessionStorage.getItem('userName');
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
    next();
  }
});

export default router
