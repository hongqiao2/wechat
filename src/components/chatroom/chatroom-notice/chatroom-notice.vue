<template>
  <transition name="slide">
    <div class="chatroom-complain" ref="content">
      <yd-navbar title="投诉建议">
          <router-link to="/chatroom/user" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
      </yd-navbar> 
      <yd-cell-group title="请选择您遇到的问题">
        <yd-cell-item arrow type="link" href="#" v-for="item in complainList">
            <span slot="left">{{item.title}}</span>
        </yd-cell-item>
    </yd-cell-group>
    <router-link to="#">投诉须知</router-link>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: { },
    data () {
      return {
        input1: ''
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
</style>
