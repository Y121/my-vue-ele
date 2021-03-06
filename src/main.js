import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/css/iconfont/iconfont.css'//要带上.css后缀，否则字体图标不能正常显示
import './assets/css/common/common.css'
//import './utils/rem'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
