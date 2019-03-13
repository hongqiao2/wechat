<template>
  <transition name="slide">
    <div class="help">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="新消息提醒">
            <router-link to="/me/set" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item type="label">
                <div slot="left">接收新消息通知</div>
                <yd-switch slot="right"></yd-switch>
            </yd-cell-item>
            <yd-cell-item type="label" style="border-bottom: 0.2rem solid #f9f9f9;">
                <div slot="left">接收新消息通知</div>
                <yd-switch slot="right"></yd-switch>
            </yd-cell-item>
            <yd-cell-item type="label">
                <div slot="left">声音</div>
                <yd-switch slot="right"></yd-switch>
            </yd-cell-item>
            <yd-cell-item type="label">
                <div slot="left">震动</div>
                <yd-switch slot="right"></yd-switch>
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
      return {}
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
.help{
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
.help .user-photo{
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 6px;
    display: block;
    margin: 0.6rem auto 0.4rem;
}
.helpDetail-btn{
    width: 85%;
    margin: auto;
}
.helpDetail-top{
    text-align: center;
    color: #404040;
    font-size: 0.28rem;
}

</style>
