import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/pages/Login'
import home from '@/pages/Home'

import user from '@/pages/sys/user'
console.log(user)
import config from '@/pages/sys/config'
import log from '@/pages/sys/log'
import menu from '@/pages/sys/menu'
import role from '@/pages/sys/role'
import test from '@/pages/sys/test'

import oss from '@/pages/oss/oss'
import schedule from '@/pages/job/schedule'

Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes:[
      {
          path:'/login',
          component:login, 
         
              
      },
      
      {
        path:'/home',
        component:home,
        meta:{
          authLogin:true
        } ,
        children:[
          {
            path:'/home/oss/oss',   
            component:oss,
          },
          {
            path:'/home/job/schedule',
            component:schedule,
          },
          {
            path:'/home/sys/user',
            component:user
          },
          {
            path:'/home/sys/test',
            component:test
          },
          {
            path:'/home/sys/role',
            component:role
          },
          {
            path:'/home/sys/menu',
            component:menu
          },
          {
            path:'/home/sys/log',
            component:log
          },
          {
            path:'/home/sys/config',
            component:config
          }

        ]
      }

    ]
})









