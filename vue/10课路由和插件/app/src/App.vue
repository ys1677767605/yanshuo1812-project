<template>
  <div id="app"> 
    
  <!-- <i-button>Dashed</i-button>
 <Button shape="circle" icon="ios-search"></Button> -->

   <!-- <el-button size="mini" type="success">主要按钮</el-button> -->
 <!-- 哈哈
  <Testt />
  {{100 | currency('***')}} -->


 
<!--添加路由，上面的内容都需要注释
   router-view组件 ：路由容器，来展示路由的内容
（只要添加了vue-router就有router-view这个组件）

router-link 代替a标签的跳转
router-link 可以兼容hash和history模式
 -->

 <router-link to="/">首页</router-link>
<router-link to="/news">新闻</router-link>
<router-link to="/about">关于</router-link>
<router-link to="/pictureForEach">图片遍历</router-link><br/>
<router-link to="/login">登录</router-link>
<router-link to="/login2">登录2</router-link>
<router-link to="/login3">登录3</router-link>
<router-view></router-view> 


  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
   
   
  },
   
}
</script>

<style>
html,body{
  background: #ccc;
}

</style>
