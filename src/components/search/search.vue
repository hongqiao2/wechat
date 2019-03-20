<template>
  <yd-layout>
    <transition name="slide">
      <div class="search">
        <div class="search-top">
          <router-link to @click.native="back" slot="left">
            <yd-navbar-back-icon ></yd-navbar-back-icon>
          </router-link>
          <yd-search slot="left" v-model="value1" :on-submit="submitHandler" :on-cancel="back" style=" width: 100%;"></yd-search>
        </div>
      </div>
    </transition>
  </yd-layout>
</template>

<script type="text/ecmascript-6">
import api from '@/api/resource.js'
//  import mui from '../static/mui/js/mui.js'
export default {
  data() {
    return {
      value1: ""
    };
  },
  methods: {
    back() {
      this.$router.back(); // 返回上一级
    },
    submitHandler(value) {
      let accessToken = JSON.parse(localStorage.getItem("access_token"));
      api.findUserInfoByNameOrPhone(this, {
        params: {
          "searchType": 1,
          "id": accessToken.id,
          "serchCont": value
        }
      }).then( res => {
        let val = res.body;
        console.log(JSON.stringify(val))
      }).catch( err => {
        console.log(JSON.stringify(err))
      })
      // this.$dialog.toast({ mes: `搜索：${value}` });
    }
  },
  computed: {}
};
</script>
<style>
.search {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: #ebebeb;
  z-index: 99;
}
.search-top {
  display: flex;
  align-items: center;
  width: 100%;
  background: #f9f9f9;
  padding-left: 0.2rem;
}
.search .yd-search-input {
  background: transparent;

}
.search .yd-search-input .yd-input>input{
  text-align: left;
}
</style>
