<template>
  <el-form
    :model="addForm"
    :rules="rules"
    ref="addForm"
    label-width="150px"
    class="demo-ruleForm"
  >
    <el-form-item
      label="工资级别代码"
      prop="salaryLevelCode"
      :label-width="formLabelWidth"
    >
      <el-input v-model="addForm.salaryLevelCode" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="工资级别名称"
      prop="salaryLevelName"
      :label-width="formLabelWidth"
    >
      <el-input v-model="addForm.salaryLevelName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="小时工资"
      prop="hourlyWage"
      :label-width="formLabelWidth"
    >
      <el-input v-model="addForm.hourlyWage" autocomplete="off"></el-input>
    </el-form-item>
    <!-- <el-form :model="addForm" :hide-required-asterisk="true" :rules="rules">
      <el-form-item
        label="工资级别代码"
        :label-width="formLabelWidth"
        prop="salaryLevelCode"
      >
        <el-input
          v-model="addForm.salaryLevelCode"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="工资级别名称"
        :label-width="formLabelWidth"
        prop="salaryLevelName"
      >
        <el-input
          v-model="addForm.salaryLevelName"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="小时工资"
        :label-width="formLabelWidth"
        prop="hourlyWage"
      >
        <el-input v-model="addForm.hourlyWage" autocomplete="off"></el-input>
      </el-form-item>
    </el-form> -->
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: ""
      },
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
      },
      addForm: {
        salaryLevelCode: "",
        salaryLevelName: "",
        hourlyWage: ""
      }
    };
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //        ("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>
