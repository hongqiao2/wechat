<template>
  <transition name="slide">
    <div class="chatroom-card" ref="content">
        <yd-navbar title="邀请手机联系人">
            <router-link to="#" slot="left">
                <yd-navbar-back-icon @click.native="$router.back(-1)"></yd-navbar-back-icon>
            </router-link>
            <!-- <p slot="right">完成({{checkbox1.length}})</p> -->
        </yd-navbar> 
        <yd-search v-model="value1" :on-submit="submitHandler"></yd-search>
          <mt-index-list>
            <mt-index-section 
                v-for="(item, index) in personnelList" 
                :key="item.id" 
                :index="item.group" 
            >
                <mt-cell 
                class="address-item" 
                v-for="info in item.info" 
                :key="info.id" 
                :title="info.dissname"
                >
                <div class="mt-cell-wrapper">
                    <yd-checkbox-group v-model="checkbox1"><yd-checkbox :val="info.value" shape="circle"></yd-checkbox></yd-checkbox-group>
                    <img v-lazy="info.imgurl" height="40" width="40" />
                </div>
                </mt-cell>
            </mt-index-section>
            <div style="height: 0.9rem;"></div>
          </mt-index-list> 
          
          <div class="invite-bottom">
              邀请使用微聊({{checkbox1.length}})
          </div>
    <router-view></router-view>
      
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { IndexList, IndexSection, Toast, MessageBox } from 'mint-ui'
  import {mapMutations} from 'vuex'

  export default {
    components: {
      IndexList,
      IndexSection,
      Toast,
      MessageBox
    },
    created () {
      // console.log(this.personnelList)
    },
    methods: {
      ...mapMutations({
        setAddress: 'SET_INFO'
      }),
    //   gotoChat (info) {
    //     this.$router.push({
    //       path: `/chatroom`
    //     })
    //   },
      submitHandler (value) {
        console.log(this.personnelList)
        this.personnelList = this.personnelList.filter(item => {
        //   console.log(item)
          return item.indexOf(value) !== -1
        })
        // this.$dialog.toast({mes: `搜索：${value}`})
      }
    },
    data () {
      return {
        value1: '',
        checkbox1: ['1'],
        personnelList: [
          {
            group: 'C',
            info: [
              {
                value: 1,
                dissname: '曹操',
                dissid: 'caocao',
                phone: '18312345678',
                imgurl: 'http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg',
                location: '这个人很懒...还没有设置地址',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过搜索手机号添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'D',
            info: [
              {
                value: 2,
                dissname: '典韦',
                dissid: 'dianwei',
                phone: '18312345678',
                imgurl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1614597475,2162289114&fm=26&gp=0.jpg',
                location: '魏国 洛阳',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              },
              {
                value: 3,
                dissname: '大乔',
                dissid: 'daqiao',
                phone: '18312345678',
                imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502995554006&di=70ab3f456e05a25f092c613fed0df1d3&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20141231%2FdaqiaorenwuchahuaJPG_3711796.jpg',
                location: '吴国 建业',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'G',
            info: [
              {
                value: 4,
                dissname: '关羽',
                dissid: 'guanyu',
                phone: '18312345678',
                imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503761569656&di=01696cee833e1c3af42186949cf5a8fc&imgtype=0&src=http%3A%2F%2Fimg11.weikeimg.com%2Fupload%2Fnews%2F2011121315404465027.jpg',
                location: '蜀国',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'H',
            info: [
              {
                value: 5,
                dissname: '华佗',
                dissid: 'huatuo',
                phone: '18312345678',
                imgurl: 'http://img1.gamedog.cn/2014/01/23/30-1401230942040.jpg',
                location: '东汉',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'K',
            info: [
              {
                value: 6,
                dissname: '孔融',
                dissid: 'kongsong',
                phone: '18312345678',
                imgurl: 'http://img3.redocn.com/tupian/20141229/kongrongrenwuchatu_3710874.jpg',
                location: '魏国 洛阳',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'L',
            info: [
              {
                value: 7,
                dissname: '刘备',
                dissid: 'liubei',
                phone: '18312345678',
                imgurl: 'http://i1.hexunimg.cn/2014-02-21/162366807.jpg',
                location: '蜀国 成都',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              },
              {
                value: 8,
                dissname: '刘婵',
                dissid: 'liuchan',
                phone: '18312345678',
                imgurl: 'http://img4.imgtn.bdimg.com/it/u=3637701658,1545034888&fm=26&gp=0.jpg',
                location: '蜀国 成都',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'M',
            info: [
              {
                value: 9,
                dissname: '马超',
                dissid: 'machao',
                phone: '18312345678',
                imgurl: 'http://img4.imgtn.bdimg.com/it/u=2728427651,1908159735&fm=27&gp=0.jpg',
                location: '蜀国',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过搜索手机号添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'N',
            info: [
              {
                value: 10,
                dissname: '南华老仙',
                dissid: 'nanhualaoxian',
                phone: '18312345678',
                imgurl: 'http://img0.imgtn.bdimg.com/it/u=122621943,1277921133&fm=26&gp=0.jpg',
                location: '东汉',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过搜索手机号添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'Q',
            info: [
              {
                value: 11,
                dissname: '清河公主',
                dissid: 'gongzhu',
                phone: '18312345678',
                imgurl: 'http://i6.qhimg.com/dr/250_500_/t018979f012be2d3ce2.jpg',
                location: '魏国',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过搜索手机号添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'S',
            info: [
              {
                value: 12,
                dissname: '孙权',
                dissid: 'sunquan',
                phone: '18312345678',
                imgurl: 'http://a0.att.hudong.com/27/15/01300000237183121990159374583_950.jpg',
                location: '东吴',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              },
              {
                value: 13,
                dissname: '司马懿',
                dissid: 'simayi',
                phone: '18312345678',
                imgurl: 'http://www.e3ol.com/biography/upfiles/2008/20089822301342545.jpg',
                location: '魏国',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'X',
            info: [
              {
                value: 14,
                dissname: '小乔',
                dissid: 'xiaoqiao',
                phone: '18312345678',
                imgurl: 'http://p1.qhmsg.com/t01702ab9a323fbea28.jpg',
                location: '吴国',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过搜索手机号添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          },
          {
            group: 'Z',
            info: [
              {
                value: 15,
                dissname: '诸葛亮',
                dissid: 'zhugeliang',
                phone: '18312345678',
                imgurl: 'http://static.bbs.9wee.com/attachment/forum/201306/07/210751qbp4p4c5yzhhbpym.jpg',
                location: '蜀国',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过搜索手机号添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              },
              {
                value: 16,
                dissname: '张飞',
                dissid: 'zhangfei',
                phone: '18312345678',
                imgurl: 'http://img3.imgtn.bdimg.com/it/u=187699675,1270817048&fm=26&gp=0.jpg',
                location: '魏国',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              },
              {
                value: 17,
                dissname: '赵云',
                dissid: 'zhaoyun',
                phone: '18312345678',
                imgurl: 'http://p5.so.qhimgs1.com/t0171807b9d0a9ac16b.jpg',
                location: '蜀国',
                album: 'http://src.zhigame.com/news/20130123/2013012310413268.jpg',
                source: '通过扫一扫添加',
                sign: '这个人很懒没有留下签名',
                hobby: '这个人很懒没有什么爱好'
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style>
.yd-checkbox-text{
    color: transparent;
}
.yd-checkbox>input[type=checkbox]:checked+.yd-checkbox-icon{
    color: #956EFF !important;
}
.yd-checkbox {
    display: inline-block;
    padding-right: 10px;
    position: absolute;
    left: 0.3rem;
    top: 0.3rem;
}
.yd-navbar-item p{
    color: #8D66FA;
    font-size: 0.28rem;
}
.chatroom-card{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #ebebeb;
}
.address-item{
    /* border-bottom: 0.2px solid #eee; */
    background-color: #fff;
    padding-left:1.8rem;
    height: 1rem;
}
.address-item img {
    position: absolute;
    left: 0.9rem;
    top: 0.1rem;
}
.mint-cell img {
    vertical-align: middle;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 5px;
}
.mint-cell-wrapper{
    background-image: -webkit-linear-gradient(top, #eee, #eee 50%, transparent 50%);
    background-image: linear-gradient(180deg, #eee, #eee 50%, transparent 50%);
}
.mint-indexlist-nav{
background:transparent;
border-left:none;
} 
.mint-indexlist-content{
margin: 0 !important;
}
.invite-bottom{
    position: fixed;
    left: 0;
    bottom: 0;
    background: #F8F8F8;
    text-align: center;
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    font-size: 0.32rem;
    z-index: 111;
    color: #8D66FA;
}
</style>
