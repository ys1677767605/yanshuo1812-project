<template>
    <div class="nav">
        <span v-for="(item,index) in btnNav" class="btnNav">
         <Button class="btn" @click="setBorder(index)" :to="'/home/'+btnObj[item]"  ref="btn">        
              <span>{{item}}</span> 
              <span class="icon">                                        
                <Icon ref="icons" color="rgb(211, 214, 211)" type="md-close" size="16" @click="close(index)"/>          
              </span>       
         </Button>         
        </span>
    </div>
</template>

<script>
export default {
  props: {
    btnNav: Array,
    btnObj: Object,    
  },

  data(){
    return {
      iconColor:''
    }
   
  },
  
  methods: {
    //选中菜单下边框线添加颜色
    setBorder(j) {
      const btns = this.$refs.btn;
      const closeIcon = this.$refs.icons
      btns.forEach((i,index) => {
        if (j === index) {       
          closeIcon[index].$el.style["color"] = "";
        } else {    
          closeIcon[index].$el.style["color"] = "rgb(211, 214, 211)";
               
        }
      });

    },
    //关闭菜单功能 
    close(i) {       
         for(let e in this.btnObj){
          if(this.btnNav[i] === e){ 
            console.log(e)                 
             this.btnObj[e] = null            
          }
      }
      this.btnNav.splice(i, 1);
      
    }
    
  }
};

</script>

<style scoped>

.nav{
 height: 35px; 
}

.nav .btnNav .btn {
  font-size: 15px;
  font-weight: bolder;
  background: rgb(211, 214, 211);
   margin: 9px 2px 0 0;
 
 
}

</style>