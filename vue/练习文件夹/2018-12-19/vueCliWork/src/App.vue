<template>
  <div id="app" ref="app">
  
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld ref="slider"/>
    
     <Slider />   
     <Transfer />  -->
<div class="head">
  <div class="favicon">
    <img src="./pages/favicon.ico" alt="">
    <span>Element</span>
  </div>
  <ul class="nav">
<li v-for="(item,index) in this.nav" :key="item"  @mouseover="mouseover(index)" @mouseout="mouseout(index)" :ref="index">{{item}}</li>
   <el-dropdown trigger="click" class="ys-dropdown" >
      <span @click="ysDropdown" class="el-dropdown-link" ref="ys-dropdown-link">
        中文<i class="el-icon-arrow-down el-icon--right" ref="ysIcon"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="ys-el-dropdown-menu">
        <el-dropdown-item>中文</el-dropdown-item>
        <el-dropdown-item>English</el-dropdown-item>
        <el-dropdown-item>Espanol</el-dropdown-item>      
      </el-dropdown-menu>
    </el-dropdown> 
  </ul>
 



</div>

  
<div class="main">
<ul>
  <li v-for="(navs,index) in this.nav2" :key="navs" class="newsTitle">
  
    <router-link :to="aaa[index]" @click.prevent="click(index,e)">{{navs}}</router-link> 
  </li>      
 </ul>             
     <router-view class="routerView" > </router-view>
</div>
     
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Transfer from "./components/transfer";
import Slider from "./components/test";

export default {
  name: "App",
  data() {
    return {
      nav: ["指南", "组件", "资源"],
      nav2: ["设计原则", "导航"],    
      aaa: ["/", "/news"]
    };
  },
  methods: {
    ysDropdown(e) {
      e.stopPropagation();
      const ysIcon = this.$refs.ysIcon;
      const app = this.$refs.app;
      console.log(ysIcon.style.transform);
      ysIcon.style.transition = ".5s";
      if (!ysIcon.style.transform) {
        ysIcon.style.transform = "rotate(-180deg)";
      } else {
        ysIcon.style.transform = "";
      }
      app.addEventListener("click", () => {
        ysIcon.style.transform = "";
      });
    },
    click(i) {
      const ref = this.$refs[i];
      ref[0].style.color = "rgb(28, 103, 173)";
    },
    mouseover(i) {
      console.log(i);
      const ref = this.$refs[i];
      ref[0].style.color = "rgb(87, 88, 87,.4)";
    },
    mouseout(i) {
      console.log(1);
      const ref = this.$refs[i];
      ref[0].style.color = "rgb(110, 107, 110)";
    }
  },

  components: {
    HelloWorld,
    Slider,
    Transfer
  }
};
</script>

<style>
html,
body {
  background: #dddddd;
}
#app {
  width: 800px;
  margin: 0 100px;
}
.head {
  display: flex;
  justify-content: space-start;
}
 .head .favicon {
  display: flex;
} 
.head .favicon span {
  font-size: 30px;
  font-weight: bolder;
  margin-top: 12px;
  color: rgb(28, 103, 173);
}
ul {
  list-style: none;
}
.head .nav {
  font-weight: bold;
  color: rgb(110, 107, 110);
  height: inherit;
  margin-left: 250px;
  display: flex;
  justify-content: flex-start;
}
.head .nav li {
  margin: 0 20px;
}
.head .nav .ys-dropdown {
  margin-left: 40px;
}
.head ul .el-icon-arrow-down {
  transform: rotate(0deg);
}

.main {
  width: 800px;
  display: flex;
  justify-content: space-start;
}
.main ul {
  width:100px;
  font-weight: bolder;
  font-size: 20px;
  margin-right: 20px;
}

.main ul li {
  width:inherit;
  margin: 10px 0;

}
.main .routerView {
  /* width:75%; */
}
a {
  color: grey;
  text-decoration: none;
}
a.router-link-exact-active {
  color: rgb(27, 122, 211);
}

.slider {
  margin: 20px;
}
</style>
