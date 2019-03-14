<template>
  <transition name="slide">
    <div class="plus-add" ref="content">
        <yd-navbar title="添加朋友">
            <router-link to="#" slot="left">
                <yd-navbar-back-icon @click.native="$router.back(-1)"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar> 
        <div class="add-search" @click="goSearch">
            <yd-icon name="search" size="0.4rem"></yd-icon>
            <p>查找账号/手机号</p>
        </div>
        <div class="scan">
            <img src="../../../assets/plus/sweep.png"/>
            <div>
                <p>扫一扫</p>
                <p>扫描二维码名片</p>
            </div>
        </div>
        <div class="add-code">
            <img src="../../../assets/plus/code1.png"/>
            <p>我的二维码</p>
        </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {
    },
    data () {
      return {}
    },
    computed: {
    },
    methods: {
      goSearch () {
        this.$router.push({
          path: `/search`
        })
      }
    }
  }
</script>

<style>
.plus-add{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #ebebeb;
}
.add-search{
    background: #fff;
    display: flex;
    align-items: center;
    color: #959595;
    font-size: 0.32rem;
    padding:0.3rem;
    margin-bottom: 0.3rem;
}
.scan{
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0.2rem;
}
.scan img{
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.2rem;
}
.scan p:nth-child(1){
    font-size: 0.32rem;
    color: #262626;
}
.scan p:nth-child(2){
    font-size: 0.28rem;
    color: #959595;
}
.add-code{
    text-align: center;
    margin-top: 1rem;
}
.add-code img{
    width:1rem ;
    height: 1rem;
}
.add-code p{
    font-size: 0.32rem;
}
</style>
