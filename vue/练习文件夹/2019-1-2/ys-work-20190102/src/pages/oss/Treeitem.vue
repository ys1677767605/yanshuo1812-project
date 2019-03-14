<template>
<div class="tree-item">
  <div class="tree-item-info">
      <Icon type="md-arrow-forward" />
      <Icon type="ios-folder" />
    <span>
        {{Treeitemdata.name}}
    </span>
  </div>

    <div class="tree-item-children">
        <Treeitem v-for="item in Treeitemdata.children" :key="item.menuId" :Treeitemdata="item"/>
    </div> 
      </div>
</template>

<script>
export default {
  name: "Treeitem", //递归组件：给组建加名称，就可以在组建内部调用自己
  props: {
    Treeitemdata: Object
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
}
.tree-item-info:hover {
  background: #ddd;
  /* 鼠标形状为手指 */
  cursor: pointer;
}
</style>