<template>
  <div id="baseright">
    <!-- <components :is="currrent"></components> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Hero from '../pages/hero.vue'
// import person from '../pages/person.vue'

export default {
  name: 'baseright',
  components: {
    // Hero,
    // person
  },
  data(){
      return{
          
      }
  },
  created(){

  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
#baseright {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
