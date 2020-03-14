import request from "@/service/";

export const queryTenantPage = data => {
    return request.post(`${window.VUE_APP_URL}mcs/user/list`, data);
};


// 上传接口
export const uploadImg = data => {
    return request.post(`${window.VUE_APP_URL}mcs/file/upload`, data);
};

// 查询租户id 
export const findAll = data => {
    return request.post(`${window.VUE_APP_URL}mcs/tenant/findAll`, data);
};

export const getUserGroupByUser = data => {
    return request.get(`${window.VUE_APP_URL}sam/group/getUserGroupByUser`, data);
};

export const getRoleByUser = data => {
    return request.get(`${window.VUE_APP_URL}sam/role/getRoleByUser`, data);
};

//查询site
export const SitefindAll = data => {
    return request.post(`${window.VUE_APP_URL}mcs/site/findAll`, data);
};

//创建用户
export const createUser = data => {
    return request.post(`${window.VUE_APP_URL}mcs/user`, data);
};
