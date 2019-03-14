<template>
    <div class="tree">
        <!-- 第一个data是从schedule传过来的vuelist数组 -->
        <!-- 第二个data是将item值传给Treeitem组件 -->
        <TreeItem v-for="item in Treedata" :key="item.menuId" :Treeitemdata="item" />
    </div>
</template>

<script>
import TreeItem from './Treeitem'
    export default {
        props:{
           Treedata:Array
        },
        components:{
            TreeItem
        }
    }
</script>

<style scoped>
.tree{
    width: 100%;
    height: auto;

}
</style>