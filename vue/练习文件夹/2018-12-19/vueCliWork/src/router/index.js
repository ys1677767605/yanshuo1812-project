import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import login from '@/pages/login'
import news from '@/pages/news'
import Newsdetail from '@/pages/NewsDetail'
Vue.use(VueRouter)

export default new VueRouter({
   mode:'history',
   routes:[
       {
           path:'/',
           component:Home
       },
       {
        path:'/login',
        component:login
       },
       {
           path:'/news',
           component:news,
           children:[
               {
                  // path:'@pages/'+':id'+'.html',
                 path:':id',
                component:Newsdetail
               }
               
               
           ]
       }
   ]
})









































































