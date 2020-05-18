<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="myHealth">
    <div class="showMessage">
      <div class="myHealth-right">
        <el-form ref="formInline" :inline="true" :model="formInline" :rules="rules" class="demo-form-inline">
          <el-form-item label="日期：" prop="showDate">
              <el-date-picker
                v-model="formInline.showDate"
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
                <el-button type="primary" @click="handlerQuery('formInline')">查询</el-button>
                <el-button  type="primary" @click.native="handlerReset">重置</el-button>
          </el-form-item>
          <div>
            <ve-line :loading="loading" :data="chartData2"></ve-line>
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
import _ from "lodash";
import moment from "moment"
import {findListInsertMessage} from "../api/insertMessage.api"
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
       radio: 1,
      // 不正常数量
       number:0,
      //圆饼的样式
      chartData: {
        columns: ['name', 'num'],
        rows: [
          { name: '正常', num: 0 },
          { name: '不正常', num: 0 },
        ]
      },
      rules: {
        showDate: [{ required: true, message: "日期不为空", trigger: "blur" }],
      },
      number1:0,
      number2:0,
      loading:false,
      chartData2: {
          columns: ['日期', '体温', '心率', '血压'],
          rows:        [
            // { '日期': '2020/1/1', '体温': 1393, '心率': 1093, '血压': 32 },
            // { '日期': '2020/1/2', '体温': 3530, '心率': 3230, '血压': 26 },
            // { '日期': '2020/1/3', '体温': 2923, '心率': 2623, '血压': 76 },
            // { '日期': '2020/1/4', '体温': 1723, '心率': 1423, '血压': 49 },
            // { '日期': '2020/1/5', '体温': 3792, '心率': 3492, '血压': 323 },
            // { '日期': '2020/1/6', '体温': 4593, '心率': 4293, '血压': 78 }
          ]
      },
      chartData2Arr:[],
      // 单选是否进行心里测试
      choiceTest:false,
      cloneData:[],
    };
  },
  watch:{
    'radio':function(){
      this.changePieData(this.radio);
    }
  },
  created(){
    // this.handlerQuery();
  },
  methods: {
    // 选中哪个就显示哪个数据
    changePieData(val){
      if(this.cloneData.length>0){
        this.changeData(this.cloneData,this.radio)
      }else{
        this.$message({
            message: "请先查询",
            type: "warning"
          });
      }
    },
    // 复选改变时
    handlerTest(){
      this.$router.push({ path: "myTest"});
    },
    handlerReset(){
      let startDate = new Date();
      startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
      this.formInline={
          showDate:[startDate, new Date()]
        }
      this.handlerQuery('formInline');
    },
    handlerQuery(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading=true;
          let id = this.$cookies.get("mcs.id");
          let data={
            startTime: moment(this.formInline.showDate[0]).format("YYYY-MM-DD"),
            endTime: moment(this.formInline.showDate[1]).format("YYYY-MM-DD"),
            id:id
          }
          setTimeout(() =>{
            findListInsertMessage(data).then(data=>{
            let res=data.data;
            this.cloneData=_.cloneDeep(res);
            this.changeData(res,this.radio);
            let arr=[];
            let obj={
              dateTime:"",
              templature:"",
              heartRate:"",
              bloodPresure:""
            }
            res.forEach(item=>{
              obj.dateTime=item.dateTime
              obj.templature=item.templature
              obj.heartRate=item.heartRate
              obj.bloodPresure=item.bloodPresure
              arr.push(obj);
            })
            let a =JSON.parse(JSON.stringify(res).replace(/dateTime/g,"日期"));
            let b=JSON.parse(JSON.stringify(a).replace(/templature/g,"体温"));
            let c=JSON.parse(JSON.stringify(b).replace(/heartRate/g,"心率"));
            let d=JSON.parse(JSON.stringify(c).replace(/bloodPresure/g,"血压"));
            this.chartData2.rows=d;
            this.loading=false;
          })
          },1000);
        } else {
          return false;
        }
      });
      
      
    },
    changeData(data,radio){
      if(radio==1){
        let length=data.length;
        this.number2=0;
        data.forEach(item=>{
          if(item.templature>37.3||item.templature<35.5){
            this.number2++;
          }
        })
        this.number1=length-this.number2;
        const { rows } = this.chartData;
        rows.forEach((item) => {
          if (item.name === "正常") {
            item.num = this.number1;
          }
          if (item.name === "不正常") {
            item.num = this.number2;
          }
        });
        this.chartData={
          ...this.chartData,
          rows
        }
      }
      if(radio==2){
        let length=data.length;
        this.number2=0;
        data.forEach(item=>{
          if(item.bloodPresure>140||item.templature<90){
            this.number2++;
          }
        })
        this.number1=length-this.number2;
        const { rows } = this.chartData;
        rows.forEach((item) => {
          if (item.name === "正常") {
            item.num = this.number1;
          }
          if (item.name === "不正常") {
            item.num = this.number2;
          }
        });
        this.chartData={
          ...this.chartData,
          rows
        }
      }
      if(radio==3){
        let length=data.length;
        this.number2=0;
        data.forEach(item=>{
          if(item.heartRate>140||item.heartRate<90){
            this.number2++;
          }
        })
        this.number1=length-this.number2;
        const { rows } = this.chartData;
        rows.forEach((item) => {
          if (item.name === "正常") {
            item.num = this.number1;
          }
          if (item.name === "不正常") {
            item.num = this.number2;
          }
        });
        this.chartData={
          ...this.chartData,
          rows
        }
      }
      if(radio==4){
        let length=data.length;
        this.number2=0;
        data.forEach(item=>{
          if(item.fell=="糟糕"){
            this.number2++;
          }
        })
        this.number1=length-this.number2;
        const { rows } = this.chartData;
        rows.forEach((item) => {
          if (item.name === "正常") {
            item.num = this.number1;
          }
          if (item.name === "不正常") {
            item.num = this.number2;
          }
        });
        this.chartData={
          ...this.chartData,
          rows
        }
      }
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
