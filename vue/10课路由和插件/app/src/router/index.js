import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import About from '@/pages/About'
import notFound from '@/pages/NotFound'
import News from '@/pages/News'
import NewsDetail from '@/pages/NewsDetail'
import pictures from '@/pages/picture-forEach'

import login from '@/pages/Login'
import login2 from '@/pages/login2'
import login3 from '@/pages/login3'
Vue.use(VueRouter)

//通过new Vue-router 实例化一个路由对象
export default new VueRouter({
    //1.mode路由的模式，可选，默认为hash模式
    //hash模式: #/ 监测hash,单页面应用
    //单页面应用：访问一个地址的时候，不通过向后台发送请求，通过后台渲染；
    //而是拦截地址信息，不让页面跳转，通过前端js来渲染
    //history:历史记录模式，刷新页面
    mode: 'history',
    //2.routes 路由的规则
    routes: [
        {
            //匹配的路径
            path: '/',
            //指定一个组件
            component: Home,
           
        },
        {
            path: '/login',          
            component: login
        },
        {
            path: '/login2',          
            component: login2
        },
        {
            path: '/login3',          
            component: login3
        },
        {
            path: '/about',          
            component: About
        },
        {
            path: '/error.html',
            component: notFound
        },
        {
            path: '/pictureForEach',
            component: pictures,
            meta:{//路由的元数据  可以确定哪些路由是否需要登录
                //自定义 auth_login
                auth_login:true
            
            }
        },
       
        {
            path: '*',
            redirect: 'error.html'//重定向
        },
        {
            path: '/news',
            component: News,
            children: [
                //谁的子路由就在谁的组件里切换,在News.vue里写上router-view标签
                //动态路由：以冒号开始，可以写':id',也可以写':name' 
                {
                    path: ':id',
                    name:'newsDetail',
                    component: NewsDetail
                }
            ]

        },
        {
            path:'/goodslist',
            //显示商品列表
        },
        {
            path:':item',
           //显示商品详情
        }

    ]
})
