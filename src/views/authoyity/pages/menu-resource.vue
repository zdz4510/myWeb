<template>
  <div class="menuResource">
    <div class="top-info">
      <el-form :inline="true" :model="userGroupForm" ref="searchFrom" class="demo-form-inline">
        <el-form-item label="元素名称：" prop="name">
          <el-input v-model.trim="userGroupForm.name" placeholder="请输入元素名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="页面名称：">
          <el-input
            v-model.trim="userGroupForm.pageName"
            placeholder="请输入页面名称"
          ></el-input>
        </el-form-item>-->
        <el-form-item label="系统模块：" prop="system">
          <el-select v-model.trim="userGroupForm.system" placeholder="请选择">
            <el-option :label="item.key" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属页面：" prop="pageName">
          <el-input v-model.trim="userGroupForm.pageName" placeholder="请输入所属页面"></el-input>
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

      <el-button size="small" type="primary" @click="checkDeleteLength">删除</el-button>
      <el-button size="small" type="primary" @click="handleExport">导出</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      stripe
      border
      tooltip-effect="dark"
      style="width: 100%"
      height="530px"
      @selection-change="selectCheck"
      @row-click="selectCheckBox"
      @select-all="selectAll"
      row-key="id"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="元素名称"></el-table-column>
      <el-table-column prop="name" label="所属页面名称"></el-table-column>
      <el-table-column prop="stateName" label="对应功能菜单"></el-table-column>
      <el-table-column prop="createUserId" label="系统模块"></el-table-column>
      <el-table-column prop="type" label="类型" width="160"></el-table-column>
      <el-table-column prop="key" label="前端标示"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="id" label="ID" width="ID"></el-table-column>
      <el-table-column prop="modifyUserId" label="创建人"></el-table-column>
      <el-table-column prop="modifyTime" label="创建时间"></el-table-column>
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
    <el-dialog title="删除" :visible.sync="deleteDialog" width="30%">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete">确 定</el-button>
      </span>
    </el-dialog>

    <!-- add 的弹出层 -->
    <el-dialog title="新增" :visible.sync="addDialog" width="500px">
      <el-form :model="addModel" ref="addModelForm" label-width="120px" :rules="addRule">
        <el-form-item label="系统类型" prop="rootId">
          <el-select @change="systemChange" v-model="addModel.rootId" placeholder="请选择">
            <el-option :label="item.key" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model="addModel.type" placeholder="请选择">
            <el-option label="PAGE" value="PAGE"></el-option>
            <el-option label="BUTTON" value="BUTTON"></el-option>
            <el-option label="AUTH" value="AUTH"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限名称:" prop="name" v-show="addModel.type == 'AUTH'">
          <el-input v-model="addModel.name" placeholder="权限名称" />
        </el-form-item>
        <el-form-item label="按钮名称:" prop="name" v-show="addModel.type == 'BUTTON'">
          <el-input v-model="addModel.name" placeholder="按钮名称" />
        </el-form-item>
        <el-form-item label="页面名称:" prop="name" v-show="addModel.type == 'PAGE'">
          <el-input v-model="addModel.name" placeholder="页面名称" />
        </el-form-item>

        <el-form-item
          label="所属页面名称:"
          prop="pageId"
          v-show="addModel.type !== 'PAGE' && addModel.type != ''"
        >
          <el-select filterable @change="pageChange" v-model="addModel.pageId" placeholder="所属页面名称">
            <el-option :label="item.name" :value="item.id" v-for="item in list2" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="前台标识:" prop="key">
          <el-input v-model="addModel.key" placeholder="前台标识" />
        </el-form-item>
        <el-form-item prop="interfaceIds" label="按钮接口授权:" v-show="addModel.type == 'BUTTON'">
          <el-select
            v-model="addModel.interfaceIds"
            placeholder="按钮接口授权"
            filterable
            clearable
            multiple
          >
            <el-option :label="item.name" :value="item.id" v-for="item in list3" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权策略" prop="authPolicy" v-show="addModel.type == 'AUTH'">
          <el-checkbox-group v-model="addModel.authPolicy">
            <el-checkbox label="1">显示访问(授权后显示/可访问)</el-checkbox>
            <el-checkbox label="2">可编辑(未授权时禁用)</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态:" prop="state">
          <el-radio v-model="addModel.state" label="NORMAL">有效</el-radio>
          <el-radio v-model="addModel.state" label="EXPIRE">无效</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="validAddForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- edit  start-->
    <!-- add 的弹出层 -->
    <el-dialog title="修改" :visible.sync="editDialog" width="500px">
      <el-form :model="editModel" ref="editModelForm " :rules="editRule" label-width="120px">
        <el-form-item label="系统类型" prop="rootId">
          <el-select v-model="editModel.rootId" placeholder="请选择">
            <el-option label="平台" value="plate"></el-option>
            <el-option :label="item.key" :value="item.id" v-for="item in list" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model="editModel.type" placeholder="请选择">
            <el-option label="PAGE" value="PAGE"></el-option>
            <el-option label="BUTTON" value="BUTTON"></el-option>
            <el-option label="AUTH" value="AUTH"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="权限名称:" v-show="editModel.type == 'AUTH'">
          <el-input v-model="editModel.name" placeholder="权限名称" />
        </el-form-item>
        <el-form-item prop="name" label="按钮名称:" v-show="editModel.type == 'BUTTON'">
          <el-input v-model="editModel.name" placeholder="按钮名称" />
        </el-form-item>
        <el-form-item prop="name" label="页面名称:" v-show="editModel.type == 'PAGE'">
          <el-input v-model="editModel.name" placeholder="页面名称" />
        </el-form-item>
        <el-form-item
          label="所属页面名称:"
          prop="pageId"
          v-show="editModel.type !== 'PAGE' && editModel.type != ''"
        >
          <el-select v-model="editModel.pageId" filterable placeholder="所属页面名称">
            <el-option :label="item.key" :value="item.id" v-for="item in list2" :key="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="key" label="前台标识:">
          <el-input v-model="editModel.key" placeholder="前台标识" />
        </el-form-item>
        <el-form-item prop="interfaceIds" label="按钮接口授权:" v-show="editModel.type == 'BUTTON'">
          <el-select multiple v-model="editModel.interfaceIds" placeholder="按钮接口授权">
            <el-option :label="item.key" :value="item.id" v-for="item in list3" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权策略" v-show="editModel.type == 'AUTH'">
          <el-checkbox-group v-model="editModel.authPolicy">
            <el-checkbox label="1">显示访问(授权后显示/可访问)</el-checkbox>
            <el-checkbox label="2">可编辑(未授权时禁用)</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态:">
          <el-radio v-model="editModel.state" label="NORMAL">有效</el-radio>
          <el-radio v-model="editModel.state" label="EXPIRE">无效</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- edit ent  -->
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import {
  pageRoleHttp,
  deleteUserGroupHttp,
  userGroupExportHttp
} from "@/api/base/userGroup.api.js";
import {
  addResourceInfo,
  getResourceList,
  getTableList,
  deleteResource,
  updateResource,
  checkNameExists,
  getInterResourceList
} from "@/api/authority/menu.resource.api.js";

