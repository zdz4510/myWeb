<template>
  <div id="dsnHeader" :class="isOpen ? '' : 'close'">
    <div class="center">
      <i class="el-icon-s-fold" @click="handleCloseOrOpen"></i>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <!-- 消息提示 -->
      <div class="right-item">
        <el-popover placement="bottom" width="300" trigger="click">
          <el-badge
            slot="reference"
            :value="this.message1.length + this.message2.length"
            :max="99"
          >
            <i class="el-icon-bell"></i>
          </el-badge>

          <!-- 弹框内容 -->
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClickMessage">
              <el-tab-pane label="已发送" name="first">
                <div class="message_wrap">
                  <div class="message_list">
                    <div
                      class="message_item"
                      v-for="(item, index) in message1"
                      :key="index"
                    >
                      <span>{{ index + 1 }}</span>
                      <div class="message_item-right">
                        请求{{ item.carename }}确认与我的关系为:{{
                          item.relation
                        }}，并成为我的关联关联用户
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="待确认" name="second">
                <div
                  class="message_wrap"
                  v-show="message2.length > 0"
                  v-for="(item, index) in message2"
                  :key="item.relationId"
                >
                  <div class="message_list">
                    <div class="message_item">
                      <span>{{ index + 1 }}</span>
                      <div class="message_item-right">
                        {{ item.carename }}想确认与我的关系为:{{
                          item.relation
                        }}，并将我设置为他的关联用户
                      </div>
                      <div class="text-center">
                        <el-button
                          class="btn-clear"
                          @click="handlerSure(item)"
                          type="text"
                        >
                          <span>确认</span>
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
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
              {{ myName }}
            </span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handlerBtnShow()">
              <i class="el-icon-setting"></i>个人信息
            </el-dropdown-item>
            <el-dropdown-item @click.native="handlerChangePass()">
              <i class="el-icon-setting"></i>密码修改
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="handlerLoginOut()">
              <i class="el-icon-setting"></i> 退出登陆
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!-- 更多 -->
      <div class="right-item">
        <el-button @click="drawer = true" type="text"
          ><i class="el-icon-more"></i
        ></el-button>
      </div>

      <!-- 右侧抽屉 -->
      <el-drawer
        class="drawer-header"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose"
        :modal-append-to-body="false"
        size="300px"
      >
        <el-divider>主题风格设置</el-divider>
        <el-button
          class="header-setting-theme"
          type="text"
          @click="setTheme(1)"
          :class="Theme === 1 ? 'active' : ''"
        >
          <img
            src="https://file.iviewui.com/admin-pro-dist/img/nav-theme-dark.da07f9c2.svg"
            alt=""
          />
        </el-button>
        <el-button
          class="header-setting-theme"
          type="text"
          @click="setTheme(2)"
          :class="Theme === 2 ? 'active' : ''"
        >
          <img
            src="https://file.iviewui.com/admin-pro-dist/img/nav-theme-dark.da07f9c2.svg"
            alt=""
          />
        </el-button>
        <el-divider>导航设置</el-divider>
        <div class="header-setting-item">
          <div class="header-setting-item-desc">固定侧边栏</div>
          <el-switch v-model="headerValue1"></el-switch>
        </div>
        <div class="header-setting-item">
          <div class="header-setting-item-desc">
            固定侧边栏
            <el-tooltip
              class="item"
              effect="dark"
              content="Top Left 提示文字"
              placement="top"
            >
              <el-button type="text"
                ><i class="el-icon-question"></i
              ></el-button>
            </el-tooltip>
          </div>
          <el-switch v-model="headerValue2"></el-switch>
        </div>
      </el-drawer>
    </div>
    <!-- 退出登录 -->
    <el-dialog
      title="退出"
      :visible.sync="loginOutDialogVisible"
      :modal-append-to-body="true"
      :append-to-body="true"
      width="400px"
      :show-close="false"
    >
      <p>您确定退出登录当前账户吗?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginOutDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="loginOut()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 密码修改 -->
    <el-dialog
      title="修改密码"
      :visible.sync="passDialog"
      :modal-append-to-body="true"
      :append-to-body="true"
      @close="handlerResetPass('modifyform')"
      width="400px"
      :show-close="false"
    >
      <el-form
        :validate-on-rule-change="false"
        :model="modifyform"
        :label-width="formLabelWidth"
        ref="modifyform"
        :rules="addRules"
      >
        <el-form-item label="旧密码:" prop="oldPassword">
          <dsn-input
            placeholder="请输入旧密码"
            v-model="modifyform.oldPassword"
            autocomplete="new-password"
            :type="pwdType"
          >
            <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
          </dsn-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="passwordcheckModel">
          <dsn-input
            placeholder="请输入新密码:"
            v-model="modifyform.passwordcheckModel"
            :type="pwdType"
            autocomplete="new-password"
          >
            <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
          </dsn-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="newPassword">
          <dsn-input
            placeholder="请再输入一次密码"
            v-model="modifyform.newPassword"
            :type="pwdType"
            autocomplete="new-password"
          >
            <i slot="suffix" class="el-icon-view" @click="showPwd"></i>
          </dsn-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passDialog = false">取 消</el-button>
        <el-button type="primary" @click="modifyformpassword()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑模态框 -->
    <el-dialog
      title="编辑"
      :visible.sync="editDialog"
      :modal-append-to-body="true"
      :append-to-body="true"
      @close="handlerResetEdit('headheadeditForm')"
    >
      <el-form
        ref="headheadeditForm"
        :model="headeditForm"
        :rules="editRules"
        :label-width="formLabelWidth"
      >
        <el-form-item label="用户名:" prop="username">
          <el-input
            :disabled="visableBtn"
            v-model="headeditForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="realName">
          <el-input
            :disabled="visableBtn"
            v-model="headeditForm.realName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄:" prop="age">
          <el-input
            :disabled="visableBtn"
            v-model="headeditForm.age"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="iphone">
          <el-input
            :disabled="visableBtn"
            v-model="headeditForm.iphone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人:" prop="emergencyContact">
          <el-input
            :disabled="visableBtn"
            v-model="headeditForm.emergencyContact"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人电话:" prop="emergencyContactIphone">
          <el-input
            :disabled="visableBtn"
            v-model="headeditForm.emergencyContactIphone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="家庭住址:" prop="address">
          <el-input
            :disabled="visableBtn"
            v-model="headeditForm.address"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset('headeditForm')">重 置</el-button>
        <el-button @click="handleEdit">编辑</el-button>
        <el-button type="primary" @click="handleEditSure('headheadeditForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { clearToken, toLogin } from "@/until/action";
