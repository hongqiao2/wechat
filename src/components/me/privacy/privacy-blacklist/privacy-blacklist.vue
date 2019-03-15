<<<<<<< HEAD
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
            <yd-cell-item v-for="(item, index) in info" :key="item.id">
                <img slot="left"  class="user-photo" :src="item.imgurl" />
                <span slot="left"  v-html="item.dissname"></span>
            </yd-cell-item>
        </yd-cell-group>
      </div>
    </div>
      <router-view></router-view>
  </transition>

</template>

<script type="text/ecmascript-6">
  export default {
    components: {
    },
    data () {
      return {
        info: [
          {
            dissname: '曹操',
            imgurl: 'http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg',
            num: 45
          },
          {
            dissname: '关羽',
            imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503761569656&di=01696cee833e1c3af42186949cf5a8fc&imgtype=0&src=http%3A%2F%2Fimg11.weikeimg.com%2Fupload%2Fnews%2F2011121315404465027.jpg',
            num: 52
          },
          {
            dissname: '孙权',
            imgurl: 'http://a0.att.hudong.com/27/15/01300000237183121990159374583_950.jpg',
            num: 9
          },
          {
            dissname: '司马懿',
            imgurl: 'http://www.e3ol.com/biography/upfiles/2008/20089822301342545.jpg',
            num: 71
          }
        ]
      }
    },
    mounted () {
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
=======
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
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
