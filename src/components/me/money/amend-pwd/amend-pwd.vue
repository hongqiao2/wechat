
<template>
  <transition name="slide">
    <div class="amend-pwd">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="修改支付密码">
            <router-link to="/me/money/safety" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">旧密码</span>
                <yd-input slot="right" type="password" v-model="input1" placeholder="请输入支付密码，以验证身份"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">支付密码</span>
                <yd-input slot="right" type="password" v-model="input2" placeholder="密码为6位数字"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">确认支付密码</span>
                <yd-input slot="right" type="password" v-model="input3" placeholder="请再次输入支付密码"></yd-input>
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
        input1: '',
        input2: '',
        input3: ''
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
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
