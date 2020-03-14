<template>
  <div id="myHealth">
     111
    <!-- <ve-pie :data="chartData" :settings="chartSettings" /> -->
    
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
    //圆饼的样式
    this.chartSettings = {
      radius: 80.5,
      offsetY: 138
      // label: {
      //   position: "inside"
      // }
    };
    return {
        chartData: {
        columns: ["完成情况", "分配数"],
        rows: [
          { 完成情况: "未完成", 分配数: 0 },
          { 完成情况: "已完成", 分配数: 0 }
            ]
        },
    }
    
  },
  created(){

  },
  methods:{

  }

}
</script>


