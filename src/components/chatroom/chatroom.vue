<template>
<yd-layout>
       
<div class="chatroom">

      <yd-navbar :title="this.info.dissname">
          <router-link to="/chat" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
          <img class="person-icon"  @click="gotoUser(info)"  slot="right" src="../../assets/chatroom/person.png" />
      </yd-navbar>

<!-- <div slot="center" >{{this.info.dissname}}</div> -->
      <div class="content">
        <div class="content-wrapper" ref="wrapper">
          <div class="content-text">
            <!-- <div class="content-top">
              <p>————现在可以和我聊天了————</p>
            </div> -->
            <div class="content-body" ref="body">
              <ul class="inHtml" v-for="item in content">
                <li class="ask"  v-show="item.askContent">
                  <img :src="item.askImg" />
                  <p>{{item.askContent}}</p>
                </li>
                <li class="reply" v-show="item.replyContent">
                  <img :src="item.replyImg" />
                  <p>{{item.replyContent}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-more" v-if="showPop">
        <div>
          <img src="../../assets/chatroom/album.png"/>
          <p>相册</p>
        </div>
        <div>
          <img src="../../assets/chatroom/photograph.png"/>
          <p>拍照</p>
        </div>
        <div @click="goPacket">
          <img src="../../assets/chatroom/packet2.png"/>
          <p>云红包</p>
        </div>
        <div  @click="goPacket">
          <img src="../../assets/chatroom/alipay1.png"/>
          <p>支付宝红包</p>
        </div>
        <div @click="goCard">
          <img src="../../assets/chatroom/card.png"/>
          <p>个人名片</p>
        </div>
        <div>
          <img src="../../assets/chatroom/collect1.png"/>
          <p>收藏</p>
        </div>
      </div>
      <yd-tabbar slot="tabbar" class="chatroom-bottom" v-bind:class="{ popHeight:popHeight}">
        <button class="voice-btn" v-if="showVoice" @click="changeStatus">语音</button>
        <button class="text-btn" v-if="showText"  @click="changeStatus">键盘</button>
        <div class="send" v-if="showVoice">
          
          <input type="text" placeholder="请输入聊天内容" class="sText" ref="sTest"/>
        </div>
        <div class="speak" v-if="showText">
          按住 说话
          <!-- <input type="text" placeholder="请输入聊天内容" class="sText" ref="sTest"/> -->
        </div>
        <input type="button" class="btn" value="发送" @click="sendContent" />
        <button class="express-btn">表情</button>
        <button class="more-btn" @click="moreBtn">更多</button>
    </yd-tabbar>

      <router-view></router-view>
    </div>
</yd-layout>
  <!-- <transition name="slide">
    
  </transition> -->
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  import {mapGetters} from 'vuex'

  export default {
    components: {
      BScroll
    },
    data () {
      return {
        text: '', // 输入框的文字
        showVoice: false, // 语音按钮
        showText: true, // 键盘按钮
        popHeight: false, // 更多弹出
        showPop: false, // 更多显示
        randomReply: [
          '你谁啊？',
          '请你再说一遍！',
          '想和我聊天？得先夸我！',
          '我不知道你在讲什么。。。',
          '不好意思，我不想和你说话。',
          '先告诉我你是谁。',
          '竖子不足以谋也！',
          '我选择沉默',
          '来吧，一起吹牛逼。。',
          '我很困，不想聊天',
          '别废话，先给我讲个笑话',
          '你从哪里来',
          '心情不好，最好别搭理我',
          '等我忙完再回复你',
          '敢问尊姓大名',
          '近来可好？',
          '看来你是想和我聊天',
          '你是要请我吃饭吗？',
          '先给我一个让我回复你的理由',
          '哈哈哈'
        ],
        content: [
          // {
          //   askImg: require('../../assets/me/minion.png'),
          //   replyImg: '',
          //   askContent: '你好',
          //   replyContent: '谢谢'
          // },
          // {
          //   askImg: require('../../assets/me/minion.png'),
          //   replyImg: '',
          //   askContent: '你是谁',
          //   replyContent: '你猜啊'
          // }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'info'
      ])
    },
    created () {

    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      })
    },
    methods: {
      back () {
        this.$router.back()   // 返回上一级
      },
      gotoUser (info) {
        this.$router.push({
          path: `/chatroom/user`
        })
      },
      goPacket (info) {
        this.$router.push({
          path: `/chatroom/packet`
        })
      },
      goCard () {
        this.$router.push({
          path: `/chatroom/percard`
        })
      },
      changeStatus () {
        if (this.showVoice) {
          this.showVoice = false
          this.showText = true
        } else if (this.showText) {
          this.showVoice = true
          this.showText = false
        }
      },
      sendContent () {
        this.text = this.$refs.sTest.value
        if (this.text !== '') {
          this.content.push({
            askImg: require('../../assets/me/minion.png'),
            askContent: this.text
          })

          setTimeout(() => {
            this.content.push({
              replyImg: '',
              replyContent: this.randomReply[Math.floor(Math.random() * 19)]
            })
            for (let i = 0; i < this.content.length; i++) { // 定义回复者的头像
              this.content[i].replyImg = this.info.imgurl
            }
          }, 1000)
        }
        this.$refs.sTest.value = '' // 清空输入框的内容
      },
      moreBtn () {
        if (this.showPop) {
          this.showPop = false
          this.popHeight = false
        } else {
          this.showPop = true
          this.popHeight = true
        }
      },
      clearContent () {
        this.content = []
      }
    }
  }
