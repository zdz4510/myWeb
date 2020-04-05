<template>
  <div class="bglogin">
    <div class="loginForm">
      <el-form :model="loginForm" ref="loginForm" label-width="100px" class="demo-dynamic">
        <el-form-item
          prop="username"
          label="用户名:"
          :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' },
    ]"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          label="密码:"
          :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' },
    ]"
        >
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>

        <!-- <el-form-item
          prop="systemKey"
          :rules="[{ required: true, message: '请输入系统', trigger: 'blur' }]"
        >
          <dsn-select size="medium" palceholder="请输入系统" v-model="loginForm.systemKey">
            <el-option v-for="item  in systemKeyList" :key="item" :label="item" :value="item"></el-option>
          </dsn-select>
          <span class="left">
            <i class="icon-xitong iconfont"></i>
          </span>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          <el-button type="primary" @click="submitCheckForm('loginForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>注册成功，是否立即登录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">否</el-button>
        <el-button type="primary" @click="handlerSure">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { login,userAdd } from "@/api/login.api.js";
export default {
  name: "login",
  data() {
    return {
      dialogVisible:false,
      loginForm: {
        username: "",
        password: "",
      },
      list: []
    };
  },
  computed:{
    ...mapGetters(["user"]),
  },  
  created() {

  },
  methods: {
    ...mapMutations(["USER"]),
    handleClose(){
      this.dialogVisible=false;
    },
    handlerSure(){
      this.dialogVisible=false;
      this.submitForm("loginForm");
    },
    // 注册
    submitCheckForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.$router.push("/welcome");
          userAdd(this.loginForm).then(res => {
            if(res.data.code==200){
              const result = res.data;
              this.dialogVisible=true;
              this.USER(this.loginForm);
              // this.$cookies.set("mcs.sessionId", result.data, { expires: "8h" });
            }else{
              this.$message({
                 message: res.data.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login(this.loginForm).then(res => {
            if(res.data.code==200){
              const result = res.data;
              this.$cookies.set("mcs.sessionId", result.data, { expires: "8h" });
              this.USER(this.loginForm);
              this.$router.push("/welcome");
            }else{
              this.$message({
                 message: res.data.message,
                type: "warning"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style lang="scss">
.bglogin {
  .el-form-item__label {
    color: #fff;
  }
  .bglogin {
    background: url("~@/assets/timg.jpeg") center center no-repeat;
    height: 100%;
    width: 100%;
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  .loginForm {
    width: 50%;
    height: 250px;
    padding: 2%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
