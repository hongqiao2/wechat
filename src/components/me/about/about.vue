<<<<<<< HEAD
<template>
    <div class="about">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="关于微聊">
            <router-link to="/me" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="about-logo">
            <img src="../../../assets/aidechat.png"/>
        </div>
        <p v-html="introduce"></p>
      </div>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        introduce: '微聊时一款轻量级社交平台支持发送语音短信、图片和文字可以发送点对点与群红包，可以单独置顶某类消息，也可以根据时间顺序管理，高效快捷，用户可以通过账号和密码登录，也可以通过手机号码接受验证码登录。'
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goBlacklist () {
        this.$router.push({
          path: `/me/privacy/blacklist`
        })
      }
    }
  }
</script>

<style>
.about{
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
.about-logo{
    text-align: center;
    margin: 1rem 0 0.6rem;
}
.about-logo img{
    width: 1.2rem;
    height: 2rem;
}
.about p{
    margin: 0 0.6rem;
    font-size: 0.28rem;
    color: #101010;
    line-height: 0.5rem;
}

</style>
=======
<template>
    <div class="about">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="关于微聊">
            <router-link to="/me" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="about-logo">
            <img src="../../../assets/aidechat.png"/>
        </div>
        <p v-html="introduce"></p>
      </div>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        introduce: '微聊时一款轻量级社交平台支持发送语音短信、图片和文字可以发送点对点与群红包，可以单独置顶某类消息，也可以根据时间顺序管理，高效快捷，用户可以通过账号和密码登录，也可以通过手机号码接受验证码登录。'
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goBlacklist () {
        this.$router.push({
          path: `/me/privacy/blacklist`
        })
      }
    }
  }
</script>

<style>
.about{
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
.about-logo{
    text-align: center;
    margin: 1rem 0 0.6rem;
}
.about-logo img{
    width: 1.2rem;
    height: 2rem;
}
.about p{
    margin: 0 0.6rem;
    font-size: 0.28rem;
    color: #101010;
    line-height: 0.5rem;
}

</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
