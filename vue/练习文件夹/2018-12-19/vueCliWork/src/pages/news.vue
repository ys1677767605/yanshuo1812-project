<template>
    <div class="news">
      <ul>
          <li v-for="item in this.list" :key="item.id">

              <router-link :to="'/news/'+item.id"> {{item.context}}</router-link>
            
              
          </li>
      </ul>
      <div>
          
      </div>
      <router-view class="newsDetail">
          
      </router-view>
      
    </div>
</template>

<script>
    export default {
        
        data(){
           return {
              
                list:[
                    {
                       id:'zhangshan',
                       context:'张珊'
                    },
                    {
                      id:'lihaihong',
                       context:'李海红'  
                    },
                    {
                      id:'wangminzhi',
                       context:'王敏芝'  
                    }

                ]
           }
        }
    }
</script>

<style scoped>
.news{
    margin-top: 50px;
    display: flex;
    justify-content: flex-start;
}
.news ul{
width:100px;
}
.news newsDetail{

}
</style>