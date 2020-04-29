import request from "@/service/";

export const findRelationByMessage = data => {
    return request.post(`${window.VUE_APP_URL}relation/getUserRelation`, data);
};