<template>
    <Layout class="user" style="width:auto;">
       <Content class="content">
           <div class="search">
               <Input search class="input" v-model="search" placeholder="请输入用户名"/>
               <Button type="success" @click="modal = true;modaltitle='添加管理员'">新增</Button>
           </div>
           <Table :loading="tableloading" border :columns="columns1" :data="data1" @on-select-change="(selection) =>selectList = selection"></Table>
           <div class="footer">
           <Button type="warning" @click="deleteMany">批量删除</Button>
         当前页数{{currPage}}       
          <Page :total="totalCount" show-elevator :current.sync="currPage" />
           </div>
       </Content>
       <Modal @on-ok="modalRequest" :title="modaltitle" v-model="modal"  :loading="modalloading">
           <Form :loading="tableloading">
               <FormItem label="账号："><Input type="text" placeholder="请输入用户名" v-model="form.username"/></FormItem>
                 <FormItem label="密码："><Input type="password" placeholder="请输入密码" v-model="form.password"/></FormItem>
                 <FormItem label="邮箱："><Input type="text" placeholder="请输入邮箱" v-model="form.email"/></FormItem>
                  <FormItem label="手机："><Input type="text" placeholder="请输入手机" v-model="form.mobile"/></FormItem>
           <FormItem>       
              <iSwitch value="form.status" size="large" trueValue="1" falseValue="0" >
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
          </iSwitch>

                 
           </FormItem>
           </Form>
       </Modal>
    </Layout>
</template>

<script>
import http from "@/utils/http";
export default {
  created() {
      console.log('this',this)
    //beforeCreate获取不到methods里面的方法
    this.getList();
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
      columns1: [
        //表格列
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
            console.log("h", params);
            return h(
              "iSwitch",
              {
                props: {
                  value: params.row.status,
                  size: "large",
                  "true-value": 1,
                 "false-value": 0
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
        },
        {
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  nativeOn: {
                    //给组件添加原生事件
                    click: () => {
                      this.modal = true;
                      this.modaltitle = "修改管理员";
                      const {
                        userId,
                        username,
                        password,
                        email,
                        mobile,
                        status,
                        roleIdList
                      } = params.row;
                      this.form = {
                        userId,
                        username,
                        password: "",
                        email,
                        mobile,
                        status,
                        roleIdList
                      };
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  nativeOn: {
                    //给组件添加原生事件
                    click: () => {
                      console.log(params.row);
                      this.$Modal.confirm({
                          title:'提示',
                          loading:true,//添加loading,需要手动删除对话框this.$Modal.remove()
                          content:`您正在删除用户<b>${params.row.userId}</b>,是否确认删除？`,
                          onOk:() =>{
                             http.post('/sys/user/delete',[params.row.userId]).then(({data}) =>{
                                 if(data.code === 0){
                                     this.$Notice.success({
                                         title:'操作成功',
                                         desc:`用户<b>${params.row.userId}</b>已删除`
                                     })
                                     this.getList()
                                 }else{
                                     this.$Notice.error({
                                         title:'操作失败',
                                         desc:`用户<b>${params.row.userId}</b>删除失败`
                                     })
                                 }
                             })
                          this.$Modal.remove()
                          }
                           
                      })
                     
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [], //表格数据
      limit: 10, //条数限制
      totalCount:1 , //用户总数
      totalPage:1,//页码总数
      currPage:1, //当前页码
      search: "", //搜索内容
      modal: false, //对话框,
      modaltitle: "",
      modalloading: false, //对话框加载
      tableloading:false,//表格加载
      selectList:[],//表格批量选择的数据
      form: {
        userId: 0,
        username: "",
        password: "",
        email: "",
        mobile: "",
        status: "",
        roleIdList: [0]
      }
    };
  },
  watch: {
    search(v) {
      this.getList();
    },
    currPage(){
        this.getList()
    }
  },
  methods: {
    deleteMany(){
       
        const deleteList = this.selectList.map((item) =>item.userId)
         console.log(deleteList)
        if(deleteList.length === 0){
           return this.$Notice.error({
                title:'操作有误',
                desc:'请选择要删除的用户'
            })
        }
   },
    modalRequest() {
      
      if (this.modaltitle === "添加管理员") {
        http.post("/sys/user/save", this.form).then(({ data }) => {
          console.log(data);
          const { msg, code } = data;
          if (code === 0) {
             this.getList();
           
          } else {
            this.$Notice.error({
              title: "添加管理员失败",
              desc: msg
            });
            
          }
          this.modal = false;
          this.form = {
            username: "",
            password: "",
            email: "",
            mobile: ""
          };
        });
      } else if (this.modaltitle === "修改管理员") {
        http.post("/sys/user/update", this.form).then(({ data }) => {
          console.log(this.modal,this.modaltitle);
          const { msg, code } = data;
          if (code === 0) {
             
              this.getList();
          } else {
            this.$Notice.error({
              title: "修改管理员失败",
              desc: msg
            });
             
          }
          this.modal = false;
          this.form = {
            username: "",
            password: "",
            email: "",
            mobile: ""
          };
        });
      }
    },
    getList() {
        this.tableloading = true
      //参数类型 query：查询字符串
      //post请求：直接传对象，get请求：需要params对象
      http
        .get("/sys/user/list", {
          params: {
            page: this.currPage, //page页码
            limit: this.limit, //limit每页条数
            sidx: "userId", //sidx排序字段（以哪一个为规则排序）
            order: "desc", //order排序方式(正序asc：先注册的用户排前，倒序desc：后注册的用户排前,一般倒叙)
            username: this.search //用来搜索用的
          }
          //{data} 解构：直接取得到的对象里面的data对象
        })
        .then(({ data }) => {
          //console.log("{data}", { data });
          const { code, mes, page } = data;
          if (code === 0) {
            //pagesize一页可以有多少条 totalcount总共条数 totalpage总共页数
            console.log('page',page)
            const {currPage,list,pageSize,totalCount,totalPage} = page;
            console.log("currpage",currPage);
            this.currPage = currPage;
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
    
    this.tableloading = false
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