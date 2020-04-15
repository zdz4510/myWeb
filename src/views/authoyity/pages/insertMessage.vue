<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="insertMessage">
    <div class="top-info">
      <el-form :inline="true" ref="formInline"  class="demo-form-inline">
        <el-form-item label="心率：">
          <el-input
            type="number"
            v-model="formInline.heartRate"
            placeholder="请输入心率"
          ></el-input>
        </el-form-item>
        <el-form-item label="血压：">
          <el-input
            type="number"
            v-model="formInline.bloodPresure"
            placeholder="请输入血压"
          ></el-input>
        </el-form-item>
        <el-form-item label="体温：">
          <el-input
            type="number"
            v-model="formInline.templature"
            placeholder="请输入体温(华摄氏度)"
          ></el-input>
        </el-form-item>
        <el-form-item label="自我感觉：">
          <el-select v-model="formInline.fell" placeholder="请选择">
            <el-option
            v-for="item in fellList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="日期：" prop="dateTime">
          <el-date-picker
             v-model="formInline.dateTime"
             type="date"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handlerQuery('query')">查询</el-button>
            <el-button type="primary">重置</el-button>
            <el-button type="success" @click="handlerAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      <el-table-column prop="fell" label="状态"></el-table-column>
      <el-table-column prop="heartRate" label="心率"></el-table-column>
      <el-table-column prop="bloodPresure" label="血压"></el-table-column>
      <el-table-column prop="templature" label="体温"></el-table-column>
      <el-table-column prop="dateTime" label="创建日期"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="editDialog">
      <el-form :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="心率：" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="editForm.heartRate"
            placeholder="请输入心率"
          ></el-input>
        </el-form-item>
        <el-form-item label="血压：" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="editForm.bloodPresure"
            placeholder="请输入血压"
          ></el-input>
        </el-form-item>
        <el-form-item label="体温：" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="editForm.templature"
            placeholder="请输入体温(华摄氏度)"
          ></el-input>
        </el-form-item>
        <el-form-item label="自我感觉：" :label-width="formLabelWidth">
          <el-select v-model="editForm.fell" placeholder="请选择">
            <el-option
            v-for="item in fellList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：" prop="dateTime" :label-width="formLabelWidth">
          <el-date-picker
             v-model="editForm.dateTime"
             type="date"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleResetEdit('editForm')">重 置</el-button>
        <el-button type="primary" @click="handleEditSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="addDialog">
      <el-form :model="addForm" ref="addForm" :rules="rules">
        <el-form-item label="心率：" prop="heartRate" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="addForm.heartRate"
            placeholder="请输入心率"
          ></el-input>
        </el-form-item>
        <el-form-item label="血压：" prop="bloodPresure" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="addForm.bloodPresure"
            placeholder="请输入血压"
          ></el-input>
        </el-form-item>
        <el-form-item label="体温：" prop="templature" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="addForm.templature"
            placeholder="请输入体温(华摄氏度)"
          ></el-input>
        </el-form-item>
        <el-form-item label="自我感觉：" prop="fell" :label-width="formLabelWidth">
          <el-select v-model="addForm.fell" placeholder="请选择">
            <el-option
            v-for="item in fellList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：" prop="dateTime" :label-width="formLabelWidth">
          <el-date-picker
             v-model="addForm.dateTime"
             type="date"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset('addForm')">重 置</el-button>
        <el-button type="primary" @click="handleAddSure('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findMessageByMessage,deleteInsertMessage,addInsertMessage,updateInsertMessage} from "../api/insertMessage.api"
import { mapGetters, mapMutations } from "vuex";
import moment from "moment"
export default {
  name: "list",
  data() {
    return { 
      editForm: {
          id:"",
          insertMessageId:"",
          templature:"",
          bloodPresure:"",
          heartRate:"",
          fell:"良好", // 默认自我感觉良好
          dateTime:""
      },
      addForm: {
          id:"",
          insertMessageId:"",
          templature:"",
          bloodPresure:"",
          heartRate:"",
          fell:"良好", // 默认自我感觉良好
          dateTime:new Date()
      },
      formInline:{
          templature:"",
          bloodPresure:"",
          heartRate:"",
          fell:"良好", // 默认自我感觉良好
          dateTime:new Date()
          
      },
      // 自我感觉下拉框
      fellList:[{
          value: '良好',
          label: '良好'
        }, {
          value: '糟糕',
          label: '糟糕'
        }],
      tableData: [],
      tableData1: [
        {

          dateTime: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {

          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {

          dateTime: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true
        },
        {

          dateTime: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formLabelWidth: "120px",
      editDialog: false,
      addDialog:false,
      // 当前表格数量，用来新增时存放新的insertMessageId,不显示
      num:"",
      rules: {
        dateTime: [
          { message: "日期必填", required: true, trigger: "blur" }
        ],
      }
    };
  },
  computed:{
    ...mapGetters(["user"]),
  },
  created() {
    
  },
  methods: {
    //新增操作
    handlerAdd(){
      this.addDialog=true;  //弹框显示
    },
    //新增重置
    handleResetAdd() {
      this.$refs["addForm"].resetFields();
    },
    // 新增确认
    handleAddSure(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addForm.id=this.$cookies.get("mcs.id");
          this.addForm.dateTime=moment(this.addForm.dateTime).format("YYYY-MM-DD");
          this.addDialog=false;
          addInsertMessage(this.addForm).then(data=>{
            let res=data;
            if(res.data.code==200){
              this.$message({
                 message: res.data.data,
                type: "success"
              });
              this.handlerQuery();
              this.$refs["addForm"].resetFields();
            }
            else{
              this.$message({
                 message: res.data.message,
                type: "error"
              });
            }
            
          })
        }
      });
    },
    // 编辑重置
    handleResetEdit() {
      this.$refs["editForm"].resetFields();
    },
    // 编辑确认
    handleEditSure(){
      this.editForm.dateTime=moment(this.editForm.dateTime).format("YYYY-MM-DD");
      updateInsertMessage(this.editForm).then(data=>{
            let res=data;
            if(res.data.code==200){
              this.$message({
                 message: res.data.data,
                type: "success"
              });
              this.handlerQuery();
              this.$refs["editForm"].resetFields();
            }else{
              this.$message({
                  message: res,
                  type: "error"
                });
            }
            
          })
    },
    handleAdd() {},
    handleEdit(index, row) {
        this.editDialog=true;
        row.dateTime=Math.round(new Date(row.dateTime));
        this.editForm=row;
    },
    handleDelete(index, row) {
      row.dateTime=moment(row.dateTime).format("YYYY-MM-DD");
      deleteInsertMessage(row).then(data=>{
            let res=data;
            if(res.data.code==200){
              this.$message({
                 message: "删除成功",
                type: "success"
              });
            }
            this.handlerQuery();
          })
    },
    handlerQuery(val){
          let id = this.$cookies.get("mcs.id");
          this.formInline.dateTime=moment(this.formInline.dateTime).format("YYYY-MM-DD")
          let data={...this.formInline,id}
            findMessageByMessage(data).then(data=>{
            let res=data;
            if(res.data.code==200){
              this.tableData=res.data.data;
              this.num=this.tableData.length+1;
              if(val=="query"){
                this.$message({
                  message: "查询成功",
                  type: "success"
                });
              }
            }else{
              this.$message({
                  message: res.data.data,
                  type: "error"
                });
            }
            
          })
    }
  }
};
</script>

<style lang="scss">
#insertMessage {
  padding: 30px;
  .el-select {
    width: 100%;
  }
}
</style>
