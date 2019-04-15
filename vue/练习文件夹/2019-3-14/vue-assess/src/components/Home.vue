<template> 
      <Layout class="fatherLayout">
          <Header class="header">
             <div class="headerTit">
             <span>后台管理系统</span>
             <Icon @click.native="collapsedSider" class="rotateIcon" :class="rotateIcon" type="md-menu" size="24"></Icon>            
             </div>
             
             <Dropdown class="dropdown" trigger="click" style="margin-left: 20px">
             <Icon type="md-person" size="20"/>
             {{userInfo.email}}
            <Icon type="ios-arrow-down" />
            <DropdownMenu slot="list" class="dropdown-menu">
            <DropdownItem class="dropdown-item">修改密码</DropdownItem>
            <DropdownItem class="dropdown-item" @click.native="logOff">退出登录</DropdownItem>           
            </DropdownMenu>
            </Dropdown>              
       
          </Header>   
        <Layout class="sonLayout">  
             <Sider class="sider" :collapsed-width="0" ref="side1" collapsible  v-model="isCollapsed">           
             <Menu theme="dark" width="auto" class="menu">
             <Submenu :name="item.name" v-for="(item,index) in menuList" :key="item.name">
                    <template slot="title">
                        <Icon type="ios-folder"></Icon>
                        {{item.name}}
                    </template>
                    <MenuItem class="menuitem"  @click.native="menuItem(itemChildren.name,itemChildren.url)" :to="'/home/'+itemChildren.url" :name="itemChildren.name" v-for="(itemChildren,index) in item.children" :key="itemChildren.name">
                    <span>{{itemChildren.name}}</span>
                    </MenuItem>
                </Submenu>              
          </Menu>
          </Sider>  

            <Content class="content" ref="content" >
            <div class="content-nav">             
                <!-- <btn :btnObj="obj" :btnNav="nav" v-if="nav"/>                   -->
                <div class="nav" v-for="(item,index) in nav" :key="item" >                        
                <Button @click="btnClick(index)" class="btn" :to="'/home/'+obj[item]">
                <span>{{item}}</span>
                </Button>              
                <router-link class="closeRoute" tag="span" :to="'/home/'+ btnUrl(index)">                
                <Icon size="15" color="white" ref="closeIcon" class="close" @click.native="closeBtn(item,index)" type="md-close"/>                           
                </router-link> 
                </div>
                
            </div> 
            <router-view/>             
            </Content>

        </Layout>
      </Layout>
</template>
<script>
import http from "@/utils/http";
import btn from "@/components/btn";

export default {
  beforeCreate() {
    //获取list数据
    http.get("/sys/menu/list").then(({ data }) => {
      if (Array.isArray(data)) {
        this.menulist = data;
      }
    });
    //获取用户登录账号
    http.get("/sys/user/info").then(({ data }) => {
      //console.log("用户登录信息", data.user);
      this.userInfo = data.user;
    });
  },
  components: {
    btn
  },

  data() {
    return {
      menulist: [],
      isCollapsed: false,
      userInfo: {},
      nav: [], //生成按钮数组
      obj: {} //生成按钮对象
    };
  },
  computed: {
    //关闭按钮 关闭路由
    btnUrl() {
      return function(i) {
        if (i >= 1 && this.nav.length > 1) {
          let index = this.nav[i - 1];
          return this.obj[index];
        } else if (i == 0 && this.nav.length === 1) {
          return "";
        } else if(i == 0 && this.nav.length > 1){
          let index = this.nav[this.nav.length - 1];
          return this.obj[index];
        }
      };
    },
    //获取导航菜单列表
    menuList() {
      function deep(arr, parentId) {
        if (!Array.isArray(arr)) return;
        return arr.filter(k => {
          if (k.parentId === parentId) {
            k.children = deep(arr, k.menuId);
            return true;
          }
        });
      }
      return deep(this.menulist, 0);
    },
    //侧边栏收起控制
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
 
  methods: {
    //导航按钮
    menuItem(menuname, url) {
      if (this.nav.length !== 0) {
        if (!this.obj[menuname]) {
          this.nav.push(menuname);
        } else {
          this.obj[menuname] = "";
        }
      } else {
        this.nav.push(menuname);
      }
      this.obj[menuname] = url;
    },

    //关闭导航按钮
    closeBtn(item, i) {
      this.nav.splice(i, 1);
      this.obj[item] = null;
    },
    //按钮点击显示关闭按钮
    btnClick(i) {
      console.log(1);
      let closeIcons = this.$refs.closeIcon;
      closeIcons.forEach(e => {
        if (closeIcons[i] === e) {
          closeIcons[i].$el.style["color"] = "#515a6e";
        } else {
          e.$el.style["color"] = "#ddd";
        }
      });
    },

    //侧边栏缩放
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    //退出登录
    logOff() {
      localStorage.removeItem("token");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}

@height: 100%;
@width: auto;
// 全局
.fatherLayout {
  width: @width;
  height: @height;
  position: relative;
  //头部
  .header {
    width: @width;
    line-height: 64px;
    background: #ccc;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    .headerTit {
      span {
        font-size: 22px;
        font-weight: bolder;
        margin-right: 50px;
      }
      .rotate-icon {
        margin-top: -10px;
        transform: rotate(-90deg);
      }
    }
    .dropdown {
      .dropdown-menu {
        .dropdown-item {
          padding: 7px;
        }
      }
    }
  }
  //内容

  .sonLayout {
    //侧边栏
    height: 100%;
    transition: all 0.3s;
    .sider {
      height: @height;
    }
    //路由生成按钮
    .content {
      background: rgb(211, 214, 211);
      .content-nav {
        height: 45px;
        background: #515a6e;
         display: flex;
        .nav {
         display: flex;          
          .btn {
          height: 35px;
          width: 100px;
          line-height: 35px;
          font-weight: bolder;
          margin: 10px 3px 0 0;     
          padding: 0 18px 0 2px;         
        }
          .closeRoute{ 
           position: relative;
          .close{
            cursor:pointer;            
            position: absolute;
            left: -24px;       
            top:20px;
          }
          }
        }
        
      }
    }
  }
}
</style>