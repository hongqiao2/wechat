<template id="app">
  <yd-layout>
    <yd-navbar title="消息" v-if="$route.meta.navShow">
        <router-link tag="div" to="/search" slot="right">
             <yd-icon name="search" custom size="0.4rem" color="#777" style=" margin-right: 0.3rem;"></yd-icon>
        </router-link>
        <router-link to="" slot="right" v-on:click.stop="doThis">
            <yd-icon name="jia" custom size="0.4rem" color="#777" v-on:click.native="logClick"></yd-icon>
        </router-link>
    </yd-navbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <yd-tabbar slot="tabbar" v-if="$route.meta.menuShow">
      <yd-tabbar-item title="消息" link="/chat">
          <yd-icon name="message" custom slot="icon" size="0.45rem"></yd-icon>
          <yd-badge slot="badge" type="danger" v-if="showMsgNum > 0">{{showMsgNum}}</yd-badge>
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
import Plus from './components/plus/plus'
import api from "@/api/resource.js";
export default {
  name: 'app',
  components: {
    Plus
  },
  data () {
    return {
      isShowPlus: false,
      showMsgNum: 0,
      userinfo: {}
    }
  },
  methods: {
    closeDialog () {
      this.isShowPlus = false
    },
    logClick () {
      this.isShowPlus = true
    }
  },
  mounted(){
    // webSocket 初始化
    let userinfo = JSON.parse(localStorage.getItem("access_token"));
    this.userinfo = userinfo;
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
          // 聊天列表缓存
          let chatList = JSON.parse(localStorage.getItem("chatListCache"))
            ? JSON.parse(localStorage.getItem("chatListCache"))
            : {};
          let showMsgNum = 0;
          let i = 0;
          for (i; i < userChatList.length; i++) {
            showMsgNum += userChatList[i].news_number;
            chatList[userChatList[i].chat_bject] = userChatList[i];
          }
          localStorage.setItem("chatListCache", JSON.stringify(chatList));
          this.chatList = chatList;
          this.showMsgNum += showMsgNum;
        }
      })
      .catch(err => {
        onsole.log(err);
      });
  }
}
</script>
<style>
.router-link-active{
  color:#8D66FA !important;
}
.yd-navbar-center-title{
  font-size: .32rem!important;
  font-weight: bold;
}
.yd-tabbar-badge, .yd-tabbar-dot{
    z-index: 11;
  }
.yd-btn-primary:not(.yd-btn-loading){
  background-color: #8D66FA;
}
.yd-btn-primary:active{
  background-color: #8D66FA;
}
.yd-navbar{
  background-color: #f7f7f7 !important;
}
.yd-navbar:after{
  background-image: none;
}
</style>

