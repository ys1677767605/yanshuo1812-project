<template>
    <div class="list">
    <!-- 本组件实现功能：
    1.监听整个对象及某个元素；
    2.给对象添加响应式数据;
    3.Vue.$delete 删除数组元素功能
      原生 delete 被删除的元素变成了undefined,其他元素的键值不变
    -->
              用户名： <input type="text" v-model="obj.name"> <br/>                       
              年龄： <input type="text" v-model="obj.age"> <br/>                           
              性别： <input type="text" v-model="obj.sex"> <br/>                           
              班级： <input type="text" v-model="obj.class"> <br/>                           
              <span v-if="obj.country">
                  国籍：<input type="text" v-model="obj.country">
              </span><br/>   
     
       <Button type="primary" @click="addObjEle">添加</Button>  
       <Button type="error" @click="deleteArr">删除数组元素</Button>  
        
            
    </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        name: "小明",
        age: 33,
        sex: "male",
        class: "2017-12-11"
      },
      arr:['aa','bb','cc','dd','ee','affa']
    };
  },
 
  watch:{
      //监听整个对象
      obj:{
          handler(newVal){
             console.log('监听整个对象',newVal)
          },
          deep:true//深层遍历

      },
      //监听对象某个值 name
     'obj.name':{
         handler(newVal){
             console.log('监听对象某个值',newVal)
         }
     },
     

  },
  methods: {
      //为对象添加响应式数据
      addObjEle(){
         // this.obj.city = 'beijing'//非响应式数据，不能触发监听
         //响应式数据
         this.$set(this.obj,'country','China')
      },
      //删除数组第一个元素
      deleteArr(){         
        this.$delete(this.arr,0)
        console.log(this.arr)
      }
  },
 
};
</script>

<style scoped>
.list{
    margin: 10px 100px;
}

</style>