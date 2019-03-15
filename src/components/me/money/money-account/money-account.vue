<template>
  <transition name="slide">
    <div class="account">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" :title="account_info">
            <router-link to="/me/money" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">姓名</span>
                <span slot="left">{{userInfo.realName}}</span>
                <span slot="left" v-if="isApprove">未实名认证</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">身份证号</span>
                <span slot="left">{{userInfo.idNumber}}</span>
                <span slot="left" v-if="isApprove">未实名认证</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="account-btn" v-if="isApprove">
            <yd-button size="large" type="primary" @click.native="goAuth">设置账户信息</yd-button>
        </div>
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
        isApprove: false,
        account_info: this.$route.params.type == 0 ? "身份信息" : "账户信息",
        userInfo: {}
      }
    },
    mounted () {
      this.userInfo = JSON.parse(localStorage.getItem("access_token"));
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goAuth () {
        this.$router.push({
          path: `/me/auth`
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
.account .yd-cell-item{
    height: 0.9rem;
}
.account .yd-cell-left{
    width: 100%;
}
.account .yd-cell-left span{
    width: 18%;
    display: inline-block;
}
.account-btn{
    width: 85%;
    margin: auto;
}

</style>
