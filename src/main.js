import Vue from 'vue'
import MintUI from 'mint-ui'
// import YDUI from 'vue-ydui' /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import store from './store'
import YDUI from 'vue-ydui'
import VueLazyLoad from 'vue-lazyload'
import VueResource from 'vue-resource'
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell'
import {NavBar, NavBarBackIcon, NavBarNextIcon} from 'vue-ydui/dist/lib.rem/navbar'
import {Icons} from 'vue-ydui/dist/lib.rem/icons'
import {Layout} from 'vue-ydui/dist/lib.rem/layout'
import {Search} from 'vue-ydui/dist/lib.rem/search'
import {KeyBoard} from 'vue-ydui/dist/lib.rem/keyboard'
import {Dialog, Upload} from 'element-ui'
// import {Upload} from 'element-ui'
import './common/style.css' // 这里需要引入基本的样式
import './common/fonts/iconfont.css'
import 'vue-ydui/dist/ydui.base.css'
import 'vue-ydui/dist/ydui.rem.css'

// /* eslint-disable no-unused-vars */  // 这一句必须写，用来规避ES6的语法检测
// import vConsole from 'vconsole'  // 针对手机网页的前端 console 调试面板
// console.log('test')

Vue.use(MintUI)

Vue.use(VueLazyLoad, {
  loading: require('./assets/lazy.png')
})

Vue.use(VueResource)

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
// Vue.use(Upload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
