<template>
    <div>
        <h1>菜单</h1>
        <!-- 
        <h2>vuex:{{vuexuser}}</h2>
        {{cc}} -->
        
     <!-- <Button @click="mutationsSet">修改</Button>
     <Button @click="SET_USER('小刚')">actions</Button> -->
    </div>
</template>

<script>

import { mapGetters,mapMutations,mapActions,mapState} from "vuex";
//mapGetters是个对象，里面有cc和vuexuser两个方法,只能放到computed里面
//mapMutations，mapActions放到methods里面
//mapState取原始数据 不要直接从这里改原始数据

/*
//mapGetters原理
function mapGetters(arr){
    const getters = {}
    if(Array.isArray(arr)){
        arr.forEach((key) =>{
            getters[key] = function(){
                return this.$store.getters[key]
            }
        })
    }
    return getters
}
*/
export default {
  computed:{
...mapGetters([
        'vuexuser',
        'cc'
    ]),
  },
  methods: {
 
    mutationsSet(){
            this.$store.commit("countCC");
       //this.$store.commit('setUser',Math.random())
    },
    //将对象挂到methods,或computed上，前面需要加...
    ...mapMutations([ //function方法挂到methods上
        'setUser',
        'countCC'
    ]),
  
         ...mapActions([
             'SET_USER'
         ])
  }
};
</script>

<style scoped>
</style>