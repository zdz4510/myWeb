<template>
  <div id="layout">
    <DsnHeader   @handleCloseOrOpen="handleCloseOrOpen" />
    <DsnLeftMenu  ref="leftMenu" @handleCollapse="handleCollapse" />
    <div class="content" :class="isCollapse ? 'active' : ''">
    
      <div class="pageContent">
        <!-- <div class="routerHistory">
          <dsn-router-history>
            <dsn-router-history-item
              @close="close"
              v-for="item in historyList"
              :key="item.name"
              :item="item"
              @toPage="toPage"
            >
            </dsn-router-history-item>
          </dsn-router-history>
        </div> -->
        <div class="well">
          <router-view></router-view>
        </div>
        
      </div>
    </div>
    <DsnFooter v-if="false" />
  </div>
</template>

<script>
import DsnFooter from "./dsn-footer";
import DsnHeader from "./dsn-header";
import DsnLeftMenu from "./dsn-left-menu";
import { mapGetters, mapMutations,mapActions } from "vuex";
// import { getResourceList } from "@/api/login.api.js";
export default {
  name: "Layout",
  components: {
    DsnFooter,
    DsnHeader,
    DsnLeftMenu
  },
  computed: {
    ...mapGetters(["historyList"])
  },
  created(){
      // this.getSystwmId('SYS')
  },
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    ...mapMutations(["PUSH","POP"]),
     ...mapActions([
          'getUserInfo'
      ]),
    handleCollapse(status) {
      this.isCollapse = status == 1 ? true : false;
    },
    handleCloseOrOpen(){
        this.isCollapse = !this.isCollapse 
        this.$refs['leftMenu'].toggle();
    },
    close(item) {
       this.POP(item)
    },
    toPage(item){
      
      this.$router.push({name:item.name})
    },
    //  getSystwmId(type){
      // getResourceList({
      //   type:"SYSTEM"
      // }).then(
      //   data=>{
      //     const res = data.data;
      //     if(res.code==200){
      //           const arr = res.data.data;
      //          const item = arr.find(item=>{
      //               return item.key==type
      //           })

      //           this.getUserInfo(item.id)
      //       }
      //   }
      // )
    // },
  }
};
</script>

<style lang="scss" scoped>
#layout {
   position: relative;
   height: 100%;
    background: #f5f7f9;
  .well {
    margin: 0 15px;
    background: #fff;
    padding: 15px;
    border-radius: 4px;
  }
  .content {
    padding: 64px 0px 10px 60px;
    background: #f5f7f9;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    &.active {
      padding-left: 256px;
    }
    .routerHistory {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;  
      // &::-webkit-scrollbar-thumb {
      //   //滚动条里面小方块/
      //   border-radius: 1px;
      //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      //   background: rgb(26, 153, 111);
      //   //滚动条颜色/
      //  }
      // &::-webkit-scrollbar-track {
      //   //滚动条里面轨道/
      //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      //   border-radius: 1px;
      //   background: yellow;
      // }
    }

    .pageContent {
      // padding:15px;
      // flex: 1;
      // overflow: hidden;
      // overflow-y: scroll;
     
      
    }
  }
}
</style>
