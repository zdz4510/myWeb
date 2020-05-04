import request from "@/service/";

export const findRelationByMessage = data => {
    return request.post(`${window.VUE_APP_URL}relation/getUserRelation`, data);
};
// 
export const addUserRelationHttp = data => {
    return request.post(`${window.VUE_APP_URL}relation/addUserRelation`, data);
};

export const getUserRelationMessage = data => {
    return request.post(`${window.VUE_APP_URL}relation/getUserRelationMessage`, data);
};

export const getUserRelationMessageCare = data => {
    return request.post(`${window.VUE_APP_URL}relation/getUserRelationMessageCare`, data);
};

export const updateUserRelationMessageCare = data => {
    return request.post(`${window.VUE_APP_URL}relation/updateRelation`, data);
};