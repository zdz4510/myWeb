<template>
  <div class="roleEdit">
    <div class="operation">
      <el-button size="small" type="primary" @click="handleBack">返回</el-button>
      <el-button size="small" type="primary" @click="checkForm('roleForm')">保存</el-button>
      <el-button size="small" type="primary" @click="handleCancel('roleForm')">重置</el-button>
    </div>
    <div class="content">
      <div class="left" v-if="operateType === 'edit'">
        <el-table
          stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
          :header-cell-style="{ background: '#eef1f6', height: '30px' }"
        >
          <el-table-column prop="name" label="角色名称" width="120"></el-table-column>
          <el-table-column prop="desc" label="角色描述" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="right">
        <el-tabs
          v-model="activeName"
          type="border-card"
          @tab-click="handleClick"
          style="margin-top:10px"
        >
          <el-tab-pane label="基本信息" name="baseinfo">
            <el-form ref="roleForm" :model="roleForm" label-width="100px" :rules="infoRules">
              <el-upload
                class="avatar-uploader"
                :action="`${host}mcs/file/upload`"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
              >
                <div class="image">
                  <el-image :src="url" v-if="url.length"></el-image>
                  <i class="el-icon-plus" v-if="!url.length"></i>
                </div>
              </el-upload>
              <el-form-item label="租户名称" prop="tenantId">
                <el-select
                  v-model="roleForm.tenantId"
                  placeholder="请选择租户名称"
                  size="small"
                  @change="changeTenant"
                >
                  <el-option
                    v-for="item in this.tenant"
                    :label="item.name"
                    :value="item.id"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="SITE:" prop="tenantSiteCode">
                <el-select v-model="roleForm.tenantSiteCode" placeholder="请先选择租户" size="small">
                  <el-option
                    v-for="item in this.siteOption"
                    :label="item.name"
                    :value="item.tenantSiteCode"
                    :key="item.tenantSiteCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="默认的site:" prop="isDefaultTenantSite">
                <el-select v-model="roleForm.isDefaultTenantSite" size="small">
                  <el-option label="是" value="true"></el-option>
                  <el-option label="否" value="false"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户code:" prop="name">
                <el-input v-model.trim="roleForm.name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="用户名称:" prop="commonName">
                <el-input v-model.trim="roleForm.commonName" size="small"></el-input>
              </el-form-item>
              <el-form-item label="员工编号:" prop="staffNum">
                <el-input v-model.trim="roleForm.staffNum" size="small"></el-input>
              </el-form-item>

              <el-form-item label="状态:" prop="state">
                <el-select
                  v-model.trim="roleForm.state"
                  placeholder="请选择状态"
                  size="small"
                  @change="handlechange"
                >
                  <el-option
                    v-for="item in this.options"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="用户类型:" prop="userType">
                <el-select
                  v-model.trim="roleForm.userType"
                  placeholder="请选择状态"
                  size="small"
                  @change="handlechange"
                >
                  <el-option
                    v-for="item in this.userType"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="证件类型:" prop="idType">
                <el-select
                  v-model.trim="roleForm.idType"
                  placeholder="请选择状态"
                  size="small"
                  @change="handlechange"
                >
                  <el-option
                    v-for="item in this.cardType"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="证件号码:" prop="idNumber">
                <el-input v-model.trim="roleForm.idNumber" size="small"></el-input>
              </el-form-item>

              <el-form-item label="生日:" prop="birthday">
                <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="roleForm.birthday"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="性别:" prop="gender">
                <el-select
                  v-model.trim="roleForm.gender"
                  placeholder="请选择性别"
                  size="small"
                  @change="handlechange"
                >
                  <el-option
                    v-for="item in this.sexType"
                    :label="item.name"
                    :value="item.value"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="用户电话:" prop="phone">
                <el-input v-model.trim="roleForm.phone" size="small"></el-input>
              </el-form-item>

              <el-form-item label="邮箱:" prop="email">
                <el-input v-model.trim="roleForm.email" size="small"></el-input>
              </el-form-item>

              <el-form-item label="用户密码:" prop="password">
                <el-input v-model.trim="roleForm.password" size="small"></el-input>
                <el-checkbox v-model="roleForm.canModifyPassword" style="margin-left:10px">自动修改密码</el-checkbox>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="所属用户组" name="userGroup">
            <el-transfer
              ref="transfer"
              filterable
              filter-placeholder="请输入用户组"
              v-model="leftTransferValue"
              :data="leftTransferData"
              :titles="leftTransferTitles"
              :props="{
                key: 'id',
                label: 'id',
                resourceDes: 'name'
              }"
            >
              <span slot-scope="{ option }">{{ option.id }} - {{ option.name }}</span>
            </el-transfer>
          </el-tab-pane>
          <el-tab-pane label="所属角色" name="resource">
            <el-transfer
              ref="transfer"
              filterable
              filter-placeholder="请输入用户组"
              v-model="rightTransferValue"
              :data="rightTransferData"
              :titles="rightTransferTitles"
              :props="{
                key: 'id',
                label: 'id',
                resourceDes: 'name'
              }"
            >
              <span slot-scope="{ option }">{{ option.id }} - {{ option.name }}</span>
            </el-transfer>
          </el-tab-pane>
          <el-tab-pane label="自定义字段" name="setMyself">
            <el-tree
              @check="changeTree"
              :data="this.treeData"
              show-checkbox
              :default-checked-keys="this.defaultCheck"
              node-key="id"
              ref="tree"
              highlight-current
              :props="{
                key: 'id',
                label: 'lable',
                children:'childrens'
              }"
            ></el-tree>
          </el-tab-pane>
        </el-tabs>
        <el-dialog title="保存" :visible.sync="saveDialog" width="30%" :before-close="handleClose">
          <span>是否确认保存？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="saveDialog = false">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  createRoleHttp,
  queryResourceTree,
  getUserGroupByRole,
  updateRoleHttp
} from "@/api/base/role.api.js";

