import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import news from '@/pages/news'
import Newsdetail from '@/pages/NewsDetail'
Vue.use(VueRouter)

export default new VueRouter({
   mode:'hash',
   routes:[
       {
           path:'/',
           component:Home
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









































































