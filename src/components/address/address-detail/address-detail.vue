<template>
  <!-- <transition name="slide"> -->
  <yd-layout class="address-detail">
    <yd-navbar slot="navbar" title="详细信息">
      <router-link to @click.native="back" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <router-link to="#" slot="right" @click.native="goDset(info.griend_id)">
        <i class="iconfont icon-xiazai9" style="color:#101010;"></i>
      </router-link>
    </yd-navbar>
    <div class="content" ref="content">
      <div class="content-name">
        <img class="smallImg" :src="info.head_portrait">
        <div class="content-disname">
          <h2 class v-html="info.remark_name ? info.remark_name : info.nick_name"></h2>
        </div>
      </div>
      <div class="content-note" v-if="currentUserId" @click="goRemark(info.griend_id)">设置备注和描述</div>
      <div class="content-intro">
        <span class="content-label">地区</span>
        {{info.country ? info.region ? info.country + " " +info.region : "这个人很懒...还没有设置地址" : "这个人很懒...还没有设置地址"}}
      </div>
      <div class="content-intro">
        <span class="content-label">个性签名</span>
        {{info.autograph ? info.autograph : "这个人很懒...没有留下签名"}}
      </div>
      <div class="content-intro">
        <span class="content-label">兴趣爱好</span>
        {{info.hobby ? info.hobby : "这个人很懒...没有什么爱好"}}
      </div>
      <div class="content-intro" v-if="currentUserId">
        <span class="content-label">来源</span>
        {{info.source == 1 ? "通过手机或者账号搜索" : "通过二维码搜索"}}
      </div>

      <div class="content-message" v-if="msgShow">
        <yd-button
          size="large"
          bgcolor="#8D66FA"
          color="#FFF"
          shape="circle"
          @click="doAddList(info)"
        >
          <router-link to="/chatroom">发消息</router-link>
        </yd-button>
      </div>
      <div class="content-message" v-if="addFriendShow">
        <yd-button
          size="large"
          bgcolor="#8D66FA"
          color="#FFF"
          shape="circle"
          @click.native="goAddfriend(info.griend_id)"
        >
          <router-link to>添加到通讯录</router-link>
        </yd-button>
      </div>
      <router-view></router-view>
    </div>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from "vuex";
import api from "@/api/resource.js";
export default {
  components: {},
  props: {
    imgurl: {
      type: String,
      default: ""
    },
    dissname: {
      type: String,
      default: ""
    },
    dissid: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    location: {
      type: String,
      default: ""
    },
    album: {
      type: String,
      default: ""
    },
    source: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentUserId: true, // 是否本人
      msgShow: true, // 发送消息按钮控制
      addFriendShow: false, // 添加到通讯录控制
      friendId: this.$route.params.id
    };
  },
  computed: {
    ...mapGetters([
      // 拿到info的状态
      "info"
      ])
  },
  created() {
  },
  mounted() {
    
  },
  watch: {
    $route(to, from) {
      
    }
  },
  methods: {
    back() {
      this.$router.back(); // 返回上一级
    },
    doAddList(info) {
      this.setaddList(info);
    },
    // 添加好友到通讯录
    goAddfriend(dissid) {
      this.$router.push({
        path: `/address/${dissid}/addfriend`
      });
    },
    goDset(dissid) {
      this.$router.push({
        path: `/address/${dissid}/dset`
      });
    },
    goRemark(dissid) {
      this.$router.push({
        path: `/address/${dissid}/remark`
      });
    },
    changBig() {
      if (this.$refs.bagImge.offsetWidth < 100) {
        let pageWidth = this.$refs.content.offsetWidth;
        this.$refs.bagImge.style.height = pageWidth - 20 + "px";
        this.$refs.bagImge.style.width = pageWidth - 20 + "px";
      } else {
        this.$refs.bagImge.style.height = 60 + "px";
        this.$refs.bagImge.style.width = 60 + "px";
      }
    },
    ...mapMutations({
      setaddList: "SET_ADDLIST"
    })
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff !important;
}

.smallImg {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 5px;
}
.address-detail {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #ebebeb;
}

.content div {
  width: 100%;
  background-color: #fff;
}
.content-name {
  padding: 0.2rem 0.3rem;
  display: flex;
  align-items: center;
}

.content-name h2 {
  font-size: 0.36rem;
  margin-bottom: 0.2rem;
  padding-left: 0.25rem;
}
.content-name p {
  font-size: 0.28rem;
  padding-left: 0.25rem;
  color: #aaaaaa;
}
.content-note {
  margin: 0.2rem 0 0;
  padding: 0.2rem;
  font-size: 0.32rem;
  border-bottom: 1px solid #eee;
}
.content-intro {
  border-bottom: 1px solid #eee;
  padding: 0.2rem;
  font-size: 0.28rem;
  color: #888888;
}
.content-label {
  color: #464646;
  font-size: 0.3rem;
  width: 1.6rem;
  display: inline-block;
}

.content-album {
  display: flex;
  align-items: center;
}
.content-album img {
  margin-left: 20px;
}
.content-more {
  padding: 10px 10px;
  font-size: 14px;
}
.content .content-message {
  margin: 0.5rem auto;
  background-color: #ebebeb !important;
  width: 90%;
}
.message {
  display: flex;
  margin: 0 30px;
  height: 24px;
  padding: 8px 10px;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
  background-color: #1aad16;
  border: 1px solid #1aad16;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
.yd-icon-more {
  color: #101010;
}
.content .content-disname {
  width: 80%;
}
</style>
