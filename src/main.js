import Vue from 'vue'
import './common/style.css' // 这里需要引入基本的样式
import './common/fonts/iconfont.css'
import 'vue-ydui/dist/ydui.base.css'
import 'vue-ydui/dist/ydui.rem.css'
import MintUI from 'mint-ui'
// import YDUI from 'vue-ydui' /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'mint-ui/lib/style.css'
import App from './App'
import store from './store'
import YDUI from 'vue-ydui'
import VueLazyLoad from 'vue-lazyload'
import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import { CellGroup, CellItem } from 'vue-ydui/dist/lib.rem/cell'
import { NavBar, NavBarBackIcon, NavBarNextIcon } from 'vue-ydui/dist/lib.rem/navbar'
import { Icons } from 'vue-ydui/dist/lib.rem/icons'
import { Layout } from 'vue-ydui/dist/lib.rem/layout'
import { Search } from 'vue-ydui/dist/lib.rem/search'
import { KeyBoard } from 'vue-ydui/dist/lib.rem/keyboard'
import { Dialog, Upload } from 'element-ui'
import { SendCode } from 'vue-ydui/dist/lib.rem/sendcode'
import { Popup } from 'vue-ydui/dist/lib.rem/popup'
import { CitySelect } from 'vue-ydui/dist/lib.rem/cityselect'
// import {Upload} from 'element-ui'
import router from './router'
// /* eslint-disable no-unused-vars */  // 这一句必须写，用来规避ES6的语法检测
// import vConsole from 'vconsole'  // 针对手机网页的前端 console 调试面板
// console.log('test')

Vue.use(MintUI)

Vue.use(VueLazyLoad, {
  loading: require('./assets/lazy.png')
})

Vue.use(VueResource)
Vue.use(VueCookies)

Vue.config.productionTip = false
Vue.component(NavBar.name, NavBar)
Vue.component(NavBarBackIcon.name, NavBarBackIcon)
Vue.component(NavBarNextIcon.name, NavBarNextIcon)
Vue.component(Icons.name, Icons)
Vue.component(Layout.name, Layout)
Vue.component(Search.name, Search)
Vue.component(CellGroup.name, CellGroup)
Vue.component(CellItem.name, CellItem)
Vue.component(KeyBoard.name, KeyBoard)
Vue.use(YDUI)
Vue.use(Dialog, Upload)
Vue.component(SendCode.name, SendCode)
Vue.component(Popup.name, Popup)
Vue.component(CitySelect.name, CitySelect)
// Vue.use(Upload)
/* eslint-disable no-new */










router.beforeEach((to, from, next) => {
  //if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  if (localStorage.getItem('access_token')) {
    //判断本地是否存在access_token
    next();
  } else {
    if (to.path === '/login') {
      next();
    } else {
      next({
        path: `/login`
      })
    }
  }
  //如果本地 存在 token 则 不允许直接跳转到 登录页面
  if (to.fullPath == `/login`) {
    if (localStorage.getItem('access_token')) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});


Vue.http.options.emulateJSON = true
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.crossOrigin = true
Vue.http.options.emulateHTTP = true

new Vue({
  el: '#app',
  data: function () {
    return {
      $webSocket: null // 全局声明webSocket
    }
  },
  router,
  store,
  render: h => h(App)
})
