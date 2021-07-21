<template>
  <div class="distribution-channel-list">
    <h1>销售渠道</h1>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="品牌名称" width="180">
      </el-table-column>
      <el-table-column prop="name" label="描述" width="180"> </el-table-column>
      <el-table-column prop="address" label="创建日期"> </el-table-column>
    </el-table>
    <el-pagination small layout="prev, pager, next" :total="50">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
};
</script>
<style scoped>
.distribution-channel-list {
  width: 80%;
  margin: 0 auto;
}
</style>