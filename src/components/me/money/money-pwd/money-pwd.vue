<template>
  <transition name="slide">
    <div class="recharge">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="设置支付密码">
            <router-link to="/me/money" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">支付密码</span>
                <yd-input slot="right"  type="password" v-model="input1" placeholder="密码为6位数字"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">确认支付密码</span>
                <yd-input slot="right" type="password" v-model="input2" placeholder="请再次输入支付密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <div class="recharge-btn">
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
      goMoneypwd () {
        this.$router.push({
          path: `/me/money/moneypwd`
        })
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
.recharge .yd-cell-left span{
  margin-right: 0.3rem;
}
.recharge-btn{
  width: 85%;
  margin: auto;
}
.recharge .yd-cell-right{
  min-height: 0.9rem;
}
.recharge .yd-cell:after{
  background: transparent;
}
.recharge  .yd-btn-hollow{
  color: #8D66FA;
  border: 1px slid #8D66FA;
  border-radius: 5px;
  height: 0.5rem;
}
.add-agreement{
    color: #8D66FA;
    margin: 0.3rem 0.2rem 1rem;
    display: block;
}
</style>
