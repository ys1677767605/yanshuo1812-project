<template>
    <Layout>
    <Content class="content"></Content>
    <Sider class="sider" width="350">
        <Layout class="form">
        <Form :model="form" :rules="formRules" ref="form">
       <h2>管理系统登录</h2>
       <!--  prop="username" 出现错误指示在哪里-->
       <FormItem prop="username">
            <Input v-model="form.username" prefix="ios-contact" type="text" size="large" placeholder="请输入姓名" clearable/>
       </FormItem>
       <FormItem prop="password">
           <Input v-model="form.password" prefix="md-lock" type="password" size="large" placeholder="请输入密码" clearable/>
       </FormItem>
       <FormItem prop="captcha">   
           <Layout class="captcha">
                <Input v-model="form.captcha" class="photoInput" prefix="md-photos" type="text" size="large" placeholder="请输入验证码" clearable/>
                <img @click="resetuid" :src="'/proxyapi/captcha.jpg?uuid='+form.uuid" alt="">
           </Layout>       
           
       </FormItem>
       <FormItem>
            <Button :loading="loading" type="primary" long @click="login">登录</Button>
       </FormItem>
  
        </Form>
        </Layout>
       
      
    </Sider>
   
    </Layout>
</template>

<script>
//iview spin加载组件（转的小圈圈）
import http from "@/utils/http";
import uuid from "uuid";
export default {
    data(){
        return {
            form:{
                username:'',
                password:'',
                captcha:'',
                uuid:uuid()
            },
            //Button组件 loading参数 加载状态 可以杜绝多次点击
            loading:false,
            formRules:{
                username:[//required:必须验证  trigger:什么时候触发
                    {required:true,message:'账号必须',trigger:'blur'},
                    {max:10,min:3,message:'长度必须3-10位',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码必须',trigger:'blur'},
                    {max:10,min:3,message:'长度必须3-10位',trigger:'blur'}
                ],
                captcha:[
                    {required:true,message:'验证必须',trigger:'blur'},
                    {max:5,min:5,message:'验证码必须5位',trigger:'blur'}
                ]
            }
        }
    },
    //创建组件的时候添加回车键登录事件
    created(){
      document.addEventListener('keydown',this.onKeydown)
    },
    //跳转页面后，组件销毁，但回车键事件还在
    //销毁回车键事件监听
    destroyed() {
        document.removeEventListener('keydown',this.onKeydown)
    },
    methods:{
        onKeydown(e){
        //判断是不是回车键
          if(e.keyCode === 13){
              this.login()
          }
      
        },
        resetuid(){
            this.form.uuid = uuid();
        },
        async login(){
            //验证表单数据是否为空          
            const valid = this.$refs['form'].validate();
            if(valid){
              this.loading = true;
              const result = await http.post('/sys/login',this.form)
             // console.log(result.data);
              const {code,msg,token} = result.data;
              //console.log("token",token);
             if(code === 500){
               //iview组件 里提供了 Notice通知提醒
               this.$Notice.error({
                   title:'错误',
                   desc:msg
               })
               this.form.uuid = uuid()
             }else if(code === 0){
                 //把token存起来，否则跳转不了页面                
                 localStorage.setItem('token',token)
                 this.$router.push('/home')
           
             }
              this.loading = false;
            }
           
        }
    }

};
</script>

<style scoped>
/* @import "../assets/less/index.less"; */
.sider{
    background: #fff;
    border-left: 1px solid #ddd;
}
.content{
    background: #ddd;
}
.sider .form{
    padding: 20px;
    height: 100%;
    
    justify-content: center;
}
.sider .form h2{
    margin-bottom: 10px;
}
.sider .form .captcha{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.sider .form .captcha .photoInput{
    width: 45%;
    
}
.sider .form .captcha img{
     width: 45%;
     height: 100%;
}
.sider button {
  margin: 5px 0;
}














</style>