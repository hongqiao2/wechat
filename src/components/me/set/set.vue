<template>
    <div class="circle">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  @click="back" slot="navbar" title="设置">
              <router-link to="/me" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
          </yd-navbar>
          <yd-cell-group>
              <yd-cell-item arrow  @click.native="goBind">
                  <span slot="left">绑定微信</span>
              </yd-cell-item>
              <yd-cell-item arrow @click.native="goRemind">
                  <span slot="left">新消息提醒</span>
              </yd-cell-item>
              <yd-cell-item arrow @click.native="goAccount">
                  <span slot="left">账号与安全</span>
              </yd-cell-item>
              <yd-cell-item arrow>
                  <span slot="left">设置字体大小</span>
              </yd-cell-item>
              <yd-cell-item arrow v-on:click.native="warn">
                  <span slot="left">清除聊天记录</span>
              </yd-cell-item>
          </yd-cell-group>
        </div>
        <div @click="goLogout" class="Logout">退出登录</div>
      </div>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'
  import api from '@/api/resource.js'

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        value1: false,
        value2: true,
        value3: true,
        value4: false,
        value5: true,
        title: 11
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
        this.$router.back()   // 返回上一级
      },
      goBind () {
        this.$router.push({
          path: `/me/set/bind`
        })
      },
      goRemind () {
        this.$router.push({
          path: `/me/set/remind`
        })
      },
      goAccount () {
        this.$router.push({
          path: `/me/set/account`
        })
      },
      warn () {
        this.$toast({
          message: '清理完成',
          duration: 1500
        })
      },
      // 退出登录
      goLogout(){
        api.goLogout(this, {}).then( res => {
          if(res.body.code == 200){
            // 清理缓存
            let accessToken = JSON.parse(localStorage.getItem("access_token"));
            accessToken.password = "";
            accessToken.salt = "";
            localStorage.setItem("access_token", JSON.stringify(accessToken));
            this.$router.push({
              path: `/login`
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .circle{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #f9f9f9;
  }
  .content{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .content-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .content-top{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    background-color: #666f76;
  }
  .payment, .pocket, .card{
    flex: 1;
    display: flex;
    /*flex-direction: row | row-reverse | column | column-reverse;*/
    flex-direction: column;
    color: #fff;
    justify-content: center;
    align-items: center;
  }
  .pocket{
    padding-top: 20px;
  }
  .payment h4, .pocket h4, .card h4{
    margin-top: 10px;
  }
  .pocket span{
    font-size: 12px;
    margin-top: 2px;
  }
  .content-body{
    padding-top: 20px;
  }
  .server div{
    /*border: 1px solid red;*/
    position: relative;
    height: 40px;
    background-color: #fff;
    margin-top: 10px;
  }
  .server div p{
    font-size: 16px;
    line-height: 40px;
    padding-left: 10px;
  }
  .switch{
    position: absolute;
    top: 5px;
    right: 10px;
  }
  .Logout{
    background: #fff;
    color: #FF000F;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.32rem;
  }

</style>
