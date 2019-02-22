//import './assets/index.css'
//import './assets/index.less'
import Vue from 'vue'

//局部组件
import App from './App.vue'
console.log(App);

new Vue({
    el:'#app',
    components:{ App},
    template:'<App />'   
})