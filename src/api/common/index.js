import request from "@/service/";
export const uploadImg = file => {
  let params = new FormData();
  params.append("file", file);
  return request.post(`${window.VUE_APP_URL}mcs/file/upload`, params, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};
