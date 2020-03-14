<template>
  <el-form
    :inline="true"
    :model="resourceDetail"
    label-width="90px"
    ref="resourceDetail"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="resourceDetail.name" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="资源描述" prop="desc">
          <el-input v-model="resourceDetail.desc" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="请求URL" prop="url">
          <el-input v-model="resourceDetail.url" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="resourceDetail.state" :readonly="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="资源CODE" prop="key">
          <el-input v-model="resourceDetail.key" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-input v-model="resourceDetail.type" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="sortNumber">
          <el-input
            v-model="resourceDetail.sortNumber"
            :readonly="true"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: "resourceDetailDialog",
  props: {
    resourceDetail: Object
  },
  data() {
    return {};
  },
  methods: {}
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
