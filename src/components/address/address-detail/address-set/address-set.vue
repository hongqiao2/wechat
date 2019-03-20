<template>
  <!-- <transition name="slide"> -->
    <yd-layout  class="address-detail">
        <yd-navbar slot="navbar" title="资料设置">
            <router-link to=""  @click.native="back"  slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
      <yd-cell-group>
        <yd-cell-item arrow @click.native="goRemark(info.dissid)">
            <span slot="left">设置备注名称</span>
        </yd-cell-item>
        <yd-cell-item arrow  @click.native="goComplain()">
            <span slot="left">投诉</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">加入黑名单</span>
            <yd-switch slot="right" v-model="ydswitch"></yd-switch>
        </yd-cell-item>
      </yd-cell-group>
       <router-view></router-view>
    </yd-layout>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    components: {

    },
    data () {
      return{
        ydswitch: false
      }
    },
    props: {
      imgurl: {
        type: String,
        default: ''
      },
      dissname: {
        type: String,
        default: ''
      },
      dissid: {
        type: String,
        default: ''
      },
      phone: {
        type: String,
        default: ''
      },
      location: {
        type: String,
        default: ''
      },
      album: {
        type: String,
        default: ''
      },
      source: {
        type: String,
        default: ''
      }
    },
    computed: {
      ...mapGetters([ // 拿到info的状态
        'info'
      ])
    },
    created () {
      // console.log(this.info)
    },
    methods: {
      back () {
        this.$router.back()   // 返回上一级
      },
      doAddList (info) {
        this.setaddList(info)
      },
      goRemark (dissid) {
        this.$router.push({
          path: `/address/${dissid}/remark`
        })
      },
      goComplain () {
        this.$router.push({
          path: `/chatroom/complain`
        })
      },
      changBig () {
        if (this.$refs.bagImge.offsetWidth < 100) {
          let pageWidth = this.$refs.content.offsetWidth
          this.$refs.bagImge.style.height = pageWidth - 20 + 'px'
          this.$refs.bagImge.style.width = pageWidth - 20 + 'px'
        } else {
          this.$refs.bagImge.style.height = 60 + 'px'
          this.$refs.bagImge.style.width = 60 + 'px'
        }
      },
      ...mapMutations({
        setaddList: 'SET_ADDLIST'
      })
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: #fff !important;
  }
  
  .smallImg{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 5px;
  }
  .address-detail{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: #ebebeb;
  }

  .content div{
    width: 100%;
    background-color: #fff;
  }
  .content-name{
    padding: 0.2rem 0.3rem;
    display: flex;
    align-items: center;
  }

  .content-name h2{
    font-size: 0.36rem;
    margin-bottom: 0.2rem;
    padding-left: 0.25rem;
  }
  .content-name p{
    font-size: 0.28rem;
    padding-left: 0.25rem;
    color: #AAAAAA;
  }
  .content-note{
    margin: 0.2rem 0 0;
    padding: 0.2rem;
    font-size: 0.32rem;
    border-bottom: 1px solid #eee;
  }
  .content-intro{
    border-bottom: 1px solid #eee;
    padding: 0.2rem;
    font-size: 0.28rem;
    color: #888888;
  }
  .content-label{
    color: #464646;
    font-size: 0.3rem;
    width: 1.6rem;
    display: inline-block;
  }
 

  .content-album{
    display: flex;
    align-items: center;
  }
  .content-album img{
    margin-left: 20px;
  }
  .content-more{
    padding: 10px 10px;
    font-size: 14px;
  }
  .content .content-message {
    margin: 0.5rem auto;
    background-color: #ebebeb !important;
    width: 90%;
  }
  .message{
    display: flex;
    margin: 0 30px;
    height: 24px;
    padding: 8px 10px;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    background-color: #1aad16;
    border: 1px solid #1aad16;
    border-radius: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  .yd-icon-more{
    color: #101010;
  }
  .content .content-disname{
    width: 80%;
  }
</style>
