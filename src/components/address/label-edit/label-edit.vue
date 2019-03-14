<template>
  <transition name="slide">
    <div class="friend">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  slot="navbar" title="编辑标签">
            <router-link to="" slot="left" @click.native="back" >
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
             <router-link to="" slot="right">保存</router-link>
             <!-- 标签名称 -->
        </yd-navbar>
        
        <yd-cell-group title="标签">
            <yd-cell-item>
                <yd-input slot="right" v-model="input10" ref="input10" placeholder="未设置标签名字"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <p class="edit-num" v-html="'标签成员(' + personnelList.length +')'" ></p>
        <yd-cell-group>
            <yd-cell-item @click.native="goGroup">
                <div slot="left" class="label-add"><i class="iconfont icon-tianjia"></i> 添加成员 </div>
            </yd-cell-item>
        </yd-cell-group>
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
                    <img v-lazy="info.imgurl" height="40" width="40" />
                </div>
                </mt-cell>
            </mt-index-section>
          </mt-index-list> 

      </div>
      <router-view></router-view>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  export default {
    components: {
    },
    data () {
      return {
        input10: '同事',
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
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goGroup () {
        this.$router.push({
          path: `/group`
        })
      },
      submitHandler (value) {
        console.log(this.personnelList)
        this.personnelList = this.personnelList.filter(item => {
        //   console.log(item)
          return item.indexOf(value) !== -1
        })
        // this.$dialog.toast({mes: `搜索：${value}`})
      }
    }
  }
</script>

<style>
.friend{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#F9F9F9;
}
.friend .yd-cell-icon img{
  width: 1rem;
  height: 1rem;
  border-radius: 5px;
}
.friend  .yd-navbar-item a{
  color: #8D66FA;
  font-size: 0.32rem;
}
.label-add{
    display: flex;
    align-items: center;
    color: #8D66FA;
}
.edit-num{
    color: #959595;
    font-size: 0.28rem;
    padding: .05rem .24rem .1rem;
}
</style>
