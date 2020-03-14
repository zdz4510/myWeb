<template>
  <div class="function-menu">
    <div class="top-info">
      <el-form :inline="true" :model="functionMenu" label-width="100px" ref="searchFrom">
        <el-form-item label="菜单名称：" prop="menu">
          <el-input v-model.trim="functionMenu.menu" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单：" prop="pMenu">
          <el-input v-model.trim="functionMenu.pMenu" placeholder="请输入上级菜单"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型：" prop="menuType">
          <el-input v-model.trim="functionMenu.menuType" placeholder="请输入菜单类型"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model.trim="functionMenu.status" placeholder="请选择">
            <el-option label="正常" value="NORMAL"></el-option>
            <el-option label="停用" value="EXPIRE"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="init">查询</el-button>
          <el-button type="primary" size="small" @click="resert">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="operation">
      <el-button size="small" type="primary" @click="handleShowAdd">新增</el-button>
      <el-button size="small" type="primary" @click="handleShowEdit">修改</el-button>
      <el-button size="small" type="primary" @click="checkDeleteLength">删除</el-button>
      <el-button size="small" type="primary">导出</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      @selection-change="selectCheck"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="菜单名称" sortable width="120px"></el-table-column>
      <el-table-column prop="type" label="菜单类型" sortable width="120px"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" sortable width="120px"></el-table-column>
      <el-table-column prop="name" label="前端组件" sortable width="120px"></el-table-column>
      <el-table-column prop="url" label="路径" sortable width="120px"></el-table-column>
      <el-table-column prop="orderNumber" label="排序" sortable width="120px"></el-table-column>
      <el-table-column prop="date" label="系统模块" sortable width="120px"></el-table-column>
      <el-table-column prop="id" label="ID" sortable width="120px"></el-table-column>
      <el-table-column prop="modifyUserId" label="创建人" sortable width="120px"></el-table-column>
      <el-table-column prop="name" label="创建时间" sortable width="120px" show-overflow-tooltip></el-table-column>
      <el-table-column prop="date" label="修改人" sortable width="120px"></el-table-column>
      <el-table-column prop="address" label="修改时间" sortable width="120px" show-overflow-tooltip></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination" v-if="false">
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
    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="addDialog" width="60%">
      <functionMenuAddDialog
        ref="addModel"
        @getResourceList="handleGetResourceList"
        :list4="list4"
        :list="list"
        :list2="list2"
        :list3="list3"
      ></functionMenuAddDialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">重 置</el-button>
        <el-button type="primary" @click="handleAddValid">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增模态框end -->
    <!-- 修改模态框 -->
    <el-dialog title="修改" :visible.sync="editDialog" width="60%" :before-close="handleeditClose">
      <function-menu-add-dialog
        ref="editModel"
        :isEdit="true"
        :list="list"
        :list2="list2"
        :list3="list3"
        :list4="list4"
      ></function-menu-add-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">重 置</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改模态框end -->

    <!-- 删除模态框 -->
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import functionMenuAddDialog from "@/views/authoyity/components/function-menu-add-dialog.vue";
import {
  addResourceInfo,
  getResourceList,
  getTableList,
  deleteResource,
  updateResource
} from "@/api/authority/menu.resource.api.js";
import { getMenuResourceTree } from "@/api/authority/function.menu.api.js";
export default {
  name: "functionMenu",
  components: {
    functionMenuAddDialog
  },
  data() {
    return {
      functionMenu: {
        menu: "",
        pMenu: "",
        menuType: "",
        typpMenue: "",
        status: ""
      },
      deleteDialog: false,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      selectionList: [],
      tableData: [],
      addDialog: false,
      editDialog: false,
      list: [],
      list2: [],
      list3: [],
      list4: []
    };
  },
  created() {
    this.init();
    this.handleGetResourceList("SYSTEM");
  },
  methods: {
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
    //新增叉掉
    handleAddClose() {
      this.addDialog = false;
    },
    handleAddValid() {
      this.$refs["addModel"].valid(valid => {
        this.handleAdd(valid);
      });
    },
    //新增确定
    handleAdd(valid) {
      if (!valid) {
        return;
      }
      const data = this.$refs["addModel"].getFormData();

      addResourceInfo({
        ...data,
        pid: data.pid ? data.pid : data.rootId
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.addDialog = false;
          this.init();
          this.$message({
            type: "success",
            message: "新增成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      });
    },
    handleShowAdd() {
      if (this.selectionList.length > 1) {
        this.$message({
          type: "warning",
          message: "最多只能选择一个"
        });
        return;
      }
      const data = this.selectionList.length == 1 ? this.selectionList[0] : {};
      if (data.type == "BUTTON" || data.type == "AUTH") {
        this.$message({
          type: "warning",
          message: "当前类型无法新增"
        });
        return;
      }
      this.addDialog = true;
      this.$nextTick(() => {
        this.$refs["addModel"].clear();
      });
      if (this.selectionList.length == 1) {
        this.$nextTick(() => {
          this.$refs["addModel"].setFormData({
            pid: data.id,
            pidName: data.name,
            rootId: data.parentId
          });
        });
      }
    },
    handleShowEdit() {
      if (this.selectionList.length != 1) {
        this.$message({
          type: "warning",
          message: "最多只能编辑一个"
        });
        return;
      }
      const data = this.selectionList[0];
      if (data.type != "MENU") {
        this.$message({
          type: "warning",
          message: "不是菜单类型，不可修改"
        });

        return;
      }

      this.editDialog = true;
      const {
        authPolicy,
        pid,
        desc,
        id,
        interfaceIds,
        key,
        name,
        nameEn,
        pageId,
        rootId,
        state,
        type,
        url,
        orderNumber
      } = data;
      this.$nextTick(() => {
        this.$refs["editModel"].setFormData({
          authPolicy,
          desc,
          id,
          interfaceIds,
          key,
          name,
          nameEn,
          pageId, // 菜单绑定的页面
          pid, // 上级菜单ID，没有选上级菜单时就取系统模块id
          rootId, // 系统模块id
          state,
          type,
          url,
          orderNumber
        });
      });
    },
    //修改叉掉
    handleeditClose() {
      this.editDialog = false;
    },
    //修改确认
    handleEdit() {
      const data = this.$refs["editModel"].getFormData();
      updateResource(data).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.editDialog = false;
          this.init();
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          this.$message({
            tyepe: "error",
            message: res.message
          });
        }
      });
    },
    handleGetResourceList(type, rootId) {
      getResourceList({
        type: type,
        rootId: rootId
      }).then(data => {
        const res = data.data;
        console.log(res.data);
        if (res.code == 200) {
          if (type == "SYSTEM") {
            this.list = res.data.data;
          } else if (type == "PAGE") {
            this.list2 = res.data.data;
          } else if (type == "BUTTON") {
            this.list3 = res.data.data;
          } else if (type == "MENU") {
            this.list4 = res.data.data;
          }
        }
      });
    },
    selectCheck(selection) {
      this.selectionList = selection;
    },
    checkDeleteLength() {
      if (this.selectionList.length === 0) {
        this.$message({
          message: "还没有选择哦",
          type: "warning"
        });
        return;
      }
      if (this.selectionList.length > 1) {
        this.$message({
          message: "只能选择一项哦",
          type: "warning"
        });
        return;
      }
      const type = { id: this.selectionList[0].type };
      if (type == "MENU") {
        this.$message({
          message: "只能删除菜单类型",
          type: "warning"
        });

        return;
      }
      this.deleteDialog = true;
    },
    handleDelete() {
      if (this.selectionList.length != 1) {
        this.$message({
          message: "只能删除一条",
          type: "warning"
        });
        return;
      }
      const data = { id: this.selectionList[0].id };
      deleteResource(data).then(data => {
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
    resert() {
      this.$refs["searchFrom"].resetFields();
      this.init();
    },
    init() {
      getMenuResourceTree(this.functionMenu).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.tableData = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.function-menu {
  padding: 10px 30px;
  .top-info {
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-select {
          width: 203px;
        }
      }
    }
  }
  .operation {
    padding-bottom: 10px;
  }
}
</style>