import {
  uploadImg,
  findAll,
  getUserGroupByUser,
  getRoleByUser,
  SitefindAll,
  createUser
} from "@/api/base/userinfo.api.js";

export default {
  data() {
    return {
      host: `${window.VUE_APP_URL}`,
      url: "",
      operateType: "",
      tableData: [],
      multipleSelection: [],
      treeData: [],
      siteOption: [],
      roleForm: {
        canModifyPassword: true
      },
      tenant: [],
      defaultCheck: [],
      sexType: [
        { name: "男", value: "MALE" },
        { name: "女", value: "FEMALE" }
      ],
      options: [
        { name: "正常", value: "NORMAL" },
        { name: "停用", value: "DISABLE" },
        { name: "删除", value: "DELETE" },
        { name: "失效", value: "EXPIRE" }
      ],
      userType: [
        { name: "普通用户", value: "NORMAL" },
        { name: "新site管理员", value: "NEW_SITE" },
        { name: "新租户管理员", value: "NEW_TENANT" }
      ],
      infoRules: {
        // name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        // state: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      cardType: [
        { name: "居民身份证", value: "居民身份证" },
        { name: "居住证", value: "居住证" },
        { name: "签证", value: "签证" },
        { name: "护照", value: "护照" },
        { name: "户口本", value: "户口本" },
        { name: "军人证", value: "军人证" },
        { name: "学生证", value: "学生证" },
        { name: "台港澳通行证", value: "台港澳通行证" },
        { name: "其他", value: "其他" }
      ],
      //tabs
      activeName: "baseinfo",
      //穿梭框
      leftTransferTitles: ["未选择用户组", "已选择用户组"],
      leftTransferData: [],
      leftTransferValue: [],
      rightTransferTitles: ["未选择角色", "已选择角色"],
      rightTransferData: [],
      rightTransferValue: [],
      saveDialog: false
    };
  },
  computed: {
    ...mapGetters(["roleList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    this.cloneList = JSON.parse(JSON.stringify(this.roleList));
    this.tableData = this.cloneList;
    this.roleForm = this.cloneList[0];
    this.initTenant();
    if (this.operateType === "add") {
      this.initAdd();
    }
    if (this.operateType === "edit") {
      this.initEdit();
    }
  },
  methods: {
    initAdd() {
      this.initAddUserGroup();
      this.initAddResource();
    },
    initEdit() {
      this.initEditUserGroup();
      this.initEditResource();
    },
    //初始化用户组信息
    initAddUserGroup() {
      getUserGroupByUser("").then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.leftTransferData = res.data.data;
        }
      });
    },
    initTenant() {
      findAll({}).then(res => {
        const {
          data: { data }
        } = res;
        this.tenant = data;
      });
    },
    changeTenant(tenantId) {
      const payload = { tenantId };
      SitefindAll(payload).then(res => {
        console.log(res);
      });
    },
    handleAvatarSuccess(file) {
      this.url = `http://192.168.2.80${file.data}`;
    },
    handlechange() {},
    changeTree(a, b) {
      const { checkedKeys } = b;
      this.rightTransferValue = checkedKeys;
    },
    //初始化资源信息
    initAddResource() {
      getRoleByUser("").then(res => {
        const {
          data: { data }
        } = res;
        this.rightTransferData = data.data;
      });
    },
    // 图片上传
    uploadFile(file) {
      uploadImg(file.raw).then(data => {
        let res = data.data;
        console.log(res, "返回的数据");
      });
    },
    initEditUserGroup() {
      const { roleForm } = this;
      getUserGroupByRole(roleForm.id).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.leftTransferData = res.data.data;
          this.leftTransferValue = res.data.value;
        }
      });
    },
    handleBack() {
      this.$router.push({
        path: "/base/userinfo"
      });
    },
    initEditResource() {
      const { roleForm } = this;
      queryResourceTree(roleForm.id).then(res => {
        const {
          data: { data }
        } = res;
        this.treeData = data.data;
        this.defaultCheck = data.value;
        this.rightTransferValue = data.value;
      });
    },
    handleClick(tab, event) {},
    handleCurrentChange(val) {
      this.roleForm = val;
      this.initEditUserGroup();
      this.initEditResource();
    },
    handleClose() {
      this.saveDialog = false;
    },
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveDialog = true;
        } else {
          return false;
        }
      });
    },
    handleSave() {
      const payload = {
        ...this.roleForm,
        userGroupIds: this.leftTransferValue,
        roleIds: this.rightTransferValue
      };
      console.log(payload, "payloadpayload");
      if (this.operateType === "add") {
        createUser(payload).then(data => {
          const res = data.data;
          this.$message({
            message: res.code === 200 ? "操作成功" : res.message,
            type: res.code === 200 ? "success" : "error"
          });
          this.saveDialog = false;
          if (res.code === 200) {
            this.$router.push({
              path: "/base/role"
            });
          }
          return;
        });
      } else {
        const newPayload = { ...payload, id: this.roleForm.id };
        updateRoleHttp(newPayload).then(data => {
          const res = data.data;
          this.$message({
            message: res.code === 200 ? "操作成功" : res.message,
            type: res.code === 200 ? "success" : "error"
          });
          this.saveDialog = false;
          if (res.code === 200) {
            this.$router.push({
              path: "/base/role"
            });
          }
          return;
        });
      }
    },
    handleCancel(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss">
.roleEdit {
  padding: 10px 30px;
  .content {
    display: flex;
    .left {
      width: 20% !important;
      padding: 10px 10px;
      .el-table {
      }
    }
    .right {
      flex: 1;
      .el-form {
        padding: 10px 10px;
        .el-form-item {
          margin-bottom: 0px;
          .el-select {
            width: 100%;
          }
        }
      }
      .el-transfer-panel {
        width: 35%;
      }
    }
  }
}
</style>
