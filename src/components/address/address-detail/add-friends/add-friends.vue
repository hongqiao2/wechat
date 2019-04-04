<template>
    <div class="add-friends">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  @click.native="back" slot="navbar" title="朋友验证">
              <router-link to="" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
              <router-link to="#" @click.native="goNewFriend" slot="right">发送</router-link>
          </yd-navbar>
          <yd-cell-group title="你需要发送的验证申请，等待对方验证通过">
              <yd-cell-item>
                  <yd-textarea slot="right" v-model="remarks" placeholder=""></yd-textarea>
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
  import api from '@/api/resource.js'

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        remarks: '',
        friendId: this.$route.params.id
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
        this.$router.push({
          path: `/me/personal/Pname`
        })
      },
      // 添加好友
      goNewFriend(){
        let access_token = JSON.parse(localStorage.getItem("access_token"));
        let friend = JSON.parse(localStorage.getItem("jumpFriendCache"));
        let id = access_token.id;
        api.addNewFriend(this, {
          'addPeople': id,
          'thePersonBeingAdded': this.friendId || friend.id,
          'source': friend.source,
          'remarks': this.remarks
        }).then( res => {
          let val = res.body;
          if(val.code == "200"){
            this.$router.push({
              path: `/address/friend`
            });
          }
        }).catch( err => {
          console.log(JSON.stringify(err))
        })
      }
    }
  }
</script>

<style>
  .add-friends{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#f9f9f9 !important;
  }
  .add-friends .yd-cell-title:after,.add-friends .yd-cell:after{
    background: transparent;
  }
  .add-friends .yd-cell-title{
    padding: .2rem .24rem .2rem;
  }
  .add-friends a{
    color: #383838;
    font-size: 0.28rem;
  }
  .add-friends .yd-textarea{
    padding: 0;
  }
  .yd-navbar-center-title{
    color: #242424 !important;
  }
</style>
