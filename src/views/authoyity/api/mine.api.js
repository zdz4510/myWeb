import request from "@/service/";
export const uploadImg = file => {
  let params = new FormData();
//   console.log("1111",file)
  params.append("file", file);
  return request.post(`${window.VUE_APP_URL}file/fileUpload`, params, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

