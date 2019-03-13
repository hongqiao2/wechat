<template>
  <transition name="slide">
    <div class="amend-pwd">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="找回支付密码">
            <router-link to="/me/money/safety" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">手机号</span>
                <yd-input slot="right" v-model="phoneInput" regex="mobile" placeholder="请输入手机号码"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号</span>
                <input type="text" slot="right" placeholder="请输入验证码">
                <yd-sendcode slot="right" 
                            v-model="start1" 
                            @click.native="sendCode1" 
                            type="hollow"
                            init-str="发送验证码"
                ></yd-sendcode>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">支付密码</span>
                <yd-input slot="right" type="password" v-model="pwdInput1" placeholder="密码为6位数字"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">确认支付密码</span>
                <yd-input slot="right" type="password" v-model="pwdInput2" placeholder="请再次输入支付密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <div class="amend-btn">
            <yd-button size="large" type="primary">确认提交</yd-button>
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
        phoneInput: '',
        start1: false,
        pwdInput1: '',
        pwdInput2: ''
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
.amend-pwd{
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
.amend-pwd .yd-cell-left{
    margin-right: 0.2rem;
}
.amend-pwd .amend-btn{
    width: 85%;
    margin: auto;
}
</style>
