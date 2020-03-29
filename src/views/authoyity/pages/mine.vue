<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="mine">
    <el-form :model="numberValidateForm" ref="numberValidateForm" class="demo-form-inline">
      <el-form-item
        label="姓名"
        prop="userName"
        :rules="[
          { required: true, message: '姓名不能为空'},
        ]"
      >
        <el-input  v-model.number="numberValidateForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="年龄"
        prop="age"
        :rules="[
          { required: true, message: '年龄不能为空'},
          { type: 'number', message: '年龄必须为数字值'}
        ]"
      >
        <el-input v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="电话"
        prop="userTelphone"
        :rules="[
          { required: true, message: '电话号码不能为空'},
          { type: 'number', message: '电话号码必须为数字值'}
        ]"
      >
        <el-input v-model.number="numberValidateForm.userTelphone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="家庭住址"
        prop="userAddress"
        :rules="[
          { required: true, message: '家庭住址不能为空'},
        ]"
      >
        <el-input v-model.number="numberValidateForm.userAddress" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="紧急联系人"
        prop="userSos"
        :rules="[
          { required: true, message: '紧急联系人不能为空'},
        ]"
      >
        <el-input  v-model.number="numberValidateForm.userSos" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="紧急联系人电话"
        prop="userSosTel"
        :rules="[
          { required: true, message: '紧急联系人电话不能为空'},
        ]"
      >
        <el-input  v-model.number="numberValidateForm.userSosTel" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
        <el-button @click="resetForm('numberValidateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "myHabit",
  data() {
    return { 
       numberValidateForm: {
         userName:"",
          age: "",
          userTelphone:"",
          userAddress:"",
          userSos:"",
          userSosTel:""
        }
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  }
};
</script>

<style lang="scss">
#mine {
}
</style>
