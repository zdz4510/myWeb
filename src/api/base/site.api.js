import request from "@/service/";

/**
 *
    分页条件查询
 *  /sam/pageRole
    参数:keyword(角色名称，模糊查询，非必填），state(状态，非必填）， currentPage(当前页，必填）,pageSize(每页条数，必填)
 */

export const querySizePage = data => {
   return request.post(`${window.VUE_APP_URL}mcs/pageSite`, data);
};


// 创建site
export const site = data => {
   return request.post(`${window.VUE_APP_URL}mcs/site`, data);
};

// 查找全部租户
export const findAll = data => {
   return request.post(`${window.VUE_APP_URL}mcs/tenant/findAll`, data);
};

// 查询资源树
export const getTreeByTenant = data => {
   return request.get(`${window.VUE_APP_URL}mcs/resource/getTreeByTenantSite?tenantId=${data}`);
};

