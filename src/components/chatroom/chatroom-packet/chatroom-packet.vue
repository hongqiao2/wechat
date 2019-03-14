<template>
  <transition name="slide">
    <div class="chatroom-packet" ref="content">
      <yd-navbar title="红包">
          <router-link to="/chatroom" slot="left">
              <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
      </yd-navbar> 
      <div class="packet-money">
        <span>金额</span>
        <!-- <input/> -->
        <yd-input slot="right" v-model="input1" ref="input1" placeholder="0.0"></yd-input>
        <span>元</span>
      </div>
      <div class="packet-text">
        <yd-cell-item>
            <yd-textarea slot="right" placeholder="恭喜发财，大吉大利！" ></yd-textarea>
        </yd-cell-item>
      </div>
      <h2 class="packet-price">¥{{input1}}.00</h2>
      <div class="packet-btn">
        <yd-button size="large" type="danger">塞钱进红包</yd-button>
      </div>
      
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    components: { },
    data () {
      return {
        input1: ''
      }
    },
    computed: {},
    methods: {}
  }
</script>

<style>

.chatroom-packet{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    z-index: 200;
    background-color: #ebebeb;
  }
  .packet-text{
    width: 100%;
    margin: auto;
    border-radius: 5px;
  }
      
  .packet-money{
    background: #fff;
    width: 6.9rem;
    height: 1.1rem;
    margin: 0.5rem auto 0.3rem;
    border-radius: 5px;
    padding: 0.2rem 0.3rem;
    font-size: 0.32rem;
    display: flex;
    align-items: center;
  }
  .packet-money span:nth-child(1){
    width: 20%;
    
  }
  .packet-money span:nth-child(3){
    margin-left: 0.2rem;
  }
  .yd-input>input{
    text-align: right;
  }
  .yd-textarea{
    padding: 0.2rem 0.3rem;
    border-radius: 5px;
    width: 98%;
    margin: auto;
  }
  .yd-textarea>textarea{
    font-size: 0.32rem;
    height: 1rem;
  }
  .packet-price{
    font-size: 0.56rem;
    text-align: center;
    margin: 0.6em 0;
  }
  .packet-btn{
    width: 6.7rem;
    margin: auto;
  } 
</style>
