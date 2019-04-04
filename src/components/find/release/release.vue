<template>
    <div class="release">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  slot="navbar" title="">
              <router-link to=""  @click.native="back" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
              <button class="release-btn" slot="right" >发表</button>
          </yd-navbar>
          <yd-cell-group>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="这一刻的想法..."></yd-textarea>
            </yd-cell-item>
            <div class="release-img">
                <img src="http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg"/>
                <img src="http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg"/>
                <img src="http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg"/>
                <img src="http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg"/>
                <img src="http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg"/>
                <img src="http://a3.att.hudong.com/63/87/19300001392461132480875422046.jpg"/>
                <div class="add-img" @click="show1 = true"></div>
            </div>
        </yd-cell-group>
        </div>
        <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
      </div>
      <router-view></router-view>
       
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
    },
    data () {
      return {
        show1: false,
        myItems1: [
          {
            label: '拍照',
            callback: () => {
                this.$dialog.toast({mes: '咔擦，此人太帅！'});
                /* 注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的 */
            }
          },
          {
            label: '从相册中偷取',
            callback: () => {
              this.$router.push({
                path: `/find/release`
              });
                this.$dialog.toast({mes: '看到了不该看到的东西！'});
            }
          }
        ],
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      }
    }
  }
</script>

<style>
  .release{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #fff;
  }
  .release .yd-cell:after{
      background-image: none;
  }
  .release  .release-btn{
    background: rgb(141, 102, 250);
    color: #fff;
    min-width:1.1rem;
    border-radius: 5px;
    height: 0.6rem;
    padding: 0;
    display: inline-block;
    text-align: center;
    line-height: 0.6rem;
    border: none;
  }
  .release-img{
    width: 6.3rem;
    clear: both;
    overflow: hidden;
    text-align: center;
    margin: auto;
  }
  .release-img img{
    float: left;
    width: 2rem;
    height: 2rem;
    margin-right: 0.1rem;
    margin-top: 0.1rem;
  }
  .add-img{
    background: url(../../../assets/add.png) #eee no-repeat;
    background-size: 40%;
    background-position: center;
    width: 2rem;
    height: 2rem;
    float: left;
    margin: 0.1rem 0;
    }
</style>
