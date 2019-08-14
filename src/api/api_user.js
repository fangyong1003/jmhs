import * as API from './'

export default {
  //登录
  login: params => {
    return API.POST('/jmh/rms/login', params)
  },
  //登出
  logout: params => {
    return API.GET('/jmh/rms/loginOut', params)
  }
}
