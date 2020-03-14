import request from "@/service/";
import qs from "qs";
/**   start */

/**
 *
    分页条件查询
 *  url /sam/pageGroup
    参数：keyword(角色名称，模糊查询，非必填），state(状态，非必填）， currentPage(当前页，必填）,pageSize(每页条数，必填)
 */

export const pageRoleHttp = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}sam/pageGroup`, { params: data });
};

/**
 *
 *创建用户组
 *url /sam/group
 */
export const roleHttp = data => {
  return request.post(`${window.VUE_APP_URL}sam/group`, data);
};

/**
 * 根据ID查询用户组
 * url /sam/group/{id}
 */

export const queryUserGroupByIdHttp = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}sam/group/${data.id}`, {
    params: data
  });
};

/**
 * 修改用户组
 *  url /sam/group/{id}
 *
 */
export const updateRoleHttp = data => {
  return request.put(`${window.VUE_APP_URL}sam/group/${data.id}`, data);
};

/**
 * 删除用户组
 *  url /sam/group/{id}
 *
 */
export const deleteUserGroupHttp = data => {
  return request.delete(`${window.VUE_APP_URL}sam/group/${data.id}`, {
    params: data
  });
};

/**
 * 用户组名称验重
 * url /sam/group/checkNameExists
 * @param {*} data
 */
export const checkNameExistsHttp = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}sam/group/checkNameExists`, {
    params: data
  });
};

/**
 * 导出
 * url /sam/group/export
 *
 */
export const userGroupExportHttp = data => {
  let params = qs.stringify(data);
  let url = `${window.VUE_APP_URL}sam/group/export?${params}`;
  window.open(url);
};


// 获取用户组绑定的用户
export const getUserByUserGroup = data => {
  return request.get(`${window.VUE_APP_URL}mcs/group/getUserByUserGroup?groupId=${data}`);
};


// 获取用户组绑定的角色
export const getRoleByUserGroup = data => {
  return request.get(`${window.VUE_APP_URL}sam/role/getRoleByUserGroup?groupId=${data}`);
};


// 创建用户 
export const createGroup = data => {
  return request.post(`${window.VUE_APP_URL}sam/group`, data);
};

// 修改用户
export const updateGroup = data => {
  return request.put(`${window.VUE_APP_URL}sam/group/${data.id}`, data);
};

// /** end */
