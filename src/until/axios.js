import axios from "axios";
import router from "@/router/";
import Vue from 'vue'
import qs from "qs";
axios.defaults.timeout = 60000;
// console.log(this,"111")
// let token = this.$cookies.get("mcs.sessionId") 
// console.log(token,"222")
axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data);
    if(config.url==="http://localhost:8080/file/fileUpload"){
      config.headers["Content-Type"] = "multipart/form-data; charset=utf-8";
    }
    else{
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const token = Vue.$cookies.get("mcs.sessionId");
    config.headers["authorization"] = `Bearer ${token}`;
    // config.headers["Content-Type"] = "application/json;charset=UTF-8";
    // config.headers.Ticket = sessionStorage.getItem('Ticket');
    // config.headers["X-Auth-Token"] = `token ${a}`;
    //  (config)
    // config.headers = {
    //     "Content-Type": "application/x-www-form-urlencoded"
    // };
    //  (config)
    // Indicator.open({
    //     text: '加载中...',
    //     spinnerType: 'fading-circle'
    // })
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

/**
 * http response 拦截器
 *
 */

axios.interceptors.response.use(
  response => {
    //  ('end')
    //  Indicator.close();
    console.log("test101,111",response.status)
    if (response.data.code == 401) {
      router.push({
        path: "/login",
      });
    } 
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("mcs.sessionId");
          localStorage.removeItem("mcs.id");
          localStorage.removeItem("mcs.username");
          this.$router.replace('/login')
          //500 服务器错误
          // router.replace({
          //     path: '/error',
          //     query: { redirect: router.currentRoute.fullPath, title: "哎呀,服务器开小差了！(*^__^*) ", code: "404" }
          // })
          break;
        case 404:
          //500 服务器错误
          // router.replace({
          //     path: '/error',
          //     query: { redirect: router.currentRoute.fullPath, title: "哎呀,服务器开小差了！(*^__^*) ", code: "404" }
          // })
          break;
        case 412:
          //500 服务器错误
          
          // router.replace({
          //     path: '/error',
          //     query: { title: "哎呀,服务器开小差了！(*^__^*) ", code: "500" }
          // })
          break;
        case 500:
          //500 服务器错误
          // router.replace({
          //     path: '/error',
          //     query: { title: "哎呀,服务器开小差了！(*^__^*) ", code: "500" }
          // })
          break;
        default:
        // router.replace({
        //     path: '/error',
        //     query: { title: "哎呀,服务器开小差了！(*^__^*) ", code: error.response.status }
        // })
      }
    }
    return Promise.reject(error);
  }
);


/**
 * 上面是axios的默认配置
 */
//Vue.prototype.$http = axios;

export default axios;
