<template>
    <div :class="[prefix+'aaa']">
我是aaa.vue:{{prefix}}<br/>
{{bbb}}
<div @click="select">111</div><br/>
<slot name="before"/>按钮<slot name="after"/>
<slot></slot>


    </div>
</template>

<script>
export default {
  props: {
    bbb: String
  },
  methods: {
    select() {
      this.$emit("select", this.bbb);
    }
  }
};
</script>

<style scoped>
</style>