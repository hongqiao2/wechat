<template>
    <div class="login-box">
        <div class="pwd-logo">
            <img src="../../../assets/aidechat.png"/>
        </div>
        <yd-cell-group>
            <yd-cell-item>
                <yd-input slot="right" v-model="input8" required :show-success-icon="false" :show-error-icon="false" regex="mobile" placeholder="请输入手机号"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
         <div class="login-btn">
            <yd-button bgcolor="#8D66FA" color="#FFF" size="large">登录</yd-button>
         </div>
         <div class="login-way">
             <span @click="goLogin">使用短信验证码登录</span>
             <span>忘记密码</span>
         </div>
         
         <div class="third-login">
             <p>第三方登录</p>
             <img src="../../../assets/wechat.png" />
             <div>
                 <span>点击“登录”即表示已阅读并同意</span><br/>
                <router-link to="#">《用户使用协议》</router-link>
             </div>
             
         </div>
    </div>
   
</template>
<script type="text/ecmascript-6">
  import { Switch, MessageBox, Toast } from 'mint-ui'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      Switchch: Switch,  // switch为预留元素，这里换了个名字
      MessageBox,
      Toast
    },
    data () {
      return {
        input8: '',
        start1: false
      }
    },
    computed: {
      ...mapGetters([
        'info'
      ])
    },
    methods: {
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
      },
      goLogin (info) {
        this.$router.push({
          path: `/login`
        })
      }
    }
  }
</script>

<style scoped>
  .login-box{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #ffffff;
    padding: 1rem 0.4rem;
  }
  .login-title{
    font-size: 0.48rem;
    color: #4F4F4F;
    margin: 0.3rem 0.2rem 0.7rem;

  }
  .login-btn{
      width: 100%;
      text-align:center;
      margin-bottom: 0.2rem;
  }
  .yd-input input{
    font-size: 0.32rem;
  }
  .third-login{
      text-align: center;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0.6rem;
      margin: auto;
  }
  .third-login p{
      color: #A2A2A2;
  }
  
 .third-login img{
    width:1.2rem;
    height: 1.2rem;
    margin: 0.2rem 0;
 }
 .login-btn a{
     font-size: 0.28rem;
 }
 .third-login a{
     color: #8D66FA !important;

 }
.third-login p{
    font-size: 0.28rem;
}
.pwd-logo {
    text-align: center;
    margin-bottom: 0.6rem;
}
.pwd-logo img{
    width: 1rem;
}
.login-way{
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
