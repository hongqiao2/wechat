<template>
  <transition name="slide">
    <div class="bankset">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click.native="back" slot="navbar" title="银行卡设置">
            <router-link to="" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="bank-list">
            <div class="bank-icon">
                <img src="../../../../assets/me/bank1.png"/>
            </div>
            <div class="bank-name">
                <p>中国光大银行</p>
                <p>**** **** **** 1682</p>
            </div>
            <yd-button  type="hollow" @click.native="pwdShow = true">解绑</yd-button>
        </div>
        <div class="bank-add" @click="goRechargeadd">
            <p>+添加银行卡</p>
        </div>
        <yd-keyboard v-model="pwdShow" :callback="done1" ref="keyboardDemo1"></yd-keyboard>
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
        pwdShow: false
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goRechargeadd () {
        this.$router.push({
          path: `/me/money/moneyadd`
        })
      },
      done1 (val) {
        console.log('输入的密码是：' + val)
        this.$dialog.loading.open('验证支付密码')
        /* 模拟异步验证密码 */
        setTimeout(() => {
          this.$refs.keyboardDemo1.$emit('ydui.keyboard.error', '对不起，您的支付密码不正确，请重新输入。')
          this.$dialog.loading.close()
        }, 2000)
      }
    }
  }
</script>

<style>
.bankset{
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
.bank-list{
    background: #8D66FA;
    color: #fff;
    display: flex;
    width: 90%;
    border-radius: 5px;
    margin: 0.2rem auto;
    padding: 0.2rem;
    height: 1.2rem;
    align-items: center;
}
.bank-icon{
    background: #fff;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 1rem;
}
.bank-list img{
    width: 0.6rem;
    height: 0.6rem;
}
.bank-name{
    width: 70%;
    margin-left: 0.2rem;
    font-size: 0.28rem;
}
.bankset .yd-btn-hollow:not(.yd-btn-loading){
    background: transparent;
    color: #fff;
    height: 0.45rem;
}
.bankset .bank-add{
    width: 90%;
    background: #fff;
    margin: auto;
    padding: 0.3rem 0.2rem;
    border: 1px solid #EBEBEB;
    border-radius: 5px;
    text-align: center;
    color: #A2A2A2;
    font-size: 0.28rem;
}
</style>
