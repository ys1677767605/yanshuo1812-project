// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//导入路由
import router from './router'
//导入ui库 element-ui iview
import elementUI from 'element-ui'
import iView from 'iview';
//导入element-css iview-css
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
//注册插件
Vue.use(elementUI)
 Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template:  '<App />'
})
