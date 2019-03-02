<template>
    <div>
用户：{{id}}的内容部分
    </div>
</template>

<script>
    export default {
        data(){
            return {
                 id:''
            }
        },
        
       
        created(){
            console.log(this.$route.params.id);
            this.id = this.$route.params.id;
        },
        // computed:{
        //    id(){
        //        return this.$route.params.id;
        //    }
        // }
         
        watch:{
            $route(to,form){
               console.log(to.params.id);
               this.id = to.params.id
            }
        }

    }
</script>

<style scoped>

</style>