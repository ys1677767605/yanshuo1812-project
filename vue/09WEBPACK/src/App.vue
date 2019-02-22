<template>
    <div>
        <img src="@/assets/images/a-pot.png" />
        <i class="glyphicon glyphicon-envelope"></i>
      <h1>哈哈 我是App.vue</h1>
      <admin />
  
    </div>
</template>

<script>
import admin from './view/admin/index.vue'
    export default {
        components:{
            admin
        }
    }
</script>

<style scoped>

</style>