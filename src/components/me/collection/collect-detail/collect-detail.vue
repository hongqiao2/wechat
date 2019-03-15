<template>
  <yd-layout class="collect-detail">
    <yd-navbar slot="navbar" title="详情">
        <router-link to="" @click.native="back" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>
    <div class="detail-user">
      <div class="user-top">
        <img class="user-photo" src="../../../../assets/chatroom/photo4.png"/>
        <span>乔乔</span>
      </div>
      <p class="detail-cont">这是我收藏的东西</p>  
      <!-- <div class="useralbum">
        <img src="../../../../assets/chatroom/photo4.png"/>
      </div> -->
      <p class="usertime">收藏于今天</p>
      
    </div>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
      // BScroll
    },
    data () {
      return {
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

<style scoped>
  .collect-detail{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#fff;
  }
.detail-user{
  position: relative;
  margin: 0 0 0.2rem;
  padding: 0.3rem;
}
.detail-user .user-top{
  display: flex;
  align-items: center;
}
.detail-user .user-top span{
  font-size: 0.32rem;
}
.detail-user .user-photo{
  width: 0.88rem;
  height: 0.88rem;
  margin-right: 0.2rem;
  border-radius: 5px;
}
.detail-cont{
  font-size: 0.32rem;
  margin-top: 0.2rem;
  color: #383838;
}
.detail-user .usertime{
  color:#A2A2A2;
  font-size: 0.24rem;
  margin-top: 0.2rem;
}
.collect-detail .useralbum img{
  width: 7rem;
  height: 7rem;
  margin-top: 0.3rem;
}
</style>
