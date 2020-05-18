<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="myHabit">
    <div class="top-info">
      <el-form :inline="true" ref="formInline" class="demo-form-inline">
        <el-form-item label="日期：">
          <el-date-picker
                v-model="formInline.dateTime"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                unlink-panels
                :picker-options="pickerOptions"
                style="width:270px"
              />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handlerQueryTime">查询</el-button>
            <el-button type="primary" @click="handlerResetQuery">重置</el-button>
            <el-button type="primary" @click="addDialog=true">新增</el-button>
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
      <el-table-column prop="checkedEats" label="饮食记录"></el-table-column>
      <el-table-column prop="sportTime" label="运动时长"></el-table-column>
      <!-- 运动时常超30分钟， 运动量充足-->
      <el-table-column prop="status" label="运动量充足">
      </el-table-column>
      <el-table-column prop="dateTime" label="创建日期"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="addDialog">
      <el-form  ref="addForm"  :model="addForm" :rules="addRules" :label-width="formLabelWidth">
        <el-form-item label="运动时长：" prop="sportTime">
          <el-input
            v-model="addForm.sportTime"
            placeholder="请输入运动时长"
          ></el-input>
        </el-form-item>
        <el-form-item label="运动量充足：">
          <el-select v-model="addForm.status" :disabled="true" placeholder="请选择">
            <el-option
              key="1"
              label="是"
              value="addForm.status">
              </el-option>
              <el-option
              key="2"
              label="否"
              value="addForm.status">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="饮食内容:" prop="checkedEats">
          <el-input type="textarea" v-model="addForm.checkedEats" placeholder="请输入饮食内容">
          </el-input>
        </el-form-item>
        <el-form-item label="日期：" prop="dateTime">
          <el-date-picker
             v-model="addForm.dateTime"
             type="date"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset('addForm')">重 置</el-button>
        <el-button type="primary" @click="handlerAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="editDialog">
      <el-form   :model="editForm" :rules="editRules" :label-width="formLabelWidth">
        <el-form-item label="运动时长：" prop="sportTime">
          <el-input
            v-model="editForm.sportTime"
            placeholder="请输入运动时长"
          ></el-input>
        </el-form-item>
        <el-form-item label="运动量充足：">
          <el-select v-model="editForm.status" :disabled="true" placeholder="请选择">
            <el-option
              key="1"
              label="是"
              value="addForm.status">
              </el-option>
              <el-option
              key="2"
              label="否"
              value="addForm.status">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="饮食内容:" prop="checkedEats">
          <el-input type="textarea" v-model="editForm.checkedEats" placeholder="请输入饮食内容">
          </el-input>
        </el-form-item>
        <el-form-item label="日期：" prop="dateTime">
          <el-date-picker
             v-model="editForm.dateTime"
             type="date"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset('editForm')">重 置</el-button>
        <el-button type="primary" @click="handleEditSure">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {findAllHabit,findAllHabitByTime,addHabit,updateHabit,deleteHabit} from  "../api/habit.api"
