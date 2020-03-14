<template>
  <div id="baseright1">
    <SearchHead>
      <div slot="header" class="title clearfix">
        <span>搜索信息</span>
      </div>
      <el-form :inline="true" :model="formInline" :label-width="formLabelWidth" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user"  placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="onSubmit">查询</el-button> -->
        </el-form-item>
      </el-form>
    </SearchHead>
    <SearchHead>
      <div slot="header" class="title clearfix">
        <span>搜索结果</span>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 90%,flex:1"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column type="categoryCode" label="类别代码">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.categoryCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column type="categoryName" label="类别名称">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content='scope.row.categoryName' placement="top-start">
              <el-input placeholder="请输入内容" v-model="scope.row.categoryName"></el-input>
            </el-tooltip>       
          </template>
        </el-table-column>
        <el-table-column type="materialCode" label="物料编码">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.materialCode">
                <i slot="suffix" class="iconIn el-input__icon el-icon-more" @click="materialSearchHandler"></i>
              </el-input>
          </template>
        </el-table-column>
        <el-table-column type="description" label="描述">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content='scope.row.description' placement="top-start">
              <el-input placeholder="请输入内容" v-model="scope.row.description"></el-input>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column type="specification" label="规格">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.specification"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="color" label="颜色">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.color"></el-input>
          </template>
        </el-table-column>
        <el-table-column type="dosage" label="用量">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.dasage"></el-input>
          </template>
        </el-table-column>
        <el-table-column type="unit" label="单位">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.unit"></el-input>
          </template>
        </el-table-column>
        <el-table-column type="location" label="位置">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.location"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </SearchHead>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'baseright1',
  components: {
    // HelloWorld
    
  },
  data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData:[],
        formLabelWidth:"100px",
      }
    },
}
</script>

<style lang="scss" scoped>
#baseright1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