import {
  getUserRelationMessage,
  getUserRelationMessageCare,
  updateUserRelationMessageCare,
} from "../authoyity/api/myFamily.api";
import {
  userInfo,
  updateUserInfo,
  updateUserPassword,
} from "../authoyity/api/myInfo.api";
import { mapGetters, mapMutations } from "vuex";
import _ from "lodash";
export default {
  name: "dsnHeader",
  data() {
    const iphoneRule = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/;
      if (value == "") {
        callback(new Error("手机号不为空"));
      } else if (!reg.test(value)) {
        callback(new Error("手机号有误"));
      } else {
        callback();
      }
    };
    const newPasswordNum = (rule, value, callback) => {
      let reg = /^([A-Z]|[a-z]|[0-9]|_|-|\/)+$/;
      if (!value) {
        callback();
      }
      if (!reg.test(value)) {
        return callback(new Error("只能为字母、数字、-、_、/组成"));
      }
      if ((value + "").length > 10) {
        return callback(new Error("最多输入10位"));
      }
      if ((value + "").length < 6) {
        return callback(new Error("最少输入6位"));
      }
      callback();
    };
    const oldPasswordCheck = (rule, value, callback) => {
      let pattern = this.user.password;
      if (value != pattern) {
        callback("密码错误");
      } else {
        callback();
      }
    };
    // if(!(/^1[3456789]\d{9}$/.test(phone))){
    //     alert("手机号码有误，请重填");
    //     return false;
    // }
    return {
      isOpen: true,
      drawer: false, // 右侧更多
      Theme: 1, // 皮肤
      headerValue1: true,
      headerValue2: true,
      activeName: "first", // 消息tab
      message: [
        {
          circleUrl:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        },
        {
          circleUrl:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        },
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
        // {circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'},
      ],
      myName: "",
      loginOutDialogVisible: false,
      message1: [],
      message2: [],
      editDialog: false,
      visableBtn: true,
      formLabelWidth: "120px",
      cloneUserMessage: {},
      headeditForm: {
        realName: "",
        username: "",
        age: "",
        headImg: "",
        iphone: "",
        address: "",
        emergencyContact: "",
        emergencyContactIphone: "",
        picture: "",
      },
      editRules: {
        real_name: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" },
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        age: [{ required: true, message: "年龄不能为空", trigger: "blur" }],
        iphone: [{ required: true, validator: iphoneRule, trigger: "change" }],
        address: [
          { required: true, message: "家庭住址不能为空", trigger: "blur" },
        ],
        emergencyContact: [
          { required: true, message: "紧急联系人不能为空", trigger: "blur" },
        ],
        emergencyContactIphone: [
          {
            required: true,
            message: "紧急联系人电话不能为空",
            trigger: "blur",
          },
        ],
      },
      pwdType: "password",
      passDialog: false,
      addRules: {
        newPassword: [
          { validator: newPasswordNum, trigger: "blur", required: true },
        ],
        oldPassword: [
          { validator: oldPasswordCheck, trigger: "blur", required: true },
        ],
        passwordcheckModel: [
          { message: "新密码不能为空", trigger: "blur", required: true },
        ],
      },
      modifyform: {
        oldPassword: "",
        passwordcheckModel: "",
        newPassword: "",
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    this.query();
    this.timer = setInterval(this.query, 60000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  created() {
    this.myName = this.$cookies.get("mcs.username")
      ? this.$cookies.get("mcs.username")
      : "请重新登录";
    this.query();
    this.number = this.message1.length + this.message2.length;
  },
  methods: {
    ...mapMutations(["USER"]),
    handlerResetEdit(type) {
      this.$nextTick(() => {
        this.$refs[type].resetFields();
      });
    },
    handlerResetPass(type) {
      this.$nextTick(() => {
        this.$refs[type].resetFields();
      });
    },
    modifyformpassword() {
      if (this.modifyform.newPassword === this.modifyform.passwordcheckModel) {
        let transMes = {
          id: this.$cookies.get("mcs.id"),
          password: this.modifyform.newPassword,
        };
        updateUserPassword(transMes).then((data) => {
          const res = data.data;
          this.$message({
            message: res.code === 200 ? "操作成功" : res.message,
            type: res.code === 200 ? "success" : "error",
          });
          if (res.code === 200) {
            this.passDialog = false;
            let userMes = {
              id: this.$cookies.get("mcs.id"),
              username: this.$cookies.get("mcs.username"),
              password: this.modifyform.newPassword,
            };
            this.USER(userMes);
          }
          return;
        });
      } else {
        this.$message({
          message: "两次密码不一致",
          type: "error",
        });
      }
    },
    //查看密码
    showPwd() {
      this.pwdType === "password"
        ? (this.pwdType = "")
        : (this.pwdType = "password");
      let e = document.getElementsByClassName("el-icon-view")[0];
      this.pwdType == ""
        ? e.setAttribute("style", "color: #409EFF")
        : e.setAttribute("style", "color: #c0c4cc");
    },
    handlerChangePass() {
      this.passDialog = true;
    },
    handlerBtnShow() {
      this.editDialog = true;
      userInfo(this.user).then((data) => {
        const res = data;
        this.headeditForm = {
          username: res.data.data.username,
          age: res.data.data.age,
          headImg: res.data.data.headImg,
          iphone: res.data.data.iphone,
          address: res.data.data.address,
          emergencyContact: res.data.data.emergencyContact,
          emergencyContactIphone: res.data.data.emergencyContactIphone,
          realName: res.data.data.realName,
        };
        this.cloneUserMessage = _.cloneDeep(res.data.data);
      });
    },
    handleReset() {
      this.headeditForm = this.cloneUserMessage;
    },
    handleEditSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let obj = {
            id: this.$cookies.get("mcs.id"),
            ...this.headeditForm,
          };
          updateUserInfo(obj).then((data) => {
            let res = data;
            if (res.data.code == 200) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.editDialog = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit() {
      this.visableBtn = false;
    },
    query() {
      this.handlerQuery();
      this.handlerQueryCare();
    },
    handlerLoginOut() {
      this.loginOutDialogVisible = true;
    },
    loginOut() {
      this.loginOutDialogVisible = false;
      clearToken();
      toLogin();
    },
    handleCloseOrOpen() {
      this.isOpen = !this.isOpen;
      this.$emit("handleCloseOrOpen");
    },
    handleClickMessage(tab, event) {
      console.log(tab, event);
    },
    handleClose() {
      console.log("close");
      this.drawer = false;
    },
    // 设置主题
    setTheme(id) {
      console.log(id);
      this.Theme = id;
    },
    // 查询有没有关联信息
    handlerQuery() {
      let obj = {
        id: this.$cookies.get("mcs.id"),
      };
      getUserRelationMessage(obj).then((data) => {
        let res = data;
        if (res.data.code == 200) {
          this.message1 = [];
          res.data.data.forEach((element) => {
            if (element.send == "true" && element.sure == "false") {
              this.message1.push(element);
            }
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      });
    },
    handlerQueryCare() {
      let obj = {
        careid: this.$cookies.get("mcs.id"),
      };
      getUserRelationMessageCare(obj).then((data) => {
        let res = data;
        if (res.data.code == 200) {
          this.message2 = [];
          res.data.data.forEach((element) => {
            if (element.send == "true" && element.sure == "false") {
              this.message2.push(element);
            }
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      });
    },
    handlerSure(v) {
      let obj = {
        ...v,
        sure: "true",
      };
      updateUserRelationMessageCare(obj).then((data) => {
        let res = data;
        if (res.data.code == 200) {
          this.handlerQueryCare();
        } else {
          this.$message({
            message: res.data.message,
            type: "error",
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-popper {
  padding: 0;
  .el-tabs__header {
    margin-bottom: 0;
  }
}
/deep/ .el-tabs__header {
  margin-bottom: 0;
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
    -webkit-transition: background-color 0.2s ease-in-out;
    transition: background-color 0.2s ease-in-out;
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
  /deep/ .header-setting-item {
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
    &.active::after {
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
      .el-badge__content {
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

.el-dropdown-menu {
  padding: 5px 0;
}
</style>
