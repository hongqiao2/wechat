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
import { ActionSheet } from 'vue-ydui/dist/lib.rem/actionsheet'
import { InfiniteScroll } from 'vue-ydui/dist/lib.rem/infinitescroll'
import chineseTurn from "@/api/chineseTurnEnglish.js";
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
Vue.component(ActionSheet.name, ActionSheet)
Vue.component(InfiniteScroll.name, InfiniteScroll)
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

Vue.prototype.webSocketUrl = 'ws://192.168.1.168:8080/boot/socketServer/'// webSocket 请求地址

// 接收服务发来的消息
Vue.prototype.setOnMessage = function (e) {
  console.log(e.data);
  let _data = JSON.parse(e.data);
  let userinfo = JSON.parse(localStorage.getItem("access_token"));
  //1.判断是否是好友添加的信息，同意添加好友的信息， 是的话就更新聊天列表，以及新的朋友列表
  if(_data.isGroup == 3){ // 朋友圈通知
    return;
  }
  if(_data.isGroup == 2){ // 好友通知
    api
    .findNewFriend(this, {
      id: userinfo.id
    })
    .then(res => {
      let val = res.body;
      if (val.code == "200") {
        // 缓存10条最新的朋友消息，
        localStorage.setItem('addFriendList', JSON.stringify(val.list));
      }
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
    return;
  }
  if(_data.isGroup == 1 && groupId != 0){ // 群消息通知
    return;
  }
  if(_data.isGroup == 0){ // 好友消息通知，以及添加好友成功通知
    let _info = store.state.info;
    if(_info){ // 如果当前聊天界面不为空，判断是否是同一个好友发送的信息
      
    }
  }



  // // 聊天列表初始化，刷新
  // api
  //   .findSysChatList(this, {
  //     params: {
  //       id: userinfo.id
  //     }
  //   })
  //   .then(res => {
  //     let val = res.body;
  //     if (val.code == "200") {
  //       // 需要判断是否为添加朋友后的生成列表
  //       let userChatList = JSON.parse(val.userChatList);
  //       // 聊天列表缓存
  //       let chatList = JSON.parse(localStorage.getItem("chatListCache"));
  //       userChatList.foreach(function(item, index){
  //         chatList[item.chat_bject] = item;
  //       })
  //       localStorage.setItem(JSON.stringify(chatList))
  //     }
  //   })
  //   .catch(err => {
  //     onsole.log(err);
  //   });
    // store.commit('SET_INFO', {
    //   id: 10
    // })
  console.log(JSON.stringify(store.state))
}

// 连接异常
Vue.prototype.setErrorMessage = function (e) {
  console.log(e);
},
// 建立连接
Vue.prototype.setOnopenMessage = function (e) {
  console.info("已建立连接");
}


new Vue({
  el: '#app',
  data: function () {
    return {
      $webSocket: null, // 全局声明webSocket
    }
  },
  router,
  store,
  render: h => h(App)
})