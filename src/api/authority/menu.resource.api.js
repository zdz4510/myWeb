import request from "@/service/";

/**   start */

/**
 * add
 *  url /sps/salaryLevelPage
 */
export const addResourceInfo  = data => {
  return request.post(`${window.VUE_APP_URL}mcs/resource`,data);
};


/**
 *  http://192.168.2.81:20001/mcs/resource/list?currentPage=1&pageSize=0
 */


export const getResourceList  = data => {
    return request.post(`${window.VUE_APP_URL}mcs/resource/list?pageSize=0&currentPage=1`,data);
  };
  
  /**
   *   获取扫描的权限
   * @param {*} data 
   */

  export const getInterResourceList  = data => {
    return request.post(`${window.VUE_APP_URL}mcs/interResource/list?pageSize=0&currentPage=1`,data);
  };
/** end */


/**
 * http://192.168.2.81:20001/sam/resource/findResourceByTenantSiteCo
 */
export const getList  = data => {
    return request.post(`${window.VUE_APP_URL}mcs/resource/findResourceByTenantSiteCode`);
}


/**
 *  更新单挑资源
 *   参数：id(资源id，必填），resourceInfo(资源信息)
 */
export const updateResource  = data => {
    return request.put(`${window.VUE_APP_URL}mcs/resource/${data.id}`,data);
}

/**
 *  删除资源 
 * 
 */
export const deleteResource  = data => {
    return request.delete(`${window.VUE_APP_URL}mcs/resource/${data.id}`);
}


/**
 *  获取资源列表
 * 
 */
export const getTableList  = data => {
  return request.get(`${window.VUE_APP_URL}mcs/resource/getAuthResourceTree`,
    {
      params:data
    }
  );
}

/**
 * 检查资源名称是否存在
 * @param {*} data 
 */
export const checkNameExists  = data => {
  return request.get(`${window.VUE_APP_URL}mcs/resource/checkNameExists`,
    {
      params:data
    }
  );
}

/**
 * 检查资源CODE是否存在
 *  url /resource/checkKeyExists
 * 必传字段：rootId-系统id, type-资源类型, keyword-资源名称，支持模糊查询
 */
export const checkKeyExistsHttp = data => {
  return request.get(`${window.VUE_APP_URL}mcs/resource/checkKeyExists`, {params:data});
};






