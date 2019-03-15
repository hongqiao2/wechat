<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="recharge">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click.native="back" slot="navbar" title="余额账户">
            <router-link to="" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-tab>
            <yd-tab-panel label="全部">
                <div class="trecord-list">
                    <p>
                        <span class="trecord-title">发送红包</span>
                        <span class="trecord-green">-0.01</span>
                    </p>
                    <p>
                        <span class="trecord-time">2019-02-16 11:10:30</span>
                        <span class="trecord-state">交易成功</span>
                    </p>
                </div>
                <div class="trecord-list">
                    <p>
                        <span class="trecord-title">收到红包</span>
                        <span class="trecord-red">+0.01</span>
                    </p>
                    <p>
                        <span class="trecord-time">2019-02-16 11:10:30</span>
                        <span class="trecord-state">交易成功</span>
                    </p>
                </div>
            </yd-tab-panel>
            <yd-tab-panel label="收入">
                <div class="trecord-list">
                    <p>
                        <span class="trecord-title">收到红包</span>
                        <span class="trecord-red">+0.01</span>
                    </p>
                    <p>
                        <span class="trecord-time">2019-02-16 11:10:30</span>
                        <span class="trecord-state">交易成功</span>
                    </p>
                </div>
            </yd-tab-panel>
            <yd-tab-panel label="支出">
                <div class="trecord-list">
                    <p>
                        <span class="trecord-title">发送红包</span>
                        <span class="trecord-green">0.01</span>
                    </p>
                    <p>
                        <span class="trecord-time">2019-02-16 11:10:30</span>
                        <span class="trecord-state">交易成功</span>
                    </p>
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
.recharge{
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
.trecord-list{
    background: #fff;
    padding: 0.2rem 0.3rem;
    border-bottom: 1px solid #eee;
}
.trecord-list p{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.05rem;
}
.trecord-title{
    font-size: 0.28rem;
}
.trecord-green{
    font-size: 0.28rem;
    color: green;
}
.trecord-time{
    font-size: 0.24rem;
    color: #A2A2A2;
}
.trecord-state{
    color: #A2A2A2;
}
.trecord-red{
    color: red;
}
</style>
=======
<template>
  <transition name="slide">
    <div class="recharge">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click.native="back" slot="navbar" title="余额账户">
            <router-link to="" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-tab>
            <yd-tab-panel label="全部">
                <div class="trecord-list">
                    <p>
                        <span class="trecord-title">发送红包</span>
                        <span class="trecord-green">-0.01</span>
                    </p>
                    <p>
                        <span class="trecord-time">2019-02-16 11:10:30</span>
                        <span class="trecord-state">交易成功</span>
                    </p>
                </div>
                <div class="trecord-list">
                    <p>
                        <span class="trecord-title">收到红包</span>
                        <span class="trecord-red">+0.01</span>
                    </p>
                    <p>
                        <span class="trecord-time">2019-02-16 11:10:30</span>
                        <span class="trecord-state">交易成功</span>
                    </p>
                </div>
            </yd-tab-panel>
            <yd-tab-panel label="收入">
                <div class="trecord-list">
                    <p>
                        <span class="trecord-title">收到红包</span>
                        <span class="trecord-red">+0.01</span>
                    </p>
                    <p>
                        <span class="trecord-time">2019-02-16 11:10:30</span>
                        <span class="trecord-state">交易成功</span>
                    </p>
                </div>
            </yd-tab-panel>
            <yd-tab-panel label="支出">
                <div class="trecord-list">
                    <p>
                        <span class="trecord-title">发送红包</span>
                        <span class="trecord-green">0.01</span>
                    </p>
                    <p>
                        <span class="trecord-time">2019-02-16 11:10:30</span>
                        <span class="trecord-state">交易成功</span>
                    </p>
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
.recharge{
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
.trecord-list{
    background: #fff;
    padding: 0.2rem 0.3rem;
    border-bottom: 1px solid #eee;
}
.trecord-list p{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.05rem;
}
.trecord-title{
    font-size: 0.28rem;
}
.trecord-green{
    font-size: 0.28rem;
    color: green;
}
.trecord-time{
    font-size: 0.24rem;
    color: #A2A2A2;
}
.trecord-state{
    color: #A2A2A2;
}
.trecord-red{
    color: red;
}
</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
