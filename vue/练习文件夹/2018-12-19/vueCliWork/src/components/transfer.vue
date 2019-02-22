<template>
    
          <div class="transfer">
            <ul>
              <li v-for="item in arr1" :key="item">
             
                    <input type="checkbox" v-model="item.checked">{{item.name}}
                   
                  
                </li>  
             
            </ul>
            
            <button @click="leftMove()" :disabled="btn2State">左移</button>
            <button @click="rightMove()" :disabled="btn1State">右移</button>
            <ul>
              <li v-for="item in arr2" :key="item">
             
                    <input type="checkbox" v-model="item.checked">{{item.name}}
                   
                  
                </li>  
             
            </ul>
          
          </div>
        
         
      
</template>

<script>
    export default {
       

         data() {

                return {
                    //父组件传过来的参数是单项数据流  父级传过来的参数不要直接用
                    arr1:  [
                    {
                        name: '选项1',
                        checked: false
                    },
                    {
                        name: '选项2',
                        checked: false
                    },
                    {
                        name: '选项3',
                        checked: false
                    },
                    {
                        name: '选项4',
                        checked: false
                    },
                    {
                        name: '选项5',
                        checked: false
                    },
                    {
                        name: '选项6',
                        checked: false
                    },
                    {
                        name: '选项7',
                        checked: false
                    },
                    {
                        name: '选项8',
                        checked: false
                    },
                    {
                        name: '选项9',
                        checked: false
                    },
                    {
                        name: '选项10',
                        checked: false
                    },
                ],
                    arr2:  [],
                    // button disabled属性可操作按钮是否可以禁用
                    btn1: true,
                    btn2: true
                }
            },
            computed:{
              btn1State(){
                if (this.arr1.find((item) => item.checked)) {
                            //取消对按钮的禁用
                            return false;
                        }else{
                            return true;
                        }
              },
              btn2State(){
                if (this.arr2.find((item) => item.checked)) {
                            //取消对按钮的禁用
                            return false;
                        }else{
                            return true;
                        }
              }
            },
          
            methods: {
                rightMove() {

                    //选中的  深度拷贝 与原数组脱离关系
                    const matchs = JSON.parse(JSON.stringify(this.arr1.filter((item) => item.checked)))
                    //const matchs = this.arr1.filter((item) => item.checked)
                    //剩下的
                    const filters = this.arr1.filter((item) => !item.checked)

                    this.arr1 = filters

                    //生成一个新的数组  每一个成员的checked改成false
                    this.arr2.push(...matchs.map((item) => {
                        item.checked = false
                        return item
                    }))

                },
                leftMove() {
                    //选中的  深度拷贝 与原数组脱离关系
                    const matchs = JSON.parse(JSON.stringify(this.arr2.filter((item) => item.checked)))
                    // const matchs = this.arr1.filter((item) => item.checked)
                    //剩下的
                    const filters = this.arr2.filter((item) => !item.checked)
                    this.arr2 = filters
                    //生成一个新的数组  每一个成员的checked改成false
                    this.arr1.push(...matchs.map((item) => {
                        item.checked = false
                        return item
                    }))
                }
            },


          
          
    }
</script>

<style scoped>
 html,
        body {
            background: #dedede;
        }

        * {
            margin: 0;
            padding: 0;
        }

        div.transfer {
            width: 500px;
            height: 310px;
            margin-left: 100px;
            display: flex;
            justify-content: flex-start;

        }

        ul {
            width: 100px;
            height: 310px;
            list-style: none;


            background: #a1a0a0;
        }

        ul>li {
            width: auto;
            height: 30px;
            color: white;
            font-weight: bolder;
            border-bottom: 1px solid #ccc;
            background: rgb(133, 131, 131);

        }

        div.transfer button {
            width: 70px;
            height: 40px;
            font-size: 20px;
            margin-top: 150px;
            font-weight: bolder;
            border: 1px solid grey;
            background: rgb(214, 209, 209);
        }
</style>