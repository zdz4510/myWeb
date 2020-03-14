import request from "@/service/";
import qs from "qs";
/**   start */

/**
 *
    分页条件查询
 *  /sam/pageRole
    参数:keyword(角色名称，模糊查询，非必填），state(状态，非必填）， currentPage(当前页，必填）,pageSize(每页条数，必填)
 */

export const pageRoleHttp = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}sam/pageRole`, { params: data });
};


// 根据id查询用户组
export const getUserGroupByUser = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}sam/group/getUserGroupByUser?userId=${data}`);
};

// 根据id查询角色
export const getUserGroupByRole = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}sam/group/getUserGroupByRole?roleId=${data}`);
};


/**
 *
 *创建角色
 *url /sam/role
 */
export const createRoleHttp = data => {
  return request.post(`${window.VUE_APP_URL}sam/role`, data);
};

/**
 *
    根据ID查询角色
 *  /sam/role/{id}
    单条：根据ID查询角色
 */

export const queryRoleByIdHttp = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}sam/role/${data.id}`, {
    params: data
  });
};

/**
 * 修改角色
 *  url /sam/role/{id}
 * 单条：修改角色
 *
 */
export const updateRoleHttp = data => {
  return request.put(`${window.VUE_APP_URL}sam/role/${data.id}`, data);
};

/**
 * 删除角色
 *  url /sam/role/{id}
 *
 */
export const deleteRoleHttp = data => {
  return request.delete(`${window.VUE_APP_URL}sam/role/${data.id}`, {
    params: data
  });
};

/**
 * 角色名称验重
 * url /sam/role/checkNameExists
 * @param {*} data
 */
export const checkNameExistsHttp = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}sam/role/checkNameExists`, {
    params: data
  });
};

/**
 * 查询全部资源
 * url /mcs/resource
 */
export const resourceHttp = data => {
  //   let params = qs.stringify(data);
  return request.get(`${window.VUE_APP_URL}mcs/resource`, {
    params: data
  });
};

/**
 * 导出
 * url /sam/role/export
 */
export const roleExportHttp = data => {
  let params = qs.stringify(data);
  let url = `${window.VUE_APP_URL}sam/role/export?${params}`;
  window.open(url);
};


// 查询角色树
export const queryResourceTree = data => {
  return request.get(`${window.VUE_APP_URL}mcs/resource/getTreeByRole?roleId=${data}`);
};

// /** end */
