import request from "@/service/";

export const findMessageByMessage = data => {
    return request.post(`${window.VUE_APP_URL}insert/getInsertMessage`, data);
};

export const deleteInsertMessage = data => {
    return request.post(`${window.VUE_APP_URL}insert/deleteInsertMessage`, data);
};

export const addInsertMessage = data => {
    return request.post(`${window.VUE_APP_URL}insert/addInsertMessage`, data);
};

// 更新数据
export const updateInsertMessage = data => {
    return request.post(`${window.VUE_APP_URL}insert/updateInsertMessage`, data);
};

// 查询时间段的相关数据
export const findListInsertMessage = data => {
    return request.post(`${window.VUE_APP_URL}insert/findListInsertMessage`, data);
};

// 按条件模糊查询
export const getInsertMessageListByThis = data => {
    return request.post(`${window.VUE_APP_URL}insert/getInsertMessageListByThis`, data);
};

// 按条件模糊查询
export const getTestResultHttp = data => {
    return request.post(`${window.VUE_APP_URL}insert/getTestResult`, data);
};