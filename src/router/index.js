import Vue from "vue";
import VueRouter from "vue-router";
import baseRouter from "../views/authoyity/router/index";
//const Home = import(/* webpackChunkName: "home" */ "../views/home/");
// import Home  from "../views/home/"
import Welcome from "@/views/welcome";
import store from "@/store/";
import NotFoundPage from "@/views/layout/not-found"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    meta: {
      title: "登录",
      requiresAuth:false,
    },
    component: () => import(/* webpackChunkName: "login" */ "../views/login"),
    name: "login",

  },
  // /**  基础模块 */
  // {
  //   path: "/authority",
  //   name: "base",
  //   component: () =>
  //     import(/* webpackChunkName: "layout" */ "../views/layout/"),
  //   children: [
  //     {
  //       path: "list",
  //       name: "list",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "test" */ "../views/authoyity/pages/list.vue"
  //         )
  //     },
  //     {
  //       path: "edit",
  //       name: "edit",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "test" */ "../views/authoyity/pages/edit.vue"
  //         )
  //     }
  //   ]
  // },
  /**  基础模块 */
  {
    ...baseRouter
  },
  {
    path: "/welcome",
    name: "welcome",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "",
        name: "welcomePage",
        meta: {
          title: "欢迎页面",
          requiresAuth:true,
        },
        component: Welcome
      }
    ]
  },
  
  /**  基础模块 */

  /**
   *  常用设置
   */
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      requiresAuth:false,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ "../views/login")
  },
  {
    path:"*",
    name:"404",
    component:NotFoundPage,
    meta:{
      title:"404",
      requiresAuth:false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  store.commit("PUSH", {
    name: to.name,
    title: to.meta.title || "",
    path: to.path
  });
  let auth = to.matched.some(record => record.meta.requiresAuth);
  if (auth) {
    const token = Vue.$cookies.get("mcs.sessionId");
    const isLogin = token ? true : false;
    if (!isLogin) {
      // console.log('token  不存在');
      next({
        path: "/login",
        query: { redirect: to.fullPath } //把要跳转的地址作为参数传到下一步
      });
      // 跳转到sys 的登录页面去
      // const fromUrl = `https://${window.host}/${to}`;
      // window.location.href = `https://${window.SYS_WEB_HOST}/login?redirect=${to}`
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
