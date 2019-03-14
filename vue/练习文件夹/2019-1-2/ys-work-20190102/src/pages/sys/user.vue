<template>
    <Layout class="user" style="width:auto;">
       <Content class="content">
           <div class="search">
               <Input search class="input" v-model="search" placeholder="请输入用户名"/>
               <Button type="success">新增</Button>
           </div>
           <Table border :columns="columns1" :data="data1"></Table>
           <div class="footer">
           <Button type="warning">批量删除</Button>
          <Page :total="totalPage" show-elevator />
           </div>
       </Content>
       
    </Layout>
</template>

<script>
import http from "@/utils/http";
export default {
    created() {
        //beforeCreate获取不到methods里面的方法
       this.getList() 
    },
    /*
  beforeCreate() {
    //参数类型 query：查询字符串
    //post请求：直接传对象，get请求：需要params对象
    http
      .get("/sys/user/list", {
        params: {
          page: 1, //page页码
          limit: 10, //limit每页条数
          sidx: "userId", //sidx排序字段（以哪一个为规则排序）
          order: "desc", //order排序方式(正序asc：先注册的用户排前，倒序desc：后注册的用户排前,一般倒叙)
          username: "" //用来搜索用的
        }
        //{data} 解构：直接取得到的对象里面的data对象
      })
      .then(({ data }) => {
        console.log("{data}", { data });
        const { code, mes, page } = data;
        if (code === 0) {
          //pagesize一页可以有多少条 totalcount总共条数 totalpage总共页数

          const { list, pageSize, totalCount, totalPage } = page;
          console.log("list", list);
          this.data1 = list;
          this.limit = pageSize;
          this.totalCount = totalCount;
          this.totalPage = totalPage;
        } else if (code === 500) {
          this.$Notice.error({
            title: "信息获取失败",
            desc: mes
          });
        }
      });
  },
  */
  data() {
    return {
      columns1: [//表格列
        {
          type: "selection",
          align: "center"
        },
        {
          title: "ID",
          key: "userId",
          sortable: true
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "手机",
          key: "mobile"
        },
        {
          title: "状态",
          key: "status",
          render(h, params) {
            console.log(params);
            return h(
              "iSwitch",
              {
                props: {
                  value: 1,
                  size: "large",
                  trueValue: 1,
                  falseValue: 0
                }
              },
              [
                h("span", { slot: "open" }, "启用"),
                h("span", { slot: "close" }, "关闭")
              ]
            );
          }
        },
        {
          title: "创作时间",
          key: "createTime",
          sortable: true
        }
      ],
      data1: [],//表格数据
      limit: 10,//条数限制
      totalCount: 1,//用户总数
      totalPage: 1,//页码总数
      currPage:1,//当前页码
      search:''//搜索内容
    };
  },
  watch:{
      search(v){
          this.getList()
      }
  },
  methods:{
      getList(){
           //参数类型 query：查询字符串
    //post请求：直接传对象，get请求：需要params对象
    http
      .get("/sys/user/list", {
        params: {
          page: this.currPage, //page页码
          limit: this.limit, //limit每页条数
          sidx: "userId", //sidx排序字段（以哪一个为规则排序）
          order: "desc", //order排序方式(正序asc：先注册的用户排前，倒序desc：后注册的用户排前,一般倒叙)          
          username:this.search //用来搜索用的
        }
        //{data} 解构：直接取得到的对象里面的data对象
      })
      .then(({ data }) => {
        console.log("{data}", { data });
        const { code, mes, page } = data;
        if (code === 0) {
          //pagesize一页可以有多少条 totalcount总共条数 totalpage总共页数

          const { list, pageSize, totalCount, totalPage,currPage } = page;
          console.log("list", list);
          this.data1 = list;
          this.limit = pageSize;
          this.totalCount = totalCount;
          this.totalPage = totalPage;
          this.currPage = currPage
        } else if (code === 500) {
          this.$Notice.error({
            title: "信息获取失败",
            desc: mes
          });
        }
      });
      }
  }
};
</script>

<style scoped lang="less">
.content {
  margin: 10px;
  .search {
    width: 250px;
    margin-bottom: 10px;
    height: auto;
    display: flex;
    .input {
      margin-right: 10px;
    }
  }
  .footer {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
}
</style>