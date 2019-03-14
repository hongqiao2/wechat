<template>
  <transition name="slide">
    <div class="blacklist">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="通讯录黑名单">
            <router-link to="/me/privacy" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item v-for="(item, index) in info" :key="item.blacklistUser">
                <img slot="left"  class="user-photo" :src="item.imgUrl" />
                <span slot="left"  v-html="item.nickName"></span>
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
    components: {
    },
    data () {
      return {
        info: [
        ]
      }
    },
    mounted () {
      // 先获取缓存, 缓存没有获取数据库里的黑名单列表,
      //localStorage.setItem("user_privacy", JSON.stringify(userPrivacy));
      let blackList = JSON.parse(localStorage.getItem("sys_black_list"));
      let accessToken = JSON.parse(localStorage.getItem("access_token"));

      if(!blackList){
        api.getBlackList(this, {
          id: accessToken.id,
          pageNo: 0,
          pageSize: 5
        }).then( res => {
          let val = res.body;
          if(val.code == "200"){
            console.log(JSON.stringify(val))
            blackList = val.blacklist.list;
            localStorage.setItem("sys_black_list", JSON.stringify(val.blacklist.list));
          }
        }).catch( err => {

        });
      }
      this.info = blackList;
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      }
    }
  }
</script>

<style>
.blacklist{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#F9F9F9;
}
.blacklist .user-photo{
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.2rem;
    border-radius: 5px;
}
.blacklist .yd-cell-item{
    padding: 0.15rem 0.2rem;
}
</style>