</script>

<style scoped>
.yd-navbar {
    background-color: #F8F8F8 !important;
}
.yd-navbar-item a span{
    color:rgb(92, 92, 92) !important;
}
.popHeight{
  bottom: 3.8rem !important;
}
.chat-more{
    background: #F8F8F8;
    position: fixed;
    height: 3.8rem;
    z-index: 11;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-flow: wrap;
    padding: 0 0.2rem;
    align-items: center;
}
.chat-more div{
  width: 25%;
  text-align: center;
}
.chat-more img{
    width: 0.9rem;
    height: 0.9rem;
}
    
.person-icon{
  width: .55rem;
  height: .55rem;
}
.voice-btn{
    background: url('../../assets/chatroom/voice.png');
    background-size: 100%;
    width: 0.5rem;
    height: 0.5rem;
    background-repeat: no-repeat;
    color: transparent;
    border: none;
    margin-left: 0.25rem;
}
.text-btn{
    background: url('../../assets/chatroom/keyboard.png');
    background-size: 100%;
    width: 0.5rem;
    height: 0.5rem;
    background-repeat: no-repeat;
    color: transparent;
    border: none;
    margin-left: 0.25rem;
}
.express-btn{
    background: url('../../assets/chatroom/face.png');
    background-size: 100%;
    width: 0.5rem;
    height: 0.5rem;
    background-repeat: no-repeat;
    color: transparent;
    border: none;
    margin-right: 0.25rem;
}
.more-btn{
    background: url('../../assets/chatroom/more.png');
    background-size: 100%;
    width: 0.5rem;
    height: 0.5rem;
    background-repeat: no-repeat;
    color: transparent;
    border: none;
    margin-right: 0.25rem;
}

  .chatroom{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  .content{
    position: fixed;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    background: #F9F9F9;
    /*border: 1px solid red;*/
  }
  .content-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .content-top{
    font-size: 14px;
    color: rgba(153,153,153,0.6);
    text-align: center;
    margin-top: 4px;
  }
  .content-body{
    position: relative;
    padding: 0.4rem 0.2rem;
  }
  .content-body li {
    position: relative;
    overflow: hidden;
    margin-bottom: 0.3rem;
  }
  .inHtml img {
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
  }
  .ask {
    text-align: right;
  }
  .reply {
    text-align: left;
  }
  .ask img {
    float: right;
    margin-left: 0.3rem;
  }
  .reply img {
    float: left;
    margin-right: 0.3rem;
  }
  .reply p, .ask p {
    border-radius: 4px;
    text-align: left;
    font: 14px 'Microsoft YaHei';
    line-height: 30px;
  }
  .ask p {
    float: right;
    padding: 0.1rem 0.25rem;
    max-width: 182px;
    background: #C2ACFF;
    color: #101010;
  }
  .reply p {
    left: 2pc;
    float: left;
    padding: 3px 10px;
    max-width: 190px;
    background: #fff;
  }
  .chatroom-bottom{
    position: fixed;
    height: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .send{
    display: flex;
    width: 70%;
  }
  .sText{
    -webkit-box-flex: 6;
    -ms-flex: 6;
    flex: 6;
    height: 0.7rem;
    margin: 0.2rem;
    padding-left: 8px;
    border: 1px solid #eee;
    font-size: 0.3rem;
    border-radius: 0.1rem;
  }
  .sText.active{
    background-color: red;
  }
  .btn{
    background-color: #09BB07;
  }

  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  .speak{
    height: 0.7rem;
    margin: 0.2rem;
    border: 1px solid #eee;
    font-size: 0.3rem;
    border-radius: 0.1rem;
    line-height: 0.65rem;
    text-align: center;
    justify-content: center;
    color: #565656;
    font-weight: 500;
    width: 64%;
  }
  
</style>