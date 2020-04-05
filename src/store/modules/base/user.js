const user = {
    // 初始化状态
    state: {
        user: {

        }
    },
    // 编写动作
    mutations: {
        USER(state, data) {
            state.user = data;
        }
    },
    // 取值
    getters: {
        user: function (state) {
            return state.user;
        }
    },
    // 创建驱动，可异步
    actions: {
        change2({ commit }, data) {
            commit("USER", data);
        }
    }
};

export default user;
