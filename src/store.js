import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  collapsed: false,
  topNavState: 'home',
  leftNavState: 'home',
  userName:window.sessionStorage.userName?window.sessionStorage.userName:'',
}
const mutations = {

  //获取用户信息
  getUserInfo(state,userName){
    state.userName = userName;
  },
}

const actions = {
  userInfoAction(context,userName){
      context.commit('getUserInfo',userName);
  },
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
