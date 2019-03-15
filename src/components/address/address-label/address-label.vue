<template>
  <transition name="slide">
    <div class="label">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  slot="navbar" title="标签">
            <router-link to="" slot="left" @click.native="back" >
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
             <router-link to="../add" slot="right">新建</router-link>
        </yd-navbar>
       <template>
          <yd-cell-group>
              <yd-cell-item @click.native="goLabeledit">
                  <span slot="left">朋友（12）</span>
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
      },
      goLabeledit () {
        this.$router.push({
          path: `/address/labeledit`
        })
      }
    }
  }
</script>

<style>
.label{
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
.label  .yd-navbar-item a{
  color: #8D66FA;
  font-size: 0.32rem;
}
.label .yd-cell-left span{
    font-size: 0.32rem;
}
</style>
