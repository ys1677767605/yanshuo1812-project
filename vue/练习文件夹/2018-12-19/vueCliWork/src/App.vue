<template>
  <div id="app">
  
    <!-- <img src="./assets/logo.png"> -->
    <HelloWorld ref="slider"/>
    
     <Slider />   
     <Transfer /> 
   
  </div>
</template>

<script>

import HelloWorld from './components/HelloWorld'
import Transfer from './components/transfer'
import Slider from './components/test'

export default {
  name: 'App',
 
  components: {
    HelloWorld,
    Slider,
    Transfer
  },
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.slider{
  margin: 20px;
}


</style>
