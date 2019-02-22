
<template>
<!-- //输入 vb 显示提示 -->
<div>

 <button @click="$alert" >我是App标题</button>
 获取焦点指令： <input v-focus />
<br />

  <input v-sync.number="value" />
  <!-- input事件没有默认事件 -->
  <input v-model.number="value" v-listener:input.prevent="handler"/>

  <div v-listener:mouseover.stop="handler">盒子</div>
 <Test />
 <aaa/>
  <button v-test:click="aaa">局部指令</button>

<br/>
<br/>
  过滤器1：{{value | currency('$')}}  <br/>
过滤器(转换大写,去掉数字)：{{name | Uppercase | filterNum |CamelCase}}<br/>
局部过滤器：{{user| lowercase}}

</div>
  
</template>
<script>
import Test from "./components/Tests.vue";
import aaa from "./components/aaa.vue";
//@ 代表src目录
import common from "@/mixins/common.js";
//import {common} from './mixins/common.js';
export default {
  mixins: [common],
  components: {
    Test,
    aaa
  },
  data() {
    return {
      value: 100,
      name:'yanshuo111',
      user:'LiSiAa'

    };
  },
  methods: {
    handler() {
      console.log(1);
    },
     aaa(el) {
          console.log(`局部指令aaa`);
        }
  },
  filters:{//局部过滤器
     lowercase(val){
        return val.toLowerCase();
     }
    //  lowercase:(val)=>{
    //       return val.toLowerCase();
    //  }
  },
  directives: {
    //局部指令
    test: {
      bind(el, binding, vnode, oldVnode) {
          console.log('局部指令');
        console.log(binding);
       el.addEventListener(binding.arg,binding.value)
      },
      
    }
  },
  beforeCreate() {
    console.log("app的生命周期beforeCreate");
  },
  mounted() {
    console.log("app的生命周期:mounted");
  }
};
</script>
// 引入less文件，需要给style标签添加 lang="less"
<style scoped>
h1 {
  background: rgb(123, 172, 159);
}
</style>
