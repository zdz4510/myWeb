<template>
  <div id="myFamily">
    <div class="top-info">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-tabs @tab-click="handleClick">
      <!--  label 显示关系用户姓名 -->
    <el-tab-pane v-for=" item in ralationData"
          :key="item.craftNum"
          :data="item" 
          :label="item.relation" 
          :name="item.carename">
          {{item}}
      <div>
        <el-form ref="form" :model="item" label-width="100px">
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
        <el-form-item label="饮食:">
          <el-input
            :readonly="isReadonly"
            type="number"
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
        <!-- <el-form-item label="是否健康:">
          <el-radio-group :readonly="isReadonly" v-model="item.status">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item label="更新时间：">
          <el-date-picker
             v-model="item.dateTime"
             :readonly="isReadonly"
             type="date"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :readonly="isReadonly">保存</el-button>
          <el-button type="danger" @click="handlerEdit">删除</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import {findRelationByMessage} from "../api/myFamily.api"
export default {
  name: "myHabit",
  data() {
    return { 
        formInline:{
          name:"",
          relation:""
        },
        isReadonly:true,
        ralationData:[]
    };
  },
  created(){
    this.handlerQuery();
  },
  methods: {
    //查询有多少个关联用户
    handlerQuery(){
      let obj={
        id:this.$cookies.get("mcs.id"),
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
    handleClick(tab, event) {
      console.log(tab.$attrs.data, event,"111");
      
    }
  }
};
</script>

<style lang="scss">
#myFamily {
  padding: 30px;
}
</style>
