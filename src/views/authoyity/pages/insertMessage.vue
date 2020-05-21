<template>
  <!-- liaojunjie 2019年12月17日14:56:35 -->
  <div id="insertMessage">
    <div class="top-info">
      <el-form
        :inline="true"
        ref="formInline"
        :rules="rules"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="自我感觉：">
          <el-select v-model="formInline.fell" placeholder="请选择">
            <el-option
              v-for="item in fellList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期：" prop="dateTime">
          <el-date-picker
            v-model="formInline.dateTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            unlink-panels
            :picker-options="pickerOptions"
            style="width:270px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlerQueryThis('formInline')"
            >查询</el-button
          >
          <el-button type="primary" @click="handlerReset">重置</el-button>
          <el-button type="success" @click="handlerAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="530px"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="fell" label="状态"></el-table-column>
      <el-table-column prop="heartRate" label="心率"></el-table-column>
      <el-table-column prop="bloodPresure" label="血压"></el-table-column>
      <el-table-column prop="templature" label="体温"></el-table-column>
      <el-table-column prop="dateTime" label="创建日期"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑" :visible.sync="editDialog" >
      <el-form :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="心率：" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="editForm.heartRate"
            placeholder="请输入心率"
          ></el-input>
        </el-form-item>
        <el-form-item label="血压：" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="editForm.bloodPresure"
            placeholder="请输入血压"
          ></el-input>
        </el-form-item>
        <el-form-item label="体温：" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="editForm.templature"
            placeholder="请输入体温(华摄氏度)"
          ></el-input>
        </el-form-item>
        <el-form-item label="自我感觉：" :label-width="formLabelWidth">
          <el-select v-model="editForm.fell" placeholder="请选择">
            <el-option
              v-for="item in fellList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="日期："
          prop="dateTime"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="editForm.dateTime"
            type="date"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleResetEdit('editForm')">重 置</el-button>
        <el-button type="primary" @click="handleEditSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增模态框 -->
    <el-dialog title="新增" :visible.sync="addDialog" @close="handlerResetAdd('addForm')">
      <el-form :model="addForm" ref="addForm" :rules="rules">
        <el-form-item
          label="心率："
          prop="heartRate"
          :label-width="formLabelWidth"
        >
          <el-input
            type="number"
            v-model="addForm.heartRate"
            placeholder="请输入心率"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="血压："
          prop="bloodPresure"
          :label-width="formLabelWidth"
        >
          <el-input
            type="number"
            v-model="addForm.bloodPresure"
            placeholder="请输入血压"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="体温："
          prop="templature"
          :label-width="formLabelWidth"
        >
          <el-input
            type="number"
            v-model="addForm.templature"
            placeholder="请输入体温(华摄氏度)"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="自我感觉："
          prop="fell"
          :label-width="formLabelWidth"
        >
          <el-select v-model="addForm.fell" placeholder="请选择">
            <el-option
              v-for="item in fellList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="日期："
          prop="dateTime"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="addForm.dateTime"
            type="date"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleReset('addForm')">重 置</el-button>
        <el-button type="primary" @click="handleAddSure('addForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findMessageByMessage,
  deleteInsertMessage,
  addInsertMessage,
  updateInsertMessage,
  getInsertMessageListByThis,
} from "../api/insertMessage.api";
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";
import _ from "lodash";
export default {
  name: "list",
  data() {
    let startDate = new Date();
    startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
    let end = new Date();
    end.setTime(end.getTime() + 3600 * 1000 * 24);
    return {
      editForm: {
        id: "",
        insertMessageId: "",
        templature: "",
        bloodPresure: "",
        heartRate: "",
        fell: "良好", // 默认自我感觉良好
        dateTime: "",
      },
      addForm: {
        id: "",
        insertMessageId: "",
        templature: "",
        bloodPresure: "",
        heartRate: "",
        fell: "良好", // 默认自我感觉良好
        dateTime: new Date(),
      },
      formInline: {
        templature: "",
        bloodPresure: "",
        heartRate: "",
        fell: "良好", // 默认自我感觉良好
        dateTime: [startDate, end],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              end.setTime(end.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // 自我感觉下拉框
      fellList: [
        {
          value: "良好",
          label: "良好",
        },
        {
          value: "糟糕",
          label: "糟糕",
        },
      ],
      tableData: [],
      tableData1: [
        {
          dateTime: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          dateTime: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true,
        },
        {
          dateTime: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      formLabelWidth: "120px",
      editDialog: false,
      addDialog: false,
      // 当前表格数量，用来新增时存放新的insertMessageId,不显示
      num: "",
      rules: {
        dateTime: [{ message: "日期必填", required: true, trigger: "change" }],
      },
      cloneRow: {},
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    // 查询所有
    // this.handlerQueryThis('formInline');
  },
  methods: {
    handlerResetAdd(type) {
      this.$nextTick(() => {
        this.$refs[type].resetFields();
      });
    },
    handlerReset() {
      let startDate = new Date();
      let end = new Date();
      end.setTime(end.getTime() + 3600 * 1000 * 24);
      startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
      this.formInline = {
        templature: "",
        bloodPresure: "",
        heartRate: "",
        fell: "良好", // 默认自我感觉良好
        dateTime: [startDate, end],
      };
      this.handlerQueryThis("formInline");
    },
    handlerQueryThis(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            id: this.$cookies.get("mcs.id"),
            startTime: moment(this.formInline.dateTime[0]).format("YYYY-MM-DD"),
            endTime: moment(this.formInline.dateTime[1]).format("YYYY-MM-DD"),
            fell: this.formInline.fell,
          };
          getInsertMessageListByThis(obj).then((data) => {
            let res = data;
            if (res.data.code == 200) {
              this.tableData = res.data.data;
            } else {
              this.$message({
                message: res,
                type: "error",
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    //新增操作
    handlerAdd() {
      this.addDialog = true; //弹框显示
    },
    //新增重置
    handleResetAdd() {
      this.$refs["addForm"].resetFields();
    },
    // 新增确认
    handleAddSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addForm.id = this.$cookies.get("mcs.id");
          this.addForm.dateTime = moment(this.addForm.dateTime).format(
            "YYYY-MM-DD"
          );
          this.addDialog = false;
          addInsertMessage(this.addForm).then((data) => {
            let res = data;
            if (res.data.code == 200) {
              this.$message({
                message: res.data.data,
                type: "success",
              });
              this.handlerQueryThis("formInline");
              this.$refs["addForm"].resetFields();
            } else {
              this.$message({
                message: res.data.message,
                type: "error",
              });
            }
          });
        }
      });
    },
    // 编辑重置
    handleResetEdit() {
      this.$refs["editForm"].resetFields();
    },
    // 编辑确认
    handleEditSure() {
      this.editForm.dateTime = moment(this.editForm.dateTime).format(
        "YYYY-MM-DD"
      );
      updateInsertMessage(this.editForm).then((data) => {
        let res = data;
        if (res.data.code == 200) {
          this.$message({
            message: res.data.data,
            type: "success",
          });
          this.editDialog = false;
          this.handlerQueryThis("formInline");
          this.$refs["editForm"].resetFields();
        } else {
          this.$message({
            message: res,
            type: "error",
          });
        }
      });
    },
    handleAdd() {},
    handleEdit(index, row) {
      this.editDialog = true;
      this.cloneRow = _.cloneDeep(row);
      this.cloneRow.dateTime = Math.round(new Date(row.dateTime));
      this.editForm = this.cloneRow;
    },
    handleDelete(index, row) {
      row.dateTime = moment(row.dateTime).format("YYYY-MM-DD");
      deleteInsertMessage(row).then((data) => {
        let res = data;
        if (res.data.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
        this.handlerQueryThis("formInline");
      });
    },
  },
};
</script>

<style lang="scss">
#insertMessage {
  padding: 30px;
  .el-select {
    width: 100%;
  }
}
</style>
