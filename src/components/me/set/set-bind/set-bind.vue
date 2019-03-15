<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="help">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="设置">
            <router-link to="/me/set" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="helpDetail-top">

            <img class="user-photo" src="../../../../assets/default.png"/>
            <p>绑定微信可同步微信头像、昵称到微聊，方便好友认识</p>
            <p>微信昵称：明军西</p>
        </div>
        <div class="helpDetail-btn"><yd-button size="large" type="primary">绑定微信</yd-button></div>
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
=======
<template>
  <transition name="slide">
    <div class="help">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="设置">
            <router-link to="/me/set" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="helpDetail-top">

            <img class="user-photo" src="../../../../assets/default.png"/>
            <p>绑定微信可同步微信头像、昵称到微聊，方便好友认识</p>
            <p>微信昵称：明军西</p>
        </div>
        <div class="helpDetail-btn"><yd-button size="large" type="primary">绑定微信</yd-button></div>
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
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
