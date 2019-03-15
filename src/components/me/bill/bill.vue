<template>
  <transition name="slide">
    <div class="bill">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="账单">
            <router-link to="/me" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item arrow @click.native="goRecord">
                <span slot="left">我的红包记录</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="choose-bill">
            <div class="choose-time">
                <yd-datetime type="month" v-model="datetime3" slot="left"></yd-datetime>
                <yd-icon name="xia" custom slot="icon" size="0.35rem"></yd-icon>
            </div>
            <p>
                <span>
                    发出￥0.00
                </span>
                <span>收到￥0.00</span>
            </p>
        </div>
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
        datetime3: '2019-03'
      }
    },
    mounted () {
    },
    methods: {
      back (event) {
        this.$router.back()   // 返回上一级
      },
      goRecord () {
        this.$router.push({
          path: `/me/bill/record`
        })
      }
    }
  }
</script>

<style>
.bill{
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
.choose-bill{
    background: #fff;
    padding: 0.3rem 0.2rem;
}
.choose-time{
    display: flex;
    font-size: 0.32rem;
    color: #101010;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 0.2rem;
}
.choose-time .yd-datetime-input{
    width: 18%;
}
.choose-bill p{
    color: #797979;
    font-size: 0.28rem;
}
.choose-bill p span{
    margin-right: 0.3rem;
}
</style>
