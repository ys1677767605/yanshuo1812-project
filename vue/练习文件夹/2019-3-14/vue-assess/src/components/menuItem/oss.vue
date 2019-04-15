<template>
    <div>
<h3>自定义指令练习</h3>
<button @click="btn">自定义按钮</button>
<!-- <input type="text"> -->
<input type="text" v-listener.number="value">
{{value}}
<!-- <button v-listener:click.stop="handle">盒子</button> -->
    </div>
</template>

<script>
export default {
    data(){
      return {
          value:0
      }
    },
  methods: {
      btn(){
          this.value++;
      },
    handle() {
      console.log(1);
    }
  },
  
  directives: {
    listener: {
      bind(el, binding, vnode, oldVnode){
        // console.log('bind',el.value)
        el.value = binding.value
      },
      inserted(el, binding, vnode, oldVnode){
          console.log(binding.value)
        // if(binding.modifiers.number){
        //     console.log(binding.value);
        // }
        el.addEventListener('input',() =>{
           vnode.context[binding.expression] = el.value;          
        })
      },
      update(el, binding, vnode, oldVnode){
        el.value = binding.value;
        //  console.log('update',binding.value)
      }     
               
    }
  }
};
</script>

<style scoped>
</style>