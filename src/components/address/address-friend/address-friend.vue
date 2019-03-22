<template>
  <transition name="slide">
    <div class="friend">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar slot="navbar" title="新的朋友">
          <router-link to slot="left" @click.native="back">
            <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
          <router-link to="../add" slot="right">添加朋友</router-link>
        </yd-navbar>
        <template>
          <yd-cell-group>
            <yd-cell-item v-for="(item, index) in friendList" :key="item.the_person_being_added">
              <img slot="icon" :src="item.head_portrait">
              <div slot="left">
                <p>{{item.nick_name}}</p>
                <span>{{item.remarks}}</span>
              </div>

              <span slot="right" v-if="item.is_type == 0 && item.start == 0">请求中</span>
              <yd-button
                slot="right"
                @click.native="acceptFriendReq(item.add_people,item.the_person_being_added,item.source)"
                v-if="item.is_type == 1 && item.start == 0"
                bgcolor="#8D66FA"
                color="#FFF"
              >接受</yd-button>
              <span slot="right" v-if="item.start == 1">已添加</span>
              <span slot="right" v-if="item.start == 2">已拒绝</span>
            </yd-cell-item>
          </yd-cell-group>
        </template>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import api from "@/api/resource.js";
export default {
  components: {},
  data() {
    return {
      friendList: []
    };
  },
  mounted() {
    let addFriendList = JSON.parse(localStorage.getItem("addFriendList"));
    if (addFriendList) {
      this.friendList = addFriendList;
    } else {
      // 手动获取是否有新消息
      // 新朋友消息
      let userinfo = JSON.parse(localStorage.getItem("access_token"));
      api
        .findNewFriend(this, {
          id: userinfo.id
        })
        .then(res => {
          let val = res.body;
          if (val.code == "200") {
            let friendList = val.list;
            // 缓存10条最新的朋友消息，
            if (friendList) {
              this.friendList = friendList;
              localStorage.setItem(
                "addFriendList",
                JSON.stringify(vfriendList)
              );
            }
          }
        })
        .catch(err => {
          console.log("err: " + JSON.stringify(err));
        });
    }
  },
  watch: {
    $route(to, from) {
      // 监听路由变化刷新页面
      let addFriendList = JSON.parse(localStorage.getItem("addFriendList"));
      if (addFriendList) {
        this.friendList = addFriendList;
      }
    }
  },
  methods: {
    back(event) {
      this.$router.back(); // 返回上一级
    },
    acceptFriendReq(id, friendId, source) {
      api
        .agreeFriendReq(this, {
          id,
          friendId,
          source
        })
        .then(res => {
          console.log(JSON.stringify(res));
          let val = res.body;
          if (val.code == "200") {
            this.$router.push({
              path: `/chat`
            });
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }
  }
};
</script>

<style>
.friend {
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
.friend .yd-cell-icon img {
  width: 1rem;
  height: 1rem;
  border-radius: 5px;
}
.friend .yd-cell-item {
  padding: 0.2rem 0 0.2rem 0.2rem;
}
.friend .yd-navbar-item a {
  color: #8d66fa;
  font-size: 0.32rem;
}
</style>
