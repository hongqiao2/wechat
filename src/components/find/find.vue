<template>
  <div class="find">
    <div class="find-wrapper" ref="wrapper">
      <div class="find-content">
        <router-link tag="div" class="find-list find-spacing" to="/find/friendcircle">
          <img class="find-img" src="../../assets/find/circle.png" />
          <span class="find-item">朋友圈</span>
        </router-link>
        <router-link tag="div" class="find-list find-spacing" @click="warn" to="/find/scan">
          <img class="find-img" src="../../assets/find/sweep.png" />
          <span class="find-item">扫一扫</span>
        </router-link>
        <router-link tag="div" class="find-list" @click="warn" to="/find/scan">
          <img class="find-img" src="../../assets/find/number.png" />
          <span class="find-item">按号码查找</span>
        </router-link>
        <router-link tag="div" class="find-list" @click="warn" to="/find/scan">
          <img class="find-img" src="../../assets/find/add.png" />
          <span class="find-item">添加手机联系人</span>
        </router-link>
        <router-link tag="div" class="find-list find-spacing" @click="warn" to="/find/scan">
          <img class="find-img" src="../../assets/find/invite.png" />
          <span class="find-item">邀请手机联系人</span>
        </router-link>
         <router-link tag="div" class="find-list" @click="warn" to="/find/scan">
          <img class="find-img" src="../../assets/find/invite1.png" />
          <span class="find-item">邀请微信好友</span>
        </router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, MessageBox} from 'mint-ui'
  import BScroll from 'better-scroll'

  export default {
    components: {
      BScroll,
      Toast,
      MessageBox
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
          click: true
        })
      })
    },
    methods: {
      warn () {
        this.$toast({
          message: '此功能未开发',
          duration: 1500
        })
      },
      littleApp () {
        MessageBox({
          title: '提示',
          message: '尚未添加任何小程序',
          showCancelButton: true
        })
      }
    }
  }
</script>

<style scoped>
  .find{
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(238,233,233,0.6);
  }
  .find-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .find-content{
    overflow: hidden;
  }
  .find-list{
    display: flex;
    align-items: center;
    left: 0;
    height: 1rem;
    padding: 0 0.2rem;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    font-size: 0.32rem;
    color: #464646;
  }
  .find-img{
    height: 0.64rem;
    width: 0.64rem;
  }
  .find-spacing{
    margin-bottom: 0.2rem;
  }
     
</style>
