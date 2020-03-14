<template>
  <!-- liaojunjie 2019年12月14日11:53:14 -->
  <div class="site-info">
    <div class="top-info">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="SITE编码：">
          <el-input v-model="formInline.colorName" placeholder="请输入SITE编码"></el-input>
        </el-form-item>
        <el-form-item label="SITE名称：">
          <el-input v-model="formInline.colorName" placeholder="请输入SITE名称"></el-input>
        </el-form-item>
        <el-form-item label="租户CODE：">
          <el-input v-model="formInline.colorName" placeholder="请输入租户CODE"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button size="small" type="primary" @click="handleQuery">查询</el-button>
          <el-button size="small" type="primary">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="isModify ">新增</el-button>
      <el-button size="small" type="primary" @click="updatatenant">修改</el-button>
      <el-button size="small" type="primary">删除</el-button>
      <el-button size="small" type="primary">导出</el-button>
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
      <el-table-column type="index" label="SITE编码" width="79px"></el-table-column>
      <el-table-column label="SITE名称">
        <template slot-scope="scope">{{ scope.row.sectionCode }}</template>
      </el-table-column>
      <el-table-column prop="sectionName" label="SITE描述"></el-table-column>
      <el-table-column prop="sectionName" label="状态"></el-table-column>
      <el-table-column prop="sectionName" label="生效时间"></el-table-column>
      <el-table-column prop="sectionName" label="失效时间"></el-table-column>
      <el-table-column prop="sectionName" label="租户CODE"></el-table-column>
      <el-table-column prop="sectionName" label="租户信息"></el-table-column>
      <el-table-column prop="sectionName" label="SITE管理员代码"></el-table-column>
      <el-table-column prop="sectionName" label="SITE密码"></el-table-column>
      <el-table-column prop="createUserName" label="创建人"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="createUserName" label="更新人"></el-table-column>
      <el-table-column prop="createTime" label="更新时间"></el-table-column>
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
import { querySizePage } from "@/api/base/site.api.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      total: 0, // 查询的总量
      pagesize: 10,
      currentPage: 1,
      options: [
        { name: "正常", value: "NORMAL" },
        { name: "停用", value: "DISABLE" },
        { name: "删除", value: "DELETE" },
        { name: "失效", value: "EXPIRE" }
      ],
      addDialog: false,
      modifyDialog: false,
      deleteDialog: false,
      pageShow: false,
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
      formInline: {
        sectionName: "",
        region: ""
      },
      tableData: []
    };
  },
  methods: {
    ...mapMutations(["SETsectionLIST"]),
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
    //   this.pageShow = pageShow;
    //   getsectionPage(data).then(data => {
    //      (res);
    //     const res = data.data;
    //     if (res.code) {
    //       this.tableData = res.data.data;
    //       this.total = res.data.total;
    //     }
    //     this.pageShow = true;
    //   });
    // },
    // 新增工段
    // 删除工段
    //初始化操作
    // 1.2 xiugai
    // modifyDialogEvent() {
    //   if (this.multipleSelection.length == 1) {
    //     this.modifyDialog = true;
    //     this.modifyForm.sectionCode = this.multipleSelection[0].sectionCode;
    //     this.modifyForm.sectionName = this.multipleSelection[0].sectionName;
    //   } else {
    //     this.$message.error("modify");
    //   }
    // },
    // handleDelete() {
    //   if (this.selectList.length == 0) {
    //     this.$message({
    //       message: "请先选中需要删除的行",
    //       type: "warning"
    //     });
    //     return;
    //   }
    //   this.deleteDialog = true;
    // },
    // // 1.3 shanchu  删除事件
    // deleteDialogEvent() {
    //   if (this.multipleSelection.length == 1) {
    //     this.deleteForm.sectionCode = this.multipleSelection[0].sectionCode;
    //     this.deleteDialog = true;
    //   } else {
    //     this.$message.error("delete");
    //   }
    // },
    //1.2  提交的事件  新增

    //删除工段的接口
    deletesection() {
      if (this.selectList.length == 0) {
        this.$message({
          message: "请先选中需要删除的行",
          type: "warning"
        });
        return;
      }
      const data = {
        codes: this.selectList
          .map(item => {
            return item.sectionCode;
          })
          .join(","),
        modifyUserId: "string",
        modifyUserName: "string",
        tenantSiteCode: "test"
      };
      //  this.deleteForm.codes = this.selectList
      //   .map(item => {
      //     return item.sectionCode;
      //   })
      //   .join(",");
      // this.deleteForm.modifyUserId = "string";
      // this.deleteForm.modifyUserName = "string";
      // this.deleteForm.tenantSiteCode = "test";

      // 调用查询接口
      //   deleteSectionInfo(data).then(data => {
      //     const res = data.data;
      //     // 关闭弹框
      //     this.deleteDialog = false;
      //     if (res.code == 200) {
      //       this.$message({
      //         message: "删除成功",
      //         type: "success"
      //       });
      //       this.currentPage = 1; //重新渲染分页
      //       this.init(false); //重新请求第一页
      //     } else {
      //       this.$message({
      //         message: data.message,
      //         type: "error"
      //       });
      //     }
      //   });
      // },
      // resetForm(formName) {
      //   if (formName == "addForm") {
      //     this.$refs[formName].resetFields();
      //   } else {
      //     this.modifyForm.sectionName = "";
      //   }
      // },
      // onSubmit() {
      //   const data = {
      //     sectionName: this.formInline.sectionName,
      //     currentPage: 1,
      //     pageSize: this.pagesize,
      //     tenantSiteCode: "test"
      //   };
      this.pageShow = false; //重新渲染分页
      this.getsectionPageHttp(data);
    },
    // 选中状态改变后的回调
    handleSelectionChange(val) {
      "val------>>", val;
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
      this.$router.push({ path: "/base/siteAdd" });
    },
    updatatenant() {
      this.hhhhhh();
    },
    hhhhhh() {
      // this.SETsectionLIST(this.selectList);
      this.$router.push({ path: "/base/siteModify" });
    },
    //定义一个通用的查询方法 pageShow 为false 的情况下会重新渲染分页
    init(pageShow = true) {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pagesize
      };
      querySizePage(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          return;
        }
        this.$message({
          message: res.message,
          type: "error"
        });
      });
    },
    handleQuery() {
      this.init();
    }
  },
  //
  created() {
    this.init();
  }
};
</script>
<style lang="scss">
.site-info {
  padding: 0 30px;
  .operation {
    margin: 10px 0;
    padding: 0 20px;
  }
}
</style>
