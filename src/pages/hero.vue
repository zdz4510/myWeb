<template>
  <div id="baseright2">
    <SearchHead>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <!-- 卡片内容 -->
      <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
        <el-form-item label="体温:">
          <el-input type="number" v-model="formInline.temperature" placeholder="请输入华摄氏度"></el-input>
        </el-form-item>
        <el-form-item label="心率:">
          <el-input type="number" v-model="formInline.heartRate" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="血压:">
          <el-input type="number" v-model="formInline.bloodPressure" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            v-model="formInline.date"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <!-- <el-input v-model="formInline.date" placeholder=""></el-input> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click.native="handleQuery">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click.native="handleResetQuery">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click.native="handleInsert">录入</el-button>
        </el-form-item>
      </el-form>
    </SearchHead>
    
       <el-table
        :data="tableData"
        stripe
        align="center"
        style="width: 100%">
        <el-table-column
          prop="date"
          align="center"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'baseright2',
  components: {
    // HelloWorld
    
  },
  data(){
    return {
    formInline: {
        temperature: "",
        bloodPressure: "",
        heartRate:"",
        date:''
      },
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
    }
  },
  created(){

  },
  methods:{
    handleQuery(){
      alert("查询")
    },
    handleResetQuery(){
      alert("重置")
    },
    queryActionCode(){
      alert("动作查询")
    },
  }

}
</script>

<style lang="scss" scoped>
#baseright2 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .el-table .warning-row {
    background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
    .el-table  .cell{
      color: red;
      text-align: center;
    }
}

</style>
