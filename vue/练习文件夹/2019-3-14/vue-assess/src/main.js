// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//权限登录
router.beforeEach((to,from,next) =>{
   if(to.meta.authLogin){
     if(localStorage.getItem('token')){
       next()
     }else{
       next('/')
     }
   }else{
     next()
   }
})
import store from './store'

import iview from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iview)

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, 
  components: { App},
  template: '<App/>'
})
