<template>
    <div class="new-nav">
    <div class="list">
    <ul>
        <li 
           v-for="item in list" 
           :key="item.id"           
           >
           <router-link :to="'/news/'+item.id">
                {{item.context}}
           </router-link>
           
        </li>
        
    </ul>
</div>
<div class="context">
    <router-view></router-view>
</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: "001",
          context: "新闻1"
        },
        {
          id: "002",
          context: "新闻2"
        },
        {
          id: "003",
          context: "新闻3"
        }
      ]
    };
  }
};
</script>

<style scoped>
.new-nav {
  display: flex;
  justify-content: flex-start;
}
.new-nav .list{
    width: 200px;
}
.new-nav .context{
    flex:1;
}
</style>