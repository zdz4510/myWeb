<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="myHealth">
    <!-- 1111 -->
    <div class="top-info">
      <ve-pie :data="chartData"></ve-pie>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    //圆饼的样式
    return { 
        chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
        }
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
