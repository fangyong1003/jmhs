/**
 * Created by noone on 2018/4/13.
 */
import * as API from './'

export default {
  //查询列表
  getNewUserCount: params => {
    return API.GET('/jmh/rms/getNewUserCount', params)
  },
  getUserCount:params => {
    return API.GET(`/jmh/rms/getUserCount`,params)
  }
}
