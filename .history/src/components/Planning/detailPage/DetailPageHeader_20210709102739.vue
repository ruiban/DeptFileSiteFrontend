<template>
  <div class="detailPageHeader">
    <div class="baseInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>产品信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">1</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">2</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">3</div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">4</div></el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailPageHeader",
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.el-row {
  margin-bottom: 20px;
}
.el-col:last-child {
    margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  text-align: left;
  padding-left: 20px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>