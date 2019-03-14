<template>
   <Layout class="layout">
       <Sider v-model="sider" collapsible>
           <div class="logo">
               <h1>后台管理系统</h1>
           </div>
          
          <Menu theme="dark" width="auto">
              <Submenu v-for="item in vuexlist" :key="item.menuId" :name="item.menuId">
                    <template slot="title">
                        <Icon type="ios-paper" />                       
                        {{item.name}}
                    </template>
                    <MenuItem :to="'/home/'+child.url" v-for="child in item.children" :key="child.menuId" :name="child.menuId">
                    {{child.name}}
                    </MenuItem>
                                         
              </Submenu>
          </Menu> 
         
       </Sider>       
       <Layout>
        <Header class="header">
           <Button @click="sider = !sider" class="btn">
              <Icon type="md-menu" />
           </Button>
           
           <!-- <Button @click="GET_USER_INFO('小刚')">修改用户</Button> -->
             <Dropdown trigger="click" @on-click="menuValue">
                    <Icon type="md-person" class="md-preson"  size="20"/>               
                 <a>
             <!-- admin: {{user.email}} -->
             admin:{{user.email}}
                 <Icon type="ios-arrow-down"></Icon>
                 </a>
                  
                <DropdownMenu slot="list">
                   
                <DropdownItem name="changePassword">修改密码</DropdownItem>
                <DropdownItem name="logOut">退出登录</DropdownItem>           
                </DropdownMenu>
                </Dropdown>
          
           
       </Header>   
           <Content class="routerView">
               <router-view class="routerView"></router-view>
                
           </Content>
       </Layout>
   </Layout>
</template>

<script>
import http from "@/utils/http";
import { mapGetters,mapActions,mapMutations} from "vuex";
    export default {
        data(){
            return {                
                sider:false,
               // user:{},
               // menuList:[]              
            }
        },
        //显示用户名
        beforeCreate() {
        //钩子函数是同步函数,所以用then接收结果
        //await是异步函数
        //用户信息不能存到localStorage，会被别人跨站盗取
        /*
        http.get('/sys/user/info').then(({data}) =>{
           
            const {code,user} = data;
            if(code === 0){
                this.user = user
            }
        }),
        */
        //获取数据列表  插件工具vue-devtools 方便查找数据
        //火狐-附加组件-搜.vue-devtools 安装
        //谷歌(蓝灯.软件翻墙工具，或搜索下载谷歌软件助手)

        // http.get('/sys/menu/list').then(({data}) =>{
        //     this.menuList = data;
        //     console.log('菜单列表',this.menuList);
        // })
        },
        //vuex
        created(){
            if(!this.user){//刷新页面后，vuex请求会消失
            this.GET_USER_INFO()//只能放到created里面
            console.log('$store',this.$store)
            }
            if(this.vuexlist.length === 0){
              this.GET_USER_LIST()
            }
            
           
        },
        methods:{
            
          ...mapActions([
               'GET_USER_INFO',
               'GET_USER_LIST'
          ]),
            menuValue(name){
              if(name === 'logOut'){
                  this.$router.push('/login')
                  localStorage.removeItem('token')
              }
            }
        },
        computed:{
            //vuex 查询作用
           ...mapGetters([
               'user',
               'vuexlist'
           ]),  
           /*         
            menu(){
                //一维数组转换成二维数组，最好的方式用递归                
                function deep(arr,parentId){                                   
                   if(!Array.isArray(arr)) return;
                   return arr.filter((k) =>{  
                       //parentId相同的对象归入到同一级数组
                       //父级的menuId是子级的parentId                    
                       if(k.parentId === parentId){
                           //k.children是一个数组
                          
                           k.children = deep(arr,k.menuId)
                           return true
                       }
                   })                  
                }     
             
               return deep(this.vuexlist,0)
               
        }
        */
        }
}
    
</script>

<style scoped lang="less">
.border(@border:1px solid #ddd) {
  border: @border;
}
@border: 1px solid #ddd;
@display: flex;
@justify-content: space-between;
@width: inherit;
@height: inherit;

.layout {
  width: auto;
}
.header {
  border-bottom: @border;
  background: white;
  display: @display;
  justify-content: @justify-content;
}
.header .btn {
  height: 30px;
  margin-top: 10px;
}
.header .md-preson {
  margin-right: 5px;
}

.logo {
  height: 64px;
  background: #ccc;
  border-bottom: @border;
  line-height: 64px;
  box-sizing: border-box;
  overflow: hidden;
}

.routerView {
  background: #fff;
}
</style>