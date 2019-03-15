<template>
    <div class="personal-name">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  @click="back" slot="navbar" title="设置姓名">
              <router-link to="/me/personal" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
              <router-link to="/" @click.native="updateName" slot="right">完成</router-link>
          </yd-navbar>
          <yd-cell-group title="好的名字可以让你的朋友更容易记住你">
              <yd-cell-item>
                  <yd-textarea slot="right" v-model="name" placeholder="请输入您的昵称" maxlength="20"></yd-textarea>
              </yd-cell-item>
          </yd-cell-group>
        </div>
      </div>
      <router-view></router-view>
    </div>
    
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'
  import api from "@/api/resource.js";

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        value1: false,
        value2: true,
        value3: true,
        value4: false,
        value5: true,
        title: 11,
        name: ""
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
      warn () {
        this.$toast({
          message: '清理完成',
          duration: 1500
        })
      },
      goPname () {
        console.log('1234')
        this.$router.push({
          path: `/me/personal/Pname`
        })
      },
      // 修改昵称
      updateName() {
        if (!this.name) {
        this.$dialog.toast({
          mes: "昵称不能为空",
          icon: "error",
          timeout: 1000
        });
        return;
      }
      let userInfo = JSON.parse(localStorage.getItem("access_token"));
      var that = this;
      api
        .updateName(this, {
          nickName: this.name,
          id: userInfo.id
        })
        .then(res => {
          let val = res.body;
          if (val.code == "200") {
            localStorage.setItem("access_token", JSON.stringify(val.userInfo));
            that.$router.push({
              path: `/me/personal`
            });
          }
        })
        .catch(err => {});
      }
    }
  }
</script>

<style>
  .personal-name{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#f9f9f9;
  }
  .personal-name .yd-cell-title:after,.personal-name .yd-cell:after{
    background: transparent;
  }
  .personal-name .yd-cell-title{
    padding: .2rem .24rem .2rem;
    font-size: 0.24rem;
    font-weight: normal;
  }
  .personal-name a{
    color: #383838;
    font-size: 0.28rem;
  }
  .personal-name .yd-textarea{
    padding: 0;
  }
  .yd-navbar-center-title{
    color: #242424 !important;
  }

</style>
