<template>
  <transition name="slide">
    <div class="money">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="我的钱包">
            <router-link to="/me" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="money-top">
            <p class="money-balance">账户余额</p>
            <h2>￥0.00</h2>
            <div class="money-withdrawal">
              <p @click="goRecharge">
                <img src="../../../assets/me/recharge.png"/>
                充值
              </p>
              <p @click="goWithdraw">
                <img src="../../../assets/me/withdraw.png"/>
                提现
              </p>
            </div>
        </div>
        <yd-cell-group>
            <yd-cell-item arrow href="/me/money/packet" type="link">
              <img  slot="icon" src="../../../assets/me/packet1.png"/>
              <span slot="left">我的红包</span>
            </yd-cell-item>
            <yd-cell-item arrow href="/me/money/account" type="link">
              <img  slot="icon" src="../../../assets/me/account.png"/>
              <span slot="left">账户信息</span>
            </yd-cell-item>
            <yd-cell-item arrow href="/me/money/trecord" type="link">
              <img  slot="icon" src="../../../assets/me/record.png"/>
              <span slot="left">交易记录</span>
            </yd-cell-item>
            <yd-cell-item arrow href="/me/money/safety" type="link">
              <img  slot="icon" src="../../../assets/me/security.png"/>
              <span slot="left">安全设置</span>
            </yd-cell-item>
            <yd-cell-item arrow href="/me/money/bankset" type="link">
              <img  slot="icon" src="../../../assets/me/bank.png"/>
              <span slot="left">银行卡设置</span>
            </yd-cell-item>
        </yd-cell-group>
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
        datetime3: '2016-06',
        show: false
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goRecharge () {
        this.$router.push({
          path: `/me/money/recharge`
        })
      },
      goPacket () {
        this.$router.push({
          path: `/me/money/packet`
        })
      },
      goWithdraw () {
        this.$router.push({
          path: `/me/money/withdraw`
        })
      }
    }
  }
</script>

<style>
.money{
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
.money-top{
  background: #8D66FA;
  padding: 0.5rem 0 0;
}
.money-top .money-balance{
  background: url("../../../assets/me/balance.png") no-repeat;
  background-size: 0.48rem;
  color: #fff;
  background-position: 43% center;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 0.28rem;
  padding-left: 0.8rem;
}
.money-top h2{
  font-size: 0.56rem;
  color: #fff;
  text-align: center;
  margin-top: 0.2rem;
}
.money-withdrawal{
  background: #885EFE;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 0.28rem;
  padding: 0.3rem 0;
  margin-top: 0.4rem;
}
.money-withdrawal p:first-child{
  
  border-right: 1px solid #C2ACFF;
}
.money-withdrawal p{
  padding: 0 1.2rem;
}
.money-withdrawal p img{
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
  
}
.money .yd-cell-icon img{
  height: .4rem;
}
</style>
