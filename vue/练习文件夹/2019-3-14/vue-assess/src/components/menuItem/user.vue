<template>
    <Layout class="layout">
    <Header class="header" style="background:#fff;">
          <Input v-model="username" class="search" style="width:auto;" search placeholder="请输入用户名" />
          <Button type="primary" @click="addModal">新增</Button>
    </Header>
    <Table @on-select="(selection) => selectList = selection" border :columns="columns4" :data="getUsersList" />
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
      <iSwitch value="form.status" trueValue="1" falseValue="0">
          <span slot="open">开</span>
          <span slot="close">关</span>
      </iSwitch>
   </Modal>
    </Layout>
</template>

<script>
window.selfs = {};
import http from "@/utils/http";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  created() {
    //创造组件后获取管理员列表
    this.GET_USERS_LIST(this);
    //实例对象赋值给window.selfs
    selfs = this;
  },
  watch: {
    //监听当前页码，出现变化更新表格数据
    currPage() {
      this.GET_USERS_LIST(this);
    },
    //监听搜索用户名
    username() {
      this.GET_USERS_LIST(this);
    }
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
        status:"",
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
                    //console.log(1)
                    console.log(params.row.status);
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
                        const {
                          userId,
                          username,
                          password,
                          email,
                          mobile,
                          status,
                          roleIdList
                        } = params.row;
                        selfs.form = {
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
                            selfs.DEL_USERS_LIST([selfs, [params.row.userId]]);
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
      userAddModal: false, //新增用户对话框
      modalLoading: false, //模态框加载状态
      modalTitle: "", //模态框标题
      currPage: 1, //页码
      limit: 10, //每页条数
      totalCount: 1, //总共数据条数
      totalPage: 1, //总共页数
      username: "", //查询用户名
      selectList: [], //批量选择
      trueValue:1,//开关状态
      falseValue:0//开关状态
    };
  },
 
  computed: {
    ...mapGetters([
      "getUsersList",
      "delUsersList",
      "addUsersList",
      "updateUser"
    ])
  },
  methods: {
    ...mapActions([
      "GET_USERS_LIST", //获取管理员列表
      "DEL_USERS_LIST", //删除管理员列表
      "ADD_USERS_LIST", //添加管理员列表
      "UPDATE_USER" //修改管理员
    ]),
    //批量删除
    deleteMany() {
      const delUsersName = [],
        delUsersId = [];
      this.selectList.forEach(k => {
        delUsersName.push(k.username);
        delUsersId.push(k.userId);
      });

      this.$Modal.confirm({
        title: "删除",
        content: `您确定要删除用户<b style="color:red;font-size:22px;">${delUsersName}</b>吗？`,
        loading: true,
        onOk: () => {
          console.log(this.selectList);
          this.DEL_USERS_LIST([this, delUsersId]);
        }
      });
    },
    //新增按钮 弹出模态框
    addModal() {
      this.modalTitle = "新增用户";
      this.userAddModal = true;
      this.modalLoading = true;
    },
    //模态框添加,修改用户
    modalAddUser() {
      if (this.modalTitle === "新增用户") {
        //添加用户
        this.ADD_USERS_LIST(this);
      } else {
        //修改用户
        this.UPDATE_USER(this);
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