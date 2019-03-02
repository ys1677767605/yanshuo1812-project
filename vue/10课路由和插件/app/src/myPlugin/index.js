import Transfer from './transfer.vue'
import Slider from './slider'
//vue的插件实际上就是一个对象，对象里包含一个install方法
const components = {
    Transfer,
    Slider
}
export default {
    install(Vue,options){
        //console.log(arguments[0]);
        console.log(options);
        //全局混入
        Vue.mixin({

        })
        //将对象转换成数组
        Object.keys(components).forEach((key) =>{
            Vue.component(key,components[key])
        })
        
       
        Vue.filter('currency', (val, curr = '$') => {
            console.log("管道参数：" + curr);
            return curr + val
        })
    }
}