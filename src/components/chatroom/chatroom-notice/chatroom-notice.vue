<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="chatroom-complain" ref="content">
      <yd-navbar title="投诉建议">
          <router-link to="/chatroom/complain" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
      </yd-navbar> 
      <div class="notice-cont">
        <h2>投诉须知</h2>
        <p>{{cont}}</p>
      </div>
      
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: { },
    data () {
      return {
        input1: '',
        cont: '你应保证你的投诉行为基于善意，并代表你本人真实意思。微聊吧团队作为中立的平台服务者，收到你的投诉会尽快按照相关法律 的规定独立判断并进行处理。微聊吧团队将会采取合理的措施保护你的个人信息；除法律法规规定的情形外，未经用户许可，微聊吧团队 不会向第三方公开、透露你的个人信息。'
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style>
.chatroom-complain{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #ffffff;
  }
  .notice-cont{
    padding: 0.2rem 0.3rem;
    font-size: 0.28rem;
    color: #797979;
  }
  .notice-cont h2{
      font-size: 0.36rem;
      color: #101010;
      margin-bottom: 0.2rem;
  }
</style>
=======
<template>
  <transition name="slide">
    <div class="chatroom-complain" ref="content">
      <yd-navbar title="投诉建议">
          <router-link to="/chatroom/complain" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
      </yd-navbar> 
      <div class="notice-cont">
        <h2>投诉须知</h2>
        <p>{{cont}}</p>
      </div>
      
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: { },
    data () {
      return {
        input1: '',
        cont: '你应保证你的投诉行为基于善意，并代表你本人真实意思。微聊吧团队作为中立的平台服务者，收到你的投诉会尽快按照相关法律 的规定独立判断并进行处理。微聊吧团队将会采取合理的措施保护你的个人信息；除法律法规规定的情形外，未经用户许可，微聊吧团队 不会向第三方公开、透露你的个人信息。'
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style>
.chatroom-complain{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #ffffff;
  }
  .notice-cont{
    padding: 0.2rem 0.3rem;
    font-size: 0.28rem;
    color: #797979;
  }
  .notice-cont h2{
      font-size: 0.36rem;
      color: #101010;
      margin-bottom: 0.2rem;
  }
</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
