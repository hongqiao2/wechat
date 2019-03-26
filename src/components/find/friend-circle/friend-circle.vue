<template>
  <yd-layout class="friend-circle">
    <yd-navbar  @click="back" slot="navbar" title="朋友圈">
      <router-link to="/find" slot="left">
          <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <router-link slot="right" to=""  @click.native="show1 = true">
      <i class="iconfont icon-paizhao"></i>
      </router-link>
    </yd-navbar>
    <scroller>
    <div class="content-top" >
      <img class="circle-bg" src="../../../assets/find/bg.png" />
      <div class="user">
        <span>minion</span>
        <img src="../../../assets/me/minion.png" @click="goAlbum" />
      </div>
    </div>
     <div class="content-body"> 
      <ul v-for="(item, index) in info" >
        <li  @click="MoreHide(item)">
          <div class="everyuser">
            <img class="userphoto" :src="item.imgurl" />
            <div class="circle-right">
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
                <div class="circle-more"  @click.stop="showHide(item)">
                  <div class="son" :class="{sonactive: item.show}">
                    <div class="circle-zan" @click.stop="goZan(item)" v-if="item.praise">取消</div>
                    <div class="circle-zan" @click.stop="goZan(item)" v-else>赞</div>
                    <div class="circle-pinlun" @click.stop="goPinlun">评论</div>
                  </div>
                </div>
              </div>
              <div class="Assist-box" v-if="item.assistList || item.praise">
                <span v-for="items in item.assistList">{{items.aname}}</span>
                <span v-if="item.praise">minion</span>
                <div class="assist-comments" v-for="comm in item.comments" v-if="item.comments">
                  <div>
                    <a class="assist-name">{{comm.aname}}:</a>
                    <i>{{comm.contant}}</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div style="text-align: center;opacity: 0.6;margin-top: 20px;">----没有更多动态了----</div>
    </div>
    </scroller>
    <router-view></router-view>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
      // BScroll
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
            num: 45,
            show: false,
            praise: true,
            assistList: [
              {
                aname: '三弟'
              },
              {
                aname: 'ABCDF'
              }
            ],
            comments: [
              {
                aname: '乔乔',
                contant: '好'
              }
            ]
          },
          {
            dissname: '关羽',
            sign: '',
            imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503761569656&di=01696cee833e1c3af42186949cf5a8fc&imgtype=0&src=http%3A%2F%2Fimg11.weikeimg.com%2Fupload%2Fnews%2F2011121315404465027.jpg',
            album: [
              {
                album1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503761561605&di=58808d887f874446d4ee4fa1f025e48d&imgtype=0&src=http%3A%2F%2Fs11.sinaimg.cn%2Fmiddle%2F6878eb7eh88be4e1d149a%26690',
                album2: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504356148&di=e3d081ed54ebe65da2ec0a0aca295721&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.anfone.com%2FOutside%2F2015-06-10%2F201506102054492527.jpg'
              }
            ],
            time: '39分钟前',
            num: 52,
            show: false,
            praise: false
          },
          {
            dissname: '孙权',
            sign: '曹有张文远，吾有甘兴霸！',
            imgurl: 'http://a0.att.hudong.com/27/15/01300000237183121990159374583_950.jpg',
            album: [],
            time: '1小时前',
            num: 9,
            show: false,
            praise: false
          },
          {
            dissname: '司马懿',
            sign: '夫将兵者，不战则守，不守则走，不走则逃，不逃则死。',
            imgurl: 'http://www.e3ol.com/biography/upfiles/2008/20089822301342545.jpg',
            album: [],
            time: '2小时前',
            num: 71,
            show: false,
            praise: false
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
            num: 89,
            show: false,
            praise: false
          },
          {
            dissname: '刘备',
            sign: '髀肉复生矣',
            imgurl: 'http://i1.hexunimg.cn/2014-02-21/162366807.jpg',
            album: [],
            time: '昨天',
            num: 20,
            show: false,
            praise: false
          }

        ]
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      admire (item) {
        console.log(item)
        item.num += 1
      },
      goAlbum () {
        this.$router.push({
          path: `/find/friendcircle/falbum`
        });
      },
      showHide (item) {
         item.show = !item.show
      },
      MoreHide (item) {
        item.show = false
      },
      goZan (item) {
        item.show = false
        item.praise = !item.praise
      },
      goPinlun () {
        console.log('评论')
      }
    }
  }
