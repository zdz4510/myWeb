<template>
  <div class="tenant-add">
    <div class="top-info">
      <el-button size="small" type="primary" @click="handleBack">返回</el-button>
      <el-button size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
      <el-button size="small" type="primary" @click="submitForm('addForm')">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form :model="addForm" :rules="addRules" ref="addForm" :label-width="formLabelWidth">
          <el-form-item label="租户CODE" prop="code">
            <el-input v-model.trim="addForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租户名称" prop="name">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="addForm.desc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-select v-model.trim="addForm.state" placeholder="请选择状态" size="small">
              <el-option
                v-for="item in this.options"
                :label="item.name"
                :value="item.value"
                :key="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效时间" prop="effectTime">
            <el-date-picker
              v-model="addForm.effectTime"
              type="date"
              placeholder="选择日期时间"
              align="left"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="失效效时间" prop="expireTime">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="addForm.expireTime"
              type="date"
              placeholder="选择日期时间"
              align="left"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="租户管理员代码" prop="admin">
            <el-input v-model="addForm.admin" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="租户密码" prop="adminPwd">
            <el-input v-model="addForm.adminPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统模块" prop>
            <div @click="dialogFormVisible = true">
              <el-input v-model="showModule" autocomplete="off" readonly></el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 新增穿梭框 -->
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
import { getTreeByTenant, tenant } from "@/api/base/tenant.api.js";

export default {
  data() {
    return {
      showModule: "",
      defaultCheck: [],
      treeData: [],
      options: [
        { name: "正常", value: "NORMAL" },
        { name: "停用", value: "DISABLE" },
        { name: "删除", value: "DELETE" },
        { name: "失效", value: "EXPIRE" }
      ],
      value: [1, 4],
      dialogFormVisible: false,
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
        code: "",
        state: "NORMAL",
        desc: "",
        name: "",
        effectTime: "",
        expireTime: "",
        admin: "",
        adminPwd: ""
      },
      formLabelWidth: "130px",
      formInline: {
        user: "",
        region: ""
      },
      date2: "",
      //验证1
      addRules: {
        code: [
          { message: "租户CODE不能为空", trigger: "blur", required: true }
        ],
        name: [
          { message: "租户名称不能为空", trigger: "blur", required: true }
        ],
        effectTime: [
          { message: "生效日期不能为空", trigger: "blur", required: true }
        ],
        expireTime: [
          { message: "失效日期不能为空", trigger: "blur", required: true }
        ],
        administrator: [
          { message: "租户管理员代码不能为空", trigger: "blur", required: true }
        ],
        admin: [
          { message: "租户管理员代码不能为空", trigger: "blur", required: true }
        ]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getTreeByTenant("").then(res => {
        if (res.status === 200) {
          const {
            data: { data }
          } = res;
          this.treeData = data.data;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          tenant(this.addForm).then(res => {
            console.log(res, "resss");
            this.$message({
              message: res.data.code === 200 ? "操作成功" : res.data.message,
              type: res.data.code === 200 ? "success" : "error"
            });
            if (res.data.code === 200) {
              this.$router.push({ path: "/base/tenant" });
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    changeTree(a, b) {
      const { checkedKeys, checkedNodes } = b;
      let str = "";
      checkedNodes.forEach(item => {
        str += `${item.lable},`;
      });
      this.showModule = str.substr(0, str.length - 1);
      this.addForm.resourceIds = checkedKeys;
    },
    resetTree() {
      this.$refs.tree.setCheckedKeys([]);
      this.showModule = "";
    },
    // 跳转到信息页面
    handleBack() {
      // this.SETsectionLIST(this.selectList);
      this.$router.push({ path: "/base/tenant" });
    },
    treeOk() {
      this.dialogFormVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.tenant-add {
  .operation {
    margin: 10px 0;
    padding: 0 20px;
  }
}
</style>
