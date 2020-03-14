<template>
  <div class="site-modify">
    <div class="top-info">
      <el-button size="small" type="primary" @click="handleBack">返回</el-button>
      <el-button size="small" type="primary" @click="resetForm('addForm')">重置</el-button>
      <el-button size="small" type="primary" @click="submitForm('addForm')">保存</el-button>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form :model="addForm" :rules="addRules" ref="addForm">
          <el-form-item label="租户CODE" :label-width="formLabelWidth" prop="sectionCode">
            <el-input v-model="addForm.sectionCode" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="租户名称" :label-width="formLabelWidth" prop="sectionName">
            <el-input v-model="addForm.sectionName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="SITE编码" :label-width="formLabelWidth">
            <el-input v-model="addForm.sectionName" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="SITE名称" :label-width="formLabelWidth">
            <el-input v-model="addForm.sectionName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="SITE描述" :label-width="formLabelWidth">
            <el-input v-model="addForm.sectionName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="stafflnfoName" :label-width="formLabelWidth">
            <el-select v-model="formInline.region" placeholder="正常">
              <el-option label="正常" value="shanghai"></el-option>
              <el-option label="停用" value="beijing"></el-option>
              <el-option label="删除" value="shanchu"></el-option>
              <el-option label="失效" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="失效效时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="value2"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOption"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="SITE管理员代码" :label-width="formLabelWidth">
            <el-input v-model="addForm.sectionName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="SITE密码" :label-width="formLabelWidth">
            <el-input v-model="addForm.sectionName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 新增穿梭框 -->
    <el-dialog title="系统模块" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="addRules">
        <el-transfer v-model="value" :data="data"></el-transfer>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset(addForm)">重 置</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`
        });
      }
      return data;
    };
    return {
      data: generateData(),
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
        colorCode: "",
        colorName: ""
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
        ]
      }
    };
  },

  methods: {
    // 跳转到信息页面
    handleBack() {
      this.$route;
      this.$router;
      // this.SETsectionLIST(this.selectList);
      this.$router.push({ path: "/base/siteInformation" });
    }
  }
};
</script>

<style lang="scss">
.site-modify {
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
  .top-info .el-form {
    height: 100%;
  }
  .operation {
    margin: 10px 0;
    padding: 0 20px;
  }
}
</style>
