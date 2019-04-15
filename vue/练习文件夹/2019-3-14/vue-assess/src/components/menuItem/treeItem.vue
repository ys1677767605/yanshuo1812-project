<template>
    <div class="layout">
       <div class="treeItem" @click="showMenu">
            <Icon ref="arrow" class="arrow" type="ios-arrow-forward" />
            <Icon type="ios-folder" v-if="this.data === 0"/>
            <Icon type="md-document" v-if="this.data === 1"/>
            <Icon type="ios-document" v-if="this.data === 2"/>
            <span class="name">{{firstMenu.name}}</span>
       </div>
    <treeItem :data="types" v-if="show" :firstMenu="item" v-for="item in firstMenu.children" :key="item.name">
    </treeItem>    
    </div>
    
</template>

<script>
export default {
  name: "treeItem",
  created() {
    this.types++;
  },
  props: {
    firstMenu: Object,
    data: Number
  },
  data() {
    return {
      show: false,
      count: 0,
      types: this.data
    };
  },
  methods: {
    showMenu() {
      this.count++;
      const arrow = this.$refs.arrow;
      if (this.count % 2 == 1) {
        arrow.$el.style["transform"] = "rotate(90deg)";
      } else {
        arrow.$el.style["transform"] = "rotate(0deg)";
      }

      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.layout {
  margin-left: 30px;
}
.treeItem {
  cursor: pointer;
  user-select: none;
}
.treeItem:hover {
  border-bottom: 1px solid rgb(53, 39, 39);
}
.name {
  font-size: 15px;
  font-weight: bold;
}
.arrow {
  transform: rotate(0deg);
}
</style>