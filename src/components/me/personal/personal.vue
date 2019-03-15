<template>
    <div class="personal">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  @click="back" slot="navbar" title="个人资料">
              <router-link to="/me" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
          </yd-navbar>
          <yd-cell-group>
              <yd-cell-item arrow>
                  <span slot="left">头像</span>
                  <img slot="right" class="user-photo" :src="userInfo.headPortrait"/>
              </yd-cell-item>
              <yd-cell-item arrow @click.native="goPname">
                  <span slot="left">昵称</span>
                  <span slot="right">{{userInfo.nickName}}</span>
              </yd-cell-item>
              <yd-cell-item>
                  <span slot="left">手机</span>
                  <span slot="right">{{userInfo.iphone}}</span>
              </yd-cell-item>
              
          </yd-cell-group>
          <yd-cell-group>
              <yd-cell-item arrow @click.native="show2 = true">
                  <span slot="left">性别</span>
                  <span slot="right">{{userInfo.gender == 0 ? "女" : "男"}}</span>
              </yd-cell-item>
               <yd-cell-item arrow>
                  <span slot="left">地区</span>
                  <input slot="right" type="text" @click.stop="show3 = true" v-model="model" readonly placeholder="" style="text-align: right;">
              </yd-cell-item>
              
          </yd-cell-group>
           <yd-cell-group>
              <yd-cell-item arrow @click.native="goSign">
                  <span slot="left">个性签名</span>
                  <span slot="right">{{userInfo.autograph ? userInfo.autograph : "未设置"}}</span>
              </yd-cell-item>
              <yd-cell-item arrow @click.native="goHobby">
                  <span slot="left">兴趣爱好</span>
                  <span slot="right">{{userInfo.hobby ? userInfo.hobby : "未设置"}}</span>
              </yd-cell-item>
          </yd-cell-group>
        </div>
      </div>
      <yd-popup v-model="show2" position="center" height="22%" width="90%">
        <yd-cell-group title="性别">
          <yd-cell-item type="radio">
              <span slot="left">男</span>
              <input slot="right" type="radio" value="1" v-model="userInfo.gender"/>
          </yd-cell-item>

          <yd-cell-item type="radio">
              <span slot="left">女</span>
              <input slot="right" type="radio" value="0" v-model="userInfo.gender"/>
          </yd-cell-item>
        </yd-cell-group>
      </yd-popup>
      <yd-cityselect
        v-model="show3"
        ref="cityselectDemo"
        :callback="result"
        :items="district"
        provance="北京"
        city=""
      ></yd-cityselect>
      <router-view></router-view>
    </div>

</template>

<script type="text/ecmascript-6">
  import District from 'ydui-district/dist/jd_province_city_area_id'
  export default {
    components: {},
    data () {
      return {
        show1: false,
        show2: false,
        picked: 'Lucy',
        show3: false,
        district: District,
        userInfo: {},
        model: "",// 地区信息
      }
    },
    mounted () {
      let userinfo = JSON.parse(localStorage.getItem("access_token"))
      this.userInfo = userinfo;
      this.model = userinfo.country + userinfo.region;
    },
    methods: {
      back (event) {
        
        this.$router.back()   // 返回上一级
      },
      onValuesChange (picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0])
        }
      },
      goPname () {
        this.$router.push({
          path: `/me/personal/Pname`
        })
      },
      goSign () {
        this.$router.push({
          path: `/me/personal/sign`
        })
      },
      goHobby () {
        this.$router.push({
          path: `/me/personal/hobby`
        })
      },
      result (ret) {
        this.model = ret.itemName1 + ' ' + ret.itemName2
      }
    }
  }
</script>

<style>
  
  .personal{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color: #f9f9f9;
  }
  .user-photo{
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 5px;
      margin: 0.3rem 0;
  }
  .slide-enter-active,.slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter,.slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  .personal .yd-popup-center{
    background: #fff;
  }
  .personal .yd-cell-title{
    padding: 0.3rem 0.24rem;
    color: #383838;
    font-weight: bold;
    font-size: 0.32rem;
  }
</style>
