<template id="app">
  <yd-layout>
    <!-- <yd-navbar title="消息">
        <router-link to="#" slot="right">
            <yd-icon name="search" custom size="0.5rem" color="#777"></yd-icon>
        </router-link>
        <div>ceshi</div>
        <router-link to="#" slot="right" v-on:click.native="logClick" >
            <yd-icon name="jia" custom size="0.5rem" color="#777"></yd-icon>
        </router-link>
    </yd-navbar> -->
    <yd-navbar title="消息" v-if="$route.meta.navShow">
       
        <router-link tag="div" to="/search" slot="right">
             <yd-icon name="search" custom size="0.5rem" color="#777" style=" margin-right: 0.3rem;"></yd-icon>
        </router-link>
        <!-- <template v-on:click.native="logClick">  
           <yd-icon name="jia" custom size="0.5rem" color="#777" ></yd-icon>
        </template> -->
        <router-link to="#" slot="right" v-on:click.stop="doThis">
            <yd-icon name="jia" custom size="0.5rem" color="#777" v-on:click.native="logClick"></yd-icon>
        </router-link>
        
    </yd-navbar>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <yd-tabbar slot="tabbar" v-if="$route.meta.menuShow">
      <yd-tabbar-item title="消息" link="/chat">
          <yd-icon name="message" custom slot="icon" size="0.5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="通讯录" link="/address">
          <yd-icon name="tongxunlu" custom slot="icon" size="0.5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="发现" link="/find" dot>
          <yd-icon name="faxian" custom slot="icon" size="0.5rem"></yd-icon>
      </yd-tabbar-item>
      <yd-tabbar-item title="我" link="/me">
          <yd-icon name="wo" custom slot="icon" size="0.5rem"></yd-icon>
          <yd-badge slot="badge" type="danger">2</yd-badge>
      </yd-tabbar-item>
    </yd-tabbar>
    <!-- <yd-tabbar slot="tabbar" v-if="$route.meta.menuShow"> 
        <yd-tabbar-item title="首页" link="#">
            <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="购物车" link="#" active>
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="#">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar> -->
    <Plus :is-show="isShowPlus" @on-close="closeDialog"></Plus>
  </yd-layout>
</template>

<!--<script src="../static/mui/js/mui.min.js"></script>-->  
<script>
import Plus from './components/plus/plus'
export default {
  name: 'app',
  components: {
    Plus
  },
  data () {
    return {
      isShowPlus: false
    }
  },
  methods: {
    closeDialog () {
      this.isShowPlus = false
    },
    logClick () {
      this.isShowPlus = true
    }
  }
}
</script>
<style>
.router-link-active{
  color:#8D66FA !important;
}
.yd-navbar-center-title{
  font-size: 0.36rem !important;
  font-weight: 500;
}
.yd-tabbar-badge, .yd-tabbar-dot{
    z-index: 11;
  }
.yd-btn-primary:not(.yd-btn-loading){
  background-color: #8D66FA;
}
.yd-btn-primary:active{
  background-color: #8D66FA;
}
.yd-navbar{
  background-color: #f7f7f7 !important;
}
.yd-navbar:after{
  background-image: none;
}
</style>

