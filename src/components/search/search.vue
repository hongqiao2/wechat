<template>
  <yd-layout>
    <transition name="slide">
      <div class="search">
        <div class="search-top">
          <router-link to @click.native="back" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
          <yd-search
            slot="left"
            v-model="value1"
            :on-submit="submitHandler"
            :on-cancel="back"
            style=" width: 100%;"
          ></yd-search>
        </div>
        <yd-cell-group title="联系人" v-if="friendShow">
          <yd-cell-item @click.native="detailsJump">
            <img slot="icon" :src="friend.head_portrait">
            <div slot="left" class="search-list-name">
              <p>{{friend.remark_name || friend.nick_name}}</p>
            </div>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="聊天记录" v-if="recordShow">
          <yd-cell-item>
            <img slot="icon" src="../../assets/chatroom/photo4.png">
            <div slot="left" class="search-list-name">
              <p>姐姐</p>
              <p>28条相关聊天记录</p>
            </div>
          </yd-cell-item>
          <yd-cell-item>
            <img slot="icon" src="../../assets/chatroom/photo4.png">
            <div slot="left" class="search-list-name">
              <p>车小晶</p>
            </div>
          </yd-cell-item>
        </yd-cell-group>
        <router-view></router-view>
      </div>
    </transition>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
import api from "@/api/resource.js";
//  import mui from '../static/mui/js/mui.js'
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      value1: "",
      recordShow: false,
      friend: {}, // 好友信息
      friendShow: false // 搜索好友显示
    };
  },
  methods: {
    back() {
      this.$router.back(); // 返回上一级
    },
    // 搜索好友
    submitHandler(value) {
      let accessToken = JSON.parse(localStorage.getItem("access_token"));
      this.$dialog.loading.open("搜索中...");
      api
        .findUserInfoByNameOrPhone(this, {
          params: {
            searchType: 1,
            id: accessToken.id,
            serchCont: value
          }
        })
        .then(res => {
          let val = res.body;
          if (val.code == "200" && val.userInfo) {
            this.friend = val.userInfo;
            this.friendShow = true;
          }
          this.$dialog.loading.close();
        })
        .catch(err => {
          this.$dialog.loading.close();
        });
      // this.$dialog.toast({ mes: `搜索：${value}` });
    },
    // 跳转到好友的展示详情页面
    detailsJump() {
      // 好友查询缓存
      let friend = JSON.parse(JSON.stringify(this.friend));
      friend["source"] = 1;
      this.setAddress(friend);
      this.$router.push({
        path: `/address/${this.friend.nickName}`
      });
    },
    ...mapMutations({
      setAddress: "SET_INFO"
    }),
  },
  computed: {}
};
</script>
<style>
.search {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: #ebebeb;
  z-index: 99;
}
.search-top {
  display: flex;
  align-items: center;
  width: 100%;
  background: #f9f9f9;
  padding-left: 0.2rem;
}
.search .yd-search-input {
  background: transparent;
}
.search .yd-search-input .yd-input > input {
  text-align: left;
}
.search .yd-cell-item {
  padding: 0.2rem;
}
.search .yd-cell-icon img {
  width: 1rem;
  height: 1rem;
  border-radius: 5px;
  margin-right: 0.1rem;
}
.search-list-name p:nth-child(1) {
  font-size: 0.32rem;
}
.search-list-name p:nth-child(2) {
  font-size: 0.24rem;
  color: #888;
}
.search .yd-cell-box {
  background: #fff;
}
.search .yd-cell-title {
  padding: 0.18rem 0.2rem;
}
.search .yd-cell-title:after,
.search .yd-cell-item:not(:last-child):after {
  background: #eee;
}
</style>
