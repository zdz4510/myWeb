import axios from "axios";
//import qs from "qs";
axios.defaults.timeout = 60000;
axios.interceptors.request.use(
  config => {
    // config.data = qs.stringify(config.data);
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
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
    if (response.data.errCode == 2) {
      // router.push({
      //     path: "/login",
      //     query: { redirect: router.currentRoute.fullPath }
      // });
    } else if (response.data.errCode == 500) {
      ("code:500");
    }
    //  (response.data);
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
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
