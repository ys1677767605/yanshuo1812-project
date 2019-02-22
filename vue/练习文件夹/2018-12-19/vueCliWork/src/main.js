// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
//   data: {
//     users: [
//         {
//             name: '选项1',
//             checked: false
//         },
//         {
//             name: '选项2',
//             checked: false
//         },
//         {
//             name: '选项3',
//             checked: false
//         },
//         {
//             name: '选项4',
//             checked: false
//         },
//         {
//             name: '选项5',
//             checked: false
//         },
//         {
//             name: '选项6',
//             checked: false
//         },
//         {
//             name: '选项7',
//             checked: false
//         },
//         {
//             name: '选项8',
//             checked: false
//         },
//         {
//             name: '选项9',
//             checked: false
//         },
//         {
//             name: '选项10',
//             checked: false
//         },
//     ],
//     users1: []
// },
  components: { App },
  //:data1="this.users" :data2="this.users1"
  template:  '<App />'
})
