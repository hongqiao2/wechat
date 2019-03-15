<<<<<<< HEAD
<template>
  <!-- <transition name="slide"> -->
    <yd-layout  class="address-detail">
        <yd-navbar  @click="back" slot="navbar" title="详细信息">
            <router-link to="" slot="left"  @click.native="$router.back(-1)">
                <yd-navbar-back-icon ></yd-navbar-back-icon>
            </router-link>
            <router-link to="#" slot="right">
                <yd-icon name="more" @click.native="goDset(this.info.dissid)" size="0.4rem"></yd-icon>
            </router-link>
            
        </yd-navbar>

        <div class="content" ref="content">
        <div class="content-name">
          <img class="smallImg" :src="this.info.imgurl" />
          <!-- <img class="bagImg" @click="changBig" ref="bagImge" :src="this.info.imgurl" /> -->
          <div class="content-disname">
            <h2 class="" v-html="this.info.dissname"></h2>
            <p class="">微信号：{{this.info.dissid}}</p>
          </div>
        </div>
        <div class="content-note">设置备注和描述 </div>
        <div class="content-intro">
          <span class="content-label">地区</span>{{this.info.location}}
        </div>
        <div class="content-intro">
          <span class="content-label">个性签名</span>{{this.info.sign}}
        </div>
        <div class="content-intro">
          <span class="content-label">兴趣爱好</span>{{this.info.hobby}}
        </div>
        <div class="content-intro">
          <span class="content-label">来源</span>{{this.info.source}}
        </div>
        <!-- <div class="content-album">
          <span style="font-weight:bold;">个人相册 </span>
          <img :src="this.info.album" height="50" width="50" />
          <img :src="this.info.album" height="50" width="50" />
          <img :src="this.info.album" height="50" width="50" />
        </div> -->
        <div class="content-message">
          <yd-button size="large" bgcolor="#8D66FA" color="#FFF"  shape="circle" @click="doAddList(info)">
              <router-link to='/chatroom'> 发消息 </router-link>
            </yd-button>
        </div>
      </div>
    </yd-layout>


    <!-- <div class="address-detail">
      <div class="back">
        <div @click="back">
          <img src="../../../assets/返回.png" height="16" width="19" />
        </div>
        <span>详细信息</span>
      </div>
      <div class="content" ref="content">
        <div class="content-name">
          <img class="" :src="this.info.imgurl" height="60" width="60" />
          <img class="bagImg" @click="changBig" ref="bagImge" :src="this.info.imgurl" />
          <div>
            <h2 class="" v-html="this.info.dissname"></h2>
            <p class="">微信号：{{this.info.dissid}}</p>
          </div>
        </div>
        <div class="content-phone">
          <span style="font-weight:bold;">电话号码：&nbsp</span>{{this.info.phone}}
        </div>
        <div class="content-location">
          <span style="font-weight:bold;">地区: </span>{{this.info.location}}
        </div>
        <div class="content-album">
          <span style="font-weight:bold;">个人相册 </span>
          <img :src="this.info.album" height="50" width="50" />
          <img :src="this.info.album" height="50" width="50" />
          <img :src="this.info.album" height="50" width="50" />
        </div>
        
        <div class="content-message" @click="doAddList(info)">
          <router-link to='/chatroom' class="message">
            <span>发消息</span>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div> -->
  <!-- </transition> -->
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    components: {

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
      goDset (dissid) {
        this.$router.push({
          path: `/address/${dissid}/dset`
        })
      },
      // gotoMore (info) {
      //   this.$router.push({
      //     path: `/address/${info.dissid}/more`
      //   })
      //   console.log('测试')
      // },
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
=======
<template>
  <!-- <transition name="slide"> -->
    <yd-layout  class="address-detail">
        <yd-navbar  @click="back" slot="navbar" title="详细信息">
            <router-link to="#" slot="left">
                <yd-navbar-back-icon  @click.native="$router.back(-1)"></yd-navbar-back-icon>
            </router-link>
            <router-link to="#" slot="right">
                <yd-icon name="more" @click.native="goDset(this.info.dissid)" size="0.4rem"></yd-icon>
            </router-link>
            
        </yd-navbar>

        <div class="content" ref="content">
        <div class="content-name">
          <img class="smallImg" :src="this.info.imgurl" />
          <!-- <img class="bagImg" @click="changBig" ref="bagImge" :src="this.info.imgurl" /> -->
          <div class="content-disname">
            <h2 class="" v-html="this.info.dissname"></h2>
            <p class="">微信号：{{this.info.dissid}}</p>
          </div>
        </div>
        <div class="content-note">设置备注和描述 </div>
        <div class="content-intro">
          <span class="content-label">地区</span>{{this.info.location}}
        </div>
        <div class="content-intro">
          <span class="content-label">个性签名</span>{{this.info.sign}}
        </div>
        <div class="content-intro">
          <span class="content-label">兴趣爱好</span>{{this.info.hobby}}
        </div>
        <div class="content-intro">
          <span class="content-label">来源</span>{{this.info.source}}
        </div>
        <!-- <div class="content-album">
          <span style="font-weight:bold;">个人相册 </span>
          <img :src="this.info.album" height="50" width="50" />
          <img :src="this.info.album" height="50" width="50" />
          <img :src="this.info.album" height="50" width="50" />
        </div> -->
        <div class="content-message">
          <yd-button size="large" type="primary"  shape="circle" @click="doAddList(info)">
              <router-link to='/chatroom'> 发消息 </router-link>
            </yd-button>
        </div>
      </div>
    </yd-layout>


    <!-- <div class="address-detail">
      <div class="back">
        <div @click="back">
          <img src="../../../assets/返回.png" height="16" width="19" />
        </div>
        <span>详细信息</span>
      </div>
      <div class="content" ref="content">
        <div class="content-name">
          <img class="" :src="this.info.imgurl" height="60" width="60" />
          <img class="bagImg" @click="changBig" ref="bagImge" :src="this.info.imgurl" />
          <div>
            <h2 class="" v-html="this.info.dissname"></h2>
            <p class="">微信号：{{this.info.dissid}}</p>
          </div>
        </div>
        <div class="content-phone">
          <span style="font-weight:bold;">电话号码：&nbsp</span>{{this.info.phone}}
        </div>
        <div class="content-location">
          <span style="font-weight:bold;">地区: </span>{{this.info.location}}
        </div>
        <div class="content-album">
          <span style="font-weight:bold;">个人相册 </span>
          <img :src="this.info.album" height="50" width="50" />
          <img :src="this.info.album" height="50" width="50" />
          <img :src="this.info.album" height="50" width="50" />
        </div>
        
        <div class="content-message" @click="doAddList(info)">
          <router-link to='/chatroom' class="message">
            <span>发消息</span>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div> -->
  <!-- </transition> -->
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    components: {

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
      goDset (dissid) {
        this.$router.push({
          path: `/address/${dissid}/dset`
        })
      },
      // gotoMore (info) {
      //   this.$router.push({
      //     path: `/address/${info.dissid}/more`
      //   })
      //   console.log('测试')
      // },
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
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
