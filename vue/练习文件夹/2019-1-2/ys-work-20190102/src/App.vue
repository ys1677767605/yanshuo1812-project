<template>
  <div id="app">
     
     <router-view></router-view>
  </div>
</template>

<script>
   export default {
       name:"App"
   }
</script>

<style>

html,body,#app{
   width: auto;
   height: 100%;
   background:#ccc;
   margin: 0;
   
}
#app{
    display: flex;
}
</style>
