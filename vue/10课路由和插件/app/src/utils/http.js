import axios from 'axios'
import qs from 'qs'
//定制自己的axios,网址：https://www.npmjs.com/package/axios
const http = axios.create({
    baseURL:'/proxyapi',//基础路径
    //timeout:5000,     //超时时间
    headers:{    //自定义的headers
        token:localStorage.getItem("token"),       
        t:new Date().getTime()
    }
})

//表单数据格式类型  'Content-Type':"application/x-www-form-urlencoded;charset=utf-8",
//需要将数据转换成： "username=string&password=string&captcha=string&uuid=string"

//json对象类型     'Content-Type':"application/json;charset=UTF-8"
//"{"username":"string","password":"string"}"

//qs模块 :将请求得到的json对象转换成查询字符串 npm i qs

//请求拦截器 请求时拦截一次
http.interceptors.request.use((options) =>{
    //如果数据格式是表单类型，需将数据转换成查询字符串
    //console.log(options.headers['Content-Type']);
   if(options.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'){
    options.data = qs.stringify(options.data);   
    console.log('表单类型',options.data);
   }else{
    console.log('json类型:',options.data);
   }
    
    return options
})
//响应拦截器  收到的结果拦截一次
http.interceptors.response.use((response) =>{
    console.log('响应拦截器:',response);
    return response
})

export default http
//login3.vue有使用






