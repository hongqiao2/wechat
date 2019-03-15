<template>
  <transition name="slide">
    <div class="friend">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  slot="navbar" title="新的朋友">
            <router-link to="" slot="left" @click.native="back" >
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
             <router-link to="../add" slot="right">添加朋友</router-link>
        </yd-navbar>
       <template>
          <yd-cell-group>
              <yd-cell-item>
                  <img slot="icon" src="../../../assets/chatroom/photo4.png"/>
                  <div slot="left">
                    <p>乔乔儿</p>
                    <span>你好啊！</span>
                  </div>
                  <span slot="right">已添加</span>
              </yd-cell-item>
          </yd-cell-group>
      </template>
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
.friend .yd-cell-item{
  padding: 0.2rem 0 0.2rem 0.2rem;
}
.friend  .yd-navbar-item a{
  color: #8D66FA;
  font-size: 0.32rem;
}
</style>
