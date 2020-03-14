<template>
  <div class="resource">
    <div class="search">
      <el-form :inline="true" :model="resource" ref="resource">
        <el-form-item label="资源名称：" prop="keyword">
          <el-input
            v-model="resource.keyword"
            placeholder="请输入资源名称"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态：" prop="state">
          <el-input
            v-model="resource.state"
            placeholder="请输入状态"
          ></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button size="small" type="primary" @click="handleQuery">
            查询
          </el-button>
          <el-button size="small" type="primary" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="addDialog = true">
        新增
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="editDialog = true"
        :disabled="this.selectionList.length !== 1"
      >
        修改
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="detailDialog = true"
        :disabled="this.selectionList.length !== 1"
      >
        查看详情
      </el-button>
      <el-button
        size="small"
        type="primary"
        @click="deleteDialog = true"
        :disabled="this.selectionList.length !== 1"
      >
        删除</el-button
      >
      <el-button size="small" type="primary" @click="handleExport"
        >导出</el-button
      >
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="530px"
      @selection-change="selectionChange"
      @row-click="rowClick"
    >
      <el-table-column type="selection" width="49px"></el-table-column>
      <el-table-column
        label="资源名称"
        prop="name"
        width="150"
      ></el-table-column>
      <el-table-column label="资源CODE*" width="150">
        <template slot-scope="scope">{{ scope.row.key }}</template>
      </el-table-column>
      <el-table-column
        prop="desc"
        label="资源描述"
        width="150"
      ></el-table-column>
      <el-table-column label="资源类型" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.type | filterType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="请求URL"></el-table-column>
      <el-table-column prop="sortNumber" label="排序号"></el-table-column>
      <el-table-column prop="createUserId" label="创建人"></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="140"
      ></el-table-column>
      <el-table-column prop="createUserId" label="更新人"></el-table-column>
      <el-table-column
        prop="createTime"
        label="更新时间"
        width="140"
      ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        layout="->,total,prev,pager,next,sizes"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handlePagesize"
      ></el-pagination>
    </div>
    <!-- 分页 end -->
    <!-- 新增弹框 -->
    <el-dialog title="新增" :visible.sync="addDialog" @close="handleAddClose">
      <resourceAddDialog
        ref="addDialog"
        @closeAddDialog="handleAddClose"
      ></resourceAddDialog>
      <span slot="footer">
        <el-button size="small" @click="handleAddReset">重置</el-button>
        <el-button size="small" @click="addDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="handleAdd"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 新增弹框end -->
    <!-- 修改弹框 -->
    <el-dialog title="修改" :visible.sync="editDialog" @close="handleEditClose">
      <resourceEditDialog
        :editResource="this.selectionList[0]"
        ref="editDialog"
        @closeEditDialog="handleEditClose"
      ></resourceEditDialog>
      <span slot="footer">
        <el-button size="small" @click="handleEditReset">重置</el-button>
        <el-button size="small" @click="editDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="handleEdit"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改弹框end -->
    <!-- 查看详情弹框 -->
    <el-dialog
      title="查看详情"
      :visible.sync="detailDialog"
      @close="handleDetailClose"
    >
      <resourceDetailDialog
        :resourceDetail="this.selectionList[0]"
        ref="detailDialog"
      ></resourceDetailDialog>
      <span slot="footer">
        <el-button size="small" @click="detailDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="detailDialog = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看详情弹框end -->
    <!-- 删除弹框 -->
    <el-dialog
      title="删除"
      :visible.sync="deleteDialog"
      @close="handleDeleteClose"
    >
      <span>是否确认删除{{ this.selectionList.length }}条数据？</span>
      <span slot="footer">
        <el-button size="small" @click="deleteDialog = false">取消</el-button>
        <el-button size="small" type="primary" @click="handleDelete"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除弹框end -->
  </div>
