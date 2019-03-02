<template>
    <div>
<template>
    <div>
账号：<input type="text" v-model="form.username">
<br/>
<br/>
密码：<input type="text" v-model="form.password">
<br/>
<input type="text" v-model="form.captcha">
<!-- <input type="text" v-model="form.uuid"> -->
<!-- 将得到的唯一字符串复制粘贴到 http://console.ranyunlong.com:8080/renren-fast/swagger/index.html#/ 表格中，
点击“试一下”，就能得到图形验证码 -->
<img :src="'/proxyapi/captcha.jpg?uuid='+form.uuid" alt="">
<br/>
<button @click="login">登录</button>
    </div>
</template>
    </div>
</template>

<script>
//yarn add uuid 或 npm i uuid
import http from '@/utils/http';
import uuid from 'uuid';
    export default {
         data(){
            return {
                form:{
                    username:"string",
                    password:"string",
                    captcha:"string",//验证码
                    uuid:uuid() 
                }
            }
        },
        methods:{
         async login(){
             const data = await http.post('/sys/login',this.form,
            //  {
            //      headers:{
            //          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
            //      }
            //  }
             )
             
            console.log(data);
          }
        }
    }
</script>

<style scoped>

</style>