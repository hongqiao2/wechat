const baseURL = 'http://192.168.1.168:8080/boot/app';
const fileHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "x-request-with, content-type",
  'Content-Type': 'multipart/form-data'
}
const api = {
  // 获取手机验证码
  getVCode(that, params) {
    return that.$http.get(baseURL + "/vCode", params);
  },
  // 登录接口
  getLogin(that, params) {
    return that.$http.post(baseURL + "/login", params);
  },
  //用户头像上传修改 并且重新生成二维码
  uploadSysHeadImg(that, params) {
    return that.$http.post(baseURL + "/user/uploadSysHeadImg", params);
  },
  // websocket 发送信息
  WSendMessage(that, params) {
    return that.$http.get(baseURL + "/sendMessage", params);
  },
  // 添加用户密码
  updateSysUserPass(that, params) {
    return that.$http.post(baseURL + "/user/updateSysUserPass", params);
  },
  // 通过验证码修改密码
  modifySysUserPass(that, params) {
    return that.$http.post(baseURL + "/user/modifySysUserPass", params);
  },
  // 添加实名验证信息
  saveRealNameAuthentication(that, vparams) {
    return that.$http.post(baseURL + "/user/saveRealNameAuthentication", vparams);
  },
  // 修改签名信息
  updateAutograph(that, params) {
    return that.$http.post(baseURL + '/user/updateAutograph', params);
  },
  // 修改爱好信息
  updateHobby(that, params) {
    return that.$http.post(baseURL + '/user/updateHobby', params);
  },
  // 修改昵称
  updateName(that, params) {
    return that.$http.post(baseURL + '/user/updateName', params);
  },
  // 获取黑名单列表
  getBlackList(that, params) {
    return that.$http.post(baseURL + '/findBlacklist', params);
  },
  // 修改用户新消息配置
  updateSysUserNewMessageConf(that, params){
    return that.$http.post(baseURL + '/user/updateSysUserNewMessageConf', params);
  }
};

export default api
