<template>
    <div class="scan">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar title="扫一扫">
              <router-link to="" @click.native="back" slot="navbar left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
          </yd-navbar>
        </div>
      </div>
      <router-view></router-view>
    </div>
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

<style scoped>
  .scan{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #f9f9f9;
  }

</style>
