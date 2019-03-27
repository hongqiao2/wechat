<template>
    <div class="msg-list">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  slot="navbar" title="消息">
              <router-link to=""  @click.native="back" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
              <router-link class="msg-empty" to="#" slot="right" >
                清空
            </router-link>
          </yd-navbar>
          <yd-cell-group>
            <yd-cell-item v-for="item in msg" :key="item.id">
                <img class="msg-profile" slot="icon" :src="item.imgurl">
                <div slot="left">
                    <p class="msg-name">{{item.dissname}}</p>
                    <p class="iconfont icon-xihuan" v-if="item.praise==1"></p>
                    <p class="ms-cont" v-else>{{item.cont}}</p>
                    <p class="msg-time">{{item.time}}</p>
                </div>
                <img class="msg-photo" slot="right":src="item.album">
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
        msg:[
            {
                dissname: '曹操',
                dissid: 'caocao',
                imgurl: 'http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                cont: '',
                time:'上午7:55',
                praise:'1'
            },
            {
            dissname: '张瑞',
            dissid: 'caocao',
            imgurl: 'http://img1.gamedog.cn/2014/01/23/30-1401230942040.jpg',
            album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
            cont: '你们说美不美？',
            time:'上午7:55',
            praise:'0'
        }
        ]
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
      }
    }
  }
</script>

<style>
  .msg-list{
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
  .msg-list .msg-profile{
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 5px;
  }
  .msg-photo{
      width: 1.1rem;
      height: 1.1rem;
  }
  .msg-list a{
      color: #383838;
  }
  .msg-list .yd-cell-item{
      padding: 0.2rem 0 0.2rem 0.2rem;
  }
  .msg-name{
      color:#48547A;
  }
  .msg-cont{
      color: #141414;
  }
  .msg-time{
      font-size: 0.24rem;
      color: #808080;
  }
  .msg-list .yd-cell-left{
      align-items: end;
  }
</style>
