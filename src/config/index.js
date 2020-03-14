window.NODE_ENV = process.env.NODE_ENV; // 环境变量
window.VUE_APP_URL = process.env.VUE_APP_URL;
window.VUE_APP_FILE_URL = process.env.VUE_APP_FILE_URL;
/**
 * SYS http://113.98.59.52:8087
    SPS http://113.98.59.52:8088
    MES http://113.98.59.52:8089
 */
if (window.NODE_ENV == "development") {
  window.SYS_WEB_HOST = "113.98.59.52:8087";
  window.SPS_WEB_HOST = "113.98.59.52:8088";
  window.MES_WEB_HOST = "113.98.59.52:8089";
  window.TOPLEVEL = 'dissona.com'
} else {
  window.SYS_WEB_HOST = "113.98.59.52:8087";
  window.SPS_WEB_HOST = "113.98.59.52:8088";
  window.MES_WEB_HOST = "113.98.59.52:8089";
  window.TOPLEVEL = 'dissona.com'
}
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  VUE_APP_URL: process.env.VUE_APP_URL,
  VUE_APP_FILE_URL: process.env.VUE_APP_FILE_URL
};
