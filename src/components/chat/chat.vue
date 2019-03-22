<template>
  <div class="chat">
    <scroll class="chat-wrapper">
      <div>
        <ul>
          <router-link to="/chatroom" tag="li" v-for="info in chatList" :key="info.id" class="item">
            <div class="item-cell" @click="gotoChatroom(info)">
              <div class="img-unread">
                <img class="item-img" :src="info.head_portrait">
                <yd-badge slot="badge" type="danger">{{info.news_number}}</yd-badge>
              </div>
              <h2 class="dissname" v-html="info.nick_name"></h2>
              <p class="summary" v-html="info.latest_news"></p>
              <span class="item-time" v-html="formatDate(info.rtime)"></span>
            </div>
          </router-link>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from "../../base/scroll/scroll";
import { mapMutations, mapGetters } from "vuex";
import api from "@/api/resource.js";

export default {
  components: {
    Scroll
  },
  // updated () {
  //   console.log('测试：测试：')
  //   console.log(this.addList)
  // },
  computed: {
    ...mapGetters([
      // 拿到info的状态
      "info",
      "addList"
    ])
  },
  mounted() {
    // webSocket 初始化
    let userinfo = JSON.parse(localStorage.getItem("access_token"));
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
          let i = 0;
          for (i; i < userChatList.length; i++) {
            chatList[userChatList[i].chat_bject] = userChatList[i];
          }
          localStorage.setItem("chatListCache", JSON.stringify(chatList));
          this.chatList = chatList;
        }
      })
      .catch(err => {
        onsole.log(err);
      });
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
  methods: {
    enterMessage() {
      console.log(12);
    },
    gotoChatroom(info) {
      info.unread = ""; // 点击后使未读消息的提示消失
      info.summary = "点击发送消息"; // 点击后使未读消息的提示消失
      info.time = "刚刚";
      this.setAddress(info);
    },
    ...mapMutations({
      setAddress: "SET_INFO"
    }),
    formatDate(time) {
      let dateTimeStamp = time * 1000;
      var now = new Date();
      var y = now.getFullYear();
      var m = now.getMonth() + 1;
      var d = now.getDate();
      // 兼容苹果替换日期yyyy-MM-dd格式为yyyy/MM/dd
      if (typeof dateTimeStamp == "string") {
        var reg = getRegExp("-", "g");
        dateTimeStamp = dateTimeStamp.replace(reg, "/");
      }
      var date = new Date(dateTimeStamp);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();

      var result = "";
      if (year == y) {
        var n1 = new Date(y + "/" + m + "/" + d);
        var d1 = new Date(year + "/" + month + "/" + day);
        var diff = parseInt(n1 - d1);
        var cMinute = 1000 * 60;
        var cHour = cMinute * 60;
        var cDay = cHour * 24;
        var dayC = diff / cDay;
        // 补0
        month = month < 10 ? "0" + month + "" : "" + month + "";
        day = day < 10 ? "0" + day + "" : "" + day + "";
        hour = hour < 10 ? "0" + hour + "" : "" + hour + "";
        minute = minute < 10 ? "0" + minute + "" : "" + minute + "";

        if (dayC == 0) {
          result = "今天 " + hour + ":" + minute + "";
        } else if (dayC == 1) {
          result = "昨天 " + hour + ":" + minute + "";
        } else {
          result = month + "-" + day + " " + hour + ":" + minute + "";
        }
      } else {
        result =
          year + "-" + month + "-" + day + " " + hour + ":" + minute + "";
      }
      return result;
    } 
  },
  watch: {
    $route(to, from) {
      // 监听路由变化刷新页面
    }
  },
  data() {
    return {
      chatList: {},
      moreList: []
    };
  }
};
</script>

<style scoped>
.item {
  background: #fff;
  width: 100%;
  height: 1.4rem;
}
.item-cell {
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 0.2rem 0.3rem;
  width: 100%;
  height: 1.4rem;
}
.img-unread {
  position: relative;
  width: 1rem;
  height: 1rem;
  float: left;
  margin-right: 0.2rem;
}
.img-unread span {
  position: absolute;
  right: -0.15rem;
  top: -0.12rem;
}
.item-img {
  float: left;
  border-radius: 0.1rem;
  width: 1rem;
  height: 1rem;
  margin-right: 0.2rem;
}
.dissname {
  font-size: 0.34rem;
  font-weight: 400;
}
.summary {
  font-size: 0.28rem;
  padding-top: 0.08rem;
  color: rgba(153, 153, 153, 0.8);
}
.item-time {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: rgba(153, 153, 153, 0.8);
}
</style>