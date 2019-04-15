<template>
    <div class="layout">
    <!-- <div class="content"> -->
        <img src="http://static.zxart.cn/UploadFiles/image/20140527/20140527160142_1120.jpg" alt="">
    <!-- </div> -->
    <div class="sider">
      <Form ref="formInline" class="form" :model="formInline" :rules="ruleInline">
          <h1>管理账号登陆</h1>
        <FormItem prop="username">
            <Input type="text" placeholder="用户名" v-model="formInline.username">
               <Icon type="md-contact" slot="prepend" size="15"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
              <Input type="password" placeholder="密码" v-model="formInline.password">
                <Icon type="md-lock" slot="prepend" size="15"></Icon>   
              </Input>
        </FormItem>
        <FormItem prop="captcha" >
            <Layout class="captcha">
                <Input class="uuidInput" type="text" placeholder="验证码" v-model="formInline.captcha">
                <Icon type="md-image" slot="prepend" size="15"></Icon>             
              </Input>
              <img  class="uuidImg" @click="updateUuid" :src="'/proxyapi/captcha.jpg?uuid='+formInline.uuid" alt="">
            </Layout>
             
        </FormItem>
         <FormItem>
             <Button class="btn" type="primary" @click="handleSubmit" :loading="loading">登录</Button>
        </FormItem>       
      </Form>
    </div>
    </div>
</template>

<script>
import uuid from "uuid";
import http from "@/utils/http.js";
export default {
  //监控按键，触发onkeydown事件
  created() {
    document.addEventListener("keydown", this.onkeydown);
  },
  //跳转页面后，销毁回车键事件监听
  destroyed() {
    document.removeEventListener("keydown", this.onkeydown);
  },
  data() {
    return {
      //表单
      formInline: {
        username: "",
        password: "",
        captcha: "",
        uuid: uuid()
      },
      ruleInline: {
        //用户名验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { type: "string", min: 3, message: "用户名长度不能少于3位", trigger: "blur" }
        ],
        //密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {type: "string", min: 5,message: "密码长度不能少于5位", trigger: "blur"}
        ],
        //验证码验证
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { type: "string", min: 5, message: "验证码不能为空", trigger: "blur" }
        ]
      },
      //按钮加载中状态
      loading: false
    };
  },
  methods: {
    //回车键触发登录
    onkeydown() {    
      if (event.keyCode === 13) {
        this.handleSubmit();
      }
    },
    //点击验证码图片，自动更新
    updateUuid() {
      this.formInline.uuid = uuid();
    },
    //点击登陆，发送请求
    async handleSubmit() {
        const valid = this.$refs['formInline'].validate();
       if(valid){
      this.loading = true;
      const result = await http.post("/sys/login", this.formInline);
      const { code, msg,token } = result.data;
      if (code === 0) {
        //登录成功，跳转页面  
         localStorage.setItem('token',token)     
        this.$router.push("/home");
        
      } else {
        //登录失败，发出提醒
        this.$Notice.error({
          title: "登录失败",
          desc: msg
        });
        //登录失败，验证码自动更新
        this.formInline.uuid = uuid();
        this.formInline = {
          username: "",
          password: "",
          captcha: "",
          uuid:uuid()
        };
      }
      this.loading = false;
    
    
    }
    }
  }
};
</script>

<style scoped lang="less">
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
}
.layout {
  height: 100%;
  display: flex;
  /* banner样式 */
  img {
    width: 75%;
    height: 100%;
  }
  /* 侧边栏 */
  .sider {
    width: 25%;
    height: 100%;
  }
}

/* 侧边栏表格 */
.layout .sider .form {
  padding: 6px;
  //   background: #ddd;
  margin-top: 100px;
  .ivu-form-item {
    margin: 26px 4px;
  }
  /* 侧边栏表格验证码，图片样式 */
  .captcha {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .uuidInput {
      width: 45%;
    }
    // 验证码图片
    .uuidImg {
      width: 45%;
      height: 36px;
    }
  }
  // 登录按钮
  .btn {
    width: 100%;
    height: 36px;
  }
}
</style>