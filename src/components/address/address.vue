<template>
  <yd-layout>
    <mt-index-list>
    <!-- <mt-cell class="top" title="" > -->
      <yd-cell-item  class="addr-list" type="link" href="/address/friend">
          <img slot="icon" src="../../assets/address/newfriend.png">
          <span slot="left">新的朋友 </span>
      </yd-cell-item>
      <yd-cell-item class="addr-list" type="link" href="/address/group">
          <img slot="icon" src="../../assets/address/groupchat.png">
          <span slot="left">群聊 </span>
      </yd-cell-item>
      <yd-cell-item class="addr-list" type="link" href="/address/label">
          <img slot="icon" src="../../assets/address/label.png">
          <span slot="left">标签 </span>
      </yd-cell-item>
      <mt-index-section 
        v-for="(item, index) in personnelList" 
          :index="index"
          :key="item.id" 
      >
        <mt-cell 
          class="address-item" 
          v-for="items in item" 
          :key="items.id" 
          :title="items.dissname"
            v-on:click.native="gotoDetail(items)"
        >
          <div class="mt-cell-wrapper">
            <img v-lazy="items.imgurl" height="40" width="40" />
          </div>
        </mt-cell>
      </mt-index-section>
      <div style="height:1rem;"></div>
      </mt-index-list>
    <router-view></router-view>
    </yd-layout>
  
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
      gotoDetail (info) {
        this.$router.push({
          path: `/address/${info.dissid}`
        })
        this.setAddress(info)
      },
      ...mapMutations({
        setAddress: 'SET_INFO'
      }),
      warn () {
        MessageBox({
          title: '提示',
          message: '尚未开发，还是和下面的人聊聊天吧',
          showCancelButton: true
        })
      }
    },
    data () {
      return {
        personnelList: {
          "C": [
            {
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
          ],
          "D": [
            {
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
          ],
          "G": [
            {
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
          ],
          'H': [
            {
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
        }
      }
    }
  }
</script>

<style >
 .addr-list{
  width: 100%;
  padding: 0.1rem 0.2rem;
  background: #fff;
  display: flex;
  align-items: center;
}
.addr-list .yd-cell-icon img{
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 5px;
  margin-right: 0.2rem;
}
.addr-list span{
  font-size: 0.32rem;
  color: #464646;
}
.address-item{
    /* border-bottom: 0.2px solid #eee; */
    background-color: #fff;
    padding-left: 1.2rem;
    height: 1rem;
  }
 .address-item img{
    position: absolute;
    left: 0.3rem;
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
</style>
