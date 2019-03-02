// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//1.导入路由
import router from './router'
//路由前置守卫   相当于小区门口保安询问进入车辆
//一般应用于权限登录
router.beforeEach((to,from,next)=>{
/**to 到哪个路由去  from 从哪个路由来  next 要不要放行*/
 //console.log(to,from)
//是否需要验证登录
if(to.meta.auth_login){
  //验证登录
  //假如有此用户，放行
  //localStorage.setItem('yanshuo') 注册用户(可在浏览器后台注册)
  if(localStorage.getItem('yanshuo')){
    next()
  }else{
    //跳转到登录界面
    //router.push('/login') 
    next('/login')

  }
}else{
  next()
}
 
 
})

import myPlugin from './myPlugin'

//自做插件库
Vue.use(myPlugin,{a:'aaa'})
/*
//Vue插件库原理
//判断是不是数组方法：Array.isArray()
Vue.useing = function(plugin,...args){
  if(typeof plugin === 'object' && !Array.isArray(plugin)){
    if(typeof plugin.install === 'function'){
      if(args.length>0){
        return plugin.install(Vue,...args)
      }
      return plugin.install(Vue)
    }
  }else{
    throw new TypeError('Invalid plugin')
  }
}
Vue.useing(myPlugin)

*/

//  导入element插件
import elementUI from 'element-ui'
//elementUI: vue的插件
//由于element和iview的css文件是单独写的，所以需要导入
import 'element-ui/lib/theme-chalk/index.css'
//use方法用于注册插件
Vue.use(elementUI)


/*
//导入iview插件
import iView from 'iview';
//导入iview css文件
import 'iview/dist/styles/iview.css'
Vue.use(iView)
*/



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //2.注册路由 router:router
  router,
  components: { App },
  template: '<App/>'
})


//Promise构造函数 处理异步,解决嵌套
const p = new Promise((resolve,reject) =>{
  setTimeout(() =>{
    resolve('p') //调用的是then里面的方法
   reject()      //报告错误 调用的是catch里面的方法
  },100)
})

/*
p.then(res =>{
   console.log('aaa'+res);
   
})
p.catch(err =>{
console.log(err);
})

  相当于
  resolve(a) = p.then((a)=>{console.log(a)})
  reject(b) = p.catch((b) =>{}) 
 */

 //es6语法 await 自动把p.then()里面的结果取出来，放到a里面去
 //await 解决异步和嵌套
 //必须写到async函数里面去，等待的意思，必须等异步执行完再执行（有顺序的异步）
 
 async function test(){
   //内部变成同步 解决Promise嵌套
   const a = await p 
   console.log(1);
   console.log(a);
   console.log(2);
 }
 console.log(4);
 test()


