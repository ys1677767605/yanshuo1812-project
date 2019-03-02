<template>
    <div>
      图片遍历
      <!-- 动态渲染上去的图片，webpack不会解析成图片，所以显示不出来 -->
      <img :src="item" v-for="item in this.picture" :key="item" alt="">
   
   <img src="@/assets/logo.png" alt=""> 
       <!-- webpack会给路径做编译，如果是变量，不会做路径解析工作 -->
       
  
    
   </div>
</template>

<script>
    export default {
        data(){
            return {
                picture:[
                    //如果是本地图片，如果是绝对路径或相对路径，require()会做加载
                    require('@/assets/1.png'),                   
                    require('@/assets/3.png'),
                    require('@/assets/4.png')
                    
                ]
            }
        }
    }
</script>

<style scoped>

</style>