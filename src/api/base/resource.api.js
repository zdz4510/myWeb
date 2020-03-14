import request from "@/service/";
// import qs from "qs";

/**
 *
 * 列表查询
 *url /interResource/list
 */
export const listHttp = data => {
  return request.post(
    `${window.VUE_APP_URL}mcs/interResource/list?currentPage=${data.currentPage}&pageSize=${data.pageSize}`,
    data.param
  );
};

/**
 *
 * 新增资源
 *url /interResource
 */
export const interResourceHttp = data => {
  return request.post(`${window.VUE_APP_URL}mcs/interResource`, data);
};

/**
 *
 * 单条：更新资源
 *url /interResource/{id}
 */
export const updateResourceHttp = data => {
  return request.put(
    `${window.VUE_APP_URL}mcs/interResource/${data.id}`,
    data.resourceInfo
  );
};

/**
 *
 * 单条：删除资源
 *url /interResource/{id}
 */
export const deleteResourceHttp = data => {
  return request.delete(`${window.VUE_APP_URL}mcs/interResource/${data}`, {
    params: data
  });
};
