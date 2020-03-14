<template>
  <div class="userGroup">
    <div class="top-info">
      <el-form :inline="true" :model="userGroupForm" class="demo-form-inline">
        <el-form-item label="用户组名称：">
          <el-input v-model.trim="userGroupForm.keyword" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model.trim="userGroupForm.state" placeholder="请选择">
            <el-option label="正常" value="NORMAL"></el-option>
            <el-option label="停用" value="DISABLE"></el-option>
            <el-option label="删除" value="DELETE"></el-option>
            <el-option label="失效" value="EXPIRE"></el-option>
          </el-select>
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
      <el-table-column prop="name" label="用户组名称" width="130"></el-table-column>
      <el-table-column prop="desc" label="角色描述" width="130"></el-table-column>
      <el-table-column prop="stateName" label="状态" width="130"></el-table-column>
      <el-table-column prop="createUserId" label="创建人" width="130"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
      <el-table-column prop="modifyUserId" label="更新人" width="130"></el-table-column>
      <el-table-column prop="modifyTime" label="更新时间" width="160"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
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
import {
  pageRoleHttp,
  deleteUserGroupHttp,
  userGroupExportHttp
} from "@/api/base/userGroup.api.js";

export default {
  data() {
    return {
      userGroupForm: {
        keyword: "",
        state: ""
      },
      total: 0,
      pageSize: 10,
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
    ...mapMutations(["USERGROUPLIST"]),
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.userGroupForm.keyword,
        state: this.userGroupForm.state
      };
      pageRoleHttp(data).then(data => {
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
    // pageSize 改变之后的回调
    handlePagesize(pageSize) {
      this.pageSize = pageSize; //设置pagesize
      this.currentPage = 1; // 从第一页开始请求
      this.init(false); //从新渲染分页
    },
    handleQuery() {
      this.init();
    },
    handleAdd() {
      const emptyList = [{ state: "NORMAL" }];
      this.USERGROUPLIST(JSON.parse(JSON.stringify(emptyList)));
      this.$router.push({
        path: "/base/userGroupEdit",
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
      this.USERGROUPLIST(JSON.parse(JSON.stringify(this.selectList)));
      this.$router.push({
        path: "/base/userGroupEdit",
        query: { operateType: "edit" }
      });
    },
    handleDetail() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      this.USERGROUPLIST(JSON.parse(JSON.stringify(this.selectList)));
      this.$router.push({
        path: "/base/userGroupEdit",
        query: { operateType: "detail" }
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
      deleteUserGroupHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.deleteDialog = false;
          this.init();
          return;
        }
        this.$message({
          message: res.message,
          type: "warning"
        });
        this.deleteDialog = false;
      });
    },
    handleReset() {
      this.userGroupForm.keyword = "";
      this.userGroupForm.state = "";
      this.init();
    },
    handleExport() {
      const data = {
        keyword: this.userGroupForm.keyword,
        state: this.userGroupForm.state
      };
      userGroupExportHttp(data);
    }
  }
};
</script>
<style lang="scss">
.userGroup {
  padding: 10px 30px;
}
</style>
