const tenantEdit = {
    // 初始化状态
    state: {
        tenantlist: []
    },
    // 编写动作
    mutations: {
        TENANTLIST(state, data) {
            state.tenantlist = data;
        }
    },
    // 取值
    getters: {
        tenantlist: function (state) {
            return state.tenantlist;
        }
    },
    // 创建驱动，可异步
    actions: {
        change2({ commit }, data) {
            commit("TENANTLIST", data);
        }
    }
};

export default tenantEdit;
