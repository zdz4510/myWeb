<template>
  <!-- liaojunjie 2019年12月14日11:53:14 -->
  <div class="tenant">
    <div class="top-info">
      <el-form :inline="true" :model="tenantForm" ref="tenantForm">
        <el-form-item label="租户CODE：" prop="key">
          <el-input v-model="tenantForm.key" placeholder="请输入租户CODE"></el-input>
        </el-form-item>
        <el-form-item label="租户名称：" prop="keyword">
          <el-input v-model="tenantForm.keyword" placeholder="请输入租户名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="handleQuery">查询</el-button>
          <el-button size="small" type="primary" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="isModify ">新增</el-button>
      <el-button size="small" type="primary" @click="updatatenant">修改</el-button>
      <el-button size="small" type="primary" @click="handleDelete">删除</el-button>
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
      <el-table-column type="selection" width="49px"></el-table-column>
      <el-table-column label="租户CODE" width="79px" prop="code"></el-table-column>
      <el-table-column label="租户名称" prop="name"></el-table-column>
      <el-table-column prop="desc" label="描述"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="effectTime" label="生效时间"></el-table-column>
      <el-table-column prop="expireTime" label="失效时间"></el-table-column>
      <el-table-column prop="createUserId" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="modifyUserId" label="修改人"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pagesize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handlePagesize"
        v-if="pageShow"
      ></el-pagination>
    </div>
    <!-- 分页 end -->
    <!-- 删除模态框 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%" :before-close="handleClose">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deletesection">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryTenantPage,
  deletetTenant,
  usertenant
} from "@/api/base/tenant.api.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      total: 0, // 查询的总量
      pagesize: 10,
      currentPage: 1,
      roleForm: {
        state: "",
        keyword: ""
      },
      addDialog: false,
      modifyDialog: false,
      deleteDialog: false,
      pageShow: false,
      selectList: [],
      addForm: {
        sectionCode: "",
        sectionName: "",
        date1: "",
        date2: ""
      },
      //bianji模态框
      modifyForm: {
        sectionCode: "",
        sectionName: ""
      },
      //删除模态框
      deleteForm: {
        sectionCode: "",
        type: "LIMIT"
      },
      formLabelWidth: "120px",

      input1: "",
      input2: "",
      tenantForm: {
        keyword: "",
        key: ""
      },
      tableData: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations(["TENANTLIST"]),
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
      this.selectList;
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
    // 分页获取工段列表信息  pageShow false 的时候重新渲染这个分页
    // getsectionPageHttp(data, pageShow = true) {
    getPageTenant() {
      // this.pageShow = pageShow;
      // getsectionPage(data).then(data => {
      //    (res);
      //   const res = data.data;
      //   if (res.code) {
      //     this.tableData = res.data.data;
      //     this.total = res.data.total;
      //   }
      //   this.pageShow = true;
      // });
    },
    handleDelete() {
      console.log(this.selectList);
      if (this.selectList.length == 0) {
        this.$message({
          message: "请先选中需要删除的行",
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
    handleExport() {
      const data = {
        keyword: this.roleForm.keyword,
        state: this.roleForm.state
      };
      usertenant(data);
    },
    //删除工段的接口
    deletesection() {
      const data = { id: this.selectList[0].id };
      deletetTenant(data.id).then(data => {
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
    // 选中状态改变后的回调
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClose() {
      // this.$confirm("确认关闭？");
      this.deleteDialog = false;
    },
    isModify() {
      this.toEditPage();
    },
    // 跳转到新增页面
    toEditPage() {
      // this.SETsectionLIST(this.selectList);
      this.$router.push({ path: "/base/tenantAdd" });
    },
    updatatenant() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      console.log(this.selectList, "selectListselectList");
      this.TENANTLIST(JSON.parse(JSON.stringify(this.selectList)));
      this.$router.push({ path: "/base/tenantModify" });
    },
    //定义一个通用的查询方法 pageShow 为false 的情况下会重新渲染分页
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pagesize,
        params: { key: this.tenantForm.key, keyword: this.tenantForm.keyword }
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
    handleQuery() {
      this.init();
    },
    handleReset() {
      this.$refs["tenantForm"].resetFields();
      this.init();
    }
  }
};
</script>
<style lang="scss">
.tenant {
  .operation {
    margin: 10px 0;
    padding: 0 20px;
  }
}
</style>