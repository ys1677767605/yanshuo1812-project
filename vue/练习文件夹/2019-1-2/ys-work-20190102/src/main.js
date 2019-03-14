//import "./assets/less/index.less"

import Vue from 'vue'
import App from './App'
//导入路由router
import router from './router'
//导入vuex
import store from './store'
 
 
  


//导入iview ui库
import iView from 'iview'
//导入iview css
import 'iview/dist/styles/iview.css'
Vue.use(iView)






Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  //注册路由
  router,
  store,
  template: '<App/>'
})
