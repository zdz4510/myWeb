<template>
  <div class="userGroupEdit">
    <div class="operation">
      <el-button size="small" type="primary" @click="handleBack">返回</el-button>
      <el-button
        size="small"
        type="primary"
        @click="checkForm('userGroupForm')"
        v-if="operateType === 'edit' || operateType === 'add'"
      >保存</el-button>
      <el-button size="small" type="primary" @click="handleCancel('userGroupForm')">取消</el-button>
    </div>
    <div class="content">
      <div class="left" v-if="operateType === 'edit' || operateType === 'detail'">
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
          <el-table-column prop="name" label="用户组名称" width="100"></el-table-column>
          <el-table-column prop="desc" label="用户组描述" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="right">
        <el-form
          ref="userGroupForm"
          :model="userGroupForm"
          label-width="100px"
          :rules="infoRules"
          :disabled="isEdit"
        >
          <el-form-item label="用户组名称:" prop="name">
            <el-input v-model.trim="userGroupForm.name" size="small"></el-input>
          </el-form-item>
          <el-form-item label="用户组描述:" prop="desc">
            <el-input v-model.trim="userGroupForm.desc" size="small"></el-input>
          </el-form-item>
          <el-form-item label="状态:" prop="state">
            <el-select v-model.trim="userGroupForm.state" placeholder="请选择状态" size="small">
              <el-option label="正常" value="NORMAL"></el-option>
              <el-option label="停用" value="DISABL"></el-option>
              <el-option label="删除" value="DELETE"></el-option>
              <el-option label="失效" value="EXPIRE"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="归属该用户组的用户" name="userGroup">
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
              :disabled="isEdit"
            >
              <span slot-scope="{ option }">{{ option.name }}</span>
            </el-transfer>
          </el-tab-pane>
          <el-tab-pane label="归属该用户组的角色" name="resource">
            <el-transfer
              ref="transfer"
              filterable
              filter-placeholder="请输入角色"
              v-model="rightTransferValue"
              :data="rightTransferData"
              :titles="rightTransferTitles"
              :props="{
                key: 'id',
                label: 'id',
                resourceDes: 'name'
              }"
              :disabled="isEdit"
            >
              <span slot-scope="{ option }">{{ option.name }}</span>
            </el-transfer>
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
  getUserByUserGroup,
  getRoleByUserGroup,
  createGroup,
  updateGroup
} from "@/api/base/userGroup.api.js";

export default {
  data() {
    return {
      operateType: "",
      tableData: [],
      multipleSelection: [],
      userGroupForm: {
        name: "",
        desc: "",
        state: ""
      },
      options: [
        { name: "正常", value: "NORMAL" },
        { name: "停用", value: "DISABLE" },
        { name: "删除", value: "DELETE" },
        { name: "失效", value: "EXPIRE" }
      ],
      //是否可编辑表单信息
      isEdit: false,
      infoRules: {
        name: [
          { required: true, message: "请输入用户组名称", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }]
      },
      //tabs
      activeName: "userGroup",
      //穿梭框
      leftTransferData: [],
      leftTransferValue: [],
      leftTransferTitles: ["未选择用户", "已选择用户"],
      rightTransferData: [],
      rightTransferValue: [],
      rightTransferTitles: ["未选择角色", "已选择角色"],
      saveDialog: false
    };
  },
  computed: {
    ...mapGetters(["userGroupList"])
  },
  created() {
    this.operateType = this.$route.query.operateType;
    console.log(this.operateType, "operatypeeee");
    this.cloneList = JSON.parse(JSON.stringify(this.userGroupList));
    this.tableData = this.cloneList;
    this.userGroupForm = this.cloneList[0];
    this.init();
    if (this.operateType === "add") {
      this.isEdit = false;
      this.initAdd();
    }
    if (this.operateType === "edit") {
      this.isEdit = false;
      this.initEdit();
    }
    if (this.operateType === "detail") {
      this.isEdit = true;
      this.initEdit();
    }
  },
  methods: {
    init() {},
    initAdd() {
      this.initAddUserGroup();
      this.initAddRole();
    },
    initEdit() {
      this.initEditUserGroup();
      this.initEditUserRole();
    },
    initEditUserGroup() {
      const { userGroupForm } = this;
      this.initAddUserGroup(userGroupForm.id);
    },
    initEditUserRole() {
      const { userGroupForm } = this;
      this.initAddRole(userGroupForm.id);
    },
    initAddUserGroup(payload) {
      const params = payload ? payload : "";
      getUserByUserGroup(params).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.leftTransferData = res.data.data;
          this.leftTransferValue = res.data.value;
        }
      });
    },
    initAddRole(payload) {
      const params = payload ? payload : "";
      getRoleByUserGroup(params).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.rightTransferData = res.data.data;
          this.rightTransferValue = res.data.value;
        }
      });
    },
    handleClick(tab, event) {},
    handleCurrentChange(val) {
      this.userGroupForm = val;
      this.initEdit();
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
        desc: this.userGroupForm.desc,
        userIds: this.leftTransferValue,
        name: this.userGroupForm.name,
        roleIds: this.rightTransferValue,
        state: this.userGroupForm.state
      };
      if (this.operateType === "add") {
        createGroup(payload).then(data => {
          const res = data.data;
          this.$message({
            message: res.code === 200 ? "操作成功" : res.message,
            type: res.code === 200 ? "success" : "error"
          });
          this.saveDialog = false;
          if (res.code === 200) {
            this.$router.push({
              path: "/base/userGroup"
            });
          }
        });
      } else {
        const params = { ...payload, id: this.userGroupForm.id };
        updateGroup(params).then(data => {
          const res = data.data;
          this.$message({
            message: res.code === 200 ? "操作成功" : res.message,
            type: res.code === 200 ? "success" : "error"
          });
          this.saveDialog = false;
          if (res.code === 200) {
            this.$router.push({
              path: "/base/userGroup"
            });
          }
        });
      }

      // this.$message({
      //   message: "保存成功",
      //   type: "success"
      // });
      // this.saveDialog = false;
    },
    handleCancel(formName) {
      this.$refs[formName].resetFields();
    },
    handleBack() {
      this.$router.push({
        path: "/base/userGroup"
      });
    }
  }
};
</script>
<style lang="scss">
.userGroupEdit {
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
