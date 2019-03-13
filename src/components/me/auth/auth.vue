<template>
  <transition name="slide">
    <div class="auth">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="实名认证">
            <router-link to="/me" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div v-if="firstStep">
            <div class="auth-top"><img src="../../../assets/me/certification.png"/></div>
            <p class="auth-hint"><img src="../../../assets/me/identity.png"/>提前防范身份信息冒用</p>
            <div class="auth-btn">
                <yd-button size="large" type="primary" @click.native="cert">立即实名认证</yd-button>
            </div>
        </div>
        <div v-if="secondStep">
            <p class="auth-prompt">请输入账户本人的真实信息</p>
            <div class="auth-cert">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">姓名</span>
                        <yd-input slot="right" v-model="input10" ref="input10" placeholder="请输入姓名"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">身份证号</span>
                        <yd-input slot="right" v-model="input10" ref="input10" placeholder="请输入身份证号"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-button-group class="auth-btn">
                    <yd-button size="large" @click.native="toastSuccess">立即认证</yd-button>
                </yd-button-group>
            </div>
        </div>
      </div>
    </div>
      <router-view></router-view>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        input10: '',
        firstStep: true,
        secondStep: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      })
    },
    methods: {
      back (event) {
        // 为防止PC端时,点击事件会被执行两次,须作如下判断，但是这里暂时不需要，参考http://blog.csdn.net/alsnei/article/details/54375957
        // if (!event._constructed) {
        //   return
        // }
        this.$router.back()   // 返回上一级
      },
      toastSuccess () {
        this.$dialog.toast({
          mes: '实名认证成功',
          timeout: 1500,
          icon: 'success'
        })
      },
      cert () {
        this.firstStep = false
        this.secondStep = true
      }
    }
  }
</script>

<style>
.auth{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#fff;
}
.auth-top{
    background: #8D66FA;
    text-align: center;
    padding: 0.7rem 0;
}
.auth-top img{
    width: 3rem;
}
.auth-hint{
    color: #4D4D4D;
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.8rem 0;
}
.auth-hint img{
    width: 0.5rem;
    height: 0.5rem;
}
.auth-btn{
    width: 85%;
    margin: auto;
}
.auth-prompt{
    background: #F9F9F9;
    padding: 0.2rem;
    color: #717171;
    font-size: 0.28rem;
}
.auth-cert .yd-cell-right input[type=text]{
    text-align: right !important;
}   
.yd-button{
    padding: 0;
}
</style>
