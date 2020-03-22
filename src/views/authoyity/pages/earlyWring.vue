<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="earlyWring">
    <div class="top-info">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="预警状态：">
          <el-select v-model="formInline.wringStatus" placeholder="请选择">
            <el-option
                v-for="item in wringStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警类型：">
          <el-select v-model="formInline.wringType" placeholder="请选择">
            <el-option
                v-for="item in wringTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警时间：">
          <el-date-picker
             v-model="formInline.wringTime"
             type="datetime"
             placeholder="选择预警时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button type="primary">重置</el-button>
            <el-button type="primary">新增</el-button>
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
      <el-table-column prop="wringStatus" label="预警状态">
          <template slot-scope="scope">
            <span>{{scope.row.wringStatus?'已处理':'未处理'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="wringType" label="预警类型"></el-table-column>
      <el-table-column prop="wringTime" label="预警日期"></el-table-column>
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
        <el-form-item label="预警状态：">
          <el-select v-model="editForm.wringStatus" placeholder="请选择">
            <el-option
                v-for="item in wringStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警类型：">
          <el-select v-model="editForm.wringType" placeholder="请选择">
            <el-option
                v-for="item in wringTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预警时间：">
          <el-date-picker
             v-model="editForm.wringTime"
             type="datetime"
             placeholder="选择预警时间">
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
          wringTime:"",
          wringType:"",
          wringStatus:""
      },
      formInline:{
          wringTime:"",
          wringType:"",
          wringStatus:""
      },
      wringTypeList:[{
          value: 'heartRate',
          label: '心率失常'
        }, {
          value: 'bloodPresure',
          label: '血压失常'
        }, {
          value: 'templature',
          label: '体温失常'
        }, {
          value: 'fell',
          label: '自我感觉'
        }],
        wringStatusList:[{
          value: 'true',
          label: '已处理'
        }, {
          value: 'false',
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
          wringTime: "2016-05-02",
          wringType: "heratRate",
        //   bloodPresure
          wringStatus:true
        },
        {
          id: 2,
          wringTime: "2016-05-02",
          wringType: "heratRate",
        //   bloodPresure
          wringStatus:true
        },
        {
          id: 3,
          wringTime: "2016-05-02",
          wringType: "heratRate",
        //   bloodPresure
          wringStatus:true
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
          wringTime: "2016-05-02",
          wringType: "heratRate",
        //   bloodPresure
          wringStatus:true
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
#earlyWring {
  padding: 30px;
}
</style>
