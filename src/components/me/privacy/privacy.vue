<template>
    <div class="privacy">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="隐私">
            <router-link to="/me" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group  title="通讯录">
            <yd-cell-item type="label" style="    border-bottom: 10px solid #f9f9f9;">
                <div slot="left">加我为朋友时需要验证</div>
                <yd-switch slot="right"></yd-switch>
            </yd-cell-item>
            <yd-cell-item type="label">
                <div slot="left">通过手机号搜索到我</div>
                <yd-switch slot="right"></yd-switch>
            </yd-cell-item>
            <yd-cell-item type="label">
                <div slot="left">向我推荐通讯录好友</div>
                <yd-switch slot="right"></yd-switch>
            </yd-cell-item>
            <p class="privacy-hint">开启后，为你推荐已经开通的微聊的手机联系人</p>
        </yd-cell-group>
        <yd-cell-group>
            <yd-cell-item type="label">
                <div slot="left">通过微聊号搜索到我</div>
                <yd-switch slot="right"></yd-switch>
            </yd-cell-item>
            <yd-cell-item arrow @click.native="goBlacklist">
                <span slot="left">通讯录黑名单</span>
            </yd-cell-item>
        </yd-cell-group>
      </div>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        ydswitch: false
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goBlacklist () {
        this.$router.push({
          path: `/me/privacy/blacklist`
        })
      }
    }
  }
</script>

<style>
.privacy{
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
.privacy .yd-cell-title:after,.privacy .yd-cell:after{
    background: transparent;
}
.privacy-hint{
    background: #f9f9f9;
    padding: 0.2rem 0.3rem 0;
    font-size: 0.26rem;
    color: #A2A2A2;
}
.privacy .yd-cell-right{
    min-height: 0.9rem;
}
.privacy .yd-cell-title{
    padding: .2rem .24rem .2rem;
}
</style>
