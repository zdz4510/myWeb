<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="list">
    <div class="top-info">
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-form-item label="品类名称：">
          <el-input
            v-model="formInline.categoryName"
            placeholder="请输入品类名称"
          ></el-input>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="addDialog = true">新增导航</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="operation">
      <el-button size="small" type="primary" @click="addDialog = true"
        >新增</el-button
      >
      <el-button size="small" type="primary" @click="isModify"
        >修改</el-button
      >
      <el-button size="small" type="warning" @click="handleDelete"
        >删除</el-button
      >
      <el-button size="small" type="primary">导入</el-button>
      <el-button size="small" type="primary">导出</el-button>
    </div>-->

    <el-table
      ref="multipleTable"
      row-key="id"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="530px"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- @selection-change="selectCheck"
      @row-click="selectCheckBox"-->
      <!-- @select-all="selectAll" -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="name" label="类型"></el-table-column>
      <el-table-column prop="address" label="描述"></el-table-column>
      <el-table-column prop="date" label="创建人"></el-table-column>
      <el-table-column prop="date" label="创建日期"></el-table-column>

      <el-table-column align="right" label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">添加</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="addDialog">
      <el-form :model="addForm" :rules="rules">
        <el-form-item label="名称" prop="categoryCode" :label-width="formLabelWidth">
          <el-input v-model="addForm.categoryCode" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="关键字" prop="categoryName" :label-width="formLabelWidth">
          <el-input v-model="addForm.categoryName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth" prop="categoryDescription">
          <el-input v-model="addForm.categoryDescription" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="addForm.type" placeholder="请选择类型">
            <el-option label="菜单" value="shanghai"></el-option>
            <el-option label="按钮" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(addForm)">重 置</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      addForm: {},
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formLabelWidth: "150px",
      addDialog: false,
      rules: {}
    };
  },
  methods: {
    handleReset() {},
    handleAdd() {},
    handleEdit(index, row) {},
    handleDelete(index, row) {}
  }
};
</script>

<style lang="scss">
#list {
  padding: 30px;
  .el-select {
    width: 100%;
  }
}
</style>
