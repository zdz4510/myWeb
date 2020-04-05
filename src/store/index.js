import Vue from "vue";
import Vuex from "vuex";
import roleEdit from "./modules/base/role.edit"; // 角色vuex module
import tenantEdit from './modules/base/tenant.edit';//租户vuex module
import userGroupEdit from "./modules/base/userGroup.edit"; // 用户组vuex module
import userinfo from './modules/base/userinfo'
import user from './modules/base/user' // 当前登录用户
import routerHistory from './modules/common/router.history'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    roleEdit,
    userGroupEdit,
    userinfo,
    tenantEdit,
    routerHistory
  }
});