</template>
<script>
import { listHttp, deleteResourceHttp } from "@/api/base/resource.api.js";
import resourceAddDialog from "@/views/authoyity/components/resource-add-dialog.vue";
import resourceEditDialog from "@/views/authoyity/components/resource-edit-dialog.vue";
import resourceDetailDialog from "@/views/authoyity/components/resource-detail-dialog.vue";
import { exportExcel } from "@/until/excel.js";
const tHeader = [
  "资源名称",
  "资源CODE",
  "资源描述",
  "资源类型",
  "请求URL",
  "排序号",
  "创建人",
  "创建时间",
  "更新人",
  "更新时间"
];
const filterVal = [
  "name",
  "key",
  "desc",
  "type",
  "url",
  "sortNumber",
  "createUserId",
  "createTime",
  "createUserId",
  "createTime"
];
const fileName = "资源信息表表";

export default {
  name: "resource",
  components: {
    resourceAddDialog,
    resourceEditDialog,
    resourceDetailDialog
  },
  filters: {
    filterType(type) {
      if (type === "INTERFACE") {
        return "接口";
      }
    }
  },
  data() {
    return {
      tHeader,
      filterVal,
      fileName,
      resource: {
        keyword: ""
        // state: ""
      },
      selectionList: [],
      tableData: [],
      //分页
      total: 0, // 查询的总量
      pageSize: 10,
      currentPage: 1,
      addDialog: false,
      editDialog: false,
      detailDialog: false,
      deleteDialog: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        param: {
          keyword: this.resource.keyword
          //   state: this.resource.state
        }
      };
      listHttp(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          return;
        }
        this.$message({
          type: "warning",
          message: res.message
        });
      });
    },
    //当选择项发生变化时会触发该事件
    selectionChange(selection) {
      this.selectionList = selection;
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
      this.init(); //从新渲染分页
    },
    rowClick(row) {
      this.$refs["multipleTable"].toggleRowSelection(row, true);
    },
    //查询
    handleQuery() {
      this.init();
    },
    //查询重置
    handleReset() {
      this.$refs["resource"].resetFields();
      this.init();
    },
    //新增弹框叉掉
    handleAddClose() {
      this.addDialog = false;
      this.$refs["addDialog"].addReset();
      this.init();
    },
    //修改弹框叉掉
    handleEditClose() {
      this.editDialog = false;
      this.$refs["editDialog"].editReset();
      this.init();
    },
    //新增弹框确认
    handleAdd() {
      this.$refs["addDialog"].checkoutData();
    },
    //新增弹框重置
    handleAddReset() {
      this.$refs["addDialog"].addReset();
    },
    //修改弹框确认
    handleEdit() {
      this.$refs["editDialog"].checkoutData();
    },
    //修改弹框重置
    handleEditReset() {
      this.$refs["editDialog"].editReset();
    },
    //详情弹框叉掉
    handleDetailClose() {
      this.detailDialog = false;
    },
    //删除弹框
    handleDeleteClose() {
      this.deleteDialog = false;
    },
    //删除
    handleDelete() {
      deleteResourceHttp(this.selectionList[0].id).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.deleteDialog = false;
          this.init();
          return;
        }
        this.$message({
          type: "warning",
          message: res.message
        });
      });
    },
    //未选择导出请求数据
    exportHttp() {
      const request = {
        currentPage: this.currentPage,
        pageSize: 0,
        param: {
          keyword: this.resource.keyword
        }
      };
      listHttp(request).then(data => {
        const res = data.data;
        if (res.code === 200) {
          data = res.data.data;
          this.exportResult(data);
          return;
        }
        this.$message({
          message: res.message,
          type: "waning"
        });
      });
    },
    //返回结果，提示信息
    exportResult(data) {
      const tipString = exportExcel(
        this.tHeader,
        this.filterVal,
        data,
        this.fileName
      );
      if (tipString === undefined) {
        this.$message({
          message: "导出成功",
          type: "success"
        });
        return;
      }
    },
    //导出
    handleExport() {
      if (this.selectionList.length === 0) {
        this.exportHttp();
      }
      if (this.selectionList.length > 0) {
        const data = this.selectionList;
        this.exportResult(data);
      }
    }
  }
};
</script>
<style lang="scss">
.resource {
  padding: 0 30px;
  .search {
    padding: 10px 0;
    .el-form {
      .el-form-item {
        margin-bottom: 0px;
      }
    }
  }
  .operation {
    padding: 10px 0;
  }
}
</style>
