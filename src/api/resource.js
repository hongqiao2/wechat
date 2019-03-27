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
  },
  // 用户搜索
  findUserInfoByNameOrPhone(that, params){
    return that.$http.get(baseURL + '/user/findUserInfoByNameOrPhone', params);
  },
  // 查询用户聊天列表
  findSysChatList(that, params){
    return that.$http.get(baseURL + '/findSysChatList', params);
  },
  // 查询一个用户的聊天列表
  findSysChatById(that, params){
    return that.$http.get(baseURL + '/findSysChatById', params);
  },
  // 根据手机联系人电话，获取联系人列表
  findUsersByIphones(that, params){
    return that.$http.get(baseURL + '/user/findUsersByIphones', params);
  },
  // 添加新朋友
  addNewFriend(that, params){
    return that.$http.post(baseURL + '/newFriend/saveNewFriend', params);
  },
  // 查询新朋友, 只查询最新的十条
  findNewFriend(that, params){
    return that.$http.post(baseURL + '/newFriend/findNewFriend', params);
  },
  // 同意好友请求
  agreeFriendReq(that, params){
    return that.$http.post(baseURL + '/newFriend/agreeFriendReq', params);
  },
  // 获取我的好友
  findSysUserFriendList(that, params){
    return that.$http.post(baseURL + '/userFriend/findSysUserFriendList', params);
  },
  // 获取我的好友信息，签名等
  findUserById(that, params){
    return that.$http.get(baseURL + '/user/findUserById', params);
  },
  // 获取用户聊天记录
  findSysUserNewLogList(that, params){
    return that.$http.post(baseURL + '/newsLog/findSysUserNewLogList', params);
  },
  // 给好友发送信息
  saveSendMsg(that, params){
    return that.$http.post(baseURL + '/newsLog/saveSendMsg', params);
  },
  // 修改消息，以及消息列表的状态
  updateMsgState(that, params){
    return that.$http.post(baseURL + '/newsLog/updateMsgState', params);
  },
  // 修改好友信息
  updateSysUserFriend(that, params){
    return that.$http.post(baseURL + '/userFriend/updateSysUserFriend', params);
  },
};

export default api
