const roleEdit = {
  // 初始化状态
  state: {
    roleList: []
  },
  // 编写动作
  mutations: {
    ROLELIST(state, data) {
      state.roleList = data;
    }
  },
  // 取值
  getters: {
    roleList: function(state) {
      return state.roleList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("ROLELIST", data);
    }
  }
};

export default roleEdit;
