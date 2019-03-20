<template>
    <div class="contact">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="手机联系人">
            <router-link to="/find" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-item>
            <img slot="icon" src="../../../assets/chatroom/photo4.png">
            <span slot="left">赵宇</span>
            <yd-button slot="right"  bgcolor="#8D66FA" color="#FFF" >添加</yd-button>
        </yd-cell-item>
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
.contact{
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
.contact .yd-cell-icon img{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
}
.contact .yd-cell-item{
    background: #fff;
    padding: 0.1rem 0 0.1rem 0.2rem;
}
.contact .yd-btn{
    height: 0.5rem;
}
</style>
