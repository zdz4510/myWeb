<template>
  <div class="function-menu-add-dialog">
    <el-form
      :inline="true"
      :model="addDialog"
      label-width="110px"
      :rules="addDialogRules"
      ref="addModel"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单类型" prop="type">
            <el-select v-model="addDialog.type" placeholder>
              <el-option label="功能模块" value="MENU"></el-option>
              <!-- <el-option label="系统菜单 " value="EXPIRE"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="菜单CODE" prop="key">
            <el-input :disabled="isEdit" v-model="addDialog.key" placeholder="菜单CODE"></el-input>
          </el-form-item>
          <el-form-item label="菜单英文名称" prop="nameEn">
            <el-input v-model="addDialog.nameEn" placeholder="菜单英文名称"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="url">
            <el-input v-model="addDialog.url" placeholder="菜单路径"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model="addDialog.icon" placeholder="菜单图标"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-radio v-model="addDialog.state" label="NORMAL">有效</el-radio>
            <el-radio v-model="addDialog.state" label="EXPIRE">无效</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统模块" prop="rootId">
            <el-select v-model="addDialog.rootId" @change="handleSystemChange" placeholder="系统模块">
              <!-- <el-option label="平台" value="plateform"> </el-option> -->
              <el-option :label="item.key" :value="item.id" v-for="item in list" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单中文名称" prop="name">
            <el-input v-model="addDialog.name" placeholder="菜单中文名称"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" prop="pid">
            <el-autocomplete
              v-model.trim="addDialog.pidName"
              :fetch-suggestions="querySearch"
              placeholder="上级菜单"
              @select="handleSelectSuperiorMenu"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="对应页面" prop="pageId">
            <el-select filterable clearable v-model="addDialog.pageId" placeholder="系统模块">
              <el-option :label="item.name" :value="item.id" v-for="item in list2" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="orderNumber">
            <el-input v-model="addDialog.orderNumber" placeholder="排序"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { checkKeyExistsHttp } from "@/api/authority/menu.resource.api.js";
import { listByTypeHttp } from "@/api/authority/function.menu.api.js";
import _ from "lodash";

export default {
  name: "addModel",
  props: {
    list: {
      type: Array,
      required: true
    },
    list2: {
      type: Array,
      required: true
    },
    list3: {
      type: Array,
      required: true
    },
    list4: {
      type: Array,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rules: function() {
      const isRequired = this.editModel.type == "PAGE";
      return {
        rootId: [
          { message: "系统类型必填", required: true, trigger: "change" }
        ],
        type: [{ message: "菜单类型必填", required: true, trigger: "change" }],
        name: [
          { message: "菜单中文名称必填", required: true, trigger: "change" }
        ],
        key: [
          {
            validator: this.validateCode,
            trigger: "blur"
          }
        ],
        orderNumber: [
          { message: "排序必填", required: true, trigger: "change" }
        ]
      };
    }
  },
  data() {
    return {
      addDialog: {
        authPolicy: "",
        desc: "",
        id: null,
        interfaceIds: null,
        key: "",
        name: "",
        nameEn: "",
        orderNumber: 1,
        pageId: "", // 菜单绑定的页面
        pid: "", // 上级菜单ID，没有选上级菜单时就取系统模块id
        pidName: "", //上级菜单名称
        rootId: "", // 系统模块id
        state: "NORMAL",
        type: "",
        url: ""
      },

      addDialogRules: {
        rootId: [
          { message: "系统类型必填", required: true, trigger: "change" }
        ],
        type: [{ message: "菜单类型必填", required: true, trigger: "change" }],
        name: [
          { message: "菜单中文名称必填", required: true, trigger: "change" }
        ],
        key: [
          {
            validator: this.validateCode,
            trigger: "blur",
            required: true
          }
        ],
        orderNumber: [
          { message: "排序必填", required: true, trigger: "change" }
        ]
      },
      //菜单中文名称搜索
      chineseNameFn: null,
      chineseNameList: []
    };
  },
  created() {
    this.deBounceSearchChineseName();
  },
  methods: {
    //  获取表单的数据
    getFormData() {
      return this.addDialog;
      // this.$emit('data',this.addDialog);
    },
    validateCode(rule, value, callback) {
      if (value === "") {
        callback("菜单CODE必填");
      } else {
        checkKeyExistsHttp({
          key: value,
          rootId: this.addDialog.rootId
        }).then(data => {
          const res = data.data;
          console.log(11111);
          console.log(res.data);
          if (res.code == 200 && res.data) {
            console.log("菜单CODE重复");
            callback("菜单CODE重复");
          } else {
            callback();
          }
        });
      }
    },
    setFormData(data) {
      this.addDialog = {
        ...this.addDialog,
        ...data
      };
    },
    handleSystemChange(current) {
      this.$emit("getResourceList", "PAGE", current);
      this.$emit("getResourceList", "MENU", current);
    },
    clear() {
      this.$nextTick(() => {
        this.$refs["addModel"].resetFields();
      });
    },
    valid(callback) {
      this.$refs["addModel"].validate(valid => {
        callback(valid);
      });
    },
    deBounceSearchChineseName() {
      this.chineseNameFn = _.debounce(cb => {
        let data = {
          rootId: this.addDialog.rootId,
          type: this.addDialog.type,
          keyword: this.addDialog.name
        };
        listByTypeHttp(data).then(data => {
          const res = data.data;
          if (res.code === 200) {
            this.chineseNameList = res.data;
            this.chineseNameList.forEach(element => {
              element.value = element.name;
            });
            cb(this.chineseNameList);
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }, 150);
    },
    //上级菜单搜索
    querySearch(queryString, cb) {
      this.chineseNameFn(cb);
    },
    //上级菜单选择
    handleSelectSuperiorMenu(item) {
      this.addDialog.pidName = item.value;
      this.addDialog.pid = item.id;
    }
  }
};
</script>

<style></style>
