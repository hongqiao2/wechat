<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="circle">
      <div class="circle-wrap">
        <yd-navbar  @click="back" slot="navbar" title="朋友圈">
            <router-link to="/find" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="content">
          <div class="content-wrapper" ref="wrapper">
            <div class="content-text">
              <div class="content-top">
                <img class="circle-bg" src="../../../assets/find/bg.png" />
                <div class="user">
                  <span>minion</span>
                  <img src="../../../assets/me/minion.png" />
                </div>
              </div>
              <div class="content-body">
                <ul v-for="(item, index) in info">
                  <li>
                    <div class="everyuser">
                      <img class="userphoto" :src="item.imgurl" />
                      <div>
                        <div class="username">
                          <h2 v-html="item.dissname"></h2>
                          <p v-html="item.sign"></p>
                        </div>
                        <div class="useralbum" v-if="item.album.length" v-for="img in item.album">
                          <img :src="img.album1" height="100" width="100" />
                          <img :src="img.album2" height="100" width="100" />
                        </div>
                        <div class="usertime">
                          <p v-html="item.time"></p>
                          <span>{{item.num}}</span>
                          <img @click.once="admire(item)" src="../../../assets/赞.png" height="20" width="20">
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div style="text-align: center;opacity: 0.6;margin-top: 20px;">----没有更多动态了----</div>
              </div>
            </div>
          </div>
        </div>
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
        info: [
          {
            dissname: '曹操',
            sign: '宁我负人,毋人负我!',
            imgurl: 'http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg',
            album: [],
            time: '20分钟前',
            num: 45
          },
          {
            dissname: '关羽',
            sign: '玉可碎不可改其质,竹可焚不可毁其节。',
            imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503761569656&di=01696cee833e1c3af42186949cf5a8fc&imgtype=0&src=http%3A%2F%2Fimg11.weikeimg.com%2Fupload%2Fnews%2F2011121315404465027.jpg',
            album: [
              {
                album1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503761561605&di=58808d887f874446d4ee4fa1f025e48d&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmiddle%2F6878eb7eh88be4e1d149a%26690',
                album2: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504356148&di=e3d081ed54ebe65da2ec0a0aca295721&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.anfone.com%2FOutside%2F2015-06-10%2F201506102054492527.jpg'
              }
            ],
            time: '39分钟前',
            num: 52
          },
          {
            dissname: '孙权',
            sign: '曹有张文远，吾有甘兴霸！',
            imgurl: 'http://a0.att.hudong.com/27/15/01300000237183121990159374583_950.jpg',
            album: [],
            time: '1小时前',
            num: 9
          },
          {
            dissname: '司马懿',
            sign: '夫将兵者，不战则守，不守则走，不走则逃，不逃则死。',
            imgurl: 'http://www.e3ol.com/biography/upfiles/2008/20089822301342545.jpg',
            album: [],
            time: '2小时前',
            num: 71
          },
          {
            dissname: '大乔',
            sign: '',
            imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502995554006&di=70ab3f456e05a25f092c613fed0df1d3&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20141231%2FdaqiaorenwuchahuaJPG_3711796.jpg',
            album: [
              {
                album1: 'http://img1.ali213.net/glpic/2015/12/23/584_2015122335344155.png',
                album2: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503767564388&di=effe1985b2d1ff797e1818a94731c617&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fupload%2Fimg_5_2436167610D64180571_23.jpg'
              }
            ],
            time: '8小时前',
            num: 89
          },
          {
            dissname: '刘备',
            sign: '髀肉复生矣',
            imgurl: 'http://i1.hexunimg.cn/2014-02-21/162366807.jpg',
            album: [],
            time: '昨天',
            num: 20
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
  .circle{
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
  .userphoto{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
  }
  .content{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .content-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .content-top{
    position: relative;
  }
  .circle-bg{
    width: 100%;
    margin-bottom: 20px;
  }
  .user{
    position: absolute;
    bottom: 0px;
    right: 10px;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .user span{
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
    margin-right: 10px;
  }
  .user img{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 5px;
  }
  .everyuser{
    position: relative;
    border-bottom: 1px solid #EBEBEB;
    margin: 0;
    padding: 0.3rem 0.3rem;
    display: flex;
  }
  .everyuser img{
    margin-right: 10px;
  }
  .username h2{
    color: #485273;
    font-family: '\6977\4F53';
    font-size: 0.32rem;
    font-weight: bold;
    line-height: 0.34rem;
    margin-bottom: 0.1rem;
  }
  .username p{
    font-size: 0.32rem;
    margin-bottom: 0.1rem;
  }
  .usertime{
    font-size: 0.26rem;
    margin-top: 0.2rem;
    color: #B7B7B7;
  }
  .usertime span{
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 14px;
    line-height: 14px;
  }
  .usertime img{
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

</style>
=======
<template>
  <transition name="slide">
    <div class="circle">
      <div class="circle-wrap">
        <yd-navbar  @click="back" slot="navbar" title="朋友圈">
            <router-link to="/find" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="content">
          <div class="content-wrapper" ref="wrapper">
            <div class="content-text">
              <div class="content-top">
                <img class="circle-bg" src="../../../assets/find/bg.png" />
                <div class="user">
                  <span>minion</span>
                  <img src="../../../assets/me/minion.png" />
                </div>
              </div>
              <div class="content-body">
                <ul v-for="(item, index) in info">
                  <li>
                    <div class="everyuser">
                      <img class="userphoto" :src="item.imgurl" />
                      <div>
                        <div class="username">
                          <h2 v-html="item.dissname"></h2>
                          <p v-html="item.sign"></p>
                        </div>
                        <div class="useralbum" v-if="item.album.length" v-for="img in item.album">
                          <img :src="img.album1" height="100" width="100" />
                          <img :src="img.album2" height="100" width="100" />
                        </div>
                        <div class="usertime">
                          <p v-html="item.time"></p>
                          <span>{{item.num}}</span>
                          <img @click.once="admire(item)" src="../../../assets/赞.png" height="20" width="20">
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div style="text-align: center;opacity: 0.6;margin-top: 20px;">----没有更多动态了----</div>
              </div>
            </div>
          </div>
        </div>
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
        info: [
          {
            dissname: '曹操',
            sign: '宁我负人,毋人负我!',
            imgurl: 'http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg',
            album: [],
            time: '20分钟前',
            num: 45
          },
          {
            dissname: '关羽',
            sign: '玉可碎不可改其质,竹可焚不可毁其节。',
            imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503761569656&di=01696cee833e1c3af42186949cf5a8fc&imgtype=0&src=http%3A%2F%2Fimg11.weikeimg.com%2Fupload%2Fnews%2F2011121315404465027.jpg',
            album: [
              {
                album1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503761561605&di=58808d887f874446d4ee4fa1f025e48d&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmiddle%2F6878eb7eh88be4e1d149a%26690',
                album2: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504356148&di=e3d081ed54ebe65da2ec0a0aca295721&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.anfone.com%2FOutside%2F2015-06-10%2F201506102054492527.jpg'
              }
            ],
            time: '39分钟前',
            num: 52
          },
          {
            dissname: '孙权',
            sign: '曹有张文远，吾有甘兴霸！',
            imgurl: 'http://a0.att.hudong.com/27/15/01300000237183121990159374583_950.jpg',
            album: [],
            time: '1小时前',
            num: 9
          },
          {
            dissname: '司马懿',
            sign: '夫将兵者，不战则守，不守则走，不走则逃，不逃则死。',
            imgurl: 'http://www.e3ol.com/biography/upfiles/2008/20089822301342545.jpg',
            album: [],
            time: '2小时前',
            num: 71
          },
          {
            dissname: '大乔',
            sign: '',
            imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502995554006&di=70ab3f456e05a25f092c613fed0df1d3&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20141231%2FdaqiaorenwuchahuaJPG_3711796.jpg',
            album: [
              {
                album1: 'http://img1.ali213.net/glpic/2015/12/23/584_2015122335344155.png',
                album2: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503767564388&di=effe1985b2d1ff797e1818a94731c617&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fupload%2Fimg_5_2436167610D64180571_23.jpg'
              }
            ],
            time: '8小时前',
            num: 89
          },
          {
            dissname: '刘备',
            sign: '髀肉复生矣',
            imgurl: 'http://i1.hexunimg.cn/2014-02-21/162366807.jpg',
            album: [],
            time: '昨天',
            num: 20
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
  .circle{
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
  .userphoto{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
  }
  .content{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .content-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .content-top{
    position: relative;
  }
  .circle-bg{
    width: 100%;
    margin-bottom: 20px;
  }
  .user{
    position: absolute;
    bottom: 0px;
    right: 10px;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .user span{
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
    margin-right: 10px;
  }
  .user img{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 5px;
  }
  .everyuser{
    position: relative;
    border-bottom: 1px solid #EBEBEB;
    margin: 0;
    padding: 0.3rem 0.3rem;
    display: flex;
  }
  .everyuser img{
    margin-right: 10px;
  }
  .username h2{
    color: #485273;
    font-family: '\6977\4F53';
    font-size: 0.32rem;
    font-weight: bold;
    line-height: 0.34rem;
    margin-bottom: 0.1rem;
  }
  .username p{
    font-size: 0.32rem;
    margin-bottom: 0.1rem;
  }
  .usertime{
    font-size: 0.26rem;
    margin-top: 0.2rem;
    color: #B7B7B7;
  }
  .usertime span{
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 14px;
    line-height: 14px;
  }
  .usertime img{
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

</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
