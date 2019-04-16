import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/components/Home')
const login = () => import('@/components/Login')
//导航栏菜单路由
const user = () => import('@/components/menuItem/user')
const role = () => import('@/components/menuItem/role')
const schedule = () => import('@/components/menuItem/schedule')
const menu = () => import('@/components/menuItem/menu')
const log = () => import('@/components/menuItem/log')
const config = () => import('@/components/menuItem/config')
const test = () => import('@/components/menuItem/test')
const oss = () => import('@/components/menuItem/oss')
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:login
    },
    {
      path: '/home',
      component:home,
      meta:{
         authLogin:true,
      },
      children:[
        {
          path:'/home/sys/user',
          component:user,
          meta:{
            authLogin:true,
         }
        },
        {
          path:'/home/sys/role',
          component:role,
          meta:{
            authLogin:true,
         }
        },
        {
          path:'/home/sys/menu',
          component:menu,
          meta:{
            authLogin:true,
         }
        },
       
        {
          path:'/home/sys/log',
          component:log,
          meta:{
            authLogin:true,
         }
        },
        {
          path:'/home/sys/test',
          component:test,
          meta:{
            authLogin:true,
         }
        },
        {
          path:'/home/sys/config',
          component:config,
          meta:{
            authLogin:true,
         }
        },
        {
          path:'/home/oss/oss',
          component:oss,
          meta:{
            authLogin:true,
         }
        },
        {
          path:'/home/job/schedule',
          component:schedule,
          meta:{
            authLogin:true,
         }
        }
      ]     
    }
    
   

  ]
})
