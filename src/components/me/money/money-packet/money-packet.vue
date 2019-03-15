<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="packet">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="我的红包">
            <router-link to="/me/money" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-tab>
            <yd-tab-panel label="收到的红包">
                <img src="../../../../assets/chatroom/photo4.png"/>
                <h4>乔乔儿<span>共收到</span></h4>
                <h5>0<span>元</span></h5>
                <div class="packet-num">
                    <div>
                        <h5>0</h5>
                        <p>收到的红包</p>
                    </div>
                    <div>
                        <h5>0</h5>
                        <p>手气最佳</p>
                    </div>
                </div>
            </yd-tab-panel>
            <yd-tab-panel label="发出的红包">
                <img src="../../../../assets/chatroom/photo4.png"/>
                <h4>乔乔儿<span>共发出</span></h4>
                <h5>0<span>元</span></h5>
                <div class="packet-num1">
                    <span>发出红包</span>
                    <h5>0</h5>
                    <span>个</span>
                </div>
                
            </yd-tab-panel>
        </yd-tab>
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
.packet{
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
.packet .yd-tab-panel{
    background: #fff;
    text-align: center;
    padding: 0.6rem 0 0.2rem;
}
.packet .yd-tab-panel img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 5px;
}
.packet .yd-tab-panel h4{
    font-size: 0.36rem;
    font-weight: normal;
    color: #101010;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.2rem 0;
}
.packet .yd-tab-panel span,.packet .yd-tab-panel p{
    color: #A2A2A2;
    font-size: 0.28rem;
    margin:0 0.1rem;
}
.packet .yd-tab-panel h5{
    color: #FF000F;
    font-size: 0.4rem;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
}
.packet .packet-num{
    display: flex;
    justify-content: space-around;
    margin-top: 0.3rem;
}
.packet .packet-num1{
    display: flex;
    justify-content: center;
    margin-top: 0.3rem;
    align-items: center;
}
</style>
=======
<template>
  <transition name="slide">
    <div class="packet">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click="back" slot="navbar" title="我的红包">
            <router-link to="/me/money" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-tab>
            <yd-tab-panel label="收到的红包">
                <img src="../../../../assets/chatroom/photo4.png"/>
                <h4>乔乔儿<span>共收到</span></h4>
                <h5>0<span>元</span></h5>
                <div class="packet-num">
                    <div>
                        <h5>0</h5>
                        <p>收到的红包</p>
                    </div>
                    <div>
                        <h5>0</h5>
                        <p>手气最佳</p>
                    </div>
                </div>
            </yd-tab-panel>
            <yd-tab-panel label="发出的红包">
                <img src="../../../../assets/chatroom/photo4.png"/>
                <h4>乔乔儿<span>共发出</span></h4>
                <h5>0<span>元</span></h5>
                <div class="packet-num1">
                    <span>发出红包</span>
                    <h5>0</h5>
                    <span>个</span>
                </div>
                
            </yd-tab-panel>
        </yd-tab>
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
.packet{
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
.packet .yd-tab-panel{
    background: #fff;
    text-align: center;
    padding: 0.6rem 0 0.2rem;
}
.packet .yd-tab-panel img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 5px;
}
.packet .yd-tab-panel h4{
    font-size: 0.36rem;
    font-weight: normal;
    color: #101010;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.2rem 0;
}
.packet .yd-tab-panel span,.packet .yd-tab-panel p{
    color: #A2A2A2;
    font-size: 0.28rem;
    margin:0 0.1rem;
}
.packet .yd-tab-panel h5{
    color: #FF000F;
    font-size: 0.4rem;
    font-weight: normal;
    display: flex;
    align-items: center;
    justify-content: center;
}
.packet .packet-num{
    display: flex;
    justify-content: space-around;
    margin-top: 0.3rem;
}
.packet .packet-num1{
    display: flex;
    justify-content: center;
    margin-top: 0.3rem;
    align-items: center;
}
</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
