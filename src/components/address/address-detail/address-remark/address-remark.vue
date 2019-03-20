<template>
  <!-- <transition name="slide"> -->
    <yd-layout  class="remark">
        <yd-navbar slot="navbar" title="设置备注">
            <router-link to=""  @click.native="back"  slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="#" slot="right">
                完成
            </router-link>
        </yd-navbar>
        <yd-cell-group title="好友昵称">
          <yd-cell-item>
              <span slot="left">乔乔儿</span>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="备注名称">
          <yd-cell-item>
            <yd-input slot="right" v-model="nickInput" placeholder="请输入昵称"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="标签">
          <yd-cell-item>
              <yd-input slot="right" v-model="labelInput" placeholder="点击添加标签"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="描述">
          <yd-cell-item>
              <yd-input slot="right" v-model="noteInput" placeholder="添加更多备注信息"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
       <router-view></router-view>
    </yd-layout>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    components: {

    },
    data () {
      return{
        nickInput: '',
        labelInput: '',
        noteInput: ''
      }
    },
    computed: {
      ...mapGetters([ // 拿到info的状态
        'info'
      ])
    },
    created () {
      // console.log(this.info)
    },
    methods: {
      back () {
        this.$router.back()   // 返回上一级
      }
    }
  }
</script>

<style>
.remark {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #f9f9f9;
}
.remark a{
  color: #383838;
  font-size: 0.32rem;
}
</style>
