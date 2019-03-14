<template>
  <transition name="slide">
    <div class="recharge">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click.native="back" slot="navbar" title="安全设置">
            <router-link to="" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    components: {
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

<style>
.recharge{
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
</style>
