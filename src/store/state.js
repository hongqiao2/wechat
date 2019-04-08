const state = {  // 定义state, 其中info为每个联系人的信息；addList为每向一个联系人发消息后，都在首页增加一个联系人
  info: {},
  addList: [],
  num: 0, // 总消息数
  userFriendList: {}, // 好友列表
  chatListCache: {}, // 聊天列表
  sysUserCircleOfFriendsList:[], // 朋友圈列表
}

export default state   // 传出state
