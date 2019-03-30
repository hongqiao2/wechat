<template id="app">
  <yd-layout>
    <yd-navbar title="消息" v-if="$route.meta.navShow">
      <router-link tag="div" to="/search" slot="right">
        <yd-icon name="search" custom size="0.4rem" color="#777" style=" margin-right: 0.3rem;"></yd-icon>
      </router-link>
      <router-link to slot="right" v-on:click.stop="doThis">
        <yd-icon name="jia" custom size="0.4rem" color="#777" v-on:click.native="logClick"></yd-icon>
      </router-link>
    </yd-navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <yd-tabbar slot="tabbar" v-if="$route.meta.menuShow">
      <yd-tabbar-item title="消息" link="/chat">
        <yd-icon name="message" custom slot="icon" size="0.45rem"></yd-icon>
        <yd-badge slot="badge" type="danger" v-if="num != 0">{{num}}</yd-badge>
      </yd-tabbar-item>
      <yd-tabbar-item title="通讯录" link="/address">
        <yd-icon name="tongxunlu" custom slot="icon" size="0.45rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="发现" link="/find" dot>
        <yd-icon name="faxian" custom slot="icon" size="0.45rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="我" link="/me">
        <yd-icon name="wo" custom slot="icon" size="0.45rem"></yd-icon>
      </yd-tabbar-item>
    </yd-tabbar>
    <Plus :is-show="isShowPlus" @on-close="closeDialog"></Plus>
  </yd-layout>
</template>

