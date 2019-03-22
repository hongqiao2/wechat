<template>
  <yd-layout class="chatroom">
    <yd-navbar slot="navbar"  :title="this.info.dissname">
      <router-link to="" @click.native="back" slot="left">
          <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
       <img class="person-icon"  @click="gotoUser(info)"  slot="right" src="../../assets/chatroom/person.png" />
    </yd-navbar>
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
        <input type="text" placeholder="请输入聊天内容"  v-model="value" class="sText" ref="sTest" @input="sendInput" />
      </div>
      <div class="speak" v-if="showText">
        按住 说话
        <!-- <input type="text" placeholder="请输入聊天内容" class="sText" ref="sTest"/> -->
      </div>
      <yd-button bgcolor="#8D66FA" color="#FFF" class="btn"  v-if="sendShow" @click.native="sendContent" >发送</yd-button>
      <!-- <input type="button" class="btn" value="发送" v-if="sendShow" @click="sendContent" /> -->
      <button class="express-btn">表情</button>
      <!-- <p class="more-btn" @click.native="moreBtn">更多</p> -->
      <button class="more-btn" @click="moreBtn">更多</button>
    </yd-tabbar>
    <router-view></router-view>
  </yd-layout>
    
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
        sendShow: false, // 发送按钮
        value: '',
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
        content: []
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
          this.sendShow = false
          this.showVoice = false
          this.showText = true
        } else if (this.showText) {
          if (this.value !== '') {
            this.sendShow = true
          }
          this.showVoice = true
          this.showText = false
        }
      },
      sendContent () {
        this.value = ''
        this.sendShow = false
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
        console.log('1234')
        if (this.showPop) {
          this.showPop = false
          this.popHeight = false
        } else {
          this.showPop = true
          this.popHeight = true
        }
      },
      sendInput () {
        if (this.value !== '') {
          this.sendShow = true
        } else {
          this.sendShow = false
        }
      }
    },
    computed: {
      ...mapGetters([
        'info'
      ])
    }
  }
</script>

<style scoped>
  .chatroom{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
     z-index: 500;
    background-color:#F9F9F9;
  }
  .chatroom .content{
    position: relative;
    padding: .4rem .2rem;
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
  .send{
    display: flex;
    width: 70%;
  }
  .sText{
    -webkit-box-flex: 6;
    -ms-flex: 6;
    flex: 6;
    height: 0.7rem;
    line-height: .7rem;
    margin: 0.2rem;
    padding-left: 8px;
    border: 1px solid #eee;
    font-size: 0.3rem;
    border-radius: 0.1rem;
    outline: none;
    -webkit-appearance: none; 
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .content-body li {
    position: relative;
    overflow: hidden;
    margin-bottom: .3rem;
}
  .btn{
    position: absolute;
    right: .1rem;
    top: 0.2rem;
    color: #fff;
    border: none;
    width: .8rem;
    height: .6rem;
    padding: 0;
    border-radius: 5px;
    z-index: 111;
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
    font: 0.28rem Microsoft YaHei;
    line-height: 0.6rem;
  }
  .ask p {
    float: right;
    padding: .1rem .25rem;
    max-width: 4rem;
    background: #c2acff;
    color: #101010;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .reply p {
    left: 2pc;
    float: left;
    padding: 3px 10px;
    max-width: 190px;
    background: #fff;
  }
  .chatroom-bottom{
    height: 1rem;
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
.popHeight{
  bottom: 3.8rem !important;
}
.chat-more div{
  width: 25%;
  text-align: center;
}
.chat-more img{
    width: 0.9rem;
    height: 0.9rem;
}
</style>
