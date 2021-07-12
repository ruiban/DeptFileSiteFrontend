<template>
  <div class="page">
    <header>
      <div class="title">
        <span><b>产品策划详情</b></span>
        <el-button type="primary">导出数据</el-button>
        <el-button>a</el-button>
        <div class="clear"></div> 
      </div>
      <detail-page-header />
    </header>
    <main>
      <h3>main</h3>
    </main>
    <footer>
      <h3>footer</h3>
    </footer>
  </div>
</template>

<script>
import DetailPageHeader from "../DetailPage/DetailPageHeader.vue";

export default {
  components: { DetailPageHeader },
};
</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
header {
  margin: 40px;
}
.title {
  margin: 40px;
}
.title span{
  float: left;
}
.title button{
  float: right;
  margin-right: 20px;
}
.clear{
  clear: both;
}
</style>