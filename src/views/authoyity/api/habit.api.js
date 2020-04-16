import request from "@/service/";

export const findAllHabit = data => {
    return request.post(`${window.VUE_APP_URL}habit/getHabitList`, data);
};

export const findAllHabitByTime = data => {
    return request.post(`${window.VUE_APP_URL}habit/getHabitListByTime`, data);
};

export const addHabit = data => {
    return request.post(`${window.VUE_APP_URL}habit/addHabit`, data);
};


// // 更新数据
export const updateHabit = data => {
    return request.post(`${window.VUE_APP_URL}habit/updateHabit`, data);
};

export const deleteHabit = data => {
    return request.post(`${window.VUE_APP_URL}habit/deleteHabit`, data);
};

// export const addInsertMessage = data => {
//     return request.post(`${window.VUE_APP_URL}insert/addInsertMessage`, data);
// };

// // 更新数据
// export const updateInsertMessage = data => {
//     return request.post(`${window.VUE_APP_URL}insert/updateInsertMessage`, data);
// };

// // 查询时间段的相关数据
// export const findListInsertMessage = data => {
//     return request.post(`${window.VUE_APP_URL}insert/findListInsertMessage`, data);
// };