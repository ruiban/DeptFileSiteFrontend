<template>
  <div class="detailPageHeader">
    <div class="baseInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content"><b>名称：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>系列名称：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>品牌：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>类别：</b></div></el-col>
        
        
          <el-col :span="6"><div class="grid-content"><b>产品代号：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>产品型号：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>产品规格：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>产品定位：</b></div></el-col>
        
        
          <el-col :span="6"><div class="grid-content"><b>能效等级：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>开发平台：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>外观颜色：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>外观材质：</b></div></el-col>
        
        
          <el-col :span="6"><div class="grid-content"><b>功能：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>基础机型：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>销售渠道一：</b></div></el-col>
          <el-col :span="6"><div class="grid-content"><b>销售渠道二：</b></div></el-col>
        </el-row>
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
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