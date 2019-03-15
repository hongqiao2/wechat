<template>
  <transition name="slide">
    <div class="recharge">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="充值">
            <router-link to="/me/money" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link class="recharge-query" to="#" slot="right" @click.native="show = true">
                <yd-icon name="question" size="0.4rem"></yd-icon>
            </router-link>
        </yd-navbar>
        <div class="recharge-bank" @click="goRechargeadd">
            <p>+添加银行卡</p>
        </div>
        <yd-cell-group v-if="bankShow">
            <yd-cell-item arrow @click.native="ChooseShow = true">
                <img slot="icon" src="../../../../assets/me/bank1.png"/>
                <div slot="left">
                  <p>光大银行</p>
                  <p class="bank-num">尾号（1682）</p>
                </div>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">金额（元）</span>
                <input slot="right" type="number" placeholder="请输入充值金额">
            </yd-cell-item>
        </yd-cell-group>
        <div class="recharge-btn">
            <yd-button size="large" type="primary" @click.native="openAlert">下一步</yd-button>
             <!-- @click.native="codeShow = keyShow = true"  已绑定银行卡，输入验证码 -->
        </div>
      </div>
      <yd-popup v-model="ChooseShow" position="bottom" height="35%">
        <div class="choose-top">
          <p>选择方式</p>
        </div>
        <yd-cell-group>
          <yd-cell-item type="radio">
              <span slot="left">中国广大银行（1879）</span>
              <input slot="right" type="radio" value="one" v-model="picked"/>
          </yd-cell-item>
          <yd-cell-item type="radio" @click.native="goRechargeadd">
              <span slot="left">添加新银行卡</span>
              <input slot="right" type="radio" value="two" v-model="picked"/>
          </yd-cell-item>
      </yd-cell-group>
      </yd-popup>
      <yd-popup v-model="codeShow" position="bottom" height="35%">
        <div class="choose-top">
          <p>请输入短信验证码</p>
        </div>
        <div class="recharge-input-box">
          <input class="recharge-input" type="text" slot="right" placeholder="请输入手机号码">
          <yd-sendcode slot="right" 
              v-model="start1" 
              @click.native="sendCode1" 
              type="hollow"
              init-str="获取验证码"
            ></yd-sendcode>
        </div>
      </yd-popup>
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
        bankShow: false,
        ChooseShow: false,
        picked: 'one',
        codeShow: false,
        start1: false,
        keyShow: false
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
      openAlert () {
        this.$dialog.alert({mes: '您还没有绑定银行卡，请先添加银行卡'})
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
.recharge-query i{
    color: #101010;
}
.recharge-bank{
    background: #fff;
    color: #3F51B5;
    text-align: center;
    font-size: 0.28rem;
    padding: 0.3rem 0;
    margin-bottom: 0.2rem;
}
.recharge-btn{
    width: 85%;
    margin: auto;
}
.yd-confirm-ft>a.primary{
  color: #3F51B5;
}
.recharge .yd-cell-icon img{
  height: 0.8rem;
}
.recharge  .bank-num{
  color: #BBBBBB;
  font-size: 0.24rem;
}
.choose-top {
    position: relative;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.28rem;
    border-bottom: 1px solid #eee;
}
.recharge-input-box{
  margin: 0.5rem 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.recharge-input{
  height: 0.7rem;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 0.2rem;
  width: 65%;
  font-size: 0.28rem;
}

</style>
