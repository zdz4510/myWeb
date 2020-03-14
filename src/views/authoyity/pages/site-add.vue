<template>
  <div class="site-add">
    <div class="top-info">
      <el-button size="small" type="primary" @click="handleBack">返回</el-button>
      <el-button size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
      <el-button size="small" type="primary" @click="submitForm('addForm')">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form :model="addForm" :rules="addRules" ref="addForm">
          <el-form-item label="租户名称" :label-width="formLabelWidth" prop="tenantId">
            <el-select v-model="addForm.tenantId" placeholder="请选择租户名称" size="small">
              <el-option
                v-for="item in this.tenant"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="SITE编码" :label-width="formLabelWidth" prop="code">
            <el-input v-model="addForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="SITE名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="SITE描述" :label-width="formLabelWidth" prop="desc">
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
          <el-form-item label="生效时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="addForm.effectTime"
              type="date"
              placeholder="选择日期时间"
              align="left"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="失效效时间" :label-width="formLabelWidth">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              v-model="addForm.expireTime"
              type="date"
              placeholder="选择日期时间"
              align="left"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="site管理员代码" :label-width="formLabelWidth">
            <el-input v-model="addForm.admin" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="SITE密码密码" :label-width="formLabelWidth">
            <el-input v-model="addForm.adminPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统模块" :label-width="formLabelWidth">
            <div @click="dialogFormVisible = true">
              <el-input v-model="showModule" autocomplete="off" readonly></el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

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
import { site, findAll, getTreeByTenant } from "@/api/base/site.api.js";
export default {
  data() {
    return {
      showModule: "",
      defaultCheck: [],
      treeData: [],
      tenant: [],
      value: [1, 4],
      options: [
        { name: "正常", value: "NORMAL" },
        { name: "停用", value: "DISABLE" },
        { name: "删除", value: "DELETE" },
        { name: "失效", value: "EXPIRE" }
      ],
      dialogFormVisible: false,
      value1: "",
      value2: "",
      addDialog: false,
      addForm: {
        timeZone: "GMT+8"
      },
      formLabelWidth: "120px",
      formInline: {
        user: "",
        region: ""
      },
      date2: "",
      //验证1
      addRules: {
        sectionCode: [
          { message: "租户CODE不能为空", trigger: "blur", required: true }
        ],
        sectionName: [
          { message: "租户名称不能为空", trigger: "blur", required: true }
        ],
        siteEncoding: [
          { message: "SITE编码不能为空", trigger: "blur", required: true }
        ],
        siteName: [
          { message: "SITE名称不能为空", trigger: "blur", required: true }
        ]
      }
    };
  },
  created() {
    this.initTenant();
    this.initResource();
  },
  methods: {
    initResource() {
      getTreeByTenant("").then(res => {
        if (res.status === 200) {
          const {
            data: { data }
          } = res;
          if (data.code === 200) {
            this.treeData = data.data;
          }
          this.$message({
            type: "warning",
            message: data.message
          });
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
    treeOk() {
      this.dialogFormVisible = false;
    },
    initTenant() {
      const params = {};
      findAll(params).then(res => {
        const {
          data: { data }
        } = res;
        this.tenant = data;
      });
    },
    // 跳转到信息页面
    handleBack() {
      // this.SETsectionLIST(this.selectList);
      this.$router.push({ path: "/base/siteInformation" });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          site(this.addForm).then(res => {
            console.log(res, "resss");
            this.$message({
              message: res.data.code === 200 ? "操作成功" : res.data.message,
              type: res.data.code === 200 ? "success" : "error"
            });
            if (res.data.code === 200) {
              this.$router.push({ path: "/base/siteInformation" });
            } else {
              return false;
            }
          });
        } else {
          return false;
        }
      });
    },
    handlechange() {}
  }
};
</script>

<style lang="scss">
.site-add {
  .el-input {
    display: inline;
  }

  .top-info .el-input .el-input__inner {
    width: 100px;
    height: 36px;
  }
  .el-tag {
    margin-right: 10px;
  }

  .top-info .el-form-item__label {
    padding-right: 10px;
  }
  .top-info .el-form-item__content {
    line-height: 80px;
  }
  .top-info .el-form {
    height: 100%;
  }
  .operation {
    margin: 10px 0;
    padding: 0 20px;
  }
}
</style>
