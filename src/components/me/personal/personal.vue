<template>
    <div class="personal">
      <div class="content-wrapper" ref="wrapper">
        <div class="content-text">
          <yd-navbar  @click="back" slot="navbar" title="个人资料">
              <router-link to="/me" slot="left">
                  <yd-navbar-back-icon></yd-navbar-back-icon>
              </router-link>
          </yd-navbar>

          <div class="item_bock head_p">
            <div class="head_img">
              <img :src="avatar"/>
            </div>
            <div class="setting_right" @click.stop="uploadHeadImg">
              <div class="caption">更改头像</div>
            </div>
            <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
          </div>

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
        avatar: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=62d46c39067b020818c437b303b099b6/d4628535e5dde7119c3d076aabefce1b9c1661ba.jpg'
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
      },
      // 打开图片上传
      uploadHeadImg: function () {
        this.$el.querySelector('.hiddenInput').click()
      },
      // 将头像显示
      handleFile: function (e) {
        let $target = e.target || e.srcElement
        let file = $target.files[0]
        var reader = new FileReader()
        reader.onload = (data) => {
          let res = data.target || data.srcElement
          this.userInfo.avatar = res.result
        }
        reader.readAsDataURL(file)
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
  .item_bock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height:94px;
  width: 300px;
  padding:0px 24px 0px 38px;
  border-bottom: 1px solid #f7f7f7;
  background: #fff;
}
.head_p {
  height:132px;
}
.head_img{
  height: 90px;
}
.head_img img{
  width:90px;
  height:90px;
  border-radius:50px
}
.setting_right{
  display: flex;
  height: 37px;
  justify-content: flex-end;
  align-items: center;
}
.hiddenInput{
  display: none;
}
.caption {
  color: #8F8F8F;
  font-size: 26px;
  height: 37px;
}
</style>
