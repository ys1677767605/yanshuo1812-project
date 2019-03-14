import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/utils/http'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {//存储原始数据
        user: null,
        vuexlist:[]
    },
    getters: {//查询
        user(state) {
            return state.user
        },
        vuexlist(state){      
            return state.vuexlist
        }
    },
    mutations: {//修改  （state,参数）
        setUser(state, user) {
            state.user = user
        },
        setList(state,list){                 
            state.vuexlist = list          
        }
    },
    actions: {//提交mutations修改的  异步修改数据
        GET_USER_INFO(store) {
            console.log('正在发送请求');
            http.get('/sys/user/info').then(({ data }) => {
                const { code, user } = data;
                if (code === 0) {                 
                    store.commit('setUser', user)
                }
            })
        },
        GET_USER_LIST(store){
            console.log('正在发送请求获取列表');
            http.get('/sys/menu/list').then(({data}) =>{ 
                function deep(arr,parentId){                                   
                    if(!Array.isArray(arr)) return;
                    return arr.filter((k) =>{  
                        //parentId相同的对象归入到同一级数组
                        //父级的menuId是子级的parentId                    
                        if(k.parentId === parentId){
                            //k.children是一个数组
                            k.expand = false//Treeitem组件，展开功能
                            k.children = deep(arr,k.menuId)
                            return true
                        }
                    })                  
                 }     
                                                               
                     store.commit('setList',deep(data,0))
                    })      
                
              
               
        }
           
    }

    


})
/*
export default new Vuex.Store({
    state: {//存储原始数据  不要直接从这里改原始数据
        user: '张三',
        count: 100
    },
    getters: {//用来查询数据
        vuexuser(state) {
            //在getter里不能修改state，这里的state是存储数据state对象深拷贝的副本，他们不是同一对象
            return state.user
        },
        cc(state){
            return state.count
        }
    },
    mutations: {//用来同步修改数据   store.commit() 触发mutations修改的
        // setUser(state) {//这里的state和存储数据state对象诗同一对象
        //     state.user = '李斯'
        // }
        setUser(state,data){
            state.user = data
        },
        countCC(state){
          state.count++
        }
    },
    actions: {//提交mutations修改的  异步修改数据
    // store.dispatch() 触发 actions
      SET_USER(store,username){
        store.commit('setUser',username)
      }
    },
    modules: {//分模块

    }
})

*/







