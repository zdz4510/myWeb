<template>
  <div class="SearchHead">
    <el-card class="box-card" shadow="never">
      <template slot="header">
        <slot name="header"></slot>
      </template>
      <slot> </slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SearchHead",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.SearchHead {
  padding: 14px 16px;
  border: 1px solid #edededed;
  .el-card {
    margin-bottom: 15px;
    .el-card__header {
      padding: 16px 16px 0 16px;
    }
    .el-card__body {
      padding: 16px;
    }

    // .title {
    //   display: inline-block;
    //   width: 100%;
    //   height: 20px;
    //   line-height: 20px;
    //   font-size: 18px;
    //   color: #17233d;
    //   font-weight: 500;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    // }
    .pagination {
      margin-top: 15px;
    }
    .el-form{
      margin-bottom: -22px;
      .el-form-item{
        width: 280px;
        display: inline-block;
        .el-form-item__content{
          display: inline-block;
        }
      }
      .el-button{
        margin-bottom: 0;
      }
    }
  }
}
</style>
