<<<<<<< HEAD
<template>
  <transition name="slide">
    <div class="auth">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar  @click.native="back" slot="navbar" title="实名认证">
            <router-link to="" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div v-if="firstStep">
            <div class="auth-top"><img src="../../../assets/me/certification.png"/></div>
            <p class="auth-hint"><img src="../../../assets/me/identity.png"/>提前防范身份信息冒用</p>
            <div class="auth-btn">
                <yd-button size="large" type="primary" @click.native="cert">立即实名认证</yd-button>
            </div>
        </div>
        <div v-if="secondStep">
            <p class="auth-prompt">请输入账户本人的真实信息</p>
            <div class="auth-cert">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">姓名</span>
                        <yd-input slot="right" v-model="input10" ref="input10" placeholder="请输入姓名"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">身份证号</span>
                        <yd-input slot="right" v-model="input10" ref="input10" placeholder="请输入身份证号"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>
                <yd-button-group class="auth-btn">
                    <yd-button size="large" @click.native="toastSuccess">立即认证</yd-button>
                </yd-button-group>
            </div>
        </div>
      </div>
    </div>
      <router-view></router-view>
  </transition>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {MessageBox} from 'mint-ui'

  export default {
    components: {
      BScroll,
      MessageBox
    },
    data () {
      return {
        input10: '',
        firstStep: true,
        secondStep: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true
        })
      })
    },
    methods: {
      back (event) {
        // 为防止PC端时,点击事件会被执行两次,须作如下判断，但是这里暂时不需要，参考http://blog.csdn.net/alsnei/article/details/54375957
        // if (!event._constructed) {
        //   return
        // }
        this.$router.back()   // 返回上一级
      },
      toastSuccess () {
        this.$dialog.toast({
          mes: '实名认证成功',
          timeout: 1500,
          icon: 'success'
        })
      },
      cert () {
        this.firstStep = false
        this.secondStep = true
      }
    }
  }
</script>

<style>
.auth{
    position: fixed;
    width:100%;
    height:100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 203;
    background-color:#fff;
}
.auth-top{
    background: #8D66FA;
    text-align: center;
    padding: 0.7rem 0;
}
.auth-top img{
    width: 3rem;
}
.auth-hint{
    color: #4D4D4D;
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.8rem 0;
}
.auth-hint img{
    width: 0.5rem;
    height: 0.5rem;
}
.auth-btn{
    width: 85%;
    margin: auto;
}
.auth-prompt{
    background: #F9F9F9;
    padding: 0.2rem;
    color: #717171;
    font-size: 0.28rem;
}
.auth-cert .yd-cell-right input[type=text]{
    text-align: right !important;
}   
.yd-button{
    padding: 0;
}
</style>
=======
<template>
  <transition name="slide">
    <div class="auth">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar @click.native="back" slot="navbar" title="实名认证">
          <router-link to slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
        </yd-navbar>
        <div v-if="firstStep">
          <div class="auth-top">
            <img src="../../../assets/me/certification.png">
          </div>
          <p class="auth-hint">
            <img src="../../../assets/me/identity.png">提前防范身份信息冒用
          </p>
          <div class="auth-btn">
            <yd-button size="large" type="primary" @click.native="cert">立即实名认证</yd-button>
          </div>
        </div>
        <div v-if="secondStep">
          <p class="auth-prompt">请输入账户本人的真实信息</p>
          <div class="auth-cert">
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">姓名</span>
                <yd-input slot="right" v-model="fullName" ref="fullName" placeholder="请输入姓名"></yd-input>
              </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group>
              <yd-cell-item>
                <span slot="left">身份证号</span>
                <yd-input slot="right" v-model="idNumber" ref="idNumber" placeholder="请输入身份证号"></yd-input>
              </yd-cell-item>
            </yd-cell-group>
            <yd-button-group class="auth-btn">
              <yd-button size="large" @click.native="toastSuccess">立即认证</yd-button>
            </yd-button-group>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import { MessageBox } from "mint-ui";
import api from "@/api/resource.js";

export default {
  components: {
    BScroll,
    MessageBox
  },
  data() {
    return {
      fullName: "", // 姓名
      idNumber: "", // 身份证
      firstStep: true,
      secondStep: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      });
    });
  },
  methods: {
    back(event) {
      // 为防止PC端时,点击事件会被执行两次,须作如下判断，但是这里暂时不需要，参考http://blog.csdn.net/alsnei/article/details/54375957
      // if (!event._constructed) {
      //   return
      // }
      this.$router.back(); // 返回上一级
    },
    toastSuccess() {
      let fullName = this.fullName;
      let idNumber = this.idNumber;
      // 姓名以及身份证正则验证表达式
      let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
      if (!fullName || !reg.test(fullName)) {
        this.$dialog.toast({
          mes: "请输入正确的姓名",
          timeout: 1000,
          icon: "error"
        });
      }
      if (!idNumber || !idcard_patter.test(idNumber)) {
        this.$dialog.toast({
          mes: "请输入正确的身份证号",
          timeout: 1000,
          icon: "error"
        });
      }
      let userInfo = localStorage.getItem("access_token");
      userInfo = JSON.parse(userInfo);
      userInfo.realName = fullName;
      userInfo.idNumber = idNumber;
      api
        .saveRealNameAuthentication(this, {
          "realName": fullName,
          "idNumber": idNumber,
          "id": userInfo.id
        })
        .then(res => {
          console.log(JSON.stringify(res));
          let val = res.body;
          if (val.code == "200") {
            localStorage.setItem("access_token", JSON.stringify(userInfo));
            this.$dialog.toast({
              mes: "实名认证成功",
              timeout: 1500,
              icon: "success"
            });
            that.$router.push({
              path: `/me`
            });
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    },
    cert() {
      this.firstStep = false;
      this.secondStep = true;
    }
  }
};
</script>

<style>
.auth {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 203;
  background-color: #fff;
}
.auth-top {
  background: #8d66fa;
  text-align: center;
  padding: 0.7rem 0;
}
.auth-top img {
  width: 3rem;
}
.auth-hint {
  color: #4d4d4d;
  font-size: 0.28rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.8rem 0;
}
.auth-hint img {
  width: 0.5rem;
  height: 0.5rem;
}
.auth-btn {
  width: 85%;
  margin: auto;
}
.auth-prompt {
  background: #f9f9f9;
  padding: 0.2rem;
  color: #717171;
  font-size: 0.28rem;
}
.auth-cert .yd-cell-right input[type="text"] {
  text-align: right !important;
}
.yd-button {
  padding: 0;
}
</style>
>>>>>>> acf4f0372c86a46fbad5f836a1d26b8592c2ed6c
