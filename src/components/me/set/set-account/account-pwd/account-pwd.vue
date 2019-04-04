<template>
  <transition name="slide">
    <div class="account">
      <div class="content-wrapper" ref="wrapper">
        <yd-navbar @click="back" slot="navbar" title="设置登录密码">
          <router-link to="/me/set" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
        </yd-navbar>
        <yd-cell-group v-if="type != 1" title="请输入手机号和验证码">
          <yd-cell-item>
            <input slot="right" v-model="phone" type="number" placeholder="请输入手机号">
          </yd-cell-item>
          <yd-cell-item>
            <input type="text" v-model="captcha" slot="right" placeholder="请输入验证码">
            <yd-sendcode
              slot="right"
              v-model="start1"
              @click.native="sendCode1"
               bgcolor="#8D66FA" color="#FFF" 
              init-str="获取验证码"
            ></yd-sendcode>
          </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="新密码">
          <yd-cell-item>
            <yd-input slot="right" type="password" v-model="input1" placeholder="请输入新密码"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <yd-input slot="right" type="password" v-model="input2" placeholder="请再次输入新密码"></yd-input>
          </yd-cell-item>
        </yd-cell-group>
        <div class="account-btn">
          <yd-button size="large" @click.native="upPass"  bgcolor="#8D66FA" color="#FFF" >确认密码</yd-button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </transition>
</template>

<script type="text/ecmascript-6">
import api from "@/api/resource.js";
export default {
  components: {},
  data() {
    return {
      start1: false,
      input1: "", //新密码
      input2: "", //重复密码
      type: this.$route.params.type, // 1第一次添加密码， 其他为修改密码
      phone: "", // 手机号码
      captcha: "" // 验证码
    };
  },
  mounted() {},
  methods: {
    back(event) {
      this.$router.back(); // 返回上一级
    },
    sendCode1() {
      let telephone = this.phone;
      // 获取手机验证码 开始
      api
        .getVCode(this, {
          params: {
            telephone: telephone
          }
        })
        .then(res => {
          let cookie = res.body.cookie;
          this.$cookies.set(cookie.name, cookie.value, cookie.maxAge);
          setTimeout(() => {
            this.start1 = true;
            this.$dialog.loading.close();
            this.$dialog.toast({
              mes: "已发送",
              icon: "success",
              timeout: 1500
            });
          }, 1000);
        })
        .catch(err => {
          this.$dialog.loading.close();
        });
      // 获取手机验证码 结束
    },
    // 修改密码
    upPass() {
      if (this.type == 1) {
        // 第一次登录设置密码
        let input1 = this.input1;
        let input2 = this.input2;
        if (!input1) {
          this.$dialog.toast({
            mes: "密码不能为空",
            icon: "error",
            timeout: 1500
          });
          return;
        }
        if (input1.length < 6 || input1.length > 16) {
          this.$dialog.toast({
            mes: "密码长度为6~16位",
            icon: "error",
            timeout: 1500
          });
          return;
        }
        if (!input2) {
          this.$dialog.toast({
            mes: "请再次输入密码",
            icon: "error",
            timeout: 1500
          });
          return;
        }
        if (input2 != input1) {
          this.$dialog.toast({
            mes: "两次输入密码不一致",
            icon: "error",
            timeout: 1500
          });
          return;
        }
        let userInfo = localStorage.getItem("access_token");
        userInfo = JSON.parse(userInfo);
        userInfo.password = input1;
        this.$dialog.loading.open("添加中...");
        api
          .updateSysUserPass(this, {
            id: userInfo.id,
            password: userInfo.password
          })
          .then(res => {
            let val = res.body;
            if (val.code == "200") {
              localStorage.setItem("access_token", JSON.stringify(val.userInfo));
              this.$router.push({
                name: `chat`,
                params:{
                  refresh: true
                }
              });
            }else{
              this.$dialog.toast({
                mes: val.msg,
                icon: "error",
                timeout: 1500
              });
            }
           this.$dialog.loading.close();
          })
          .catch(err => {
            this.$dialog.loading.close();
          });
      } else {
        // 修改密码
        let phone = this.phone;
        let captcha = this.captcha;
        let input1 = this.input1;
        let input2 = this.input2;
        if (!phone || !/^1[34578]\d{9}$/.test(phone)) {
          this.$dialog.toast({
            mes: "手机号码有误，请重填",
            icon: "error",
            timeout: 1500
          });
          return false;
        }
        let kaptcha = this.$cookies.get("KAPTCHA_SESSION_KEY");
        if (
          !captcha ||
          !kaptcha ||
          !/^\d{6}$/.test(captcha) ||
          kaptcha != captcha
        ) {
          this.$dialog.toast({
            mes: "短信验证码有误，请重填",
            icon: "error",
            timeout: 1500
          });
          return false;
        }
        if (!input1) {
          this.$dialog.toast({
            mes: "密码不能为空",
            icon: "error",
            timeout: 1500
          });
          return;
        }
        if (input1.length < 6 || input1.length > 16) {
          this.$dialog.toast({
            mes: "密码长度为6~16位",
            icon: "error",
            timeout: 1500
          });
          return;
        }
        if (!input2) {
          this.$dialog.toast({
            mes: "请再次输入密码",
            icon: "error",
            timeout: 1500
          });
          return;
        }
        if (input2 != input1) {
          this.$dialog.toast({
            mes: "两次输入密码不一致",
            icon: "error",
            timeout: 1500
          });
          return;
        }
        let userInfo = localStorage.getItem("access_token");
        userInfo = JSON.parse(userInfo);
        userInfo.password = input1;
        this.$dialog.loading.open("添加中...");
        api
          .modifySysUserPass(this, {
            id: userInfo.id,
            password: input1,
            captcha: captcha,
            kaptcha: kaptcha
          })
          .then(res => {
            let val = res.body;
            if (val.code == "200") {
              localStorage.setItem("access_token", JSON.stringify(val.userInfo));
              this.$router.push({
                path: `/chat`
              });
            }else{
              this.$dialog.toast({
                mes: val.msg,
                icon: "error",
                timeout: 1500
              });
            }
            this.$dialog.loading.close();
          })
          .catch(err => {
            console.log(JSON.stringify(err));
            this.$dialog.loading.close();
          });
      }
    }
  }
};
</script>

<style>
.account {
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
.account-btn {
  width: 85%;
  margin: auto;
}
</style>
