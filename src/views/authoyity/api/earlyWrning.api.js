import request from "@/service/";

export const findAllWarn = data => {
    return request.post(`${window.VUE_APP_URL}warn/getWarnList`, data);
};

// export const findAllWarnByTime = data => {
//     return request.post(`${window.VUE_APP_URL}warn/getWarnListByTime`, data);
// };

// export const addWarn = data => {
//     return request.post(`${window.VUE_APP_URL}warn/addWarn`, data);
// };


// // 更新数据
export const updateWarn = data => {
    return request.post(`${window.VUE_APP_URL}warn/updateWarn`, data);
};

export const deleteWarn = data => {
    return request.post(`${window.VUE_APP_URL}warn/deleteWarn`, data);
};

export const getWarnListByThis = data => {
    return request.post(`${window.VUE_APP_URL}warn/getWarnListByThis`, data);
};