import moment from "moment"
import _ from "lodash"
let startDate = new Date();
startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
let end=new Date();
end.setTime(end.getTime() + 3600 * 1000 * 24);
export default {
  name: "myHabit",
  data() {
    const checkedEatsRules= (rule, value, callback) => {
        if (!value) {
            callback("饮食内容不为空");
        }else{
          callback()
        }
    };
    const dateTimeRules= (rule, value, callback) => {
        if (!value) {
            callback("时间不为空");
        }else{
          callback()
        }
    };
    const sportTimeRules = (rule, value, callback) => {
        if (value === "") {
            callback("下达数量不为空");
        }
        let reg = /^[0-9]\d*$/;
        if (!reg.test(value)) {
            callback("下达数量应只包含非零整数");
        }else{
            if(value>=30&&value<=120)
            {
              this.addForm.status="是"
            }else{
              this.addForm.status="否"
            }
            callback();
        }
    
    };
    const checkedEatsRules2= (rule, value, callback) => {
        if (!value) {
            callback("饮食内容不为空");
        }else{
          callback()
        }
    };
    const dateTimeRules2= (rule, value, callback) => {
        if (!value) {
            callback("时间不为空");
        }else{
          callback()
        }
    };
    const sportTimeRules2 = (rule, value, callback) => {
        if (value === "") {
            callback("下达数量不为空");
        }
        let reg = /^[0-9]\d*$/;
        if (!reg.test(value)) {
            callback("下达数量应只包含非零整数");
        }else{
            if(value>=30&&value<=120)
            {
              this.editForm.status="是"
            }else{
              this.editForm.status="否"
            }
            callback();
        }
    
    };
    return { 
      addDialog:false,
      editForm: {
          sportTime:"",
          checkedEats:"",
          status:"",
          dateTime:""
      },
      addForm:{
        id:"",
        habitId:"",
        sportTime:"",
        checkedEats:"",
        status:"是",
        dateTime:new Date()
      },
      formInline:{
          dateTime:[startDate, end]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [],
      formLabelWidth: "120px",
      editDialog: false,
      rules: {},
      addRules:{
        sportTime: [{ required: true, validator: sportTimeRules, trigger: "change" }],
        checkedEats: [{ required: true, validator: checkedEatsRules, trigger: "change" }],
        dateTime: [{ required: true, validator: dateTimeRules, trigger: "change" }],
      },
      editRules:{
        sportTime: [{ required: true, validator: sportTimeRules2, trigger: "change" }],
        checkedEats: [{ required: true, validator: checkedEatsRules2, trigger: "change" }],
        dateTime: [{ required: true, validator: dateTimeRules2, trigger: "change" }],
      },
      cloneEditData:{},
      cloneIndex:""
    };
  },
  created(){
    this.handlerQueryTime();
  },
  methods: {
    // 查询全部
    handlerQuery(){
      let obj={
        startTime:moment(this.formInline.dateTime[0]).format("YYYY-MM-DD"),
        endTime:moment(this.formInline.dateTime[1]).format("YYYY-MM-DD"),
        id:this.$cookies.get("mcs.id")
      }
      console.log(obj)
      findAllHabit(obj).then(data=>{
        let res=data;
        if(res.data.code==200){
          this.tableData=res.data.data;
        }
      })
    },
    // 查询时间段
    // 查询全部
    handlerQueryTime(){
      let obj={
        startTime:moment(this.formInline.dateTime[0]).format("YYYY-MM-DD"),
        endTime:moment(this.formInline.dateTime[1]).format("YYYY-MM-DD"),
        id:this.$cookies.get("mcs.id")
      }
      findAllHabitByTime(obj).then(data=>{
        this.tableData=data.data;
      })
    },
    
    //重置
    handlerResetQuery(){
      let startDate = new Date();
      let end=new Date();
      end.setTime(end.getTime() + 3600 * 1000 * 24);
      startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
      this.formInline.dateTime=[startDate, end];
      this.handlerQueryTime();
    },
    handleReset(formName) {
      if (formName == "addForm") {
        this.addForm={
          id:"",
          habitId:"",
          sportTime:"",
          checkedEats:"",
          status:"是",
          dateTime:new Date()
        }
      } else {
        this.cloneEditData=_.cloneDeep(this.tableData[this.cloneIndex]);
        this.editForm=this.cloneEditData;
      }
    },
    handlerAdd(){
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          this.addForm.id=this.$cookies.get("mcs.id");
          this.addForm.dateTime=moment(this.addForm.dateTime).format("YYYY-MM-DD")
          addHabit(this.addForm).then(data=>{
            let res=data;
            this.addDialog=false;
            if(res.data.code==200){
              this.$message({
                  message: "新增成功",
                type: "success"
              });
              this.handlerQueryTime();
            }else{
              this.$message({
                  message: res.data.message,
                type: "error"
              });
            }
          })
        } else {
          return false;
        }
      });
      
    },
    handleEdit(index, row) {
        this.editDialog=true;
        this.cloneIndex=_.cloneDeep(index);
        this.cloneEditData=_.cloneDeep(row);
        this.editForm=this.cloneEditData;
    },
    handleEditSure(){
      this.editForm.id=this.$cookies.get("mcs.id");
      this.editForm.dateTime=moment(this.editForm.dateTime).format("YYYY-MM-DD")
      updateHabit(this.editForm).then(data=>{
        let res=data;
        this.editDialog=false;
        if(res.data.code==200){
          this.$message({
              message: "编辑成功",
            type: "success"
          });
          this.handlerQueryTime();
        }else{
          this.$message({
              message: res.data.message,
            type: "error"
          });
        }
      })
    },
    handleDelete(index, row) {
      row.dateTime=moment(row.dateTime).format("YYYY-MM-DD");
      deleteHabit(row).then(data=>{
            let res=data;
            if(res.data.code==200){
              this.$message({
                 message: "删除成功",
                type: "success"
              });
            }
            this.handlerQueryTime();
          })
    }
  }
};
</script>

<style lang="scss">
#myHabit {
  padding: 30px;
  .el-select {
    width: 100%;
  }
}
</style>
