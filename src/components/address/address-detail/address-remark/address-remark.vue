<template>
  <!-- <transition name="slide"> -->
  <yd-layout class="remark">
    <yd-navbar slot="navbar" title="设置备注">
      <router-link to @click.native="back" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <router-link to @click.native="updateUserInfo" slot="right">完成</router-link>
    </yd-navbar>
    <yd-cell-group title="好友昵称">
      <yd-cell-item>
        <span slot="left">{{info.nick_name}}</span>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="备注名称">
      <yd-cell-item>
        <yd-input slot="right" v-model="nickInput" placeholder="请输入昵称"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="标签">
      <yd-cell-item>
        <yd-input slot="right" v-model="labelInput" placeholder="点击添加标签"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group title="描述">
      <yd-cell-item>
        <yd-input slot="right" v-model="noteInput" placeholder="添加更多备注信息"></yd-input>
      </yd-cell-item>
    </yd-cell-group>
    <router-view></router-view>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/resource.js";

export default {
  components: {},
  data() {
    return {
      nickInput: "",
      labelInput: "", // TODO 标签暂未开发
      noteInput: ""
    };
  },
  computed: {
    ...mapGetters([
      // 拿到info的状态
      "info",
      "userFriendList",
      "chatListCache"
    ])
  },
  created() {},
  methods: {
    back() {
      this.$router.back(); // 返回上一级
    },
    updateUserInfo() {
      // 提交数据 TODO 没设置标签数据
      let newInfo = JSON.parse(JSON.stringify(this.info));
      newInfo.remark_name = newInfo.remark_name || "";
      newInfo.description = newInfo.description || "";
      if (
        newInfo.remark_name != this.nickInput ||
        newInfo.description != this.noteInput
      ) {
        newInfo.remark_name = this.nickInput != "" ? this.nickInput : newInfo.remark_name;
        newInfo.description = this.noteInput != "" ? this.noteInput : newInfo.description;
        // 修改临时缓存中的数据
        this.setaddList(newInfo);
        // 如果有一个被修改过，就调用修改接口
        api
          .updateSysUserFriend(this, {
            id: newInfo.id,
            userId: newInfo.subordinate_user,
            griendId: newInfo.chat_bject,
            source: newInfo.source,
            remarkName: this.nickInput,
            description: this.noteInput,
            rtime: newInfo.rtime
          })
          .then(res => {
            let _val = res.body;
            console.log(res);
            if (_val.code == "200") {
              // 修改成功后，修改缓存里面的昵称信息
              // userChatListCache.
              // userFriendListCache
              // this.chatListCache
              let userChatListCache = JSON.parse(
                localStorage.getItem("userChatListCache")
              );
              let userFriendList = JSON.parse(
                JSON.stringify(this.userFriendList)
              );
              let friendInfo = userFriendList[newInfo.chat_bject];
              if (friendInfo) {
                // 如果有朋友信息就修改
                friendInfo.remark_name = this.nickInput;
                newInfo.description = this.noteInput;
                this.setUserFriendListCache(userFriendList);
              }

              let chatList = JSON.parse(JSON.stringify(this.chatListCache));
              if (chatList) {
                let friendInfo = chatList[newInfo.chat_bject];
                friendInfo.remark_name = this.nickInput;
                this.setChatListCache(chatList);
              }
              if (userChatListCache) {
                // 如果聊天列表不为空
                let friendInfo = userChatListCache[newInfo.chat_bject];
                if (friendInfo) {
                  friendInfo.remark_name = this.nickInpu;
                }
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.$router.back();
    },
    ...mapMutations({
      setaddList: "SET_INFO"
    }),
    ...mapMutations({
      setUserFriendListCache: "SET_USER_FRIEND_LIST_CACHE"
    }),
    ...mapMutations({
      setChatListCache: "SET_CHAT_LIST_CACHE"
    })
  },
  mounted() {
    let info = JSON.parse(JSON.stringify(this.info));
    this.nickInput = info.remark_name || "";
    this.noteInput = info.description || "";
  }
};
</script>

<style>
.remark {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 203;
  background-color: #f9f9f9;
}
.remark a {
  color: #383838;
  font-size: 0.32rem;
}
</style>
