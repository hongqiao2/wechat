<template>
  <yd-layout>
    <div class="login-box">
      <h2 class="login-title">使用短信验证码登录</h2>
      <yd-cell-group>
        <yd-cell-item>
          <yd-input
            slot="right"
            v-model="input8"
            required
            :show-success-icon="false"
            :show-error-icon="false"
            regex="mobile"
            placeholder="请输入手机号码"
          ></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <input v-model="captcha" type="text" slot="right" placeholder="请输入验证码">
          <yd-sendcode
            slot="right"
            v-model="start1"
            @click.native="sendCode1"
            type="hollow"
            init-str="获取验证码"
          ></yd-sendcode>
        </yd-cell-item>
      </yd-cell-group>
      <div class="login-btn" @click="loginBtn">
        <yd-button type="primary" size="large">登录</yd-button>
      </div>
      <div class="login-btn">
        <p @click="goPwd">使用密码登录</p>
      </div>
      <div class="third-login">
        <p>第三方登录</p>
        <img src="../../assets/wechat.png">
        <div>
          <span>点击“登录”即表示已阅读并同意</span>
          <br>
          <router-link to="#">《用户使用协议》</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </yd-layout>
</template>
<script type="text/ecmascript-6">
import { Switch, MessageBox, Toast } from "mint-ui";
import { mapGetters } from "vuex";
import api from "@/api/resource.js";

export default {
  components: {
    Switchch: Switch, // switch为预留元素，这里换了个名字
    MessageBox,
    Toast
  },
  data() {
    return {
      input8: "", // 电话
      start1: false,
      aweixin: "", //微信登录
      captcha: "" // 验证码信息
    };
  },
  computed: {
    ...mapGetters(["info"])
  },
  mounted() {
    // 监听plusready事件
    document.addEventListener(
      "plusready",
      function() {
        // 扩展API加载完毕，现在可以正常调用扩展API
        plus.oauth.getServices(
          function(services) {
            this.aweixin = services["weixin"];
          },
          function(e) {
            this.$dialog.toast({
              mes: "获取分享服务列表失败",
              icon: "error",
              timeout: 1500
            });
          }
        );
      },
      false
    );
  },
  methods: {
    sendCode1() {
      let phone = this.input8;
      if (!phone || !/^1[34578]\d{9}$/.test(phone)) {
        this.$dialog.toast({
          mes: "手机号码有误，请重填",
          icon: "error",
          timeout: 1500
        });
        return false;
      }
      this.$dialog.loading.open("发送中...");

      // 获取手机验证码 开始
      api
        .getVCode(this, {
          params: {
            telephone: phone
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
    goPwd(info) {
      this.$router.push({
        path: `/login/pwd`
      });
    },
    wechatLogin() {
      //微信等三方登录  如果第一次登录 ，需要跳转到设置密码页面， 否则跳到首页
      // 授权操作
      if (!this.aweixin) {
        this.$dialog.toast({
          mes: "当前环境不支持微信登录",
          icon: "error",
          timeout: 1500
        });
        return;
      }
      aweixin.authorize(
        function(e) {
          console.log("授权成功：" + JSON.stringify(e));
          // 授权成功，调用登录接口
          let userInfo = JSON.stringify(e).userInfo;
          /*api.getLogin({
							params : {
								"loginType": 2,
								"openid": userInfo.openid,
								"nickname": userInfo.nickname,
								"sex": userInfo.sex,
								"country": userInfo.country,
								"province": userInfo.province,
								"headimgurl" :userInfo.headimgurl
							}
						})*/
        },
        function(e) {
          this.$dialog.toast({
            mes: "授权失败",
            icon: "error",
            timeout: 1500
          });
          console.log("授权失败：" + JSON.stringify(e));
        },
        {
          scope: "snsapi_userinfo",
          appid: "wx0411fa6a39d61297"
        }
      );
    },
    // 验证码登录方式
    loginBtn() {
      let phone = this.input8;
      let captcha = this.captcha;
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
        !/^\d{6}$/.test(captcha)
      ) {
        this.$dialog.toast({
          mes: "短信验证码有误，请重填",
          icon: "error",
          timeout: 1500
        });
        return false;
      }
      // 调用登录接口, 登录成功缓存用户的账户信息
      api
        .getLogin(this, {
          loginType: 1,
          captcha: captcha,
          iphone: phone,
          kaptcha
        })
        .then(res => {
          let val = res.body;
          //   access_token
          localStorage.setItem("access_token", JSON.stringify(val.userInfo));
          localStorage.setItem("user_privacy", JSON.stringify(val.sysPrivacy));
          if (val.firstTime) {
            // 第一次登录，跳转到设置密码的页面
            // TODO
            this.$router.push({
              path: `/me/set/account/accountpwd/${1}`
            });
          } else {
            this.$router.push({
              path: `/chat`
            });
          }
        })
        .catch(err => {
          console.log(JSON.stringify(err));
        });
    }
  }
};
</script>

<style scoped>
.login-box {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 200;
  background-color: #ffffff;
  padding: 1rem 0.4rem;
}

.login-title {
  font-size: 0.48rem;
  color: #4f4f4f;
  margin: 0.3rem 0.2rem 0.7rem;
}

.login-btn {
  width: 100%;
  text-align: center;
  margin-bottom: 0.2rem;
}

.login-btn p {
  font-size: 0.28rem;
}

.yd-input input {
  font-size: 0.32rem;
}

.third-login {
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0.6rem;
  margin: auto;
}

.third-login p {
  color: #a2a2a2;
}

.third-login img {
  width: 1.2rem;
  height: 1.2rem;
  margin: 0.2rem 0;
}

.login-btn a {
  font-size: 0.28rem;
}

.third-login a {
  color: #8d66fa !important;
}

.third-login p {
  font-size: 0.28rem;
}
</style>
