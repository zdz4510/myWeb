<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="insertMessage">
    <div class="top-info">
      <el-form :inline="true" class="demo-form-inline">
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
        <el-form-item label="日期：">
          <el-date-picker
             v-model="formInline.date"
             type="datetime"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">重置</el-button>
            <el-button type="primary">添加</el-button>
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
      row-key="id"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="530px"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="fell" label="状态"></el-table-column>
      <el-table-column prop="heartRate" label="心率"></el-table-column>
      <el-table-column prop="bloodPresure" label="血压"></el-table-column>
      <el-table-column prop="templature" label="体温"></el-table-column>
      <el-table-column prop="date" label="创建日期"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑模态框 -->
    <el-dialog title="新增" :visible.sync="editDialog">
      <el-form :model="editForm" :rules="rules">
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
        <el-form-item label="日期：" :label-width="formLabelWidth">
          <el-date-picker
             v-model="editForm.date"
             type="datetime"
             placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(editForm)">重 置</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return { 
      editForm: {
          templature:"",
          bloodPresure:"",
          heartRate:"",
          fell:"good", // 默认自我感觉良好
          date:""
      },
      formInline:{
          templature:"",
          bloodPresure:"",
          heartRate:"",
          fell:"good", // 默认自我感觉良好
          date:""
      },
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
          date: "2016-05-02",
          name: "王小虎",
          fell: "良好",
          bloodPresure:"120",
          heartRate:"90",
          templature:"36.5"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          fell: "良好",
          bloodPresure:"120",
          heartRate:"90",
          templature:"36.5"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          fell: "良好",
          bloodPresure:"120",
          heartRate:"90",
          templature:"36.5"
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
          date: "2016-05-03",
          name: "王小虎",
          fell: "良好",
          bloodPresure:"120",
          heartRate:"90",
          templature:"36.5"
        }
      ],
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formLabelWidth: "120px",
      editDialog: false,
      rules: {}
    };
  },
  methods: {
    handleReset() {},
    handleAdd() {},
    handleEdit(index, row) {
        this.editDialog=true;
        this.editForm=row;
    },
    handleDelete(index, row) {
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
