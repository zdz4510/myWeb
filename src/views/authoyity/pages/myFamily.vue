<template>
  <div id="myFamily">
    <div class="top-info">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-button type="primary" @click="handlerAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div 
      v-for=" item in ralationData"
      :key="item.craftNum"
      :data="item" 
      :label="item.relation" 
      :name="item.carename"
      style="margin-right:16px;background-color:#c9cbcf">
        <el-form ref="form" :model="item" label-width="120px">
        <el-form-item label="关联用户姓名:">
        <el-input v-model="item.carename" :readonly="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="与我的关系:">
          <el-input v-model="item.relation" :readonly="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="体温:">
          <el-input :readonly="isReadonly" v-model="item.templature"></el-input>
        </el-form-item>
        <el-form-item label="血压:">
          <el-input
            :readonly="isReadonly"
            type="number"
            v-model="item.bloodPresure"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="心率:">
          <el-input
            :readonly="isReadonly"
            type="number"
            v-model="item.heartRate"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="饮食:">
          <el-input
            :readonly="isReadonly"
            v-model="item.checkedEats"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="运动时长:">
          <el-input
            :readonly="isReadonly"
            type="number"
            v-model="item.sportTime"
            placeholder=""
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="新增" :visible.sync="addDialog">
      <el-form :model="addForm" ref="addForm">
        <el-form-item label="关联用户名：" prop="carename" :label-width="formLabelWidth">
          <el-input
            v-model="addForm.carename"
            placeholder="请输入关联用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="关系：" prop="relation" :label-width="formLabelWidth">
          <el-input
            v-model="addForm.relation"
            placeholder="请输入关系"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleResetAdd('addForm')">重 置</el-button>
        <el-button type="primary" @click="handleAddSure('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findRelationByMessage,addUserRelationHttp} from "../api/myFamily.api"
export default {
  name: "myHabit",
  data() {
    return { 
        formLabelWidth:"120px",
        formInline:{
          name:"",
          relation:""
        },
        isReadonly:true,
        ralationData:[],
        addDialog:false,
        addForm:{
          relation:"",
          carename:"",
        }
    };
  },
  created(){
    this.handlerQuery();
  },
  methods: {
    // 新增关联用户
    handlerAdd(){
      this.addDialog=true;
    },
    handleResetAdd(){
      this.addForm={
        relation:"",
        carename:"",
      }
    },
    handleAddSure(){
      let data={
        id:this.$cookies.get("mcs.id"),
        send:"true",
        sure:"false",
        ...this.addForm
      }
      addUserRelationHttp(data).then(data=>{
        let res=data;
        if(res.data.code==200){
          this.$message({
              message: "新增成功",
              type: "success"
          });
          this.addDialog=false;
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      })
    },
    //查询有多少个关联用户
    handlerQuery(){
      let obj={
        id:this.$cookies.get("mcs.id"),
        sure:"true",
        send:"true"
      }
      findRelationByMessage(obj).then(data=>{
        let res=data;
        if(res.data.code==200){
          this.$message({
              message: "查询成功",
              type: "success"
          });
          this.ralationData=res.data.data;
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      })
    },
    // handleClick(tab, event) {
    //   console.log(tab.$attrs.data, event,"111");
      
    // }
  }
};
</script>

<style lang="scss">
#myFamily {
  padding: 30px;
}
</style>
