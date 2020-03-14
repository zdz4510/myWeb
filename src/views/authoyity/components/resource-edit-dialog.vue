<template>
  <el-form
    :inline="true"
    :model="editResourceList"
    label-width="90px"
    ref="editResourceList"
    :rules="editResourceRules"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="资源名称" prop="name">
          <el-input
            v-model="editResourceList.name"
            placeholder="资源名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源描述" prop="desc">
          <el-input
            v-model="editResourceList.desc"
            placeholder="资源描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="请求URL" prop="url">
          <el-input
            v-model="editResourceList.url"
            placeholder="请求URL"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="editResourceList.state" placeholder="状态">
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
          <el-input
            v-model="editResourceList.key"
            placeholder="资源CODE"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-select v-model="editResourceList.type" placeholder="资源类型">
            <el-option label="接口" value="INTERFACE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="sortNumber">
          <el-input
            v-model="editResourceList.sortNumber"
            placeholder="排序号"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { updateResourceHttp } from "@/api/base/resource.api.js";

export default {
  name: "resourceEditDialog",
  props: {
    editResource: Object,
    id: String
  },
  data() {
    return {
      editResourceList: [],
      editResourceRules: {
        name: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
        key: [{ required: true, message: "请输入资源CODE", trigger: "blur" }],
        type: [
          { required: true, message: "请选择资源类型", trigger: "change" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    };
  },
  created() {
    this.editResourceList = this.editResource;
  },
  methods: {
    //验证数据
    checkoutData() {
      this.$refs["editResourceList"].validate(valid => {
        if (valid) {
          this.editRequest();
        } else {
          return false;
        }
      });
    },
    //编辑请求
    editRequest() {
      const data = {
        id: this.editResourceList.id,
        resourceInfo: {
          desc: this.editResourceList.desc,
          key: this.editResourceList.key,
          name: this.editResourceList.name,
          state: this.editResourceList.state,
          type: this.editResourceList.type,
          sortNumber: this.editResourceList.sortNumber,
          url: this.editResourceList.url
        }
      };
      updateResourceHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.$emit("closeEditDialog");
          return;
        }
        this.$message({
          type: "warning",
          message: res.message
        });
      });
    },
    //编辑重置
    editReset() {
      this.$refs["editResourceList"].resetFields();
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
