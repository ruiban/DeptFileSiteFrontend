<template>
  <div class="detailPageHeader">
    <div class="baseInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>产品信息</span>
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
</style>