<!--<script src="../static/mui/js/mui.min.js"></script>-->  
<script>
import Plus from "./components/plus/plus";
import api from "@/api/resource.js";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "app",
  components: {
    Plus
  },
  data() {
    return {
      isShowPlus: false,
      showMsgNum: 0,
      userinfo: {}
    };
  },
  computed: {
    ...mapGetters([
      // 拿到info的状态
      "num",
      "info",
      "chatListCache"
    ])
  },
  methods: {
    closeDialog() {
      this.isShowPlus = false;
    },
    logClick() {
      this.isShowPlus = true;
    },
    ...mapMutations({
      setUserFriendListCache: "SET_USER_FRIEND_LIST_CACHE"
    }),
    ...mapMutations({
      setShowNun: "SET_NUM"
    }),
    ...mapMutations({
      setChatListCache: "SET_CHAT_LIST_CACHE"
    }),
    ...mapMutations({
      setAddress: "SET_INFO"
    }),
    findFriendList(userinfo) {
      // 好友列表
      api
        .findSysUserFriendList(this, {
          id: userinfo.id
        })
        .then(res => {
          let _val = res.body;
          if (_val.code == "200") {
            let userFriendListCache = {};
            let friendList = JSON.parse(_val.friendList);
            friendList.forEach(function(item, index) {
              userFriendListCache[item.chat_bject] = item;
            });
            this.setUserFriendListCache(userFriendListCache);
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    },
    findNewFriendList(userinfo) {
      // 新朋友消息
      api
        .findNewFriend(this, {
          id: userinfo.id
        })
        .then(res => {
          let val = res.body;
          if (val.code == "200") {
            // 缓存10条最新的朋友消息，
            localStorage.setItem("addFriendList", JSON.stringify(val.list));
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    },
    findChatList(userinfo) {
      // 聊天列表初始化，刷新
      api
        .findSysChatList(this, {
          params: {
            id: userinfo.id
          }
        })
        .then(res => {
          let val = res.body;
          if (val.code == "200") {
            // 需要判断是否为添加朋友后的生成列表
            let userChatList = JSON.parse(val.userChatList);
            let chatList = JSON.parse(JSON.stringify(this.chatListCache));
            // 缓存历史信息
            let userChatListCache = JSON.parse(localStorage.getItem("userChatListCache"));
            // 聊天列表缓存
            let num = 0; // 共计显示的消息数量
            if (userChatList) {
              let i = 0;
              for (i; i < userChatList.length; i++) {
                num += userChatList[i].news_number;
                chatList[userChatList[i].chat_bject] = userChatList[i];
                if(userChatListCache){
                  // 如果缓存里面有数据，需要把新数据和老数据综合起来
                 let chat_bject = userChatList[i].chat_bject;
                  userChatListCache[chat_bject] ? delete userChatListCache[chat_bject] : "";
                  // 合并对象
                  Object.assign(chatList, userChatListCache);
                }
              }
              localStorage.setItem("userChatListCache", JSON.stringify(userChatListCache));
              this.setChatListCache(chatList);
            }
            this.setShowNun(num);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 接收服务发来的消息
    setOnMessage(e) {
      console.log(e.data);
      let _data = JSON.parse(e.data);
      let userinfo = JSON.parse(localStorage.getItem("access_token"));
      // 缓存历史信息
      let userChatListCache = JSON.parse(localStorage.getItem("userChatListCache"));
      //1.判断是否是好友添加的信息，同意添加好友的信息， 是的话就更新聊天列表，以及新的朋友列表
      if (_data.isGroup == 3) {
        // 朋友圈通知
        return;
      }
      if (_data.isGroup == 2) {
        // 好友通知
        api
          .findNewFriend(this, {
            id: userinfo.id
          })
          .then(res => {
            let val = res.body;
            if (val.code == "200") {
              // 缓存10条最新的朋友消息，
              localStorage.setItem("addFriendList", JSON.stringify(val.list));
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
        return;
      }
      if (_data.isGroup == 1 && groupId != 0) {
        // 群消息通知
        return;
      }
      if (_data.isGroup == 0) {
        // 好友消息通知，以及添加好友成功通知
        let _info = JSON.parse(JSON.stringify(this.info));
        if (typeof _info !== "{}") {
          // 如果当前聊天界面不为空，判断是否是同一个好友发送的信息
          let _infoId = _info.griend_id || _info.chat_bject;
          if (_infoId && _data.sender == _infoId) {
            _info.latest_news = _data.msg;
            let newNum = this.num;
            if(_data.msg_type == 1){
              // 如果是图片
              let msgNum = JSON.parse(_data.msg).length;
              _info.news_number = typeof _info.news_number != "undefined" ? _info.news_number + msgNum : msgNum;
              newNum += msgNum;
              _info["msg_type"] = _data.msg_type;
            }else{
              if(_data.msg_type == 2){
                _info["msg_type"] = _data.msg_type;
              }
              _info.news_number = typeof _info.news_number != "undefined" ? _info.news_number + 1 : 1;
              newNum += 1;
            }
            this.setShowNun(newNum);
            this.setAddress(_info);
          }
        }
        // 聊天列表初始化，刷新
        api
          .findSysChatList(this, {
            params: {
              id: userinfo.id
            }
          })
          .then(res => {
            let val = res.body;
            if (val.code == "200") {
              let userChatLists = JSON.parse(val.userChatList);
              let _chatListCache = JSON.parse(JSON.stringify(this.chatListCache));
               // 聊天列表缓存
              let i = 0;
              let newNum = this.num;
              for (i; i < userChatLists.length; i++) {
                _chatListCache[userChatLists[i].chat_bject] = userChatLists[i];
                if(userChatListCache){
                  let chat_bject = userChatLists[i].chat_bject;
                  // 如果缓存里面有数据，需要把新数据和老数据综合起来
                  userChatListCache[chat_bject] ? delete userChatListCache[chat_bject] : "";
                }
                newNum = userChatLists[i].news_number;
              }
               // 合并对象
              Object.assign(_chatListCache, userChatListCache);
              this.setShowNun(newNum);
              this.setChatListCache(_chatListCache);
              localStorage.setItem("userChatListCache", JSON.stringify(userChatListCache));
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    let userinfo = JSON.parse(localStorage.getItem("access_token"));
    if(!userinfo){
      return;
    }
    let web = this.$root.$webSocket;
    if (!web) {
      let urlPrefix = this.webSocketUrl;
      this.$root.$webSocket = new WebSocket(urlPrefix + userinfo.id);
      web = this.$root.$webSocket;
      web.onerror = this.setErrorMessage;
      // 连接成功
      web.onopen = this.setOnopenMessage;
      web.onmessage = this.setOnMessage;
    }
    this.findChatList(userinfo);
    this.findNewFriendList(userinfo);
    this.findFriendList(userinfo);
  }
};
</script>
<style>
.router-link-active {
  color: #8d66fa !important;
}
.yd-navbar-center-title {
  font-size: 0.32rem !important;
  font-weight: bold;
}
.yd-tabbar-badge,
.yd-tabbar-dot {
  z-index: 11;
}
.yd-btn-primary:not(.yd-btn-loading) {
  background-color: #8d66fa;
}
.yd-btn-primary:active {
  background-color: #8d66fa;
}
.yd-navbar {
  background-color: #f7f7f7 !important;
}
.yd-navbar:after {
  background-image: none;
}
</style>

