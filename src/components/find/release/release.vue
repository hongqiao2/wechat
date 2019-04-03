<template>
    <div class="release">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  slot="navbar" title="">
              <router-link to=""  @click.native="back" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
              <button class="release-btn" slot="right" >发表</button>
          </yd-navbar>
          <yd-cell-group>
            <yd-cell-item>
                <yd-textarea slot="right" placeholder="这一刻的想法..."></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        </div>
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
  .release{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #fff;
  }
  .release .yd-cell:after{
      background-image: none;
  }
  .release  .release-btn{
    background: rgb(141, 102, 250);
    color: #fff;
    min-width:1.1rem;
    border-radius: 5px;
    height: 0.6rem;
    padding: 0;
    display: inline-block;
    text-align: center;
    line-height: 0.6rem;
    border: none;
  }
  
</style>
