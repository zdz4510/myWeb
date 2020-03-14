import request from "@/service/";
import qs from "qs";
/**
 *
    分页条件查询
 *  /sam/pageRole
    参数:keyword(角色名称，模糊查询，非必填），state(状态，非必填）， currentPage(当前页，必填）,pageSize(每页条数，必填)
 */

export const queryTenantPage = data => {
  return request.post(
    `${window.VUE_APP_URL}mcs/tenantPage?currentPage=${data.currentPage}&pageSize=${data.pageSize}`,
    data.params
  );
};

// 创建租户
export const tenant = data => {
  return request.post(`${window.VUE_APP_URL}mcs/tenant`, data);
};

// 查询租户资源树
export const getTreeByTenant = data => {
  return request.get(
    `${window.VUE_APP_URL}mcs/resource/getTreeByTenant?tenantId=${data}`
  );
};

// 导出
export const usertenant = data => {
  let params = qs.stringify(data);
  let url = `${window.VUE_APP_URL}mcs/tenant/export?${params}`;
  window.open(url);
};

// 删除
export const deletetTenant = data => {
  return request.delete(`${window.VUE_APP_URL}mcs/tenant/${data}`);
};
