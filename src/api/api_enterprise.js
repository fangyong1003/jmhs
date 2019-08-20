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
  },
  getAllVisitor:params => {
    return API.GET(`/jmh/website/getAllVisitor`,params)
  },
  getAllUser:params =>{
      return API.GET(`  /jmh/rms/getAllUser`,params)
  },
  delAllUser:params =>{
    return API.GET(`jmh/website/deleteVisitor`,params)
  },
  getAllCompany:params =>{
    return API.GET('jmh/rms/getAllCompany',params);
  },
  updateCompanyRole:params =>{
    return API.POST('jmh/rms/updateCompanyRole',params);
  },
  newCompanyRole:params =>{
    return API.POST('jmh/rms/newCompanyRole',params);
  },


}
