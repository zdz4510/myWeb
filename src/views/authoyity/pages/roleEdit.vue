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
        <el-row>
          <el-col :span="8">
            <el-form ref="roleForm" :model="roleForm" label-width="100px" :rules="infoRules">
              <el-form-item label="角色名称:" prop="name">
                <el-input v-model.trim="roleForm.name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="角色描述:" prop="desc">
                <el-input v-model.trim="roleForm.desc" size="small"></el-input>
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
            </el-form>
          </el-col>
        </el-row>

        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
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
          <el-tab-pane label="所属资源" name="resource">
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
            <!-- <el-transfer
              ref="transfer"
              filterable
              filter-placeholder="请输入资源"
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
            </el-transfer>-->
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

export default {
  data() {
    return {
      operateType: "",
      tableData: [],
      multipleSelection: [],
      treeData: [],
      roleForm: {
        name: "",
        desc: "",
        state: ""
      },
      defaultCheck: [],
      options: [
        { name: "正常", value: "NORMAL" },
        { name: "停用", value: "DISABLE" },
        { name: "删除", value: "DELETE" },
        { name: "失效", value: "EXPIRE" }
      ],
      infoRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        state: [{ required: true, message: "请选择状态", trigger: "change" }]
      },
      //tabs
      activeName: "userGroup",
      //穿梭框
      leftTransferTitles: ["未选择用户组", "已选择用户组"],
      leftTransferData: [],
      leftTransferValue: [],
      rightTransferTitles: ["未选择资源", "已选择资源"],
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
      getUserGroupByRole("").then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.leftTransferData = res.data.data;
        }
      });
    },
    handlechange(data) {},
    changeTree(a, b, c) {
      const { checkedKeys } = b;
      this.rightTransferValue = checkedKeys;
    },
    //初始化资源信息
    initAddResource() {
      queryResourceTree("").then(res => {
        const {
          data: { data }
        } = res;
        this.treeData = data.data;
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
      console.log(this.operateType, "add", "edit");
      const payload = {
        desc: this.roleForm.desc,
        groupIds: this.leftTransferValue,
        name: this.roleForm.name,
        resourceIds: this.rightTransferValue,
        state: this.roleForm.state
      };
      if (this.operateType === "add") {
        createRoleHttp(payload).then(data => {
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
    },
    handleBack() {
      this.$router.push({
        path: "/base/role"
      });
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
