<template>
  <!-- huyoujuan 2019年12月17日14:04:34 -->
  <div>
    <!-- <el-button :plain="true" @click="message">消息</el-button> -->
    <div class="top-info">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="工资级别名称：">
          <el-input v-model="formInline.user" placeholder="请输入工资级别"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button type="warning">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="addDialog = true">新增</el-button>
      <el-button size="small" type="primary" @click="modifyDialog = true">修改</el-button>
      <el-button size="small" type="warning" @click="deleteDialog = true">删除</el-button>
      <el-button size="small" type="primary">导入</el-button>
      <el-button size="small" type="primary">导出</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="selectCheckBox"
      @select="selectCheckBox"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="salaryLevelCode" label="工资级别代码"></el-table-column>
      <el-table-column prop="salaryLevelName" label="工资级别名称"></el-table-column>
      <el-table-column prop="hourlyWage" label="小时工资"></el-table-column>
      <el-table-column prop="createUserName" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="->,total,prev,pager,next"
      :total="tableData.length"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="addDialog" @close="handleReset(addForm)">
      <el-form :model="addForm" :rules="rules">
        <el-form-item label="工资级别代码" prop="salaryLevelCode" :label-width="formLabelWidth">
          <el-input v-model="addForm.salaryLevelCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工资级别名称" prop="salaryLevelName" :label-width="formLabelWidth">
          <el-input v-model="addForm.salaryLevelName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小时工资" prop="hourlyWage" :label-width="formLabelWidth">
          <el-input v-model="addForm.hourlyWage" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(addForm)">重 置</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改模态框 -->
    <el-dialog title="修改" :visible.sync="modifyDialog" @close="handleReset(modifyForm)">
      <el-form :model="modifyForm" :rules="rules">
        <el-form-item label="工资级别代码" prop="salaryLevelCode" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.salaryLevelCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工资级别名称" prop="salaryLevelName" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.salaryLevelName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="小时工资" prop="hourlyWage" :label-width="formLabelWidth">
          <el-input v-model="modifyForm.hourlyWage" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(modifyForm)">重 置</el-button>
        <el-button type="primary" @click="handleUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除模态框 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSalaryLevelPage,
  addSalaryLevel,
  updateSalaryLevel,
  deleteSalaryLevel
} from "../../../api/base/salary.api";
// const tableData = [];
export default {
  data() {
    return {
      input1: "",
      input2: "",
      formInline: {
        user: "",
        region: ""
      },
      tableData: [],
      formLabelWidth: "120px",
      //分页
      currentPage: 1,
      pagesize: 2,
      // 新增模态框
      addDialog: false,
      addForm: {
        salaryLevelCode: "",
        salaryLevelName: "",
        hourlyWage: ""
      },
      // 修改模态框
      modifyDialog: false,
      modifyForm: {
        salaryLevelCode: "",
        salaryLevelName: "",
        hourlyWage: ""
      },
      //删除模态框
      deleteDialog: false,
      //table的checkbox所选项
      selectData: [],
      rules: {
        // name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        salaryLevelCode: [
          { required: true, message: "请输入工资级别代码", trigger: "blur" }
        ],
        salaryLevelName: [
          { required: true, message: "请输入工资级别名称", trigger: "blur" }
        ],
        hourlyWage: [
          { required: true, message: "请输入小时工资", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    //初始化数据
    init() {
      const data = {
        currentPage: 1,
        pageSize: 10,
        salaryLevelName: this.formInline.user
      };
      getSalaryLevelPage(data).then(data => {
        this.tableData = data.data.data;
        this.formInline.user = "";
      });
    },
    handleSelectionChange() {},
    //更改当前页码
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //重置输入框
    handleReset(form) {
      form.salaryLevelCode = "";
      form.salaryLevelName = "";
      form.hourlyWage = "";
    },
    selectCheckBox(row) {
      this.$refs.multipleTable.toggleRowSelection(row);

      //  把当前需要编辑的存储起来
      this.modifyForm = row;
    },
    /**查询工资级别信息 */
    handleQuery() {
      this.init();
    },
    /**新增工资级别信息 */
    handleAdd() {
      //工资级别代码未输入
      if (this.addForm.salaryLevelCode === "") {
        this.$message({
          message: "工资级别代码不能为空",
          type: "warning"
        });
        return;
      }
      //工资级别名称未输入，必须为中文
      if (this.addForm.salaryLevelName === "") {
        this.$message({
          message: "工资级别名称不能为空",
          type: "warning"
        });
        return;
      }
      //小时工资未输入
      if (this.addForm.hourlyWage === "") {
        this.$message({
          message: "小时工资不能为空",
          type: "warning"
        });
        return;
      }
      this.message = true;
      const data = {
        hourlyWage: parseFloat(this.addForm.hourlyWage),
        modifyUserId: "string",
        modifyUserName: "string",
        salaryLevelCode: this.addForm.salaryLevelCode,
        salaryLevelName: this.addForm.salaryLevelName,
        tenantSiteCode: "string"
      };
      addSalaryLevel(data).then(data => {
        if (data === this.addForm.salaryLevelCode) {
          this.addDialog = false;
          this.handleReset(this.addForm);
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.init();
        } else {
          this.$message({
            message: data,
            type: "warning"
          });
        }
      });
    },
    /**修改工资级别信息 */
    handleUpdate() {
      //工资级别名称未输入，必须为中文
      if (this.modifyForm.salaryLevelName === "") {
        this.$message({
          message: "工资级别名称不能为空",
          type: "warning"
        });
        return;
      }
      //小时工资未输入
      if (this.modifyForm.hourlyWage === "") {
        this.$message({
          message: data,
          type: "warning"
        });
        return;
      }
      const data = {
        hourlyWage: this.modifyForm.hourlyWage,
        salaryLevelCode: this.modifyForm.salaryLevelCode,
        salaryLevelName: this.modifyForm.salaryLevelName,
        tenantSiteCode: "string"
      };
      updateSalaryLevel(data).then(data => {
        if (data === this.modifyForm.salaryLevelCode) {
          this.modifyDialog = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.init();
        } else {
          this.$message({
            message: data,
            type: "warning"
          });
        }
      });
    },
    /**删除工资级别信息 */
    handleDelete() {
      const data = {
        salaryLevelCode: this.modifyForm.salaryLevelCode,
        tenantSiteCode: "string"
      };
      deleteSalaryLevel(data).then(data => {
        if (data === this.modifyForm.salaryLevelCode) {
          this.deleteDialog = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message({
            message: data,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-input {
  display: inline;
}
.el-input .el-input__inner {
  width: 75%;
  height: 36px;
}

.el-tag {
  margin-right: 10px;
}

.top-info .el-form-item__label {
  padding-right: 10px;
}
.top-info .el-form-item__content {
  line-height: 80px;
}
.top-info .el-button {
  padding: 10px 40px;
}
.top-info .el-form {
  height: 100%;
}
.operation {
  margin: 10px 0;
  padding: 0 20px;
}
</style>
