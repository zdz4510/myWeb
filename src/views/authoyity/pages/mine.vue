<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="mine">
    <el-form :model="numberValidateForm" :inline="true"  ref="numberValidateForm" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="用户名:"
            prop="username"
            :rules="[
              { required: true, message: '用户名不能为空'},
            ]"
          >
            <el-input :readOnly="visableBtn"  v-model.number="numberValidateForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="姓名:"
            prop="realname"
            :rules="[
              { required: true, message: '真实姓名不能为空'},
            ]"
          >
            <el-input :readOnly="visableBtn"  v-model.number="numberValidateForm.realname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="年龄:"
            prop="age"
            :rules="[
              { required: true, message: '年龄不能为空'},
              { type: 'number', message: '年龄必须为数字值'}
            ]"
          >
            <el-input :readOnly="visableBtn" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="电话:"
            prop="iphone"
            :rules="[
              { required: true, message: '电话号码不能为空'},
              { type: 'number', message: '电话号码必须为数字值'}
            ]"
          >
            <el-input :readOnly="visableBtn" v-model.number="numberValidateForm.iphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="紧急联系人:"
            prop="emergencyContact"
            :rules="[
              { required: true, message: '紧急联系人不能为空'},
            ]"
          >
            <el-input :readOnly="visableBtn"  v-model.number="numberValidateForm.emergencyContact" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="紧急联系人电话:"
            prop="emergencyContactIphone"
            :rules="[
              { required: true, message: '紧急联系人电话不能为空'},
            ]"
          >
            <el-input :readOnly="visableBtn"  v-model.number="numberValidateForm.emergencyContactIphone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="家庭住址:"
            prop="address"
            :rules="[
              { required: true, message: '家庭住址不能为空'},
            ]"
          >
            <el-input :readOnly="visableBtn" v-model.number="numberValidateForm.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="12">
           <el-form-item
          >
            <el-upload
            :readOnly="visableBtn"
            class="avatar-uploader"
            :action="`${host}file/fileUpload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :http-request="request"
            :on-change="uploadFile"
            :before-upload="beforeAvatarUpload"
          >
          <div class="image" >
              <el-image  :src="numberValidateForm.picture"></el-image>
            </div>
          </el-upload>
          </el-form-item>
           
        </el-col>
      </el-row>
      <div class="submitStyle">
        <el-form-item>
          <el-button type="primary" @click="editForm">编辑</el-button>
          <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </div>
      
    </el-form>
  </div>
</template>

<script>
import {uploadImg} from "../api/mine.api"
import {userInfo,updateUserInfo} from "../api/myInfo.api"
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "myHabit",
  data() {
    return { 
      host: `${window.VUE_APP_URL}`,
      visableBtn:true,
      numberValidateForm: {
        realname:"",
        username:"",
        age: "",
        headImg:"",
        iphone:"",
        address:"",
        emergencyContact:"",
        emergencyContactIphone:"",
        picture:""
      }
    };
  },
  computed:{
    ...mapGetters(["user"]),
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      userInfo(this.user).then(data=>{
        const res=data;
        this.numberValidateForm= {
          username:res.data.data.username,
          age: res.data.data.age,
          headImg:res.data.data.headImg,
          iphone:res.data.data.iphone,
          address:res.data.data.address,
          emergencyContact:res.data.data.emergencyContact,
          emergencyContactIphone:res.data.data.emergencyContactIphone,
          realName:res.data.data.realName
        }
      })
    },
    editForm(){
      this.visableBtn=false;
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            updateUserInfo(this.numberValidateForm).then(data=>{
            let res=data;
            if(res.data.code==200){
              this.$message({
                 message: "修改成功",
                type: "success"
              });
            }
            console.log("2222",res.data);
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess() {
      console.log("success");
    },
    beforeAvatarUpload() {
      console.log('after')
    },
    request(){

    },
    // 图片上传
    uploadFile(file){
      // console.log('aaaaa')
      uploadImg(file.raw).then(data=>{
        let res=data.data;
        // console.log(res.data,'返回的数据');
        this.numberValidateForm.picture=res.data;
      })
    },
  }
};
</script>

<style lang="scss">
#mine {
  .el-image{
    width: 400px;
    height: 600px;
  }
  .el-input{
    width: 400px;
  }
  .submitStyle{
    display: flex;
    justify-content: center;
  }
}
</style>
