<template>
  <div class="detailPageHeader">
    <div class="baseInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content">名称：</div></el-col>
          <el-col :span="6"><div class="grid-content">系列名称：</div></el-col>
          <el-col :span="6"><div class="grid-content">品牌：</div></el-col>
          <el-col :span="6"><div class="grid-content">类别：</div></el-col>
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
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>