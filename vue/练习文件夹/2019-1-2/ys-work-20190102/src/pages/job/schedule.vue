
 <template>
     <div class="menu-page">
         <!-- 将vuelist传给Tree组件里面的data -->
 <Tree :Treedata="vuexlist"/>
     </div>
 </template>

 <script>
import { mapGetters } from "vuex";
import Tree from "./Tree";
export default {
  computed: {
    ...mapGetters(["vuexlist"])
  },
  components: {
    Tree
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
