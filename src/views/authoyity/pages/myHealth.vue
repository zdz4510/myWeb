<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="myHealth">
    <div class="showMessage">
      <div class="myHealth-right">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="日期：">
              <el-date-picker
                v-model="formInline.showDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                unlink-panels
                :picker-options="pickerOptions"
                style="width:270px"
              />
          </el-form-item>
          <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button  type="primary">重置</el-button>
                <el-button  type="primary">新增</el-button>
          </el-form-item>
          <div>
            <ve-line :data="chartData2"></ve-line>
          </div>
          
        </el-form>
      </div>
      <div class="myHealth-left">
        <div class="topRadio">
          <div>
            <el-radio-group v-model="radio">
              <el-radio :label="1">体温</el-radio>
              <el-radio :label="2">血压</el-radio>
              <el-radio :label="3">心率</el-radio>
              <el-radio :label="4">自我感觉</el-radio>
            </el-radio-group>
            <div class="echarts">
              <ve-pie :data="chartData"></ve-pie>
            </div>
            
            <!-- <div>
              <span>体温正常：</span>
              <ve-pie :data="chartData"></ve-pie>
            </div>
            <div>
              <span>心率正常：</span>
              <ve-pie :data="chartData"></ve-pie>
            </div>
            <div>
              <span>血压正常：</span>
              <ve-pie :data="chartData"></ve-pie>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="testMessage">
       <el-checkbox v-model="choiceTest" @change="handlerTest">是否进行心理测试</el-checkbox>
       <el-form  v-show="choiceTest" class="demo-form-inline">
          <el-form-item label="日期：">
              <el-date-picker
                v-model="formInline.showDate"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                unlink-panels
                :picker-options="pickerOptions"
                style="width:270px"
              />
          </el-form-item>
          <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button  type="primary">重置</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "myHealth",
  data() {
    let startDate = new Date();
    startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
    return { 
        formInline:{
          showDate:[startDate, new Date()]
        },
        pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 多选选中行
       radio: 3,
      //圆饼的样式
      chartData: {
        columns: ['状态', '天数'],
        rows: [
          { '状态': '正常', '天数': 1393 },
          { '状态': '不正常', '天数': 3530 },
        ]
      },
      chartData2: {
          columns: ['日期', '体温', '心率', '血压'],
          rows: [
            { '日期': '2020/1/1', '体温': 1393, '心率': 1093, '血压': 32 },
            { '日期': '2020/1/2', '体温': 3530, '心率': 3230, '血压': 26 },
            { '日期': '2020/1/3', '体温': 2923, '心率': 2623, '血压': 76 },
            { '日期': '2020/1/4', '体温': 1723, '心率': 1423, '血压': 49 },
            { '日期': '2020/1/5', '体温': 3792, '心率': 3492, '血压': 323 },
            { '日期': '2020/1/6', '体温': 4593, '心率': 4293, '血压': 78 }
          ]
      },
      // 单选是否进行心里测试
      choiceTest:false
    };
  },
  watch:{
    'radio':function(){
      this.changePieData(this.radio);
    }
  },
  methods: {
    // 选中哪个就显示哪个数据
    changePieData(val){
      console.log(val,"选中的是");
      this.chartData={
        columns: ['状态', '天数'],
        rows: [
          { '状态': '正常', '天数':3 },
          { '状态': '不正常', '天数': 4 },
        ]
      }
    },
    // 复选改变时
    handlerTest(){
      console.log(this.choiceTest);
      this.$router.push({ path: "myTest"});
    }
  }
};
</script>

<style lang="scss">
#myHealth {
  padding: 30px;
  .showMessage{
    display: flex;
  }
  .myHealth-left{
    flex: 1;
  }
  .topRadio{
    padding: 16px;
    .echarts{
      padding: 16px;
    }
  }
}
</style>