export default {
  computed: {
    addRule: function() {
      const isRequired = this.addModel.type == "PAGE";
      return {
        rootId: [
          { message: "系统类型必填", required: true, trigger: "change" }
        ],
        type: [{ message: "权限类型必填", required: true, trigger: "change" }],
        name: [{ validator: this.validateName, trigger: "change" }],
        key: [{ message: "前台标识必填", required: true, trigger: "change" }],
        pageId: [
          {
            message: "所属页面名称必填",
            required: !isRequired,
            trigger: "change"
          }
        ],
        interfaceIds: [
          {
            message: "所属页面名称必填",
            required: this.addModel.type == "BUTTON",
            trigger: "change"
          }
        ]
      };
    },
    editRule: function() {
      const isRequired = this.editModel.type == "PAGE";
      return {
        rootId: [
          { message: "系统类型必填", required: true, trigger: "change" }
        ],
        type: [{ message: "权限类型必填", required: true, trigger: "change" }],
        name: [{ validator: this.validateName, trigger: "change" }],
        key: [{ message: "前台标识必填", required: true, trigger: "change" }],
        pageId: [
          {
            message: "所属页面名称必填",
            required: !isRequired,
            trigger: "change"
          }
        ],
        interfaceIds: [
          {
            message: "所属页面名称必填",
            required: this.addModel.type == "BUTTON",
            trigger: "change"
          }
        ]
      };
    }
  },
  data() {
    return {
      userGroupForm: {
        type: "",
        name: "",
        system: "",
        pageName: ""
      },
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      selectList: [],
      deleteDialog: false,
      addDialog: false,
      addModel: {
        rootId: "",
        type: "",
        name: "",
        key: "",
        pageId: "",
        interfaceIds: [],
        authPolicy: ["1"],
        state: "NORMAL",
        pid: 0
      },
      value: "",
      list: [],
      list2: [],
      list3: [], // 按钮的权限列表
      pid: 0,
      editDialog: false,
      editModel: {
        rootId: "",
        type: "",
        name: "",
        key: "",
        interfaceIds: [],
        authPolicy: [],
        pageId: "",
        state: "NORMAL",
        pid: 0
      }
    };
  },
  created() {
    this.init();
    this.handleGetResourceList("SYSTEM");
    // this.handleGetResourceList("PAGE");
  },
  methods: {
    ...mapMutations(["USERGROUPLIST"]),
    validateName(rule, value, callback) {
      if (value === "") {
        callback("名称必填");
      } else {
        checkNameExists({
          name: value,
          pid:
            this.addModel.type == "PAGE"
              ? this.addModel.rootId
              : this.addModel.pageId
        }).then(data => {
          const res = data.data;
          if (res.code == 200 && res.data) {
            callback("名称重复");
          } else {
            callback();
          }
        });
      }
    },
    handleGetResourceList(type, rootId) {
      console.log(rootId);
      getResourceList({
        type: type,
        rootId: rootId
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          if (type == "SYSTEM") {
            this.list = res.data.data;
          } else if (type == "PAGE") {
            this.list2 = res.data.data;
          } else if (type == "INTERFACE") {
            this.list3 = res.data.data;
          }
        }
      });
    },
    handleGetInterResourceList(type, rootId) {
      console.log(rootId);
      getInterResourceList({
        type: type,
        rootId: rootId
      }).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.list3 = res.data.data;
        }
      });
    },
    init() {
      const data = {
        ...this.userGroupForm
      };

      getTableList(data).then(data => {
        const res = data.data;
        if (res.code === 200) {
          this.tableData = res.data;
          this.total = res.data.length;
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
      this.addDialog = true;

      this.$nextTick(() => {
        this.$refs["addModelForm"].resetFields();
        // this.$refs['addModelForm'].clearValidate()
      });
    },
    validAddForm() {
      this.$refs["addModelForm"].validate(valid => {
        if (valid) {
          this.handleAddConfirm();
        }
      });
    },
    handleAddConfirm() {
      const data = {
        ...this.addModel,
        pid:
          this.addModel.type == "PAGE"
            ? this.addModel.rootId
            : this.addModel.pageId,
        authPolicy: this.addModel.authPolicy.join(",")
        // interfaceIds: [].push(this.addModel.interfaceIds)
      };
      addResourceInfo(data).then(data => {
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
    handleEdit() {
      console.log(this.selectList);
      if (this.selectList.length != 1) {
        this.$message({
          message: "只能编辑一条",
          type: "warning"
        });
        return;
      }

      if (this.selectList[0].type == "SYSTEM") {
        this.$message({
          message: "系统类型不可编辑",
          type: "warning"
        });
        return;
      }
      this.handleGetResourceList("BUTTON", this.editModel.id);
      this.handleGetResourceList("AUTH", this.editModel.id);
      this.handleGetResourceList("PAGE", this.editModel.id);
      this.editDialog = true;
      this.editModel = this.selectList[0];
      this.editModel = {
        ...this.editModel,
        authPolicy: this.editModel.authPolicy.split(",")
      };
    },
    handleEditConfirm() {
      this.editModel.authPolicy = this.editModel.authPolicy.join(",");
      updateResource(this.editModel).then(data => {
        const res = data.data;
        if (res.code == 200) {
          this.editDialog = false;
          this.init();
          this.$message({
            type: "success",
            message: "操作成功"
          });
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
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
      if (this.selectList.length != 1) {
        this.$message({
          message: "只能删除一条",
          type: "warning"
        });
        return;
      }
      const data = { id: this.selectList[0].id };
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
    handleReset() {
      this.$refs["searchFrom"].resetFields();
      this.init();
    },
    handleExport() {
      // const data = {
      //   keyword: this.userGroupForm.keyword,
      //   state: this.userGroupForm.state
      // };
      // userGroupExportHttp(data);
    },
    pageChange() {},
    systemChange(rootId) {
      this.handleGetResourceList("PAGE", rootId);
      this.handleGetInterResourceList("INTERFACE", rootId);
    }
  }
};
</script>
<style lang="scss">
.menuResource {
  padding: 10px 30px;

  .el-form .el-form-item .el-select {
    width: 100%;
  }
}
</style>
