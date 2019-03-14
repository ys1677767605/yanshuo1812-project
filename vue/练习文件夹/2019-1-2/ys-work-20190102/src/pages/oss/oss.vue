<template>
     <div class="menu-page">
          <button @click="aaa">按钮</button>
          
          <Treeitem v-for="item in vuexlist" :key="item.menuId" :Treeitemdata="item" />

     </div>
 </template>

 <script>
import { mapGetters } from "vuex";
import Treeitem from "./Treeitem";
export default {
  methods:{
    aaa(){
        this.vuexlist.forEach(e => {
            console.log(e.name);
        });
    }
  },
  computed: {
    ...mapGetters(["vuexlist"])
  },
  components: {
    Treeitem 
  }
};
</script>

<style scoped>
.menu-page {
  padding: 15px;
  margin: 15px;

  background: #fff;
  box-sizing: border-box;
}
</style>