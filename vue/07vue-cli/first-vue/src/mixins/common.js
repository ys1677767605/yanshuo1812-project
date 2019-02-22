//给部分组件混入
// export const mixin = {
const mixin = {
    data(){
                 return {
                     prefix:'yanshuo_'   
                 }        
                        
         },
    methods:{
        $alert(){
            console.log(11111);
            
        }
    }
}
export default mixin;