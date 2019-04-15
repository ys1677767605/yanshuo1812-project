<template>
    <div class="role">
<treeItem :data="types" :firstMenu="item" v-for="item in menuList" :key="item.name"/>
    </div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";
import treeItem from "./treeItem";
import http from '@/utils/http'
export default {
  beforeCreate() {
    //获取list数据
    http.get("/sys/menu/list").then(({ data }) => {
      if (Array.isArray(data)) {
        this.menulist = data;
      }
    });
  },
  data() {
    return {
         menulist: [],
         types:0
    };
  },
  computed: {
       //获取导航菜单列表
    menuList() {
      function deep(arr, parentId) {
        if (!Array.isArray(arr)) return;
        return arr.filter(k => {
          if (k.parentId === parentId) {
            k.children = deep(arr, k.menuId);
            return true;
          }
        });
      }
      return deep(this.menulist, 0);
    },
  },
  methods: {

  },
  components:{
      treeItem
  }
};
</script>

<style scoped>
.role{
    margin: 30px;
}
</style>