<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="myHabit">
    <div class="top-info">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="运动时长：">
          <el-input
            v-model="formInline.sportTime"
            placeholder="请输入运动时长"
          ></el-input>
        </el-form-item>
        <el-form-item label="eatDiet：">
          <el-checkbox-group 
                v-model="formInline.checkedEats">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
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
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="checkedEats" label="饮食种类"></el-table-column>
      <el-table-column prop="sportTime" label="运动时常"></el-table-column>
      <!-- 运动时常超30分钟，饮食种类包含蔬菜和肉类则为健康，否则为亚健康 -->
      <el-table-column prop="status" label="是否亚健康">
          <template slot-scope="scope">
            <span>{{scope.row.status?'是':'否'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="date" label="创建日期"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="editDialog">
      <el-form :model="editForm" :rules="rules">
        <el-form-item label="运动时长：">
          <el-input
            v-model="editForm.sportTime"
            placeholder="请输入运动时长"
          ></el-input>
        </el-form-item>
        <el-form-item label="eatDiet：">
          <el-checkbox-group 
                v-model="editForm.checkedEats">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="status：">
          <el-input
            :readonly="true"
            v-model="editForm.status"
            placeholder=""
          ></el-input>
          <!-- <el-select v-model="editForm.status" placeholder="请选择">
            <el-option
            key="1"
            label="是"
            value="editForm.status">
            </el-option>
            <el-option
            key="2"
            label="否"
            value="editForm.status">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="日期：">
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
  name: "myHabit",
  data() {
    const cityOptions = ['肉类', '蔬菜', '水果', '牛奶'];
    return { 
      cities: cityOptions,
      editForm: {
          sportTime:"",
          checkedEats:[],
          status:Boolean,
          date:""
      },
      formInline:{
          sportTime:"",
          checkedEats: ['肉类', '蔬菜'],
          date:""
      },
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          checkedEats: ['肉类', '蔬菜'],
          sportTime:"40",
          status:false,
        },
        {
          id: 2,
          date: "2016-05-02",
          name: "王小虎",
          checkedEats: ['肉类', '蔬菜'],
          sportTime:"40",
          status:false,
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          checkedEats: ['肉类', '蔬菜'],
          sportTime:"40",
          status:false,
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          checkedEats: ['肉类', '蔬菜'],
          sportTime:"40",
          status:false,
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
#myHabit {
  padding: 30px;
  .el-select {
    width: 100%;
  }
}
</style>
