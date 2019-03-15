<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="bill-record">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="收到的支付宝红包">
            <router-link to="/me/bill" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link class="record-more" to="#" slot="right" @click.native="show = true">
                <yd-icon name="more"  size="0.4rem"></yd-icon>
            </router-link>
            
        </yd-navbar>
        <div class="record-content">
            <div class="record-icon">
                <img src="../../../../assets/me/alipay.png"/>
            </div>
            <p class="record-stat">收到0个支付宝红包，共</p>
            <h2>0<span>元</span></h2>
            <p class="record-hint">收到的红包会自动转入授权的支付宝账户</p>
            <yd-datetime type="month" v-model="datetime3" slot="right"></yd-datetime>
        </div>
      </div>
      <yd-popup v-model="show" position="bottom" height="23%">
        <yd-cell-item>
            <span slot="left">收到的支付宝红包</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">发出的支付宝红包</span>
        </yd-cell-item>
        <yd-cell-item  @click.native="openConfrim">
            <span slot="left">取消支付宝绑定</span>
        </yd-cell-item>
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
      goRecord () {
        this.$router.push({
          path: `/me/bill/record`
        })
      },
      openConfrim () {
        console.log('123')
        this.$dialog.confirm({
          title: '',
          mes: '取消支付宝授权后，群设置的自动或延时收取支付宝功能无法使用，也不能发送和收取支付宝红包',
          opts: () => {
            this.$dialog.toast({mes: '你点了确定', timeout: 1000})
          }
        })
      }
    }
  }
</script>

<style>
.bill-record{
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
.record-content{
    background: #E51C23;
    padding: 0.6rem 0 0.4rem;
    text-align: center;
    color: #fff;
}
.record-icon{
    background: #fff;
    text-align: center;
    width: 1rem;
    height: 1rem;
    border-radius:10px;
    margin: 0 auto;
}
.record-icon img{
    width: 1rem;
    height: 1rem;
}
.record-content .record-stat{
    font-size: 0.28rem;
    margin: 0.4rem 0;
}
.record-content h2{
    font-size: 0.72rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.record-content h2 span{
    font-weight: normal;
    font-size: 0.28rem;
    margin-left: 0.1rem;
}
.record-hint{
    border-top: 1px solid #ED6573;
    width: 85%;
    margin: 0.4rem auto 0;
    padding: 0.2rem 0 0;
    font-size: 0.28rem;
}
.bill-record .yd-datetime-input{
    position: absolute;
    right: 1rem;
    text-align: right;
    top: 1.7rem;
    font-size: 0.32rem;
}
.record-more i{
    color: #101010;
}
.yd-confirm-ft>a.primary{
    color: #009FE8;
}
.yd-confirm-hd{
    text-align: center;
}
.yd-confirm{
    width: 80%;
}
</style>
=======
<template>
  <transition name="slide">
    <div class="bill-record">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="收到的支付宝红包">
            <router-link to="/me/bill" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link class="record-more" to="#" slot="right" @click.native="show = true">
                <yd-icon name="more"  size="0.4rem"></yd-icon>
            </router-link>
            
        </yd-navbar>
        <div class="record-content">
            <div class="record-icon">
                <img src="../../../../assets/me/alipay.png"/>
            </div>
            <p class="record-stat">收到0个支付宝红包，共</p>
            <h2>0<span>元</span></h2>
            <p class="record-hint">收到的红包会自动转入授权的支付宝账户</p>
            <yd-datetime type="month" v-model="datetime3" slot="right"></yd-datetime>
        </div>
      </div>
      <yd-popup v-model="show" position="bottom" height="23%">
        <yd-cell-item>
            <span slot="left">收到的支付宝红包</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">发出的支付宝红包</span>
        </yd-cell-item>
        <yd-cell-item  @click.native="openConfrim">
            <span slot="left">取消支付宝绑定</span>
        </yd-cell-item>
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
      goRecord () {
        this.$router.push({
          path: `/me/bill/record`
        })
      },
      openConfrim () {
        console.log('123')
        this.$dialog.confirm({
          title: '',
          mes: '取消支付宝授权后，群设置的自动或延时收取支付宝功能无法使用，也不能发送和收取支付宝红包',
          opts: () => {
            this.$dialog.toast({mes: '你点了确定', timeout: 1000})
          }
        })
      }
    }
  }
</script>

<style>
.bill-record{
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
.record-content{
    background: #E51C23;
    padding: 0.6rem 0 0.4rem;
    text-align: center;
    color: #fff;
}
.record-icon{
    background: #fff;
    text-align: center;
    width: 1rem;
    height: 1rem;
    border-radius:10px;
    margin: 0 auto;
}
.record-icon img{
    width: 1rem;
    height: 1rem;
}
.record-content .record-stat{
    font-size: 0.28rem;
    margin: 0.4rem 0;
}
.record-content h2{
    font-size: 0.72rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.record-content h2 span{
    font-weight: normal;
    font-size: 0.28rem;
    margin-left: 0.1rem;
}
.record-hint{
    border-top: 1px solid #ED6573;
    width: 85%;
    margin: 0.4rem auto 0;
    padding: 0.2rem 0 0;
    font-size: 0.28rem;
}
.bill-record .yd-datetime-input{
    position: absolute;
    right: 1rem;
    text-align: right;
    top: 1.7rem;
    font-size: 0.32rem;
}
.record-more i{
    color: #101010;
}
.yd-confirm-ft>a.primary{
    color: #009FE8;
}
.yd-confirm-hd{
    text-align: center;
}
.yd-confirm{
    width: 80%;
}
</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
