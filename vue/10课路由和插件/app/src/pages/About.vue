<template>
    <div class="about">
<Transfer />
<slider />
<!-- <button @click="$router.back()">跳转到首页</button> -->
<button @click="go">跳转到新闻2</button>
    </div>
</template>

<script>
    export default {
        methods:{
            //$route 用来获取路由中的数据
            //$router 用来处理路由跳转
            /**
             * 1.push 跳转到指定页面
             * 2.replace 替换上一条访问记录，跳转至指定页面
             * 3.back 返回
             */
            go(){              
               //this.$router.back()

               //通过路由的路径path跳转页面
               //this.$router.push('/news/002')               
            //    this.$router.push({
            //        path:'/news/002',
            //        query:{name:'haha'}
            //    })
               //通过路由名称来跳转
               this.$router.push({
                    name:'newsDetail',
                    params:{
                        id:'002'
                    },
                    //跳转的时候可以设置查询字符串参数
                    query:{
                        data:'haha'
                    }
               })
            }
           
        }
    }
</script>

<style scoped>
button{
    margin-top: 10px;
}

</style>