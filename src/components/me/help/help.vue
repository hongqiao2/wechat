<template>
    <div class="help">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="帮助与反馈">
            <router-link to="/me" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        
        <yd-cell-group >
            <yd-cell-item arrow v-for="(item, index) in info" :key="item.id"  @click.native="goHedetail">
                <span slot="left" v-html="item.title"></span>
            </yd-cell-item>
        </yd-cell-group>
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
        info: [
          {
            title: '如何下载微聊',
            id: 1
          },
          {
            title: '为什么我的微聊没有声音',
            id: 2
          },
          {
            title: '微聊账号登录方法',
            id: 3
          },
          {
            title: '用微聊怎么添加好友',
            id: 4
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
      goHedetail () {
        console.log('123')
        this.$router.push({
        //   path: `/me/help/hedetail`
          path: `/me/help/hedetail`
        })
      }
    }
  }
</script>

<style>
.help{
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

</style>
