<template>
<div class="tree-item">
  <div class="tree-item-info" @click="expand">
      <Icon type="ios-arrow-forward" :class="{
        rotateExpand:Treeitemdata.expand && (Treeitemdata.type === 1||Treeitemdata.type ===0)
       } "/>
      <Icon v-if="Treeitemdata.type === 0" type="ios-folder" />
    <Icon v-if="Treeitemdata.type === 1" type="ios-document" />
    <Icon v-if="Treeitemdata.type === 2" type="md-bug" />
    <span>
        {{Treeitemdata.name}}
    </span>
  </div>

    <div class="tree-item-children" v-show="Treeitemdata.expand">
        <Treeitem v-for="item in Treeitemdata.children" :key="item.menuId" :Treeitemdata="item"/>
    </div> 
      </div>
</template>

<script>
export default {
  name: "Treeitem", //递归组件：给组建加名称，就可以在组建内部调用自己
  props: {
    Treeitemdata: Object,

  },
  methods:{
    expand(){
      //第一种方法
     // this.$set(this.Treeitemdata,'expand',!this.Treeitemdata.expand)//给参数里面的对象加入响应式数据
      //第二种方法  在store/index.js deep函数里面加入 k.expand = false
      this.Treeitemdata.expand = !this.Treeitemdata.expand
    }
  }
};
</script>

<style scoped>
.tree-item {
  height: auto;
  padding-left: 25px;
}
.tree-item-info{
height: 30px;
background: #fff;
 /* 点击时无选中状态 */
user-select: none;
}
.tree-item-info:hover {
  background: #ddd;
  /* 鼠标形状为手指 */
  cursor: pointer;
}
.rotateExpand{
  transition: .2s;
  transform: rotate(90deg);
}
</style>