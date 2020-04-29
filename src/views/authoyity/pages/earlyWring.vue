<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="earlyWring">
    <div class="top-info">
      <el-form ref="formInline" :model="formInline" :inline="true" class="demo-form-inline">
        <el-form-item label="预警状态：">
          <el-select v-model="formInline.warnStatus" placeholder="请选择">
            <el-option
                v-for="item in warnStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警类型：">
          <el-select v-model="formInline.warnType" placeholder="请选择">
            <el-option
                v-for="item in warnTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警时间：">
          <el-date-picker
             v-model="formInline.warnTime"
             type="date"
             placeholder="选择预警时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handlerQueryThis">查询</el-button>
            <el-button type="primary" @click="handlerReset('formInline')">重置</el-button>
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
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="530px"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="warnStatus" label="预警状态">
      </el-table-column>
      <el-table-column prop="warnType" label="预警类型"></el-table-column>
      <el-table-column prop="warnTime" label="预警日期"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="editDialog">
      <el-form :model="editForm" :rules="rules" :label-width="formLabelWidth">
        <el-form-item label="预警状态：">
          <el-select v-model="editForm.warnStatus" placeholder="请选择">
            <el-option
                v-for="item in warnStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警类型：">
          <el-input v-model="editForm.warnType" :readonly="true">
          </el-input>
          <!-- <el-select v-model="editForm.warnType" :readonly="true" placeholder="请选择">
            <el-option
                v-for="item in warnTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="预警时间：">
          <el-date-picker
             v-model="editForm.warnTime"
             :readonly="true"
             type="date"
             placeholder="选择预警时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset('editForm')">重 置</el-button>
        <el-button type="primary" @click="handleEitSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findAllWarn,updateWarn,deleteWarn,getWarnListByThis} from "../api/earlyWrning.api"
import moment from "moment"
import _ from "lodash"
export default {
  name: "list",
  data() {
    return { 
      editForm: {
        id:"",
        warnId:"",
        warnTime:"",
        warnType:"",
        warnStatus:""
      },
      formInline:{
        id:"",
        warnId:"",
        warnTime:new Date(),
        warnType:"体温异常",
        warnStatus:"未处理"
      },
      warnTypeList:[{
          value: '心率异常',
          label: '心率异常'
        }, {
          value: '血压异常',
          label: '血压异常'
        }, {
          value: '体温异常',
          label: '体温异常'
        }, {
          value: 'fell',
          label: '自我感觉'
        }],
        warnStatusList:[{
          value: '已处理',
          label: '已处理'
        }, {
          value: '未处理',
          label: '未处理'
        }],
      // 自我感觉下拉框
      fellList:[{
          value: 'good',
          label: '良好'
        }, {
          value: 'bad',
          label: '糟糕'
        }, {
          value: 'usual',
          label: '一般'
        }, {
          value: 'worst',
          label: '非常糟糕'
        }, {
          value: 'best',
          label: '非常好'
        }],
      tableData: [
        {
          id: 1,
          warnTime: "2016-05-02",
          warnType: "体温异常",
        //   bloodPresure
          warnStatus:true
        },
        {
          id: 2,
          warnTime: "2016-05-02",
          warnType: "体温异常",
        //   bloodPresure
          warnStatus:true
        },
        {
          id: 3,
          warnTime: "2016-05-02",
          warnType: "体温异常",
        //   bloodPresure
          warnStatus:true
        //   children: [
        //     {
        //       id: 31,
        //       date: "2016-05-01",
        //       name: "王小虎",
        //       address: "上海市普陀区金沙江路 1519 弄"
        //     },
        //     {
        //       id: 32,
        //       date: "2016-05-01",
        //       name: "王小虎",
        //       address: "上海市普陀区金沙江路 1519 弄"
        //     }
        //   ]
        },
        {
          id: 4,
          warnTime: "2016-05-02",
          warnType: "体温异常",
        //   bloodPresure
          warnStatus:true
        }
      ],
    
      formLabelWidth: "120px",
      editDialog: false,
      rules: {},
      cloneEditData:{},
      cloneIndex:""
    };
  },
  created(){
    this.handlerQuery();
  },
  methods: {
    // 查询符合条件的
    handlerQueryThis(){
      let obj={
        warnType:this.formInline.warnType,
        // warnTime:this.formInline.warnTime,
        warnTime:moment(this.formInline.warnTime).format("YYYY-MM-DD"),
        warnStatus:this.formInline.warnStatus,
        id:this.$cookies.get("mcs.id"),

      }
      getWarnListByThis(obj).then(data=>{
        let res=data;
        if(res.data.code==200){
          this.$message({
              message: "查询成功",
              type: "success"
          });
          this.tableData=res.data.data;
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
        
      })

    },
    handlerReset(FormName){
      this.formInline={
        id:"",
        warnTime:new Date(),
        warnType:"体温异常",
        warnStatus:"未处理"
      }
      this.handlerQuery();
    },
    handlerQuery(){
      let obj={
        id:this.$cookies.get("mcs.id")
      }
      findAllWarn(obj).then(data=>{
        let res=data;
        if(res.data.code==200){
          // this.$message({
          //     message: "查询成功",
          //   type: "success"
          // });
          this.tableData=res.data.data;
        }
      })
    },
    handleReset() {
      this.cloneEditData=_.cloneDeep(this.tableData[this.cloneIndex]);
      this.editForm=this.cloneEditData;
    },
    handleAdd() {},
    handleEdit(index, row) {
        this.editDialog=true;
        this.cloneIndex=_.cloneDeep(index);
        this.cloneEditData=_.cloneDeep(row);
        this.editForm=this.cloneEditData;
    },
    handleEitSure(){
      updateWarn(this.editForm).then(data=>{
        let res=data;
        this.editDialog=false;
        if(res.data.code==200){
          this.$message({
              message: "修改成功",
            type: "success"
          });
          this.handlerQuery();
        }else{
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
        
      })
    },
    handleDelete(index, row) {
      deleteWarn(row).then(data=>{
            let res=data;
            if(res.data.code==200){
              this.$message({
                 message: "删除成功",
                type: "success"
              });
            }
            this.handlerQuery();
          })
    }
  }
};
</script>

<style lang="scss">
#earlyWring {
  padding: 30px;
  .el-select {
    width: 100%;
  }
}
</style>
