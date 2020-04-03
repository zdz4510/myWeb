export default {
  path: "/base",
  name: "base",
  meta:{
    requiresAuth:true,
    title:'myWeb'
  },
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout"),
  children: [
    {
      path: "insertMessage",
      name: "insertMessage",
      meta:{
        requiresAuth:false,
        title:'数据采集'
      },
      component: () =>
        import(
          /* webpackChunkName: "test" */ "@/views/authoyity/pages/insertMessage.vue"
        )
    },
    {
      path: "myHealth",
      name: "myHealth",
      meta:{
        requiresAuth:false,
        title:'个人健康'
      },
      component: () =>
        import(
          /* webpackChunkName: "test" */ "@/views/authoyity/pages/myHealth.vue"
        )
    },
    // 运动饮食记录
    {
      path: "myHabit",
      name: "myHabit",
      meta:{
        requiresAuth:false,
        title:'运动饮食记录'
      },
      component: () =>
        import(
          /* webpackChunkName: "test" */ "@/views/authoyity/pages/myHabit.vue"
        )
    },
    // 我的家人
    {
      path: "myFamily",
      name: "myFamily",
      meta:{
        requiresAuth:false,
        title:'我的家人'
      },
      component: () =>
        import(
          /* webpackChunkName: "test" */ "@/views/authoyity/pages/myFamily.vue"
        )
    },
    // 预警管理
    {
      path: "earlyWring",
      name: "earlyWring",
      meta:{
        requiresAuth:false,
        title:'预警管理'
      },
      component: () =>
        import(
          /* webpackChunkName: "test" */ "@/views/authoyity/pages/earlyWring.vue"
        )
    },
    {
      path: "mine",
      name: "mine",
      meta:{
        requiresAuth:false,
        title:'我的主页'
      },
      component: () =>
        import(
          /* webpackChunkName: "test" */ "@/views/authoyity/pages/mine.vue"
        )
    },
    // 心里测试
    {
      path: "myTest",
      name: "myTest",
      meta:{
        requiresAuth:false,
        title:'心里测试'
      },
      component: () =>
        import(
          /* webpackChunkName: "test" */ "@/views/authoyity/pages/myTest.vue"
        )
    }
  ]
};
