<template>
  <div class="chat">
    <scroll class="chat-wrapper">
      <div>
        <ul>
          <router-link
            to="/chatroom"
            tag="li"
            v-for="info in chatList"
            class="item"
            :key="info.id"
            v-swipeleft="(e)=>vueTouch('左滑',e)"
            v-swiperight="(e)=>vueTouch('右滑',e)"
          >
            <div class="item-cell" @click="gotoChatroom(info)" :class="{Delright:del}">
              <div class="img-unread">
                <img class="item-img" :src="info.head_portrait">
                <yd-badge
                  slot="badge"
                  type="danger"
                  v-if="info.news_number != 0"
                >{{info.news_number}}</yd-badge>
              </div>
              <h2 class="dissname" v-html="info.remark_name || info.nick_name"></h2>
              <p class="summary" v-html="info.latest_news"></p>
              <span class="item-time" v-html="formatDate(info.utime)"></span>
            </div>
            <div class="delete" v-if="delbtn" @click.stop="deleteBtn">删除</div>
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
  computed: {
    ...mapGetters([
      // 拿到info的状态
      "info",
      "addList",
      "chatListCache",
      "num"
    ])
  },
  methods: {
    vueTouch(txt, e) {
      if (txt == "左滑") {
        this.del = true;
        this.delbtn = true;
      } else if (txt == "右滑") {
        this.del = false;
        this.delbtn = false;
      }
    },
    enterMessage() {
      console.log(12);
    },
    gotoChatroom(info) {
      // 点击后使未读消息的提示消失
      this.setAddress(info);
    },
    ...mapMutations({
      setChatListCache: "SET_CHAT_LIST_CACHE"
    }),
    ...mapMutations({
      setShowNun: "SET_NUM"
    }),
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
    },
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
                chatList[userChatList[i].chat_bject] = userChatList[i];
                if (userChatListCache) {
                  // 如果缓存里面有数据，需要把新数据和老数据综合起来
                  let chat_bject = userChatList[i].chat_bject;
                  userChatListCache[chat_bject]
                    ? delete userChatListCache[chat_bject]
                    : "";
                  // 合并对象
                  Object.assign(chatList, userChatListCache);
                }
              }
              localStorage.setItem(
                "userChatListCache",
                JSON.stringify(userChatListCache)
              );
              this.chatList = chatList;
              this.setChatListCache(chatList);
            }
            this.setShowNun(num);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDateTime() {
      let time = new Date().getTime() / 1000;
      return time;
    },
    //删除
    deleteBtn() {
      console.log("删除了");
    }
  },
  watch: {
    $route(to, from) {
      // 监听路由变化刷新页面
    },
    chatListCache(val) {
      let chatListCache = JSON.parse(JSON.stringify(val));
      let userChatListCache = localStorage.getItem("userChatListCache");
      userChatListCache = userChatListCache
        ? JSON.parse(userChatListCache)
        : {};
      Object.assign(chatListCache, userChatListCache);
      this.chatList = chatListCache;
    }
  },
  mounted() {
    if (this.refresh == true) {
      // 如果是登录进来，需要调用初始化方法
      let userinfo = JSON.parse(localStorage.getItem("access_token"));
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
      return;
    }
    let chatListCache = JSON.parse(JSON.stringify(this.chatListCache));
    let userChatListCache = localStorage.getItem("userChatListCache");
    userChatListCache = userChatListCache ? JSON.parse(userChatListCache) : {};
    if (JSON.stringify(this.$route.params) != "{}") {
      let info = this.$route.params;
      console.log(info)
      // 先判断是否 info.latest_news 是否发送或者接收新消息
      // 1.如果未读消息数大于0, 修改未读消息数为0
      // 2.显示
      // 3.调用接口修改数据
      let infoId = info.griend_id || info.chat_bject;
      if (info.latest_news !== "" || info.news_number > 0) {
        // 如果不为空，则需要修改聊天列表的显示内容，如果聊天列表不存在，就创建
        if (chatListCache[infoId + "_" + info.nick_name]) {
          // 聊天列表中有数据
          // 如果临时缓存里面有数据
          chatListCache[infoId + "_" + info.nick_name].news_number = 0;
          chatListCache[infoId + "_" + info.nick_name].utime = this.getDateTime();
          if (info.latest_news !== "") {
            // 修改为最新消息
            chatListCache[infoId + "_" + info.nick_name].latest_news = info.latest_news;
          }
          // 设置缓存
          let newChatListCache = {};
          newChatListCache[infoId + "_" + info.nick_name] = chatListCache[infoId + "_" + info.nick_name];
          // 删除临时缓存
          delete chatListCache[infoId + "_" + info.nick_name];
          Object.assign(newChatListCache, chatListCache || {}, userChatListCache);
          let newNum = this.num;
          newNum = newNum - info.news_number; // 修改消息总数
          this.chatList = newChatListCache;
          this.setShowNun(newNum); // 设置消息总数
          this.setChatListCache(chatListCache); // 设置消息列表
          // 设置列表缓存
          localStorage.setItem(
            "userChatListCache",
            JSON.stringify(newChatListCache)
          );
          // 开始调用接口 修改消息列表状态
          api
            .updateMsgState(this, {
              id: info.subordinate_user || info.user_id,
              chat_bject: infoId
            })
            .then(res => {
              let _val = res.body;
              if (_val.code == "200") {
                console.log(_val);
              }
            })
            .catch(err => {
              console.log(JSON.stringify(err));
            });
        } else {
          // 发起新的聊天列表，修改缓存中的聊天列表信息
          if (userChatListCache) {
            let oldInfo = userChatListCache[infoId + "_" + info.nick_name];
            if (oldInfo) {
              // 设置缓存
              let newInfo = JSON.parse(JSON.stringify(oldInfo));
              newInfo.latest_news = info.latest_news;
              newInfo.utime = this.getDateTime();
              let newChatListCache = {};
              newChatListCache[infoId + "_" + info.nick_name] = newInfo;
              // 删除缓存中的数据
              delete userChatListCache[infoId + "_" + info.nick_name];
              let newCache = {
                ...newChatListCache,
                ...userChatListCache
              }
              this.chatList = newCache;
              console.log(newCache)
              localStorage.setItem(
                "userChatListCache",
                JSON.stringify(newCache)
              );
              return;
            }
          }
          // 设置缓存
          let newChatListCache = {};
          newChatListCache[infoId + "_" + info.nick_name] = {
            chat_bject: infoId,
            chat_state: 0,
            do_not_disturb: 0,
            head_portrait: info.head_portrait,
            id: info.id,
            is_add_friend: 0,
            is_top: 0,
            latest_news: info.latest_news,
            news_number: 0,
            nick_name: info.nick_name,
            remark_name: info.remark_name,
            rtime: info.rtime,
            subordinate_user: info.subordinate_user,
            utime: this.getDateTime()
          };
          let newCache = Object.assign(newChatListCache, chatListCache || {}, userChatListCache, newChatListCache);
          
          this.chatList = newChatListCache;
          this.setShowNun(0); // 设置消息总数
          localStorage.setItem(
            "userChatListCache",
            JSON.stringify(newChatListCache)
          );
        }
      } else {
        // 直接显示
        Object.assign(chatListCache, userChatListCache);
        this.chatList = chatListCache;
      }
    } else {
      // 直接显示
      Object.assign(chatListCache, userChatListCache);
      this.chatList = chatListCache;
    }
    this.setAddress({});
  },
  data() {
    return {
      chatList: {},
      moreList: [],
      name: "touch",
      del: false,
      delbtn: false,
      refresh: this.$route.params.refresh
    };
  }
};
</script>

<style scoped>
.item {
  background: #fff;
  width: 100%;
  height: 1.4rem;
  position: relative;
}
.Delright {
  right: 1.5rem;
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
.delete {
  width: 1.5rem;
  height: 1.4rem;
  background: red;
  position: absolute;
  right: 0;
  top: 0;
  text-align: center;
  color: #fff;
  line-height: 1.4rem;
  font-size: 0.28rem;
}
</style>