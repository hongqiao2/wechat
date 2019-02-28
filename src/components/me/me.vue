<template>
  <div class="me">
    <div class="me-wrapper" ref="wrapper">
      <div class="me-content">
        <yd-cell-group>
            <yd-cell-item arrow class="aboutme">
              <img 
                class="aboutme-img" 
                @click="imgbeBig"
                src="../../assets/me/minion.png" 
                ref="aboutme" slot="left"
              />
              <div slot="left">
                <h2>minion</h2>
                <p>微信号：DespicableMe</p>
              </div>
              <img 
                  class="aboutme-code"  slot="right"
                  @click="codebeBig"
                  src="../../assets/me/code.png" 
                  :height="this.codeheight" 
                  :width="this.codewidth" 
                  ref="codeimg"
                />
            </yd-cell-item>
        </yd-cell-group>
        <router-link tag="div" class="me-list" to="/me/money">
          <img class="money-img" src="../../assets/me/packet.png" height="380" width="380" />
          <span class="money-name">支付宝红包</span>
        </router-link>
        <router-link tag="div" class="me-list me-spacing" to="/me/money">
          <img class="money-img" src="../../assets/me/wallet.png" height="380" width="380" />
          <span class="money-name">云钱包</span>
        </router-link>

        <router-link tag="div" class="me-list" to="/me/collection">
          <img class="collection-img" src="../../assets/me/approve.png" height="32" width="32" />
          <span class="collection-name">个人认证</span>
        </router-link>
        <router-link tag="div" class="me-list" to="/me/collection">
          <img class="collection-img" src="../../assets/me/collect.png" height="32" width="32" />
          <span class="collection-name">收藏</span>
        </router-link>

        <router-link tag="div" class="me-list me-spacing" to="/me/album">
          <img class="photo-img" src="../../assets/me/identity.png" height="32" width="32" />
          <span class="photo-name">隐私</span>
        </router-link>
        <router-link tag="div" class="me-list me-spacing" to="/me/card">
          <img class="card-img" src="../../assets/me/about.png" height="32" width="32" />
          <span class="card-name">关于微聊</span>
        </router-link>
        <router-link tag="div" class="me-list me-spacing" to="/me/card">
          <img class="card-img" src="../../assets/me/help.png" height="32" width="32" />
          <span class="card-name">帮助与反馈</span>
        </router-link>
        <router-link tag="div" class="me-list me-spacing" to="/me/set">
          <img class="setup-img" src="../../assets/me/set.png" height="32" width="32" />
          <span class="setup-name">设置</span>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {MessageBox} from 'mint-ui'
  import BScroll from 'better-scroll'

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        height: 60,
        codeheight: 30,
        width: 60,
        codewidth: 30
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
          click: true
        })
      })
    },
    methods: {
      imgbeBig () {
        let pageWidth = this.$refs.wrapper.offsetWidth
        if (this.height === 60) {
          this.height = pageWidth
          this.width = pageWidth
          this.$refs.aboutme.style.left = 0
          this.$refs.aboutme.style.transform = 'rotate(360deg)'
        } else {
          this.height = 60
          this.width = 60
          this.$refs.aboutme.style.left = 10 + 'px'
          this.$refs.aboutme.style.transform = 'rotate(0deg)'
        }
      },
      codebeBig () {
        if (this.codeheight === 30) {
          this.codeheight = 200
          this.codewidth = 200
          this.$refs.codeimg.style.transform = 'rotate(360deg)'
        } else {
          this.codeheight = 30
          this.codewidth = 30
          this.$refs.codeimg.style.transform = 'rotate(0deg)'
        }
      },
      warn () {
        this.$toast({
          message: '尚未添加表情包',
          duration: 1500
        })
      }
    }
  }
</script>

<style scoped>
  .me{
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(238,233,233,0.6);
  }
  .me-wrapper{
    /*border: 1px solid red;*/
    height: 100%;
    overflow: hidden;
  }
  .me-content{
    /*border: 1px solid blue;*/
    overflow: hidden;
  }  
  .aboutme{
    position: relative;
    height: 2rem;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  .aboutme .aboutme-img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 5px;
    margin-right: 0.2rem;
  }
  .aboutme h2{
    font-size: 0.4rem;
    margin-bottom: 0.1rem;
  } 
  .aboutme p{
        font-size: 0.3rem;
    color: #606060;
  }
  .me-list{
    display: flex;
    align-items: center; 
    left: 0;
    height: 1rem;
    padding: 0.2rem 0.3rem;
    font-size: 0.32rem;
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  .me-spacing{
    margin-bottom: 0.2rem;
  }
  .emoticon{
    border-bottom: 0;
  }
  .setup{
    display: flex;
    align-items: center; 
    left: 0;
    height: 20px;
    padding: 8px 10px;
    margin-top: 20px;
    background-color: #fff;
  }
  .money-img, .collection-img, .photo-img, .card-img, .emoticon-img, .setup-img{
    height: 0.6rem;
    width: 0.6rem;
  }
  .yd-cell-right img{
    width: 0.5rem;
    height: 0.5rem;
  }
</style>
