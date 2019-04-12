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
      <yd-tabbar-item title="发现" link="/find" :dot="circleNum  > 0">
        <yd-icon  name="faxian" custom slot="icon" size="0.45rem"></yd-icon>
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
      "chatListCache",
      "circleNum"
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
            let userChatListCache = JSON.parse(
              localStorage.getItem("userChatListCache")
            );
            // 聊天列表缓存
            let num = 0; // 共计显示的消息数量
            if (userChatList) {
              let i = 0;
              for (i; i < userChatList.length; i++) {
                num += userChatList[i].news_number;
                let nick_name = userChatList[i].nick_name || "group";
                chatList[userChatList[i].chat_bject + "_" + nick_name] = userChatList[i];
                if (userChatListCache) {
                  // 如果缓存里面有数据，需要把新数据和老数据综合起来
                  let chat_bject = userChatList[i].chat_bject;
                  userChatListCache[chat_bject + "_" + nick_name]
                    ? delete userChatListCache[chat_bject + "_" + nick_name]
                    : "";
                  // 合并对象
                  Object.assign(chatList, userChatListCache);
                }
              }
              localStorage.setItem(
                "userChatListCache",
                JSON.stringify(userChatListCache)
              );
              this.setChatListCache(chatList);
            }
            this.setShowNun(num);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 群消息，以及个人消息的公用方法
    chatListUtils(userinfo, userChatListCache){
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
              let _chatListCache = JSON.parse(
                JSON.stringify(this.chatListCache)
              );
              // 聊天列表缓存
              let i = 0;
              let newNum =0;
              for (i; i < userChatLists.length; i++) {
                newNum += userChatLists[i].news_number;
                let nick_name = userChatLists[i].nick_name || "group";
                _chatListCache[userChatLists[i].chat_bject + "_" + nick_name] = userChatLists[i];
                if (userChatListCache) {
                  let chat_bject = userChatLists[i].chat_bject;
                  // 如果缓存里面有数据，需要把新数据和老数据综合起来
                  userChatListCache[chat_bject + "_" + nick_name]
                    ? delete userChatListCache[chat_bject + "_" + nick_name]
                    : "";
                }
                //newNum = userChatLists[i].news_number;
              }
              // 合并对象
              Object.assign(_chatListCache, userChatListCache);
              this.setShowNun(newNum);
              this.setChatListCache(_chatListCache);
              localStorage.setItem(
                "userChatListCache",
                JSON.stringify(userChatListCache)
              );
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
      let userChatListCache = JSON.parse(
        localStorage.getItem("userChatListCache")
      );
      //1.判断是否是好友添加的信息，同意添加好友的信息， 是的话就更新聊天列表，以及新的朋友列表
      // 朋友圈通知
      if (_data.isGroup == 3) {
        return;
      }
      // 好友通知
      if (_data.isGroup == 2) {
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
      if (_data.isGroup == 1 && _data.groupId != 0) {
        // 群消息通知
        let _info = JSON.parse(JSON.stringify(this.info));
        if (typeof _info !== "{}") {
          
          // 如果当前聊天界面不为空，判断是否是同一个好友发送的信息
          let _infoId = _info.griend_id || _info.chat_bject;
          if (_infoId && _data.groupId == _infoId) {
            _info.latest_news = _data.msg;
            _info.head_portrait = _data.head_portrait;
            _info.userName = _data.userName;
            let newNum = this.num;
            _info["msg_type"] = _data.msg_type;
            if (_data.msg_type == 1) {
              // 如果是图片
              let msgNum = JSON.parse(_data.msg).length;
              _info.news_number =
                typeof _info.news_number != "undefined"
                  ? _info.news_number + msgNum
                  : msgNum;
              newNum += msgNum;
            } else {
              _info["msg_type"] = _data.msg_type;
              if (_data.msg_type == 2) {
                console.log(_data.msg_time);
                _info["msg_time"] = _data.msg_time;
              }
              _info.news_number =
                typeof _info.news_number != "undefined"
                  ? _info.news_number + 1
                  : 1;
              newNum += 1;
            }
            this.setShowNun(newNum);
            this.setAddress(_info);
          }
        }
        this.chatListUtils(userinfo, userChatListCache);
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
            _info["msg_type"] = _data.msg_type;
            if (_data.msg_type == 1) {
              // 如果是图片
              let msgNum = JSON.parse(_data.msg).length;
              _info.news_number =
                typeof _info.news_number != "undefined"
                  ? _info.news_number + msgNum
                  : msgNum;
              newNum += msgNum;
            } else {
              _info["msg_type"] = _data.msg_type;
              if (_data.msg_type == 2) {
                console.log(_data.msg_time);
                _info["msg_time"] = _data.msg_time;
              }
              _info.news_number =
                typeof _info.news_number != "undefined"
                  ? _info.news_number + 1
                  : 1;
              newNum += 1;
            }
            this.setShowNun(newNum);
            this.setAddress(_info);
          }
        }
        this.chatListUtils(userinfo, userChatListCache);
      }
    }
  },
  mounted() {
    let userinfo = JSON.parse(localStorage.getItem("access_token"));
    if (!userinfo) {
      return;
    }
    // 先登录,
    let loginType = 0;
    if (userinfo.iphone) {
      loginType = 1;
    }
    if (userinfo.openid) {
      loginType = 2;
    }
    api
      .getLogin(this, {
        loginType,
        username: userinfo.username,
        password: userinfo.password,
        captcha: "154264",
        iphone: userinfo.iphone
      })
      .then(res => {
        if (res.body.data == 200 || res.body.code == 200) {
          this.findChatList(userinfo);
          this.findNewFriendList(userinfo);
          this.findFriendList(userinfo);
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
        }
      })
      .catch(err => {});
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

