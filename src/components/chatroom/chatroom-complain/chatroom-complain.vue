<template>
  <transition name="slide">
    <div class="chatroom-complain" ref="content">
      <yd-navbar title="投诉建议">
          <router-link to="/chatroom/user" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
      </yd-navbar> 
      <yd-cell-group title="请选择您遇到的问题">
        <yd-cell-item arrow type="link" href="/chatroom/suit" v-for="item in complainList" :key="item.id" >
            <span slot="left">{{item.title}}</span>
        </yd-cell-item>
    </yd-cell-group>
    <router-link to="/chatroom/notice" class="notice-font">投诉须知</router-link>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: { },
    data () {
      return {
        input1: '',
        complainList: [
          {
            id: 1,
            'title': '发布不适当内容对我造成骚扰'
          },
          {
            id: 2,
            'title': '存在欺诈骗钱行为'
          },
          {
            id: 3,
            'title': '此账号可能被盗了'
          },
          {
            id: 4,
            'title': '发布色情骚扰信息'
          },
          {
            id: 5,
            'title': '发布暴力恐怖信息'
          },
          {
            id: 6,
            'title': '发布政治敏感信息'
          },
          {
            id: 7,
            'title': '发布广告营销信息'
          }
        ]
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
    background-color: #ebebeb;
  }
  .notice-font{
    position: fixed;
    width: 100%;
    bottom: 0.2rem;
    color: #8D66FA !important;
    text-align: center;
    font-size: 0.28rem;
  }
</style>
