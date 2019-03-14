<template>
  <div id="app">
    <header></header>
    <mu-date-picker></mu-date-picker>
   
  </div>
</template>

<script>
export default {
  name: 'App',
 
}
</script>

<style>
body{
  margin: 0;
}
#app {
  width: 100vw;
  height: 100vh;
}
#app header{
  height: 90px;
  background: red;
}
.demo-date-picker {
  margin: 8px;
}
</style>
