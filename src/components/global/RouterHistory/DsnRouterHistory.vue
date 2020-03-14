<template>
  <div class="router-history">
    <slot> </slot>
    <div class="dsn-router-history-item" style="margin-left:auto;margin-right:0">
      <el-popover
        :popper-append-to-body='false'
        :visible-arrow = 'false'
        placement="top-start"
        width="100"
        trigger="click"
        class='popper-class'>
        <div class="dsn-router-history-box"  slot="reference">
          <i class="el-icon-arrow-down"></i>
        </div>
        <div>
          <ul class="dropdown-menu">
            <li class="dropdown-item"><i class="el-icon-back"></i>
                关闭左侧
            </li><li class="dropdown-item"><i class="el-icon-right"></i>
                关闭右侧
            </li><li class="dropdown-item"><i class="el-icon-close"></i>
                关闭其它
            </li><li class="dropdown-item"><i class="el-icon-error"></i>
                全部关闭
            </li></ul>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "dsnRouterHistory",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
/deep/ .el-popper[x-placement^="bottom"] {
  min-width: 100px;
  padding: 0!important;
}
.dropdown-menu {
  .dropdown-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #515a6e;
    font-size: 14px!important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
    &:hover {
      background: #f3f3f3;
    }
  }
}
</style>
<style lang="scss">

.router-history {
  height: 32px;
  background: #f5f7f9;
  padding: 6px 15px;
  display: flex; 

}
.btn-down {
  padding-left: 16px;
  padding-right: 16px;
  text-align: center;
  background-color: #fff;
  border-radius: 2px;
  cursor: pointer;
  color: #515a6e;
  font-weight: 400
}
</style>
