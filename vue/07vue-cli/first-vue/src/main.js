//es6模块语法
//基于ecmascript的模块语法，nodejs现在是测试阶段还不能运行

// const test = require('./test')  //nodejs的方式

//import test from './test'  //es6的导入方式
//按需导入
//import {arr} from './test'

//import test ,{bb,test as xx} from './test'
//如果有重名，可在括号内使用as给有冲突的变量添加别名
//console.log(xx);

//import {sum} from './test';
//console.log(sum(2,2));

//导入模块里的所有导出的东西  默认导出和按需导出
//import * as ccc from './test'

//console.log(ccc.format(new Date()));
// console.log(ccc);
//如果test和format文件里有变量重名的
//ccc.formatRun();
//ccc.run();
import './assets/index.css';

import Vue from 'vue';
//单文件组件：.vue的文件

import App from './App.vue';
import Tests from './components/Tests.vue';



Vue.config.productionTip = false

//全局混入
//给每一个组件混入相同的东西（只要用到项目里的组件都会有）
//全局混入的属性会被组件自带的属性覆盖（发生冲突的情况下）
//混入生命周期和混入属性方法不同，生命周期不会被覆盖(混入的生命周期先运行)

//给全部组件混入
Vue.mixin({
    data() {//给所有组件混入变量
        return {
            prefix: 'yanshuo_'
        }

    },
    methods: {//给所有组件混入方法
        // $alert(){
        //     alert(1);
        // },


    },
    beforeCreate() {
        console.log('混入的生命周期:beforecreate');
    },
    mounted() {
        console.log('混入的生命周期:mounted');
    }
    // mounted(){
    //     console.log(this.$el);
    // }
})

Vue.directive('focus', {
    bind(el, binding, vnode, oldVnode) {
        /*el:指令绑定的元素本身
        * binding:是一个对象
        *   1.expression:原始的表达式（指令引号中的东西）v-sync="value=100"
        *   2.name 指令的名称 不带-v的
        *   3.rawName 指令的名称 带-v的
        *   4.value 表达式计算出来的值
        *   5.modifiers 当指令上出现修饰符时就会有该选项
        *   6.arg 在指令后加上冒号的数据，也就是参数
        * vnode:组件上下文
        * 
        * vnode:虚拟dom,是vue虚拟出来的dom结构，和dom的结果类似，但它不是一个dom对象
        * 
        */
        //当指令和组件或标签绑定的时候触发
        //bind只运行一次，在指令和元素绑定的是运行
        console.log(el);
        el.style.background = "#ddd"
    },

    inserted(el, binding, vnode, oldVnode) {
        //当指令所绑定的组件或标签被插入到dom的时候触发，只运行一次
        el.focus();
    },
    update(el, binding, vnode, oldVnode) {
        //当指令所绑定的组件或标签更新时触发
    },
    componentUpdated(el, binding, vnode, oldVnode) {
        //当指令所绑定的组件更新时触发
    },
    unbind(el, binding, vnode, oldVnode) {
        //当指令和组件解绑时触发
    }
})

Vue.directive('sync', {
    bind(el, binding, vnode, oldVnode) {

        el.value = binding.value;
    },
    inserted(el, binding, vnode, oldVnode) {
        el.value = binding.value;
        //监听input事件
        el.addEventListener('input', () => {
            console.log(vnode.context);
            //vnode.context.value = el.value;

            //binding.expression是对象，可以用下标形式
            if (binding.modifiers.number) {
                //这样可以任意改变value名称 为iValue或其他           输入0-9以外的数，替换为空
                vnode.context[binding.expression] = Number(el.value.replace(/[^0-9]/g, ''));
            } else {
                vnode.context[binding.expression] = el.value;
            }


        })
    },
    update(el, binding, vnode, oldVnode) {
        console.log(binding);
        el.value = binding.value;
    },

})

Vue.directive('listener', {
    bind(el, binding, vnode, oldVnode) {
        //console.log(binding);

        if (typeof binding.value !== 'function') {
            //如果不是函数的话，抛出类型错误
            throw new TypeError(`Invalid key ${binding.expression}, is not a function.`)
        }
        //如果没有修饰符
        //el.addEventListener(binding.arg,binding.value )

        //如果有修饰符
        el.addEventListener(binding.arg, (event) => {
            //阻止事件冒泡
            if (binding.modifiers.stop) {
                event.stopPropagation()
            }
            //阻止事件默认
            if (binding.modifiers.prevent) {
                console.log(11);
                event.preventDefault();

            }
            binding.value(event)
        })



    }
})


/*全局指令：只要定义了全局指令，在每一个组件里都可以用这个指令
*Vue.directive(id,options)
*1.id 指令的名称
*2.options 指令的选项
*/

//局部指令：在哪个组件里定义就只能在该组件里使用
//案例在App.vue


/**
 * 全局过滤器
 * filter(name,callback(value)=>value)
 * 1.name 过滤器的名称
 * 2.callback 过滤器的处理函数
 * 局部过滤器：案例在App.vue
 */
//curr = '$' 设置默认值
Vue.filter('currency', (val, curr = '$') => {
    console.log("管道参数：" + curr);
    return curr + val
})

//过滤器：去掉数字
Vue.filter('filterNum', (val) => {
    return val.replace(/[0-9]/g, '')
})
//过滤器：转换大写
Vue.filter('Uppercase', (val) => {
    return val.toUpperCase();
})
//过滤器：转换小写
Vue.filter('Lowercase', (val) => {
    return val.toLowerCase();
})
//过滤器：转换大驼峰
Vue.filter('CamelCase', (val) => {
    if (typeof val !== 'string') return;
    const [first, ...more] = val.split('');
    return [first.toUpperCase(), more.join('').toLowerCase()].join('')

})



//将Tests.vue转换成全局组件
Vue.component('Tests', Tests);

import aaa from '@/components/aaa.vue'

new Vue({
    el: '#app',
    //注册组件
    components: { App, aaa },
    template: '<App />',
    beforeCreate() {
        console.log('实例的生命周期:beforecreate');
    },
    mounted() {
        console.log('实例的生命周期:mounted');
    },
    //render:h => h(App)  渲染函数另一种写法
    
    render(h) {
        //return h(App)     
        return h('aaa', {
            //   class:{//不管是不是组件都可以传递
            //       'banner':true
            //   },
            // class:'banner',
            style: {//不管是不是组件都可以传递
                background: 'yellow'
            },
            props: {//必须在渲染组件的时候传递
                bbb: '我是bbb'
            },
            attrs: {//给标签设置自定义的属性
                index: 'haha'
            },
            domProps: {//原生html属性，不是html属性就不会被渲染
                id: 'app'
            },
            nativeOn: {//给组件添加原生事件
                click(a) {
                    console.log(11);
                }

            },
            on: {//监听组件的事件(或者标签的原生事件)
                select(a) {
                    console.log(a);
                }
            }


        }, [
                h('button', { slot: 'before' }, 'before'),
                h('button', { slot: 'after' }, 'after'),
                h('input')//默认插槽
            ])
    }
    

})

/**
 * 渲染函数：render(createElement)
 * createElement(id,options,c)
 * id参数：是必须存在的
 * 1. 可以是全局组件名称（字符串）  
 * 2. 组件对象(变量)
 * 3. 标签(html标签)
 * 
 * options: 对象(可选)
 * 
 * c:给渲染出来的标签或组件增加子元素(1.字符串，2.可以是数组，必须使用
 * createElement函数继续生成的标签或组件)(可选)
 * 
 */



