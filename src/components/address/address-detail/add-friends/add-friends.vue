<template>
    <div class="add-friends">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  @click.native="back" slot="navbar" title="朋友验证">
              <router-link to="" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
              <router-link to="#" slot="right">发送</router-link>
          </yd-navbar>
          <yd-cell-group title="你需要发送的验证申请，等待对方验证通过">
              <yd-cell-item>
                  <yd-textarea slot="right" placeholder=""></yd-textarea>
              </yd-cell-item>
          </yd-cell-group>
        </div>
      </div>
      <router-view></router-view>
    </div>
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
        // 为防止PC端时,点击事件会被执行两次,须作如下判断，但是这里暂时不需要，参考http://blog.csdn.net/alsnei/article/details/54375957
        // if (!event._constructed) {
        //   return
        // }
        this.$router.back()   // 返回上一级
      },
      warn () {
        this.$toast({
          message: '清理完成',
          duration: 1500
        })
      },
      goPname () {
        console.log('1234')
        this.$router.push({
          path: `/me/personal/Pname`
        })
      }
    }
  }
</script>

<style>
  .add-friends{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#f9f9f9 !important;
  }
  .add-friends .yd-cell-title:after,.add-friends .yd-cell:after{
    background: transparent;
  }
  .add-friends .yd-cell-title{
    padding: .2rem .24rem .2rem;
  }
  .add-friends a{
    color: #383838;
    font-size: 0.28rem;
  }
  .add-friends .yd-textarea{
    padding: 0;
  }
  .yd-navbar-center-title{
    color: #242424 !important;
  }
</style>
