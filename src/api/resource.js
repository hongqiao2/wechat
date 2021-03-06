//const baseURL = 'http://192.168.1.168:8080/boot/app';
//const baseURL = 'http://47.99.247.104:8080/boot/app';
const fileHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "x-request-with, content-type",
  'Content-Type': 'multipart/form-data'
}
const api = {
  // 获取手机验证码
  getVCode(that, params) {
    return that.$http.get(that.baseURL + "/vCode", params);
  },
  // 登录接口
  getLogin(that, params) {
    return that.$http.post(that.baseURL + "/login", params);
  },
  // 登出接口
  goLogout(that, params) {
    return that.$http.get(that.baseURL + "/logout", params);
  },
  //用户头像上传修改 并且重新生成二维码
  uploadSysHeadImg(that, params) {
    return that.$http.post(that.baseURL + "/user/uploadSysHeadImg", params);
  },
  // websocket 发送信息
  WSendMessage(that, params) {
    return that.$http.get(that.baseURL + "/sendMessage", params);
  },
  // 添加用户密码
  updateSysUserPass(that, params) {
    return that.$http.post(that.baseURL + "/user/updateSysUserPass", params);
  },
  // 通过验证码修改密码
  modifySysUserPass(that, params) {
    return that.$http.post(that.baseURL + "/user/modifySysUserPass", params);
  },
  // 添加实名验证信息
  saveRealNameAuthentication(that, vparams) {
    return that.$http.post(that.baseURL + "/user/saveRealNameAuthentication", vparams);
  },
  // 修改签名信息
  updateAutograph(that, params) {
    return that.$http.post(that.baseURL + '/user/updateAutograph', params);
  },
  // 修改爱好信息
  updateHobby(that, params) {
    return that.$http.post(that.baseURL + '/user/updateHobby', params);
  },
  // 修改昵称
  updateName(that, params) {
    return that.$http.post(that.baseURL + '/user/updateName', params);
  },
  // 获取黑名单列表
  getBlackList(that, params) {
    return that.$http.post(that.baseURL + '/findBlacklist', params);
  },
  // 修改用户新消息配置
  updateSysUserNewMessageConf(that, params){
    return that.$http.post(that.baseURL + '/user/updateSysUserNewMessageConf', params);
  },
  // 用户搜索
  findUserInfoByNameOrPhone(that, params){
    return that.$http.get(that.baseURL + '/user/findUserInfoByNameOrPhone', params);
  },
  // 查询用户聊天列表
  findSysChatList(that, params){
    return that.$http.get(that.baseURL + '/findSysChatList', params);
  },
  // 查询一个用户的聊天列表
  findSysChatById(that, params){
    return that.$http.get(that.baseURL + '/findSysChatById', params);
  },
  // 根据手机联系人电话，获取联系人列表
  findUsersByIphones(that, params){
    return that.$http.get(that.baseURL + '/user/findUsersByIphones', params);
  },
  // 添加新朋友
  addNewFriend(that, params){
    return that.$http.post(that.baseURL + '/newFriend/saveNewFriend', params);
  },
  // 查询新朋友, 只查询最新的十条
  findNewFriend(that, params){
    return that.$http.post(that.baseURL + '/newFriend/findNewFriend', params);
  },
  // 同意好友请求
  agreeFriendReq(that, params){
    return that.$http.post(that.baseURL + '/newFriend/agreeFriendReq', params);
  },
  // 获取我的好友
  findSysUserFriendList(that, params){
    return that.$http.post(that.baseURL + '/userFriend/findSysUserFriendList', params);
  },
  // 获取我的好友信息，签名等
  findUserById(that, params){
    return that.$http.get(that.baseURL + '/user/findUserById', params);
  },
  // 获取用户聊天记录
  findSysUserNewLogList(that, params){
    return that.$http.post(that.baseURL + '/newsLog/findSysUserNewLogList', params);
  },
  // 给好友发送信息
  saveSendMsg(that, params){
    return that.$http.post(that.baseURL + '/newsLog/saveSendMsg', params);
  },
  // 给群好友发送信息
  saveGroupSendMsg(that, params){
    return that.$http.post(that.baseURL + '/newsLog/saveGroupSendMsg', params);
  },
  // 修改消息，以及消息列表的状态
  updateMsgState(that, params){
    return that.$http.post(that.baseURL + '/newsLog/updateMsgState', params);
  },
  // 修改好友信息
  updateSysUserFriend(that, params){
    return that.$http.post(that.baseURL + '/userFriend/updateSysUserFriend', params);
  },
  // 朋友圈信息
  findSysUserCircleOfFriends(that, params){
    return that.$http.post(that.baseURL + '/circleOfFriends/findSysUserCircleOfFriends', params);
  },
  // 发表朋友圈信息
  saveSysUserCircleOfFriends(that, params){
    return that.$http.post(that.baseURL + '/circleOfFriends/saveSysUserCircleOfFriends', params);
  },
  // 添加或者删除点赞信息
  addSysUserCircleOfFriendsLiked(that, params){
    return that.$http.post(that.baseURL + '/circleOfFriendsLiked/addSysUserCircleOfFriendsLiked', params);
  },
  // 添加或者删除评论信息
  addSysUserCircleOfFriendsComment(that, params){
    return that.$http.post(that.baseURL + '/circleOfFriendsComment/addSysUserCircleOfFriendsComment', params);
  },
  // 创建群
  saveSysUserGroup(that, params){
    return that.$http.post(that.baseURL + '/sysUserGroup/saveSysUserGroup', params);
  },
  // 查询群信息，以及群成员信息
  findGroupInformation(that, params){
    return that.$http.post(that.baseURL + '/sysUserGroup/findGroupInformation', params);
  },
  // 清空群消息
  updateGroupByUserLog(that, params){
    return that.$http.post(that.baseURL + '/sysUserGroup/updateGroupByUserLog', params);
  },
  // 解除群
  dissolutionGroupByGroupId(that, params){
    return that.$http.post(that.baseURL + '/sysUserGroup/dissolutionGroupByGroupId', params);
  },
  // 查询单个群成员信息
  findGroupMembersInfo(that, params){
    return that.$http.post(that.baseURL + '/sysUserGroup/findGroupMembersInfo', params);
  },
  // 修改群昵称
  updateGroupInfo(that, params){
    return that.$http.post(that.baseURL + '/sysUserGroup/updateGroupInfo', params);
  },
  // 修改群成员的信息
  updateGroupLeaguerInfo(that, params){
    return that.$http.post(that.baseURL + '/sysUserGroup/updateGroupLeaguerInfo', params);
  },
};

export default api
