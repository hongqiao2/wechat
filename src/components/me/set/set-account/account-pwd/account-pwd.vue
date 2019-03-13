<template>
  <transition name="slide">
    <div class="account">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="设置登录密码">
            <router-link to="/me/set" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group title="请输入手机号和验证码">
            <yd-cell-item>
                <input slot="right" type="number" placeholder="请输入手机号">
            </yd-cell-item>
            <yd-cell-item>
                <input type="text" slot="right" placeholder="请输入手机号码">
                <yd-sendcode slot="right" 
                            v-model="start1" 
                            @click.native="sendCode1" 
                            type="primary"
                            init-str="获取验证码"
                ></yd-sendcode>
            </yd-cell-item>
        </yd-cell-group>
         <yd-cell-group title="新密码">
             <yd-cell-item>
                <yd-input slot="right" type="password" v-model="input1" placeholder="请输入新密码"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <yd-input slot="right" type="password" v-model="input2" placeholder="请再次输入新密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <div class="account-btn">
            <yd-button size="large" type="primary">确认密码</yd-button>
        </div>
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
      return {
        start1: false,
        input1: '',
        input2: ''
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      sendCode1 () {
        this.$dialog.loading.open('发送中...')
        setTimeout(() => {
          this.start1 = true
          this.$dialog.loading.close()
          this.$dialog.toast({
            mes: '已发送',
            icon: 'success',
            timeout: 1500
          })
        }, 1000)
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
.account-btn{
    width: 85%;
    margin: auto;
}
</style>
