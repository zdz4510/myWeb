<template>
  <div id="dsnHeader" :class="isOpen ? '' : 'close'">
    <div class="center">
      <i class="el-icon-s-fold" @click="handleCloseOrOpen"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>基础库</el-breadcrumb-item>
        <el-breadcrumb-item>颜色库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      
      <!-- 消息提示 -->
      <div class="right-item">
        <el-popover
          placement="bottom"
          width="300"
          trigger="click"
        >
          <el-badge  slot="reference" :value="9" :max="99">
            <i class="el-icon-bell"></i>
          </el-badge>

          <!-- 弹框内容 -->
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClickMessage">
              <el-tab-pane label="通知（1）" name="first">用户管理</el-tab-pane>
              <el-tab-pane label="关注（2）" name="second">
                <div class="message_wrap">
                  <div class="message_list">
                    <div class="message_item" v-for="(item, index) in message" :key="index">
                      <el-avatar size="medium" :src="item.circleUrl"></el-avatar>
                      <div class="message_item-right">
                        <h4>蒂姆·库克回复了你的邮件 </h4>
                        <span>05-08 14:33</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <el-button class="btn-clear" type="text">
                      <i class="el-icon-delete"></i> <span>清空关注</span>
                    </el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="待办（2）" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </div>
        </el-popover>
      </div>

      <div class="right-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <span class="user-name">
              张三
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> <i class="el-icon-setting"></i> 设置</el-dropdown-item>
            <el-dropdown-item divided><i class="el-icon-setting"></i>  退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <div class="right-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-picture-outline-round"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>简体中文</el-dropdown-item>
            <el-dropdown-item divided>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 更多 -->
      <div class="right-item">
        <el-button @click="drawer = true" type="text"><i class="el-icon-more"></i></el-button>
      </div>

      <!-- 右侧抽屉 -->
      <el-drawer
        class="drawer-header"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose"
        :modal-append-to-body='false'
        size='300px'>
        <el-divider>主题风格设置</el-divider>
        <el-button class="header-setting-theme" type="text" @click="setTheme(1)" :class="Theme === 1 ? 'active' : ''">
          <img src="https://file.iviewui.com/admin-pro-dist/img/nav-theme-dark.da07f9c2.svg" alt="">
        </el-button>
        <el-button class="header-setting-theme" type="text" @click="setTheme(2)" :class="Theme === 2 ? 'active' : ''">
          <img src="https://file.iviewui.com/admin-pro-dist/img/nav-theme-dark.da07f9c2.svg" alt="">
        </el-button>
        <el-divider>导航设置</el-divider>
        <div class="header-setting-item">
          <div class="header-setting-item-desc">固定侧边栏</div>
          <el-switch v-model="headerValue1"></el-switch>
        </div>
        <div class="header-setting-item">
          <div class="header-setting-item-desc">固定侧边栏  
            <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top">
            <el-button type="text"><i class="el-icon-question"></i></el-button>
          </el-tooltip>
          </div>
          <el-switch v-model="headerValue2"></el-switch>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: "dsnHeader",
  data() {
    return {
      isOpen: true,
      drawer: false, // 右侧更多
      Theme: 1, // 皮肤
      headerValue1: true,
      headerValue2: true,
      activeName: 'second', // 消息tab
      message: [
        {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
      ]
    };
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    handleCloseOrOpen() {
      this.isOpen = !this.isOpen;
      this.$emit("handleCloseOrOpen");
    },
    handleClickMessage(tab, event) {
      console.log(tab, event)
    },
    handleClose () {
      console.log('close')
      this.drawer = false
    },
    // 设置主题
    setTheme(id) {
      console.log(id)
      this.Theme = id
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-popper{
  padding: 0;
  .el-tabs__header {
    margin-bottom: 0
  }
}
/deep/ .el-tabs__header {
  margin-bottom: 0
}
/deep/ .message_wrap {
  .message_list {
    max-height: 400px;
    overflow: auto;
  }
  .message_item {
    display: flex;
    padding: 12px 24px;
    border-bottom: 1px solid #e8eaec;
    cursor: pointer;
    -webkit-transition: background-color .2s ease-in-out;
    transition: background-color .2s ease-in-out;
    text-align: left;
    &:hover {
      background-color: #f0faff;
    }
    .message_item-right {
      margin-left: 15px;
      h4 {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: #515a6e;
      }
      span {
        font-size: 12px;
        color: #808695;
      }
    }
  }
}
.drawer-header {  
  /deep/ .el-drawer__header {
    margin-bottom: 0;
  }
  /deep/ .el-drawer__body {
    padding: 0 20px 20px;
  }
  /deep/ .header-setting-item{
    display: flex;
    align-items: center;
    padding: 12px 0;
    .header-setting-item-desc {
      flex: 1 1;
      font-size: 14px;
    }
  }
  .el-icon-question {
    font-size: 15px;
  }
  .header-setting-theme {
    margin-right: 10px;
    &::after {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background: transparent;
      margin: 10px auto 0 auto;
    }
    &.active::after{
      background: #19be6b;
    }
  }
}
</style>
<style lang="scss">
#dsnHeader {
  position: fixed;
  height: 64px;
  left: 0;
  top: 0;
  width: 100%;
  padding-left: 256px;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  &.close {
    padding-left: 61px;
  }
  .center {
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    .el-icon-s-fold {
      font-weight: normal;
      padding: 12px;
      font-size: 18px;
      color: #515a6e;
      cursor: pointer;
    }
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
   
    & i {
      font-size: 18px;
      color: #515a6e;
      font-weight: normal;
    }
    .el-badge {
      margin: 0 12px;
      padding: 0 !important;
      .el-badge__content{
        top: 20px;
      }
    }
    .el-dropdown-link {
      display: inline-flex;
      align-items: center;
    }
    .right-item {
      padding: 0 12px;
      height: 100%;
      line-height: 64px;
      cursor: pointer;
      &:hover {
        background: #f8f8f9;
      }
      .user-name {
        margin-left: 12px;
        font-size: 12px;
      }
      .el-avatar--small {
        width: 24px;
        height: 24px;
      }
    }
  }

  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner a {
    font-weight: normal;
    color: #999;
  }
  .el-breadcrumb__inner {
    color: #999;
  }
  
}

.el-dropdown-menu{
  padding:5px 0;
}
</style>
