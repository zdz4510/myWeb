<template>
  <div class="role">
    <div class="top-info">
      <el-form :inline="true" :model="roleForm" class="demo-form-inline">
        <el-form-item label="用户id:">
          <el-input v-model.trim="roleForm.keyword" placeholder="请输入用户id"></el-input>
        </el-form-item>
        <el-form-item label="用户名称:">
          <el-input v-model.trim="roleForm.keyword" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="角色编码:">
          <el-input v-model.trim="roleForm.keyword" placeholder="角色编码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
          <el-button type="primary" size="small" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="handleAdd">新增</el-button>
      <el-button size="small" type="primary" @click="handleEdit">修改</el-button>
      <el-button type="primary" size="small" @click="handleDetail">查看详情</el-button>
      <el-button size="small" type="primary" @click="checkDeleteLength">删除</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="530px"
      @selection-change="selectCheck"
      @row-click="selectCheckBox"
      @select-all="selectAll"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="租户" width="130"></el-table-column>
      <el-table-column prop="desc" label="SITE" width="130"></el-table-column>
      <el-table-column prop="stateName" label="用户CODE" width="130"></el-table-column>
      <el-table-column prop="createUserId" label="用户名称" width="130"></el-table-column>
      <el-table-column prop="createTime" label="员工编号" width="160"></el-table-column>
      <el-table-column prop="modifyUserId" label="电话" width="130"></el-table-column>
      <el-table-column prop="21" label="自行修改密码" width="130"></el-table-column>
      <el-table-column prop="33" label="状态" width="130"></el-table-column>
      <el-table-column prop="44" label="邮箱地址" width="130"></el-table-column>
      <el-table-column prop="55" label="失效时间" width="130"></el-table-column>
      <el-table-column prop="66" label="创建时间" width="130"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handlePagesize"
      ></el-pagination>
    </div>
    <!-- 分页 end -->
    <!-- 删除模态框 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%" :before-close="handleClose">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { queryTenantPage } from "@/api/base/userinfo.api.js";
export default {
  data() {
    return {
      options: [
        { name: "正常", value: "NORMAL" },
        { name: "停用", value: "DISABLE" },
        { name: "删除", value: "DELETE" },
        { name: "失效", value: "EXPIRE" }
      ],
      roleForm: {
        //角色名称
        keyword: "",
        //状态
        state: ""
      },
      total: 0,
      pagesize: 10,
      currentPage: 1,
      tableData: [],
      selectList: [],
      deleteDialog: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["ROLELIST"]),
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      queryTenantPage(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
      });
    },
    //用户点击一行中的任何一个单元格，全选该行
    selectCheckBox(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    //当用户勾选数据行的 Checkbox 时触发的事件
    selectCheck(selection) {
      this.selectList = selection;
      this.selectList;
    },
    //全选当前页
    selectAll(selection) {
      this.selectList = selection;
    },
    //更改当前页码,再次请求数据
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
      this.init();
    },
    // pagesize 改变之后的回调
    handlePagesize(pagesize) {
      this.pagesize = pagesize; //设置pagesize
      this.currentPage = 1; // 从第一页开始请求
      this.init(false); //从新渲染分页
    },
    handleQuery() {
      this.init();
    },
    handleAdd() {
      const emptyList = [{ keyword: "", roleDes: "", state: "NORMAL" }];
      this.ROLELIST(JSON.parse(JSON.stringify(emptyList)));
      this.$router.push({
        path: "/base/userinfoEdit",
        query: { operateType: "add" }
      });
    },
    handleEdit() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      this.ROLELIST(JSON.parse(JSON.stringify(this.selectList)));
      this.$router.push({
        path: "/base/userinfo",
        query: { operateType: "edit" }
      });
    },
    checkDeleteLength() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      if (this.selectList.length > 1) {
        this.$message({
          message: "只能选择一项哦",
          type: "warning"
        });
        return;
      }
      this.deleteDialog = true;
    },
    handleClose() {
      this.deleteDialog = false;
    },
    handleDelete() {
      const data = { id: this.selectList[0].id };
      // deleteRoleHttp(data).then(data => {
      //   const res = data.data;
      //   if (res.code === 200) {
      //     this.$message({
      //       message: "删除成功",
      //       type: "success"
      //     });
      //     this.deleteDialog = false;
      //     this.init();
      //     return;
      //   }
      //   this.$message({
      //     message: res.message,
      //     type: "warning"
      //   });
      //   this.deleteDialog = false;
      // });
    },
    handleReset() {
      this.roleForm.keyword = "";
      this.roleForm.state = "";
      this.init();
    },
    handleExport() {
      const data = {
        keyword: this.roleForm.keyword,
        state: this.roleForm.state
      };
      // roleExportHttp(data);
    }
  }
};
</script>
<style lang="scss">
.role {
  padding: 10px 30px;
}
// .el-input {
//   display: inline;
// }

// .top-info .el-input .el-input__inner {
//   width: 75%;
//   height: 36px;
// }
// .el-tag {
//   margin-right: 10px;
// }

// .top-info {
//   width: 100%;
//   height: 80px;
//   background-color: #fff;
//   line-height: 80px;
//   padding: 0 30px;
//   box-sizing: border-box;
// }
// .top-info .el-form-item__label {
//   padding-right: 10px;
// }
// .top-info .el-form-item__content {
//   line-height: 80px;
// }
// .top-info .el-button {
//   padding: 10px 40px;
// }
// .top-info .el-form {
//   height: 100%;
// }
// .operation {
//   margin: 10px 0;
//   padding: 0 20px;
// }
</style>
