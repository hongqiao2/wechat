<template>
    <div class="account">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="账号与安全">
            <router-link to="/me/set" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item arrow type="label" @click.native="goAccountpwd">
                <span slot="left">设置登录密码</span>
            </yd-cell-item>
            <yd-cell-item arrow>
                <span slot="left">忘记登录密码</span>
            </yd-cell-item>
        </yd-cell-group>
      </div>
      <router-view></router-view>
    </div>
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
      },
      goAccountpwd () {
        this.$router.push({
          path: `/me/set/account/accountpwd/${0}`
        })
      }
    }
  }
</script>

<style>
.account{
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
