import axios from 'axios'
import router from '@/router'
const http = axios.create({
    baseURL:'/proxyapi',
})

//请求拦截器

http.interceptors.request.use((options) =>{
    options.headers['token'] = localStorage.getItem('token')
  // console.log('请求拦截器token',options.headers['token'])
    return options
})
//响应拦截器
http.interceptors.response.use((options) =>{
   // console.log('响应拦截器',options.data)   
    if(options.data.code === 401){       
        router.replace('/')
       localStorage.removeItem('token')
    }
    return options
})

export default http






