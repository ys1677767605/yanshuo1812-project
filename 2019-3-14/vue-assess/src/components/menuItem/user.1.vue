<template>
    <Layout class="layout">
    <Header class="header" style="background:#fff;">
          <Input v-model="username" class="search" style="width:auto;" search placeholder="请输入用户名" />
          <Button type="primary" @click="addModal">新增</Button>
    </Header>
    <Table @on-select="(selection) => selectList = selection" border :columns="columns4" :data="data" />
    <Footer class="footer">
      <Button type="error" @click="deleteMany">批量删除</Button>      
      <Page size="small" :total="totalCount" :current.sync="currPage" show-elevator />
    </Footer>  
   <Modal @on-ok="modalAddUser" :loading="modalLoading" class="addUserModal" :title="modalTitle" v-model="userAddModal" closable>
      <span>用户名</span>
      <Input v-model="form.username" class="input" placeholder="请输入用户名" />    
      <span>密码</span>
     <Input v-model="form.password" class="input" placeholder="请输入密码"/>    
      <span>邮箱</span>
      <Input v-model="form.email" class="input" placeholder="请输入邮箱"/>
      <span>手机</span>
     <Input v-model="form.mobile" class="input" placeholder="请输入手机"/>   
      <iSwitch>
          <span slot="open">开</span>
          <span slot="close">关</span>
      </iSwitch>
   </Modal>
    </Layout>
</template>

<script>
window.selfs = {};
import http from "@/utils/http";
export default {
  created() {
    //创造组件后获取管理员列表
    this.getList();
    //实例对象赋值给window.selfs
    selfs = this;
  },
  watch: {
    //监听当前页码，出现变化更新表格数据
    currPage() {
      this.getList();
    },
    //监听搜索用户名
    username() {
      this.getList(this.username);
    },
  },
  data() {
    return {
      //添加用户
      form: {
        userId: 0,
        username: "",
        password: "",
        email: "",
        mobile: "",
        status: "",
        roleIdList: [0]
      },
      columns4: [
        {
          type: "selection",
          width: 60,
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
          render: (h, params) => {
            return h(
              "i-switch",
              {
                props: {
                  value: params.row.status,
                  "true-value": 1,
                  "false-value": 0
                },
                nativeOn: {
                  click() {
                    console.log(params);
                  }
                }
              },
              [
                h("span", { slot: "open" }, "开"),
                h("span", { slot: "close" }, "关")
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
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "justify-content": "flex-start"
                }
              },
              [
                h(
                  "Button",
                  {
                    props: { type: "primary", size: "small" },
                    nativeOn: {
                      click() {
                        selfs.modalTitle = "修改用户";
                        selfs.userAddModal = true;
                        console.log(params.row);
                        const {userId,username,password,email,mobile,status,roleIdList} = params.row
                        selfs.form = {userId,username,password:'',email,mobile,status,roleIdList}                     
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: { type: "error", size: "small" },
                    nativeOn: {
                      click() {
                        // selfs = this;
                        //删除数据
                        selfs.$Modal.confirm({
                          //
                          title: "删除",
                          content: `您确定要删除用户<b style="color:red;font-size:22px;">${
                            params.row.username
                          }</b>吗？`,
                          loading: true,
                          onOk: () => {
                            http
                              .post("/sys/user/delete", [params.row.userId])
                              .then(({ data }) => {
                                const { code, msg } = data;
                                if (code === 0) {
                                  selfs.getList();
                                  selfs.$Notice.success({
                                    desc: "删除成功"
                                  });
                                } else {
                                  selfs.$Notice.success({
                                    title: "删除失败",
                                    desc: msg
                                  });
                                }
                                selfs.$Modal.remove();
                              });
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ],
      data: [],
      userAddModal: false, //新增用户对话框
      modalLoading: false, //模态框加载状态
      modalTitle: "", //模态框标题
      currPage: 1, //页码
      limit: 10, //每页条数
      totalCount: 1, //总共数据条数
      totalPage: 1, //总共页数
      username: "", //查询用户名
      selectList: [] //批量选择
    };
  },
  methods: {
    //批量删除
    deleteMany() {
      const delUsersName = [],delUsersId = [];
      this.selectList.forEach(k =>{
        delUsersName.push(k.username)
        delUsersId.push(k.userId)
      })
      
      this.$Modal.confirm({
        title: "删除",
        content: `您确定要删除用户<b style="color:red;font-size:22px;">${
         delUsersName
        }</b>吗？`,
        loading: true,
        onOk: () => {
          console.log(this.selectList)
          http
            .post("/sys/user/delete",delUsersId)
            .then(({ data }) => {
              const { code, msg } = data;
              if (code === 0) {
                this.getList();
                this.$Notice.success({
                  desc: "删除成功"
                });
              } else {
                this.$Notice.success({
                  title: "删除失败",
                  desc: msg
                });
              }
              this.$Modal.remove();
            });
        }
      });
      
    },
    //获取管理员列表
    getList(username) {
      http
        .get("/sys/user/list", {
          params: {
            page: this.currPage,
            limit: this.limit,
            sidx: "userId",
            order: "desc",
            username: username
          }
        })
        .then(({ data }) => {
          const { list, currPage, pageSize, totalCount, totalPage } = data.page;
          //console.log('管理员列表',dataPage.list)
          this.data = list;
          this.currPage = currPage;
          this.limit = pageSize;
          this.totalCount = totalCount;
          this.totalPage = totalPage;
        });
    },
    //新增按钮 弹出模态框
    addModal() {
      this.modalTitle = "新增用户";
      this.userAddModal = true;
      this.modalLoading = true;
    },
    //模态框添加,修改用户
    async modalAddUser() {
      if(this.modalTitle === "新增用户"){
      const data = await http.post("/sys/user/save", this.form);
      console.log(data.data);
      const { code, msg } = data.data;
      if (code === 0) {
        //如果响应码为0，添加成功，刷新管理员列表
        this.getList(); 
         this.$Notice.success({
          title: "添加用户成功",
          desc: msg
        });     
        this.userAddModal = false;
      } else {
        this.$Notice.error({
          title: "添加用户失败",
          desc: msg
        });
        
        this.userAddModal = true;
      }
       this.form = {
          username: "",
          password: "",
          email: "",
          mobile: "",
          status: 0
        };
      this.modalLoading = false;
   
    }else{
      const data = await http.post("/sys/user/update", this.form);
      console.log(data.data);
      const { code, msg } = data.data;
      if (code === 0) {
        //如果响应码为0，修改成功，刷新管理员列表
        this.getList(); 
        this.$Notice.success({
          title: "修改用户成功",
          desc: msg
        });     
        this.userAddModal = false;
      } else {
        this.$Notice.error({
          title: "修改用户失败",
          desc: msg
        });
         
        this.userAddModal = true;
      }
      this.form = {
          username: "",
          password: "",
          email: "",
          mobile: "",
          status: 0
        };
      this.modalLoading = false;
    }
    }
   
  }
};
</script>

<style scoped lang="less">
.layout {
  .header {
    .search {
      margin: 10px;
    }
  }
  .footer {
    display: flex;
    justify-content: space-around;
  }
}

.addUserModal .input {
  margin: 10px 0;
}
</style>