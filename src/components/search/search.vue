<template>
  <yd-layout>
  <transition name="slide">
    <div class="search">
      <template>
          <yd-search v-model="value1" :on-cancel="back"></yd-search>
      </template>
       
      <!-- <template>
      <yd-navbar>
          <router-link to="#" slot="left">
              <yd-navbar-back-icon>返回</yd-navbar-back-icon>
          </router-link>

          <img slot="center" src="http://static.ydcss.com/www/img/logo.png"/>

          <router-link to="#" slot="right">
              <yd-navbar-next-icon>前进</yd-navbar-next-icon>
          </router-link>
      </yd-navbar>
  </template>  -->
			<!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
      
			<!-- <div class="mui-content-padded" style="margin: 5px;">
        <div class="mui-input-row mui-search">
					<input type="search" class="mui-input-clear" placeholder="" data-input-clear="1" data-input-search="1"><span class="mui-icon mui-icon-clear mui-hidden"></span><span class="mui-placeholder"><span class="mui-icon mui-icon-search"></span><span></span></span>
				</div>
      </div> -->
      <!-- <div class="back">
        <img class="back-img" src="../../assets/返回.png"  @click="back" height="16" width="19" />
        <div class="serch-box">
          <input 
            type="text" 
            placeholder="请输入搜索内容"
            v-model="inputText"
            @keyup="show($event)"
            @blur = "hide"
            class="sText"
            ref="sText"
          />
          <img class="logo" src="../../assets/搜索.png" height="20" width="20" @click="gogogo" />
        </div>
      </div> -->
      

      <!-- <div class="content">
        <div class="content-text">
          <ul class="result" v-show="showResult">
            <li 
              v-for="(item, index) in result" 
              :class='{bg: index==nowIndex}'
            >
              {{item}}
            </li>
          </ul>
          <h2 ref="tips">搜索指定内容</h2>
          <div class="kind">
            <span>朋友圈</span>
            <span>文章</span>
            <span>公众号</span>
          </div>
          <div class="kind">
            <span>小说</span>
            <span>音乐</span>
            <span>表情</span>
          </div>
        </div>
      </div> -->
    </div>
  </transition>
   </yd-layout>
</template>

<script type="text/ecmascript-6">
//  import mui from '../static/mui/js/mui.js'
  export default {
    data () {
      return {
        inputText: '',
        nowIndex: -1,
        result: [],
        showResult: false,
        value1: ''
      }
    },
    methods: {
      back () {
        console.log(this.value1)
        //this.$router.back()   // 返回上一级
      },
      show (ev) {
        this.$refs.tips.style.marginTop = 280 + 'px'
        this.showResult = true
        this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
          params: {
            wd: this.inputText
          },
          jsonp: 'cb'
        }).then(res => {
          this.result = res.data.s
        })
      },
      hide () {
        this.showResult = false
        this.$refs.tips.style.marginTop = 60 + 'px'
      },
      gogogo () {
        window.open('https://www.baidu.com/s?wd=' + this.inputText)
        this.inputText = ''
      }
    },
    computed: {
    }
  }
</script>
<style scoped>
.search{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color: #ebebeb;
    z-index: 99;
  }
   
</style>
