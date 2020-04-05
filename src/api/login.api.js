import request from "@/service/";
import qs from 'querystring'
// 登录
export const login = data => {
    return request.post(`${window.VUE_APP_URL}user/login`, data);
};

// 注册
export const userAdd = data => {
  return request.post(`${window.VUE_APP_URL}user/resign`, data);
};


// type SYSTEM 可以查询
export const getResourceList  = data => {
    return request.post(`${window.VUE_APP_URL}mcs/resource/list?pageSize=0&currentPage=1`,data);
  };


  export const getUser  = data => {
      let params = qs.stringify(data);
    return request.post(`${window.VUE_APP_URL}sso/cus/userInfo?${params}`,);
  };

  // 新的登录接口
export const loginConfig = data => {
  return request.post(
    `${window.VUE_APP_URL}sso/cus/loginConfig?tenantCode=${data.tenantCode}`,
    data
  );
};
