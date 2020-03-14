const userGroupEdit = {
  // 初始化状态
  state: {
    userGroupList: []
  },
  // 编写动作
  mutations: {
    USERGROUPLIST(state, data) {
      state.userGroupList = data;
    }
  },
  // 取值
  getters: {
    userGroupList: function(state) {
      return state.userGroupList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("USERGROUPLIST", data);
    }
  }
};

export default userGroupEdit;