</script>

<style scoped>
  .friend-circle{
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
 .friend-circle a i{
    font-size: 0.5rem;
  }
  .friend-circle .content-top{
    position: relative;
  }
  .friend-circle .circle-bg{
    width: 100%;
    margin-bottom: 20px;
  }
  .friend-circle .user{
    position: absolute;
    bottom: 0px;
    right: 10px;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .friend-circle .user span{
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
    margin-right: 10px;
  }
  .friend-circle .user img{
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 5px;
  }
  .friend-circle .everyuser{
    position: relative;
    border-bottom: 1px solid #e9e9e9;
    margin: 0;
    padding: 0.3rem 0.3rem;
    display: flex;
  }
  .friend-circle .everyuser img{
    margin-right: 10px;
  }
.friend-circle .userphoto{
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
  }
  .friend-circle .content{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .friend-circle .content-wrapper{
    height: 100%;
    overflow: hidden;
  }
  .friend-circle .content-top{
    position: relative;
  }
  .friend-circle .circle-bg{
    width: 100%;
    margin-bottom: 20px;
  }
  .friend-circle .usertime{
    font-size: 0.26rem;
    margin-top: 0.2rem;
    color: #B7B7B7;
    position: relative;
  }
  .friend-circle .usertime span{
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 14px;
    line-height: 14px;
  }
  .friend-circle .usertime img{
    position: absolute;
    right: 0.1rem;
    bottom: 0.2rem;
    z-index: 999;
  }
  .friend-circle .circle-more{
    background: url("../../../assets/find/more.png");
    width: 0.6rem;
    height: 0.36rem;
    background-size: cover;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .friend-circle .circle-more .son {
    height: 0.72rem;
    width:0rem;
    background-color:#4d5154;
    position:absolute;
    top: -0.2rem;
    right: -3rem;
    border-radius: 5px;
    /* 收回的时候快一点 */
    transition:width 100ms;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.28rem;
  }
  .friend-circle .circle-more  .sonactive{
    width: 2.6rem;
    transition:width 200ms; 
    right: 1rem;  
  }
  .friend-circle .username h2{
    color:#404040;
    font-family: '楷体';
    font-size: 0.32rem;
    font-weight: bold;
    line-height: 0.32rem;
    margin-bottom: 0.1rem;
  }
  .friend-circle .username p{
    font-size: 0.3rem;
    line-height: 0.4rem;
    color: #383838;
  }
  .friend-circle .usertime{
    color:#A2A2A2;
    font-size: 0.24rem;
    margin-top: 0.1rem;
  }
  .friend-circle .circle-zan{
    background: url("../../../assets/find/dot.png") no-repeat;
    background-size: contain;
    color: #fff;
    background-position: 0.1rem center;
    padding-left: 0.4rem;
    border-right: 1px solid #373b3e;
    width: 1.2rem;
    text-align: center;
  }
  .friend-circle .circle-pinlun{
    background: url("../../../assets/find/review.png") no-repeat;
    background-size: 0.35rem;
    background-position: 0.2rem center;
    color: #fff;
    padding-left: 0.6rem;
    width: 1.2rem;
  }
  .assist-comments{
    border-top: 1px solid #eee;
    margin-top: 0.1rem;
    padding-top: 0.1rem;
  }
  .assist-name{
    color: #5b6894;
    font-weight: bold;
  }
  .circle-right{
    width: 86%;
  }
  .Assist-box{
    width: 5.9rem;
    padding: 0.1rem;
    background: #f3f3f5;
    position: relative;
    top: 0.3rem;
    margin-bottom: 0.2rem;
  }
  .Assist-box:after{
    content: "";
    position: absolute;
    border-style: solid;
    /* border-color: lightgreen transparent transparent; */
    border-color: transparent transparent #f3f3f5 transparent;
    border-width: 0.2rem;
    top: -0.4rem;
    left: 0.4rem;
  }
  .Assist-box span{
   background: url("../../../assets/find/dot1.png") no-repeat;
    color: #5b6894;
    background-size: contain;
    padding-left: 0.3rem;
    font-weight: bold;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
  }
</style>
