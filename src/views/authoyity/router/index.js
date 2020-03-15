export default {
  path: "/base",
  name: "base",
  meta:{
    requiresAuth:true,
    title:'基础库表'
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
    //租户信息
    {
      path: "tenant",
      name: "tenant",
      meta:{
        requiresAuth:true,
        title:'租户信息'
      },
      component: () =>
        import(
          /* webpackChunkName: "tenant" */
          "@/views/authoyity/pages/tenant.vue"
        )
    },
    //租户信息新增页面
    {
      path: "tenantAdd",
      name: "tenantAdd",
      meta:{
        requiresAuth:true,
        title:'租户租户信息新增'
      },
      component: () =>
        import(
          /* webpackChunkName: "tenantAdd" */
          "@/views/authoyity/pages/tenant-add.vue"
        )
    },
    //租户信息修改页面
    {
      path: "tenantModify",
      name: "tenantModify",
      meta:{
        requiresAuth:true,
        title:'租租户信息修改'
      },
      component: () =>
        import(
          /* webpackChunkName: "tenantModify" */
          "@/views/authoyity/pages/tenant-modify.vue"
        )
    },
    //SITE维护
    {
      path: "siteInformation",
      name: "siteInformation",
      meta:{
        requiresAuth:true,
        title:'SITE维护'
      },
      component: () =>
        import(
          /* webpackChunkName: "siteInformation" */
          "@/views/authoyity/pages/site-information.vue"
        )
    },
    //SITE维护新增
    {
      path: "siteAdd",
      name: "siteAdd",
      meta:{
        requiresAuth:true,
        title:'SITE维护新增'
      },
      component: () =>
        import(
          /* webpackChunkName: "siteAdd" */
          "@/views/authoyity/pages/site-add.vue"
        )
    },
    //SITE维护修改
    {
      path: "siteModify",
      name: "siteModify",
      meta:{
        requiresAuth:true,
        title:'SITE维护修改'
      },
      component: () =>
        import(
          /* webpackChunkName: "siteModify" */
          "@/views/authoyity/pages/site-modify.vue"
        )
    },
    //角色
    {
      path: "role",
      name: "role",
      meta:{
        requiresAuth:true,
        title:'角色'
      },
      component: () =>
        import(
          /* webpackChunkName: "role" */ "@/views/authoyity/pages/role.vue"
        )
    },
    //角色新增或编辑
    {
      path: "roleEdit",
      name: "roleEdit",
      meta:{
        requiresAuth:true,
        title:'角色信息维护'
      },
      component: () =>
        import(
          /* webpackChunkName: "roleEdit" */
          "@/views/authoyity/pages/roleEdit.vue"
        )
    },
    //用户组
    {
      path: "userGroup",
      name: "userGroup",
      meta:{
        requiresAuth:true,
        title:'用户组'
      },
      component: () =>
        import(
          /* webpackChunkName: "userGroup" */
          "@/views/authoyity/pages/user-group.vue"
        )
    },
    //用户组编辑
    {
      path: "userGroupEdit",
      name: "userGroupEdit",
      meta:{
        requiresAuth:true,
        title:'用户组编辑'
      },
      component: () =>
        import(
          /* webpackChunkName: "userGroupEdit" */
          "@/views/authoyity/pages/user-group-edit.vue"
        )
    },
    // 用户信息维护
    {
      path: "userinfo",
      name: "userinfo",
      meta:{
        requiresAuth:true,
        title:'用户信息维护'
      },
      component: () =>
        import(
          /* webpackChunkName: "userGroupEdit" */
          "@/views/authoyity/pages/userinfo.vue"
        )
    },
    //  用户信息维护编辑
    {
      path: "userinfoEdit",
      name: "userinfoEdit",
      meta:{
        requiresAuth:true,
        title:'用户信息维护编辑'
      },
      component: () =>
        import(
          /* webpackChunkName: "userGroupEdit" */
          "@/views/authoyity/pages/userinfoEdit.vue"
          //资源维护
        )
    },
    {
      path: "resource",
      name: "resource",
      meta:{
        requiresAuth:true,
        title:'资源'
      },
      component: () =>
        import(
          /* webpackChunkName: "resource" */
          "@/views/authoyity/pages/resource.vue"
        )
    },
    //测试页面
    {
      path: "test",
      name: "test",
      component: () =>
        import(
          /* webpackChunkName: "test" */
          "@/views/authoyity/pages/test.vue"
        )
    },
    //菜单和资源维护
    {
      path: "menuResource",
      name: "menuResource",
      meta: {
        title: "菜单和资源维护",
        requiresAuth:true,
      },
      component: () =>
        import(
          /* webpackChunkName: "menuResource" */
          "@/views/authoyity/pages/menu-resource.vue"
        )
    },
    //功能菜单维护
    {
      path: "functionMenu",
      name: "functionMenu",
      meta: {
        title: "功能菜单维护",
        requiresAuth:true,
      },
      component: () =>
        import(
          /* webpackChunkName: "functionMenu" */
          "@/views/authoyity/pages/function-menu.vue"
        )
    }
  ]
};
