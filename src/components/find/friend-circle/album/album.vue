<template>
  <transition name="slide">
    <div class="album">
      <div class="circle-wrap">
        <yd-navbar   slot="navbar" title="我的相册">
            <router-link to="" @click.native="back" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link class="record-more" to="" slot="right"  @click.native="show1 = true">
                <i class="iconfont icon-xiazai9"></i>
            </router-link>
        </yd-navbar>
        <div class="content">
          <div class="content-wrapper" ref="wrapper">
            <div class="content-text">
              <div class="content-top">
                <img class="circle-bg" src="../../../../assets/find/bg-1.png" />
                <div class="user">
                  <span>minion</span>
                  <img src="../../../../assets/me/minion.png" height="80" width="80" />
                </div>
              </div>
              <div class="content-body">
                <div class="album-add">
                  <span>今天</span>
                  <img src="../../../../assets/me/addphtoto.png" height="80" width="80" />
                </div>

                 <div class="album-list" v-for="item in album">
                  <span>{{item.day}}<i>{{item.month}}月</i></span>
                  <ul class="album-photo" slot="left">
                    
                    <li v-for="items in item.arr" :style="{backgroundImage: 'url(' + items.imgurl + ')'}"></li>
                  </ul>
                  <p style="max-width: 63%;">{{item.title}}</p>
                  <!-- <img src="../../../assets/me/addphtoto.png" height="80" width="80" /> -->
                </div>
                <div style="text-align: center;opacity: 0.6;margin-top: 20px;">----没有更多动态了----</div>
              </div>
                
            </div>
          </div>
        </div>
        <router-view></router-view>
        <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
         
      </div>
    </div>
  </transition>
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
        // 为防止PC端时,点击事件会被执行两次,须作如下判断，但是这里暂时不需要，参考http://blog.csdn.net/alsnei/article/details/54375957
        // if (!event._constructed) {
        //   return
        // }
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
  .album{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#fff;
  }
  .album .content{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .album .content-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .album .content-top{
    position: relative;
  }
  .album .circle-bg{
    width: 100%;
    margin-bottom: 20px;
  }
  .album .user{
    position: absolute;
    bottom: 0px;
    right: 10px;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .album .user span{
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
    margin-right: 10px;
  }
  .album .user img{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 5px;
  }
  .album .username h2{
    color: blue;
    font-family: '楷体';
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    margin-bottom: 10px;
  }
  .album .username p{
    font-size: 16px;
    line-height: 30px;
  }
  .album .usertime{
    font-size: 14px;
    margin-top: 15px;
  }
  .album .usertime span{
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 14px;
    line-height: 14px;
  }
  .album .usertime img{
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
.album-photo li {
    background: url(https://image.zhangxinxu.com/image/study/head/s180/14.jpeg) no-repeat;
    background-size: cover;
}
/* 1个 */
.album-photo li:only-child {
  height: 100%;
}
/* 2个 */
.album-photo li:first-child:nth-last-child(2),
.album-photo li:first-child:nth-last-child(2) + li {
  width: 50%;
  height: 100%;
  float: left;
}
.album-photo li:first-child:nth-last-child(2) + li {
  margin-left: auto;
}
/* 3个 */
.album-photo li:first-child:nth-last-child(3),
.album-photo li:first-child:nth-last-child(3) ~ li {
  width: 50%; height: 50%;
}
.album-photo li:first-child:nth-last-child(3) {
  margin: auto;
  width: 50%;
  height: 100%;
  float: left;
}
.album-photo li:first-child:nth-last-child(3) ~ li {
  float: left;
}
/* 4个 */
.album-photo li:first-child:nth-last-child(4),
.album-photo li:first-child:nth-last-child(4) ~ li {
  width: 50%; height: 50%;
  float: left;
}
.circle i{
color: #383838;
}
    
</style>
