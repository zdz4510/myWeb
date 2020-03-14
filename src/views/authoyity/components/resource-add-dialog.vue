<template>
  <el-form
    :inline="true"
    :model="addResource"
    label-width="90px"
    ref="addResource"
    :rules="addResourceRules"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="资源名称" prop="name">
          <el-input
            v-model="addResource.name"
            placeholder="资源名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源描述" prop="desc">
          <el-input
            v-model="addResource.desc"
            placeholder="资源描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求URL" prop="url">
          <el-input v-model="addResource.url" placeholder="请求URL"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="addResource.state" placeholder="状态">
            <el-option label="正常" value="NORMAL"></el-option>
            <el-option label="停用" value="DISABLE"></el-option>
            <el-option label="删除" value="DELETE"></el-option>
            <el-option label="失效" value="EXPIRE"></el-option>
            <el-option label="锁定" value="LOCKED"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="资源CODE" prop="key">
          <el-input v-model="addResource.key" placeholder="资源CODE"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-select v-model="addResource.type" placeholder="资源类型">
            <el-option label="接口" value="INTERFACE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="sortNumber">
          <el-input
            v-model="addResource.sortNumber"
            placeholder="排序号"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { interResourceHttp } from "@/api/base/resource.api.js";

export default {
  name: "resourceAddDialog",
  data() {
    return {
      addResource: {
        name: "",
        key: "",
        desc: "",
        type: "",
        sortNumber: "",
        url: "",
        state: ""
      },
      addResourceRules: {
        name: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
        key: [{ required: true, message: "请输入资源CODE", trigger: "blur" }],
        type: [
          { required: true, message: "请选择资源类型", trigger: "change" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    };
  },
  methods: {
    //验证数据
    checkoutData() {
      this.$refs["addResource"].validate(valid => {
        if (valid) {
          this.addRequest();
        } else {
          return false;
        }
      });
    },
    //新增请求
    addRequest() {
      const data = {
        desc: this.addResource.desc,
        key: this.addResource.key,
        name: this.addResource.name,
        state: this.addResource.state,
        type: this.addResource.type,
        sortNumber: this.addResource.sortNumber,
        url: this.addResource.url
      };
      interResourceHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.message
          });
          this.$emit("closeAddDialog");
          return;
        }
        this.$message({
          type: "warning",
          message: res.message
        });
      });
    },
    //新增重置
    addReset() {
      this.$refs["addResource"].resetFields();
    }
  }
};
</script>

<style lang="scss">
.el-form {
  .el-form-item {
    .el-select {
      width: 203px;
    }
  }
}
</style>
