<template>
  <yd-layout class="chatroom">
    <yd-navbar slot="navbar" :title="info.remark_name ? info.remark_name : info.nick_name">
      <router-link to @click.native="back" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <img
        class="person-icon"
        @click="gotoUser(info)"
        slot="right"
        src="../../assets/chatroom/person.png"
      >
    </yd-navbar>
    <div class="content">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <div class="content-body" ref="body">
            <ul class="inHtml" v-for="item in content" :key="item.sendMsg">
              <li class="ask" v-if="item.sendType == 1">
                <img :src="item.userImg">
                <p>{{item.sendMsg}}</p>
              </li>
              <li class="reply" v-else>
                <img :src="item.userImg">
                <p>{{item.sendMsg}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-more" v-if="showPop">
      <div>
        <img src="../../assets/chatroom/album.png">
        <p>相册</p>
      </div>
      <div>
        <img src="../../assets/chatroom/photograph.png">
        <p>拍照</p>
      </div>
      <div @click="goPacket">
        <img src="../../assets/chatroom/packet2.png">
        <p>云红包</p>
      </div>
      <div @click="goPacket">
        <img src="../../assets/chatroom/alipay1.png">
        <p>支付宝红包</p>
      </div>
      <div @click="goCard">
        <img src="../../assets/chatroom/card.png">
        <p>个人名片</p>
      </div>
      <div>
        <img src="../../assets/chatroom/collect1.png">
        <p>收藏</p>
      </div>
    </div>
    <yd-tabbar slot="tabbar" class="chatroom-bottom" v-bind:class="{ popHeight:popHeight}">
      <button class="voice-btn" v-if="showVoice" @click="changeStatus">语音</button>
      <button class="text-btn" v-if="showText" @click="changeStatus">键盘</button>
      <div class="send" v-if="showVoice">
        <input
          type="text"
          placeholder="请输入聊天内容"
          v-model="value"
          class="sText"
          ref="sTest"
          @input="sendInput"
        >
      </div>
      <div class="speak" v-if="showText">
        按住 说话
        <!-- <input type="text" placeholder="请输入聊天内容" class="sText" ref="sTest"/> -->
      </div>
      <yd-button
        bgcolor="#8D66FA"
        color="#FFF"
        class="btn"
        v-if="sendShow"
        @click.native="sendContent"
      >发送</yd-button>
      <!-- <input type="button" class="btn" value="发送" v-if="sendShow" @click="sendContent" /> -->
      <button class="express-btn">表情</button>
      <!-- <p class="more-btn" @click.native="moreBtn">更多</p> -->
      <button class="more-btn" @click="moreBtn">更多</button>
    </yd-tabbar>
    <router-view></router-view>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import { mapGetters } from "vuex";
import api from "@/api/resource.js";
export default {
  components: {
    BScroll
  },
  data() {
    return {
      text: "", // 输入框的文字
      showVoice: false, // 语音按钮
      showText: true, // 键盘按钮
      popHeight: false, // 更多弹出
      showPop: false, // 更多显示
      sendShow: false, // 发送按钮
      value: "",
      randomReply: [
        "你谁啊？",
        "请你再说一遍！",
        "想和我聊天？得先夸我！",
        "我不知道你在讲什么。。。",
        "不好意思，我不想和你说话。",
        "先告诉我你是谁。",
        "竖子不足以谋也！",
        "我选择沉默",
        "来吧，一起吹牛逼。。",
        "我很困，不想聊天",
        "别废话，先给我讲个笑话",
        "你从哪里来",
        "心情不好，最好别搭理我",
        "等我忙完再回复你",
        "敢问尊姓大名",
        "近来可好？",
        "看来你是想和我聊天",
        "你是要请我吃饭吗？",
        "先给我一个让我回复你的理由",
        "哈哈哈"
      ],
      content: [], // 聊天内容[{userImg: "用户头像", sendMsg: "内容", isSend: "是否发送者", isAddFriend: "是否是好友通知"]
      userinfo: {},
      updateStateType: false // 如果有新消息，或者发送了消息，就需要在返回时运行findSysUserNewLogList方法
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      });
    });

    // 获取最新信息
    let userinfo = JSON.parse(localStorage.getItem("access_token"));
    this.userinfo = userinfo;
    api
      .findSysUserNewLogList(this, {
        id: userinfo.id,
        chat_bject: this.info.chat_bject,
        pageNo: 0,
        pageSize: 10
      })
      .then(res => {
        let _val = res.body;
        if (_val.code == "200") {
          let _list = _val.listPageInfo.list;
          let _content = [];
          for (let index in _list) {
            if (_list[index].sendType == 0) {
              _content.push({
                userImg: userinfo.headPortrait,
                sendMsg: _list[index].sendMsg,
                isSend: _list[index].sendType,
                isAddFriend: _list[index].isAddFriend
              });
            } else {
              _content.push({
                userImg: this.info.head_portrait,
                sendMsg: _list[index].sendMsg,
                isSend: _list[index].sendType,
                isAddFriend: _list[index].isAddFriend
              });
            }
          }
          this.content = _content;
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  },
  methods: {
    back(event) {
      if (this.updateStateType) {
        // 修改消息状态为已读
        api
          .updateMsgState(this, {
            id: this.userinfo.id,
            chat_bject: this.info.chat_bject
          })
          .then(res => {
            let _val = res.body;
            if (_val.code == "200") {
              let _infoId = this.info.chat_bject;
              let chatList = JSON.parse(localStorage.getItem("chatListCache"));
              let _userinfo = chatList[_infoId];
              if (this.text !== "") {
                _userinfo.latest_news = this.text;
              }
              _userinfo.news_number = 0;
              chatList[_infoId] = _userinfo;
              localStorage.setItem("chatListCache", JSON.stringify(chatList));
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
      }
      this.$router.back(); // 返回上一级
    },
    gotoUser(info) {
      this.$router.push({
        path: `/chatroom/user`
      });
    },
    goPacket(info) {
      this.$router.push({
        path: `/chatroom/packet`
      });
    },
    goCard() {
      this.$router.push({
        path: `/chatroom/percard`
      });
    },
    changeStatus() {
      if (this.showVoice) {
        this.sendShow = false;
        this.showVoice = false;
        this.showText = true;
      } else if (this.showText) {
        if (this.value !== "") {
          this.sendShow = true;
        }
        this.showVoice = true;
        this.showText = false;
      }
    },
    sendContent() {
      this.value = "";
      this.sendShow = false;
      this.text = this.$refs.sTest.value;
      if (this.text !== "") {
        // 发送消息到服务器
        api
          .saveSendMsg(this, {
            id: this.userinfo.id,
            chat_bject: this.info.chat_bject,
            sendMsg: this.text
          })
          .then(res => {
            let _val = res.body;
            if (_val.code == "200") {
              this.content.push({
                userImg: userinfo.headPortrait,
                sendMsg: this.text,
                isSend: 0,
                isAddFriend: 0
              });
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
      }
      this.$refs.sTest.value = ""; // 清空输入框的内容
    },
    moreBtn() {
      if (this.showPop) {
        this.showPop = false;
        this.popHeight = false;
      } else {
        this.showPop = true;
        this.popHeight = true;
      }
    },
    sendInput() {
      if (this.value !== "") {
        this.sendShow = true;
      } else {
        this.sendShow = false;
      }
    }
  },
  computed: {
    ...mapGetters({
      info: "info"
    })
  },
  watch : {
    info: function(val){
      console.log(1)
      console.log(JSON.stringify(val))
    }
  }
};
</script>

<style scoped>
.chatroom {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  background-color: #f9f9f9;
}
.chatroom .content {
  position: relative;
  padding: 0.4rem 0.2rem;
}
.person-icon {
  width: 0.55rem;
  height: 0.55rem;
}
.voice-btn {
  background: url("../../assets/chatroom/voice.png");
  background-size: 100%;
  width: 0.5rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  margin-left: 0.25rem;
}
.text-btn {
  background: url("../../assets/chatroom/keyboard.png");
  background-size: 100%;
  width: 0.5rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  margin-left: 0.25rem;
}
.express-btn {
  background: url("../../assets/chatroom/face.png");
  background-size: 100%;
  width: 0.5rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  margin-right: 0.25rem;
}
.more-btn {
  background: url("../../assets/chatroom/more.png");
  background-size: 100%;
  width: 0.5rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  color: transparent;
  border: none;
  margin-right: 0.25rem;
}
.send {
  display: flex;
  width: 70%;
}
.sText {
  -webkit-box-flex: 6;
  -ms-flex: 6;
  flex: 6;
  height: 0.7rem;
  line-height: 0.7rem;
  margin: 0.2rem;
  padding-left: 8px;
  border: 1px solid #eee;
  font-size: 0.3rem;
  border-radius: 0.1rem;
  outline: none;
  -webkit-appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.content-body li {
  position: relative;
  overflow: hidden;
  margin-bottom: 0.3rem;
}
.btn {
  position: absolute;
  right: 0.1rem;
  color: #fff;
  border: none;
  width: 0.8rem;
  height: 0.5rem;
  padding: 0;
  border-radius: 5px;
}
.speak {
  height: 0.7rem;
  margin: 0.2rem;
  border: 1px solid #eee;
  font-size: 0.3rem;
  border-radius: 0.1rem;
  line-height: 0.65rem;
  text-align: center;
  justify-content: center;
  color: #565656;
  font-weight: 500;
  width: 64%;
}
.inHtml img {
  position: relative;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
}
.ask {
  text-align: right;
}
.reply {
  text-align: left;
}
.ask img {
  float: right;
  margin-left: 0.3rem;
}
.reply img {
  float: left;
  margin-right: 0.3rem;
}
.reply p,
.ask p {
  border-radius: 4px;
  text-align: left;
  font: 0.28rem Microsoft YaHei;
  line-height: 0.6rem;
}
.ask p {
  float: right;
  padding: 0.1rem 0.25rem;
  max-width: 4rem;
  background: #c2acff;
  color: #101010;
  white-space: pre-wrap;
  word-break: break-all;
}
.reply p {
  left: 2pc;
  float: left;
  padding: 3px 10px;
  max-width: 190px;
  background: #fff;
}
.chatroom-bottom {
  height: 50px;
  background-color: #fff;
}
.send {
  display: flex;
  width: 70%;
}
.sText {
  -webkit-box-flex: 6;
  -ms-flex: 6;
  flex: 6;
  height: 0.7rem;
  margin: 0.2rem;
  padding-left: 8px;
  border: 1px solid #eee;
  font-size: 0.3rem;
  border-radius: 0.1rem;
}
.chat-more {
  background: #f8f8f8;
  position: fixed;
  height: 3.8rem;
  z-index: 11;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-flow: wrap;
  padding: 0 0.2rem;
  align-items: center;
}
.popHeight {
  bottom: 3.8rem !important;
}
.chat-more div {
  width: 25%;
  text-align: center;
}
.chat-more img {
  width: 0.9rem;
  height: 0.9rem;
}
</style>
