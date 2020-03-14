<template>
  <div class="function-menu-edit-dialog">
    <el-form
      :inline="true"
      :model="editDialog"
      label-width="110px"
      :rules="editDialogRules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态类型" prop="aaa">
            <el-select v-model="editDialog.aaa" placeholder="状态类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单CODE" prop="aaa">
            <el-input
              v-model="editDialog.aaa"
              placeholder="菜单CODE"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单英文名称">
            <el-input
              v-model="editDialog.aaa"
              placeholder="菜单英文名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单路径">
            <el-input
              v-model="editDialog.aaa"
              placeholder="菜单路径"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单图标">
            <el-input
              v-model="editDialog.aaa"
              placeholder="菜单图标"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="editDialog.aaa">
              <el-radio label="有效"></el-radio>
              <el-radio label="无效"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统模块" prop="111">
            <el-select v-model="editDialog.aaa" placeholder="系统模块">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单中文名称" prop="aaa">
            <el-input
              v-model="editDialog.aaa"
              placeholder="菜单中文名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上级菜单">
            <el-input
              v-model="editDialog.aaa"
              placeholder="上级菜单"
            ></el-input>
          </el-form-item>
          <el-form-item label="对应页面">
            <el-input
              v-model="editDialog.aaa"
              placeholder="对应页面"
            ></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="aaa">
            <el-input v-model="editDialog.aaa" placeholder="排序"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editDialog: {
        aaa: ""
      },
      editDialogRules: {
        aaa: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  }
};
</script>

<style></style>
