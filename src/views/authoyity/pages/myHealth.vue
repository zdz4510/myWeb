<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="myHealth">
    <div class="top-info">
     <ve-pie :data="chartData" :settings="chartSettings" />
    </div>
    

    <!-- 编辑模态框 -->
    
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
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
      
    };
  },
  methods: {
    
  }
};
</script>

<style lang="scss">
#myHealth {
  padding: 30px;
}
</style>
