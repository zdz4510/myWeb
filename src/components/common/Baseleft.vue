<template>
  <div id="baseleft">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <router-link to="/Hero">
        <el-menu-item index="1">
          <span slot="title">数据采集</span>
        </el-menu-item>
      </router-link>
      <router-link to="/MyHealth">
        <el-menu-item index="2">
          <span slot="title">个人健康</span>
        </el-menu-item>
      </router-link>
      <router-link to="/Person">
        <el-menu-item index="3">
          <span slot="title">我的</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'baseleft',
  components: {
    // HelloWorld
    
  },
  created(){

  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
#baseleft {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .el-menu-item{
    list-style-type:none;
  }
  // .el-menu-item:hover, .el-menu-item:focus,.el-menu-item.is-active{
  //   background-color: #fff !important;
  //   opacity: 0.8;
  // }
  .el-menu-item.is-active {
    color: #fff;
  }
}
</style>
