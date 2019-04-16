import Vue from 'vue'
import http from '@/utils/http'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {//存储原始数据
        //获取数据
        getUsersList: [],
        //删除数据
        delUsersList: [],
        //添加数据
        addUsersList: {},
        //修改数据
        updateUser:{}
    },
    getters: {//查询
        getUsersList(state) {
            return state.getUsersList
        },
        delUsersList(state) {
            return state.delUsersList
        },
        addUsersList(state) {
            return state.addUsersList
        },
        updateUser(state){
            return state.updateUser
        }
    },
    mutations: {//修改
        setUsersList(state, userslist) {
            state.getUsersList = userslist
        },
        setDelUsersList(state, userslist) {
            state.delUsersList = userslist
        },
        setAddUsersList(state, userslist) {
            state.addUsersList = userslist
        },
        setUpdateUser(state,newUser){
            state.updateUser = newUser
        }
    },
    actions: {//异步修改
        //获取数据列表
        GET_USERS_LIST(store, userVue) {
            http
                .get("/sys/user/list", {
                    params: {
                        page: userVue.currPage,
                        limit: userVue.limit,
                        sidx: "userId",
                        order: "desc",
                        username: userVue.username
                    }
                })
                .then(({ data }) => {

                    const { list, currPage, pageSize, totalCount, totalPage } = data.page;
                    userVue.data = list;
                    userVue.currPage = currPage;
                    userVue.limit = pageSize;
                    userVue.totalCount = totalCount;
                    userVue.totalPage = totalPage;
                    store.commit('setUsersList', list)
                });


        },
        //删除所选数据
        DEL_USERS_LIST(store, delArr) {
            console.log('vuex请求删除', delArr)
            const [uservue, delarr] = delArr
            console.log(delarr)

            http
                .post("/sys/user/delete", delarr)
                .then(({ data }) => {
                    const { code, msg } = data;
                    if (code === 0) {
                        uservue.GET_USERS_LIST(this)
                        uservue.$Notice.success({
                            desc: "删除成功"
                        });
                    } else {
                        uservue.$Notice.success({
                            title: "删除失败",
                            desc: msg
                        });
                    }
                    uservue.$Modal.remove();

                });

        },
        //添加数据
        ADD_USERS_LIST(store, uservue) {
            http.post("/sys/user/save", uservue.form).then((data) => {
                console.log(data.data);
                const { code, msg } = data.data;
                if (code === 0) {
                    //如果响应码为0，添加成功，刷新管理员列表
                    uservue.GET_USERS_LIST(this);
                    uservue.$Notice.success({
                        title: "添加用户成功",
                        desc: msg
                    });
                    uservue.userAddModal = false;
                } else {
                    uservue.$Notice.error({
                        title: "添加用户失败",
                        desc: msg
                    });

                    uservue.userAddModal = true;
                }
                uservue.form = {
                    username: "",
                    password: "",
                    email: "",
                    mobile: "",
                    status: 0
                };
                uservue.modalLoading = false;

            });
        },
        //修改数据
        UPDATE_USER(store,uservue){
            http.post("/sys/user/update", uservue.form).then(data => {
                const { code, msg } = data.data;
                if (code === 0) {
                  //如果响应码为0，修改成功，刷新管理员列表
                  uservue.GET_USERS_LIST(this);
                  uservue.$Notice.success({
                    title: "修改用户成功",
                    desc: msg
                  });
                  uservue.userAddModal = false;
                } else {
                    uservue.$Notice.error({
                    title: "修改用户失败",
                    desc: msg
                  });
      
                  uservue.userAddModal = true;
                }
                uservue.form = {
                  username: "",
                  password: "",
                  email: "",
                  mobile: "",
                  status: 0
                };
                uservue.modalLoading = false;
              });
        }
        //

    }

})
