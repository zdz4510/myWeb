/**
 *  跳转到登录页面
 * to 要跳转的路径  如 /home
 * next  责任链模式
 */
import { TOKEN, DEVELOPMENT } from "@/constant";
import VueCookies from "vue-cookies";
export const toLogin = () => {
  window.location.href = `http://${window.location.host}/login`;
};

/**
 *  删除掉等级的cookie
 */
export const clearToken = () => {
  VueCookies.remove(TOKEN);
};
/**
//  *   设置顶级的cookie
//  */
// const setToken = token => {
//   //开发环境删除的是本地的cookie
//   if (Window.NODE_ENV == "development") {
//     VueCookies.set(TOKEN, token, { expires: "8h" });
//   } else {
//     // 先上环境删除的是顶级的cookie
//     VueCookies.set(TOKEN, token, { expires: "8h", domain: window.TOPLEVEL });
//   }
// };

// const getToken = () => {
//   //开发环境删除的是本地的cookie   默认path /
//   if (Window.NODE_ENV == "development") {
//     return  VueCookies.get(TOKEN);
//   } else {
//     // 先上环境删除的是顶级的cookie
//     return  VueCookies.get(TOKEN, { domain: window.TOPLEVEL });
//   }
// };
