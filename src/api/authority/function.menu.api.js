import request from "@/service/";

/**   start */

/**
 * getMenu
 *  url http://localhost:20001/mcs/resource/getMenuResourceTree
 */
export const getMenuResourceTree = data => {
  return request.get(`${window.VUE_APP_URL}mcs/resource/getMenuResourceTree`, {
    params: data
  });
};

/**
 * 按资源类型和名称查询下拉框资源列表
 *  url /resource/listByType
 * 必传字段：rootId-系统id, type-资源类型, keyword-资源名称，支持模糊查询
 */
export const listByTypeHttp = data => {
  return request.post(`${window.VUE_APP_URL}mcs/resource/listByType`, data);
};

