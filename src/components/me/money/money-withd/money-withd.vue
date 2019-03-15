<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="recharge">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="提现">
            <router-link to="/me/money" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="recharge-bank" @click="goRechargeadd" v-if="addBankShow">
            <p>+添加银行卡</p>
        </div>
        <div v-if="bankShow">
            <yd-cell-group>
                <yd-cell-item arrow @click.native="ChooseShow = true">
                    <img slot="icon" src="../../../../assets/me/bank1.png"/>
                    <div slot="left">
                    <p>光大银行</p>
                    <p class="bank-num">尾号（1682）</p>
                    </div>
                </yd-cell-item>
                <p class="withdraw-hint">快速提现需选择银行卡所在省市，如填写错误会出现提现失败的问题，提现失败的金额将会退回到您的余额账户中</p>
                <yd-cell-item>
                    <span slot="left">到账时间</span>
                    <span slot="left">2小时内到账</span>
                </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group>
                <yd-cell-item class="withdraw-input">
                    <span slot="left">金额（元）</span>
                    <input slot="right" type="number" placeholder="请输入充值金额">
                    <yd-sendcode slot="right"  type="hollow" init-str="全部提现" ></yd-sendcode>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        
        <div class="recharge-btn">
            <yd-button size="large" type="primary" >下一步</yd-button>
            <!-- @click.native="openAlert" 未绑定银行卡，提示请绑定卡 -->
            <p>提示：单人单日限额5000元，每日限提现三次</p>
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
        addBankShow: false,
        bankShow: true,
        start1: false,
        keyShow: false,
        ChooseShow: false,
        picked: 'one'
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
.recharge-btn p{
    color: #A2A2A2;
    font-size: 0.24rem;
    margin-top: 0.2rem;
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
.withdraw-hint{
    background: #f9f9f9;
    padding: 0.2rem 0.3rem;
    color: #A2A2A2;
}
.withdraw-input .yd-btn{
    color: #8D66FA;
    height: 0.5rem;
    border-radius: 5px;
}
.choose-top {
    position: relative;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.28rem;
    border-bottom: 1px solid #eee;
}
</style>
=======
<template>
  <transition name="slide">
    <div class="recharge">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="提现">
            <router-link to="/me/money" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="recharge-bank" @click="goRechargeadd" v-if="addBankShow">
            <p>+添加银行卡</p>
        </div>
        <div v-if="bankShow">
            <yd-cell-group>
                <yd-cell-item arrow @click.native="ChooseShow = true">
                    <img slot="icon" src="../../../../assets/me/bank1.png"/>
                    <div slot="left">
                    <p>光大银行</p>
                    <p class="bank-num">尾号（1682）</p>
                    </div>
                </yd-cell-item>
                <p class="withdraw-hint">快速提现需选择银行卡所在省市，如填写错误会出现提现失败的问题，提现失败的金额将会退回到您的余额账户中</p>
                <yd-cell-item>
                    <span slot="left">到账时间</span>
                    <span slot="left">2小时内到账</span>
                </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group>
                <yd-cell-item class="withdraw-input">
                    <span slot="left">金额（元）</span>
                    <input slot="right" type="number" placeholder="请输入充值金额">
                    <yd-sendcode slot="right"  type="hollow" init-str="全部提现" ></yd-sendcode>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        
        <div class="recharge-btn">
            <yd-button size="large" type="primary" >下一步</yd-button>
            <!-- @click.native="openAlert" 未绑定银行卡，提示请绑定卡 -->
            <p>提示：单人单日限额5000元，每日限提现三次</p>
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
        addBankShow: false,
        bankShow: true,
        start1: false,
        keyShow: false,
        ChooseShow: false,
        picked: 'one'
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
.recharge-btn p{
    color: #A2A2A2;
    font-size: 0.24rem;
    margin-top: 0.2rem;
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
.withdraw-hint{
    background: #f9f9f9;
    padding: 0.2rem 0.3rem;
    color: #A2A2A2;
}
.withdraw-input .yd-btn{
    color: #8D66FA;
    height: 0.5rem;
    border-radius: 5px;
}
.choose-top {
    position: relative;
    text-align: center;
    line-height: 0.9rem;
    font-size: 0.28rem;
    border-bottom: 1px solid #eee;
}
</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
