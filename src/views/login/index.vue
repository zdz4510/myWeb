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
  </div>
</template>
<script>
import { login, getResourceList,loginConfig } from "@/api/login.api.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      list: []
    };
  },
  created() {

  },
  methods: {
    // 注册
    submitCheckForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //  this.$router.push("/welcome");
          login(this.loginForm).then(res => {
            const result = res.data;
            console.log(result,"接口受窘")
            // this.$cookies.set("mcs.sessionId", data.id, { expires: "8h" });
            // const data = result.data;

            // this.$cookies.set("mcs.sessionId", data.id, { expires: "8h" });
            // this.$router.push("/welcome?systemId=" + this.loginForm.systemKey);
            // this.$store.state.userinfo.userinfo
          });
          // this.$router.push("/welcome?systemId=" + this.loginForm.systemKey);
          // this.handleGetLoginConfig();
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
          //  this.$router.push("/welcome");
          login(this.loginForm).then(res => {
            const result = res.data;
            console.log(result,"接口受窘")
            // this.$cookies.set("mcs.sessionId", data.id, { expires: "8h" });
            // const data = result.data;

            // this.$cookies.set("mcs.sessionId", data.id, { expires: "8h" });
            // this.$router.push("/welcome?systemId=" + this.loginForm.systemKey);
            // this.$store.state.userinfo.userinfo
          });
          // this.$router.push("/welcome?systemId=" + this.loginForm.systemKey);
          // this.handleGetLoginConfig();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleGetLoginConfig() {
      loginConfig({
        username: this.loginForm.username,
        password: this.loginForm.password,
        tenantCode: this.loginForm.tenantCode
      }).then(data => {
        const res = data.data;
        this.code = res.code;
        if (res.code == 200) {
          this.loginForm.tenantSiteCode = res.data[0].tenantSiteCode;
          this.loginForm.systemKey = res.data[0].systemKeyList[2];
          this.handleLoginConfirm(this.loginForm);
        } else if (res.code == 201) {
          this.dialog = true;
          this.loginConfigList = res.data;
          this.loginForm.tenantSiteCode = res.data[0].tenantSiteCode;
          this.systemKeyList = res.data[0].systemKeyList;
        } else if (res.code == 202) {
          this.dialog = true;
          this.loginConfigList = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleLoginConfirm() {
      login(this.loginForm).then(res => {
        const result = res.data;
        const data = result.data;
        if (result.code == 200) {
          this.dialog = false;
          this.$cookies.set("mcs.sessionId", data.id, { expires: "8h" });
          this.$router.push("/welcome?systemId=" + this.loginForm.systemKey);
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }

        // this.$store.state.userinfo.userinfo
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
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
