import request from "@/service/";

/**   start */

/**
 * 查询工资级别信息
 *  url /sps/salaryLevelPage
 */
export const getSalaryLevelPage = data => {
  return request.get(`${window.VUE_APP_URL}sps/salaryLevelPage`, {
    params: data
  });
};

/** end */
