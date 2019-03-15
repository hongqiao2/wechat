<template>
  <transition name="slide">
    <div class="recharge">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click.native="back" slot="navbar" title="添加银行卡">
            <router-link to="" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div v-if="show1">
          <yd-cell-group>
            <yd-cell-item>
                <span slot="left">银行卡号</span>
                <input slot="right" type="number" placeholder="请输入银行卡号">
            </yd-cell-item>
          </yd-cell-group>
          <div class="recharge-btn">
              <yd-button size="large"  bgcolor="#8D66FA" color="#FFF"  @click.native="nextStep">下一步</yd-button>
          </div>
        </div>
        <div v-if="show2">
          <yd-cell-group>
            <yd-cell-item>
                <span slot="left">银行卡</span>
                <span slot="left">中国光大银行（1682）</span>
            </yd-cell-item>
          </yd-cell-group>
          <yd-cell-group>
            <yd-cell-item>
                <span slot="left">姓名</span>
                <input slot="right" type="number" placeholder="请输入姓名">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">身份证号</span>
                <input slot="right" type="number" placeholder="请输入身份证号">
            </yd-cell-item>
          </yd-cell-group>
          <yd-cell-group>
            <yd-cell-item>
                <span slot="left">手机号</span>
                <input slot="right" type="number" placeholder="银行预留手机号">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">验证码</span>
                <input slot="right" type="number" placeholder="请输入验证码">
                <yd-sendcode slot="right" 
                  v-model="start1" 
                  @click.native="sendCode1" 
                  type="hollow"
                  init-str="发送验证码"
                ></yd-sendcode>
            </yd-cell-item>
          </yd-cell-group>
          <router-link to="#" slot="left" class="add-agreement">《金融魔方用户协议》</router-link>
          <div class="recharge-btn">
              <yd-button size="large"  bgcolor="#8D66FA" color="#FFF"  @click.native="goMoneypwd">同意协议并确定</yd-button>
          </div>
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
        start1: false,
        show1: true,
        show2: false
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      nextStep () {
        this.show1 = false
        this.show2 = true
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
