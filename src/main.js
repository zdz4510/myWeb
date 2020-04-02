import Vue from "vue";
import App from "./App.vue";
import "./config";
import ElementUI from "element-ui";
import VueCookies from 'vue-cookies'
import VCharts from 'v-charts'
import "./assets/css/element-variables.scss";
import "./assets/css/base.css";
import "@/components";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.use(VCharts)

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
