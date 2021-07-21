<template>
  <div class="file_list_wrapper">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formInline.region" placeholder="类型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="file_list_table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="文件名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="产品名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="类型"> </el-table-column>
        <el-table-column prop="address" label="上传时间"> </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">下载</el-button></el-table-column
        >
      </el-table>
    </div>
    <div class="block page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="6"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "FileList",
  data() {
    return {
      total: 20,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style scoped>
.file_list_wrapper {
}
.list_col {
  margin: 20px 0;
}
.item_pic img {
  width: 100%;
  height: 220px;
}
.page {
  margin-top: 20px;
}
</style>