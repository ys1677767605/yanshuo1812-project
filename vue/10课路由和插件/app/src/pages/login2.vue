<template>
    <div>
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
        //请求方式第二种
        
        async login(){
         const datas = await axios({
            method:'post',
            url:'/proxyapi/sys/login',
            data:this.form
         })
         console.log("login2请求：");
         console.log(datas)
        }
       

        }



    }
</script>

<style scoped>

</style>
