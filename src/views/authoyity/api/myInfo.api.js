import request from "@/service/";

export const userInfo = data => {
    return request.get(`${window.VUE_APP_URL}user/getUserInfo`,{params:data});
};

export const updateUserInfo = data => {
    return request.post(`${window.VUE_APP_URL}user/updateUserMessage`, data);
};
export const updateUserPassword = data => {
    return request.post(`${window.VUE_APP_URL}user/updateUserPassword`, data);
};