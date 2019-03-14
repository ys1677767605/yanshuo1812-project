import axios from 'axios'
import router from '@/router'
const http = axios.create({
    baseURL:'/proxyapi',
    headers:{        
    // token:localStorage.getItem('token')
    }
    
})

//请求拦截器
http.interceptors.request.use((options) =>{
 // console.log('请求拦截器',options.data)  
 
 options.headers['token'] = localStorage.getItem('token')
    return options
})

  
  

//响应拦截器
http.interceptors.response.use((options) =>{
    //console.log('响应拦截器',options)  
    //如果code ===401，token过期,localStorage里面的token应该清理掉
    if(options.data.code === 401){       
       router.replace('/login')
      localStorage.removeItem('token')
   }
    return options

})

export default http











