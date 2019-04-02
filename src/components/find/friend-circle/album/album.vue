<template>
<yd-layout class="falbum">
      <yd-navbar slot="navbar" title="我的相册">
          <router-link to="" @click.native="back" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
          <router-link class="record-more" to="" slot="right"  @click.native="show1 = true">
              <i class="iconfont icon-xiazai9"></i>
          </router-link>
      </yd-navbar>
      <scroller>
        <div class="content-wrapper" ref="wrapper">
          <div class="content-text">
            <div class="content-top">
              <img class="circle-bg" src="../../../../assets/find/bg-1.png" />
              <div class="user">
                <span>{{accessToken.nickName}}</span>
                <img :src="accessToken.headPortrait" height="80" width="80" />
              </div>
            </div>
            <div class="content-body">
              <div class="album-add">
                <span>今天</span>
                <img src="../../../../assets/me/addphtoto.png" height="80" width="80" />
              </div>
            <!-- <yd-lightbox>
                <yd-lightbox-img v-for="item, key in list" :key="key" :src="item.src"></yd-lightbox-img>
            </yd-lightbox> -->
                <div class="album-list" v-for="item in album">
                <span>{{item.day}}<i>{{item.month}}月</i></span>
                <ul class="album-photo" slot="left">
                  <yd-lightbox>
                      <yd-lightbox-img v-for="items, key in item.arr" :key="key" :src="items.imgurl"></yd-lightbox-img>
                  </yd-lightbox>
                  <!-- <li v-for="items in item.arr" :style="{backgroundImage: 'url(' + items.imgurl + ')'}"></li> -->
                </ul>
                <p style="max-width: 63%;">{{item.title}}</p>
                <!-- <img src="../../../assets/me/addphtoto.png" height="80" width="80" /> -->
              </div>
              <div style="text-align: center;opacity: 0.6;margin-top: 20px;">----没有更多动态了----</div>
            </div>
              
          </div>
        </div>
        <router-view></router-view>
      
      </scroller>
    <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
// import {Toast} from 'mint-ui'

  export default {
    components: {
      BScroll
    },
    data () {
      return {
        album: [
          {
            month:'2',
            day:'25',
            title:'太美了！！',
            arr:[
              {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'},
              {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'},
              {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'},
              {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'}
            ]
          },
          {
            month:'1',
            day:'20',
            title:'嘻嘻',
            arr:[
              {'imgurl': 'https://image.zhangxinxu.com/image/study/head/s180/14.jpeg'}
            ]
          }

        ],
        list: [
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s1.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s2.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s3.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s4.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s5.jpg'},
          {src: 'http://static.ydcss.com/uploads/lightbox/meizu_s6.jpg'}
        ],
        show1: false,
        myItems1: [
          {
            label: '消息列表',
            callback: () => {
              this.$router.push({
                path: `/find/friendcircle/msglist`
              })
            }
          }
        ],
        accessToken: {}
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      })
      // 用户信息
      let accessToken = JSON.parse(localStorage.getItem("access_token"));
      this.accessToken = accessToken;
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      admire (item) {
        console.log(item)
        item.num += 1
      }
    }
  }
</script>

<style scoped>
  .falbum{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color:#fff;
  }
  .falbum .content{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .falbum .content-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .falbum .content-top{
    position: relative;
  }
  .falbum .circle-bg{
    width: 100%;
    margin-bottom: 20px;
  }
  .falbum .user{
    position: absolute;
    bottom: 0px;
    right: 10px;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .falbum .user span{
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
    margin-right: 10px;
  }
  .falbum .user img{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 5px;
  }
  .falbum .username h2{
    color: blue;
    font-family: '楷体';
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    margin-bottom: 10px;
  }
  .falbum .username p{
    font-size: 16px;
    line-height: 30px;
  }
  .falbum .usertime{
    font-size: 14px;
    margin-top: 15px;
  }
  .falbum .usertime span{
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 14px;
    line-height: 14px;
  }
  .falbum .usertime img{
    position: absolute;
    right: 30px;
    bottom: 20px;
    z-index: 999;
  }

  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  .album-add,.album-list{
    display: flex;
    align-items: center;
  }
  .content-body{
    padding: 0.2rem;
  }
  .album-add span,.album-list span{
    font-size: 0.5rem;
    color: #202020;
    font-weight: bold;
    margin-right: 0.2rem;
  }
  .album-list span i{
    font-size:0.3rem; 
  }
  .album-add  img{
    width: 1.2rem;
    height: 1.2rem;
  }
.album-photo {
    width: 1.1rem;
    height: 1.1rem;
    background: #eee;
    padding: 0;
    margin: 0;
    list-style-type: none;
    margin-right: 0.2rem;
    margin-top: 0.3rem;
}
/* .album-photo li {
    background: url(https://image.zhangxinxu.com/image/study/head/s180/14.jpeg) no-repeat;
    background-size: cover;
} */
.album-photo div img{
  width: 1.1rem;
  height: 1.1rem;
}
/* 1个 */

.album-photo div img:only-child {
  width: 1.1rem;
  height: 1.1rem;
  /* height: 100%; */
}
/* 2个 */
.album-photo div img:first-child:nth-last-child(2),
.album-photo div img:first-child:nth-last-child(2) + img {
  width: 50%;
  height: 100%;
  float: left;
}
.album-photo div img:first-child:nth-last-child(2) + img {
  margin-left: auto;
}
/* 3个 */
.album-photo div img:first-child:nth-last-child(3),
.album-photo div img:first-child:nth-last-child(3) ~ img {
  width: 50%; height: 50%;
}
.album-photo div img:first-child:nth-last-child(3) {
  margin: auto;
  width: 50%;
  height: 100%;
  float: left;
}
.album-photo div img:first-child:nth-last-child(3) ~ img {
  float: left;
}
/* 4个 */
.album-photo div img:first-child:nth-last-child(4),
.album-photo div img:first-child:nth-last-child(4) ~ img {
  width: 50%; height: 50%;
  float: left;
}
.circle i{
color: #383838;
}
    
</style>
