<template>
    <div class="chatroom-user">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  slot="navbar" title="聊天详情">
              <router-link to="" @click.native="back" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
          </yd-navbar>
          <div class="user">
            <img class="smallImg" :src="info.imgurl" @click="goInfo(info)" />
            <img class="addIcon" src="../../../assets/chatroom/addPerson.png"/>
            <p v-html="info.dissname"></p>
          </div>
          <yd-cell-group title="">
            <yd-cell-group>
                <yd-cell-item type="label">
                    <div slot="left">置顶聊天</div>
                    <yd-switch slot="right" v-model="ydswitch1"></yd-switch>
                </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group>
                <yd-cell-item type="label">
                    <div slot="left">消息免打扰</div>
                    <yd-switch slot="right" v-model="ydswitch2"></yd-switch>
                </yd-cell-item>
            </yd-cell-group>
            <yd-cell-item arrow href="#" type="link" v-on:click.native="deleteall">
                <span slot="left">清空聊天记录</span>
            </yd-cell-item>
            <yd-cell-item arrow href="/chatroom/complain" type="link">
                <span slot="left">投诉</span>
            </yd-cell-item>
            <yd-cell-item arrow href="#" type="link">
                <span slot="left">查找聊天内容</span>
            </yd-cell-item>
        </yd-cell-group>
        </div>
      </div>
      <router-view></router-view>
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
        value1: false,
        value2: true,
        title: 11,
        ydswitch1: false,
        ydswitch2: false
      }
    },
    computed: {
      ...mapGetters([
        'info'
      ])
    },
    methods: {
      deleteall () {
        MessageBox({
          title: '提示',
          message: '确定清空全部聊天信息?',
          showCancelButton: true
        })
      },
      goInfo (info) {
        this.$router.push({
          path: `/address/${info.dissid}`
        })
      },
      back (event) {
        this.$router.back()   // 返回上一级
      }
    }
  }
</script>

<style>
  .chatroom-user{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #ebebeb;
    width:100%;
    height:100%;
    /*border: 1px solid red;*/
  }
  .yd-cell-box{
    margin: 0;
  }
  .chatroom-user .yd-cell-box:nth-child(2){
    border-bottom: 0.2rem solid #eee;
  }
  
 .yd-cell-left div{
    font-size: 0.3rem;
  }
  .user{
    width: 100%;
    background-color: #fff;
    padding: 0.2rem 0.3rem;
    margin-bottom: 0.2rem;
  }
  .user .smallImg{
    height: 1rem;
    width: 1rem;
    border-radius: 5px;
    margin-right: 0.2rem;
  }
  .user p{
    text-align: center;
    width: 1rem;
  }
  .addIcon{
    width:1rem;
    height:1rem;
  }
</style>
