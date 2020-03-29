<template>
  <div id="myFamily">
    <div class="top-info">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input
            v-model="formInline.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="关系：">
          <el-input
            v-model="formInline.relation"
            placeholder="请输入他/她与您的关系"
          ></el-input>
          <!-- <el-checkbox-group 
                v-model="formInline.relation">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group> -->
        </el-form-item>
        <el-form-item>
            <el-button type="primary">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--  label 显示关系用户姓名 -->
    <el-tab-pane label="父亲" name="first">
      <div>
        <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="与我的关系:">
          <el-input v-model="form.relation" :readonly="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="体温:">
          <el-input :readonly="isReadonly" v-model="form.templature"></el-input>
        </el-form-item>
        <el-form-item label="血压:">
          <el-input
          :readonly="isReadonly"
            type="number"
            v-model="form.bloodPresure"
            placeholder=""
          ></el-input>
        </el-form-item>
        <el-form-item label="是否健康:">
          <el-radio-group :readonly="isReadonly" v-model="form.status">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="更新时间：">
          <el-date-picker
             v-model="form.date"
             :readonly="isReadonly"
             type="datetime"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :readonly="isReadonly">保存</el-button>
          <el-button type="warning" @click="handlerEdit">编辑</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="母亲" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="妻子" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="儿子" name="fourth">定时任务补偿</el-tab-pane>
    <el-tab-pane label="女儿" name="fifth">女儿</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: "myHabit",
  data() {
    return { 
       activeName: 'second',
       form: {
         relation:"",
         templature:"",
         bloodPresure:"",
         status:"",
         date:""
        },
        formInline:{
          name:"",
          relation:""
        },
        isReadonly:true
    };
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
      },
    handlerEdit(){
      this.isReadonly=false;
    }
  }
};
</script>

<style lang="scss">
#myFamily {
  padding: 30px;
}
</style>
