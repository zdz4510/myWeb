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

/**
 * 新增工资级别信息
 *  url /sps/salaryLevel
 */
export const addSalaryLevel = data => {
  return request.post(`${window.VUE_APP_URL}sps/salaryLevel`, data);
};

/**
 * 修改工资级别信息
 *  url /sps/salaryLevel/{code}
 */
export const updateSalaryLevel = data => {
  return request.put(
    `${window.VUE_APP_URL}sps/salaryLevel/${data.salaryLevelCode}`,
    data
  );
};

/**
 * 删除工资级别信息
 *  url /sps/salaryLevel/{code}
 */
export const deleteSalaryLevel = data => {
  return request.delete(
    `${window.VUE_APP_URL}sps/salaryLevel/${data.salaryLevelCode}`,
    {
      params: data
    }
  );
};

/** end */
