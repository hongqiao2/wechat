<template>
  <div>
    <div class="plus-wrap">
      <div class="plus-cover" v-if="isShow" @click=closeMyself></div>
        <transition name="drop">
          <div class="plus-content" v-if="isShow" @click="warn">
            <ul>
              <li>
                <img src="./group.png" />
                <span>发起群聊</span>
              </li>
              <li>
                <img src="./addfri.png" />
                <span>添加朋友</span>
              </li>
              <li>
                <img src="./sweep1.png" />
                <span>扫一扫</span>
              </li>
              <li>
                <img src="./help1.png" />
                <span>帮助与反馈</span>
              </li>
            </ul>
          </div>
        </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {Toast} from 'mint-ui'

export default {
  components: {
    Toast
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    },
    warn () {
      this.$toast({
        message: '待开发',
        position: 'bottom',
        duration: 1500
      })
    }
  }
}
</script>

<style scoped>
.drop-enter-active {
  transition: all .5s ease;
}
.drop-leave-active {
  transition: all .5s ease;
}
.drop-enter {
  /* transform: translateY(500px);  */
  opacity: 0;
}
.drop-leave-active {
  /* transform: translateY(500px); */
  opacity: 0;

}
.plus-cover {
  position: fixed;
  z-index: 9990;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.plus-content {
    width: 40%;
    position: fixed;
    overflow: auto;
    background: #343434;
    top: 1rem;
    right: 0.2rem;
    z-index: 9999;
    border-radius: 0.1rem;
}
.plus-content img{
  height: 26px;
  width: 26px;
  margin-right: 10px;
}
li{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.24rem;
    color: #fff;
    font-size: 0.3rem;
}

</style>
