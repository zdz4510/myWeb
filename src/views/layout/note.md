 <el-menu
      :collapse-transition="false"
      :router="true"
      background-color="rgb(39, 106, 179)"
      active-text-color="rgba(255, 208, 75,0.8)"
      text-color="#fff"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="!isCollapse"
    >
      <el-submenu index="base">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">基础库</span>
        </template>
        <el-menu-item index="/base/role">角色信息管理</el-menu-item>
        <el-menu-item index="/base/userGroup">用户组信息管理</el-menu-item>
        <el-menu-item index="/base/tenant">租户信息维护</el-menu-item>
        <el-menu-item index="/base/siteInformation">SITE维护</el-menu-item>
        <el-menu-item index="/base/userinfo">用户信息维护</el-menu-item>
        <el-menu-item index="/base/resource">资源维护</el-menu-item>
        <el-menu-item index="/base/menuResource">菜单和资源维护</el-menu-item>
        <el-menu-item index="/base/functionMenu">功能菜单维护</el-menu-item>
      </el-submenu>
      <el-submenu index="set">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">设置</span>
        </template>
        <el-menu-item index="/set/authority">权限管理</el-menu-item>
        <el-menu-item index="/set/message">信息管理</el-menu-item>
      </el-submenu>
    </el-menu>