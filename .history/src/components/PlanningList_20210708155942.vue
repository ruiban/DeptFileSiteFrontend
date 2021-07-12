<template>
  <div class="planning_list">
    <div class="planning_list_contaniner" v-if="viewShow">
      <!-- 头部容器 -->
      <el-container class="planning__list__top">
        <el-aside width="200px" class="top__aside">
          <i class="el-icon-document"></i>
          <span>产品信息管理</span>
        </el-aside>
        <el-main>
          <el-form
            :model="form"
            label-position="left"
            ref="form"
            label-width="80px"
            class="planning__form"
            size="small"
          >
            <el-row justify="start">
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="名称">
                  <el-input :model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="产品代号">
                  <el-input :model="form.brand"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="品牌">
                  <el-input :model="form.brand"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="策划负责人" label-width="100px">
                  <el-input :model="form.series_name" />
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="12" :xs="24">
                <el-form-item label="上市时间">
                  <el-input :model="form.series_name"></el-input> </el-form-item
              ></el-col>
            </el-row>
            <el-row>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="类别">
                  <el-select v-model="form.category" placeholder="请选择类别">
                    <el-option label="挂机" value="挂机"></el-option>
                    <el-option label="柜机" value="柜机"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="产品规格">
                  <el-input :model="form.brand"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="出风方式">
                  <el-input :model="form.series_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="开发科室" label-width="100px">
                  <el-input :model="form.series_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="12" :xs="24">
                <el-form-item label="销售渠道" class="distribution_channel">
                  <el-cascader
                    style="width: 100%"
                    v-model="form.distribution_channel"
                    :options="form.channel_options"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="品牌">
                  <el-select v-model="form.category" placeholder="请选择类别">
                    <el-option label="挂机" value="挂机"></el-option>
                    <el-option label="柜机" value="柜机"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="能效等级">
                  <el-input :model="form.brand"></el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="4" :md="8" :xs="24">
                <el-form-item label="项目类别">
                  <el-input :model="form.series_name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-main>
      </el-container>
      <!-- 头部容器结束 -->

      <!-- 策划列表 -->
      <el-table
        ref="planningListTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          prop="id"
          label="序号"
          width="120"
          sortable
          align="center"
        />
        <el-table-column
          prop="name"
          label="产品名称"
          width="120"
          align="center"
        />
        <el-table-column
          prop="e_level"
          label="能效等级"
          width="120"
          align="center"
        />
        <el-table-column
          prop="categoty"
          label="类别"
          width="120"
          align="center"
        />
        <el-table-column
          prop="specifications"
          label="规格"
          width="120"
          align="center"
        />
        <el-table-column prop="color" label="颜色" width="120" align="center" />
        <el-table-column
          prop="function"
          label="功能"
          width="120"
          align="center"
        />
        <el-table-column
          prop="o_type"
          label="出风方式"
          width="120"
          align="center"
        />
        <el-table-column
          label="样机评审时间"
          width="240"
          align="center"
          column-key="id"
          :filters="[
            { text: '2021-05-17', value: '2021-05-17' },
            { text: '2021-05-18', value: '2021-05-18' },
            { text: '2021-05-19', value: '2021-05-19' },
          ]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.p_preview_time">
              <i class="el-icon-time"></i>
              <span
                style="margin-left: 10px"
                v-if="scope.row.p_review_time.data"
                >{{ scope.row.p_review_time.data }}</span
              >
              <br />
              <template v-if="scope.row.p_review_time.state">
                <el-tag type="success" size="medium">已完成</el-tag>
              </template>
              <template v-if="!scope.row.p_review_time.state">
                <el-tag type="danger" size="medium">未完成</el-tag>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="person_in_charge"
          label="策划负责人"
          width="120"
        />
        <el-table-column
          prop="develop_office"
          label="开发科室"
          width="120"
          align="center"
        />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <router-link :to="'/planning_list/planning_detail/' + scope.row.id"
              >详情</router-link
            >
            |
            <router-link :to="'/planning_list/planning_edit/' + scope.row.id">
              编辑
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 策划列表结束 -->

      <!-- 分页栏 -->
      <el-pagination
        small
        layout="prev, pager, next"
        :total="50"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
      >
      </el-pagination>
      <!-- 分页栏结束 -->

      <!-- 底部按钮栏 -->
      <div style="margin-top: 20px">
        <el-button type="primary" @click="toggleSelection()"
          >添加产品</el-button
        >
        <el-button type="primary" @click="clearFilter()">导出</el-button>
        <el-button type="primary" @click="toggleSelection()"
          >取消选择</el-button
        >
        <el-button type="primary" @click="clearFilter()">重置筛选</el-button>
      </div>

      <el-button @click="handleTest"> test </el-button>
      <div class="block"></div>
      <!-- 底部按钮栏结束 -->
    </div>
    <router-view />
  </div>
</template>

<script>
import { getRequest } from "../api/api";
export default {
  watch: {
    "$route.path": function (newVal, oldVal) {
      if (newVal !== "/planning_list") {
        this.viewShow = false;
      } else {
        this.viewShow = true;
      }
    },
  },
  data() {
    return {
      viewShow: true,
      tableData: [],
      currentPage: 1,
      pagesize: 20,
      multipleSelection: [],
      form: {
        name: "",
        e_level: "",
        categoty: "",
        specifications: "",
        a_material: "",
        color: "",
        brand: "",
        series_name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        dialogImageUrl: "",
        dialogVisible: false,
        disabled: false,
        distribution_channel: "",
        channel_options: [
          {
            value: "线下普通渠道",
            label: "线下普通渠道",
            children: [
              {
                value: "线下普通渠道",
                label: "线下普通渠道",
              },
            ],
          },
          {
            value: "线下专供渠道",
            label: "线下专供渠道",
            children: [
              {
                value: "苏宁卖场",
                label: "苏宁卖场",
              },
              {
                value: "国美卖场",
                label: "国美卖场",
              },
            ],
          },
        ],
      },
    };
  },
  //方法列表
  methods: {
    getPlanningList() {
      getRequest("/planning/all").then((res) => {
        var _this = this;
        console.log(res.data.data.records);
        var records = res.data.data.records;
        _this.tableData = records;
        console.log("tableData", this.tableData);
      });
    },
    detail(id) {
      this.$router.push({ path: "planning_list/planning/" + id });
    },
    handleTest() {
      getRequest("/planning/all").then((res) => {
        let _this = this;
        let records = res.data.data.records;
        _this.tableData = records;
        console.log(res.data.data.records);
        this.$forceUpdate();
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    clearFilter() {
      this.$refs.planningListTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    handleChange(value) {
      console.log(this.form.distribution_channel);
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage);
      this.getPlanningList();
    },
  },
  //mounted列表
  mounted() {
    this.getPlanningList();
  },
};
</script>
<style type="text/css" scoped>
.create__planning {
  margin-top: 50px;
}

.planning__list__top {
  /* height: 200px; */
}
.top__aside {
  background: white;
}
.el-icon-document {
  font-size: 100px;
  color: #409eff;
  margin-top: 30px;
}
.planning__list__top span {
  display: block;
  font-size: 20px;
}
.el-row {
  margin-bottom: 10px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  margin-left: 10px;
  /* background: #d3dce6; */
}
.distribution_channel > .el-input__inner {
  width: 200px;
}
</style>