<template>
    <div>
<input type="text" v-model="form.username">
<input type="text" v-model="form.password">
<input type="text" v-model="form.captcha">
<input type="text" v-model="form.uuid">
<br/>
<button @click="login">登录</button>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data(){
            return {
                form:{
                    username:"string",
                    password:"string",
                    captcha:"string",//验证码
                    uuid:"string"
                }
            }
        },
        methods:{
        //请求方式第一种
        //下面方法可以简写成
        async login(){
            const data = await axios.post('http://localhost:8080/proxyapi/sys/login',this.form)
           
           console.log('login页面请求',data);
       }
       
       
        /*
          login(){
                    // .post('http://console.ranyunlong.com:8080/renren-fast/sys/login',this.form)           
            axios.post('http://localhost:8080/proxyapi/sys/login',this.form)
            也可以简写   axios.post('/proxyapi/sys/login',this.form)   
                  //then方法接收返回数据
                  .then((res) =>{
                      console.log(res);
                       })
                  //catch 捕获错误
                  .catch(err =>{
                      console.log(err);
                  })
             
             }
                                   
                      /*如果出现跨域问题：
                       * Failed to load http://console.ranyunlong.com:8080/renren-fast/sys/login: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8080' is therefore not allowed access.
                       *
                       * 解决办法：
                       *代理请求：利用nodejs服务器帮忙做请求，解决跨域
                       *（vue是webpack-dev-server启动的，
                       webpack-dev-server是express写的，
                       而express是nodejs写的,
                       请求可以交给localhost:8080服务器，
                       而localhost:8080又是webpack写的，
                       所以从webpack入手 地址：config文件->index.js  proxyTable{} 做代理配置
                       ）
                       * 
                       * 附：nodejs没有跨域问题,不会被任何一个服务器拒绝，因为有http.request()方法
                       */

       
        },
        
    }
</script>

<style scoped>

</style>
