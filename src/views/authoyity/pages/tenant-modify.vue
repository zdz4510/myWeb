<template>
  <div class="tenant-modify">
    <div class="top-info">
      <el-button size="small" type="primary" @click="handleBack">返回</el-button>
      <el-button size="small" type="primary" @click="submitForm('addForm')">保存</el-button>
      <el-button size="small" type="primary" @click="handleReset">返回</el-button>
    </div>

    <div class="flexCon">
      <div class="left">
        <el-table
          stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
          :header-cell-style="{ background: '#eef1f6', height: '30px' }"
        >
          <el-table-column prop="name" label="角色名称" width="120"></el-table-column>
          <el-table-column prop="desc" label="角色描述" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
      <div class="right">
        <el-form :model="addForm" :rules="addRules" ref="addForm">
          <el-form-item label="租户CODE" :label-width="formLabelWidth" prop="code">
            <el-input v-model.trim="addForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租户名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
            <el-input v-model="addForm.desc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
            <el-select v-model.trim="addForm.state" placeholder="请选择状态" size="small">
              <el-option
                v-for="item in this.options"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效时间" :label-width="formLabelWidth" prop="effectTime">
            <el-date-picker
              v-model="addForm.effectTime"
              type="date"
              placeholder="选择日期时间"
              align="left"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="失效效时间" :label-width="formLabelWidth" prop="expireTime">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="addForm.expireTime"
              type="date"
              placeholder="选择日期时间"
              align="left"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="租户管理员代码" :label-width="formLabelWidth" prop="admin">
            <el-input v-model="addForm.admin" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租户密码" :label-width="formLabelWidth" prop="adminPwd">
            <el-input v-model="addForm.adminPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统模块" :label-width="formLabelWidth">
            <div @click="dialogFormVisible = true">
              <el-input v-model="showModule" autocomplete="off" readonly></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="系统模块" :visible.sync="dialogFormVisible">
      <el-form :model="addForm.resourceIds" :rules="addRules">
        <el-tree
          @check="changeTree"
          :data="treeData"
          show-checkbox
          :default-checked-keys="this.defaultCheck"
          node-key="id"
          ref="tree"
          highlight-current
          :props="{
                key: 'id',
                label: 'lable',
                children:'childrens'
              }"
        ></el-tree>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetTree()">重 置</el-button>
        <el-button type="primary" @click="treeOk()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getTreeByTenant } from "@/api/base/tenant.api.js";
import { getCurrentPart } from "@/until/until.js";
export default {
  data() {
    return {
      value: [1, 4],
      dialogFormVisible: false,
      options: [
        { name: "正常", value: "NORMAL" },
        { name: "停用", value: "DISABLE" },
        { name: "删除", value: "DELETE" },
        { name: "失效", value: "EXPIRE" }
      ],
      //生效时间
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      //失效时间
      pickerOption: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      addDialog: false,
      addForm: {
        colorCode: "",
        colorName: ""
      },
      formLabelWidth: "120px",
      formInline: {
        user: "",
        region: ""
      },
      date2: "",
      // 验证1
      addRules: {
        sectionCode: [
          { message: "租户CODE不能为空", trigger: "blur", required: true }
        ],
        sectionName: [
          { message: "租户名称不能为空", trigger: "blur", required: true }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["tenantlist"])
  },
  created() {
    this.cloneList = JSON.parse(JSON.stringify(this.tenantlist));
    this.tableData = this.cloneList;
    this.addForm = this.cloneList[0];
    console.log(this.cloneList, "this.cloneListcloneListcloneList");
    this.initResourceTree();
    // if (this.operateType === "add") {
    //   this.initAdd();
    // }
    // if (this.operateType === "edit") {
    //   this.initEdit();
    // }
  },
  methods: {
    // 跳转到信息页面
    handleBack() {
      // this.SETsectionLIST(this.selectList);
      this.$router.push({ path: "/base/tenant" });
    },
    handleCurrentChange(val) {
      this.addForm = val;
      this.initResourceTree();
    },
    initResourceTree() {
      const {
        addForm: { id }
      } = this;
      console.log(id, "id");
      getTreeByTenant(id).then(res => {
        const {
          data: { data }
        } = res;
        this.treeData = data.data;
        this.addForm.resourceIds = data.value;
        console.log(data.value, "dataaa");
      });
    },
    handleReset() {
      this.$refs["addForm"].resetFields();
    }
  }
};
</script>

<style lang="scss">
.tenant-modify {
  .flexCon {
    display: flex;
    width: 95%;
    // margin: 0 auto;
    .left {
      width: 30%;
    }
    .right {
      flex: 1;
    }
  }

  .operation {
    margin: 10px 0;
    padding: 0 20px;
  }
}
</style>
