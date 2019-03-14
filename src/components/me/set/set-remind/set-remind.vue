<template>
  <transition name="slide">
    <div class="help">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar @click.native="back" slot="navbar" title="新消息提醒">
          <router-link to slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
        </yd-navbar>
        <yd-cell-group>
          <yd-cell-item type="label">
            <div slot="left">接收新消息通知</div>
            <yd-switch slot="right" v-model="newNews"></yd-switch>
          </yd-cell-item>
          <yd-cell-item type="label" style="border-bottom: 0.2rem solid #f9f9f9;">
            <div slot="left">通知显示消息详情</div>
            <yd-switch slot="right" v-model="displayMessages"></yd-switch>
          </yd-cell-item>
          <yd-cell-item type="label">
            <div slot="left">声音</div>
            <yd-switch slot="right" v-model="voice"></yd-switch>
          </yd-cell-item>
          <yd-cell-item type="label">
            <div slot="left">震动</div>
            <yd-switch slot="right" v-model="shock"></yd-switch>
          </yd-cell-item>
        </yd-cell-group>
      </div>
    </div>
    <router-view></router-view>
  </transition>
</template>

<script type="text/ecmascript-6">
import api from "@/api/resource.js";
export default {
  components: {},
  data() {
    return {
      userinfo: {}
    };
  },
  mounted() {
    this.userinfo = JSON.parse(localStorage.getItem("access_token"));
  },
  methods: {
    back(event) {
      let userinfo = this.userinfo;
      let oldVal = localStorage.getItem("access_token");
      let newVal = JSON.stringify(userinfo);
      if (oldVal != newVal) {
        //需要更新用户隐私信息
        api
          .updateSysUserNewMessageConf(this, {
            ...userinfo
          })
          .then(res => {
            let val = res.body;
            if (val.code == "200") {
              localStorage.setItem("access_token", JSON.stringify(userinfo));
              this.$router.push({
                path: `/me/set`
              });
            }
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });
      } else {
        this.$router.push({
          path: `/me/set`
        });
      }
    }
  },
  computed: {
    newNews: {
      get() {
        return this.userinfo.newNews == 0 ? true : false;
      },
      set(bool) {
        this.userinfo.newNews = bool ? 0 : 1;
      }
    },
    displayMessages: {
      get() {
        return this.userinfo.displayMessages == 0 ? true : false;
      },
      set(bool) {
        this.userinfo.displayMessages = bool ? 0 : 1;
      }
    },
    voice: {
      get() {
        return this.userinfo.voice == 0 ? true : false;
      },
      set(bool) {
        this.userinfo.voice = bool ? 0 : 1;
      }
    },
    shock: {
      get() {
        return this.userinfo.shock == 0 ? true : false;
      },
      set(bool) {
        this.userinfo.shock = bool ? 0 : 1;
      }
    }
  }
};
</script>

<style>
.help {
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
.help .user-photo {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 6px;
  display: block;
  margin: 0.6rem auto 0.4rem;
}
.helpDetail-btn {
  width: 85%;
  margin: auto;
}
.helpDetail-top {
  text-align: center;
  color: #404040;
  font-size: 0.28rem;
}
</style>
