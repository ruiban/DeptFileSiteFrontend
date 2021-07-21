<template>
  <div class="page">
    <div class="title">
      <span><b>产品策划详情</b></span>
      <el-button type="primary">导出文档</el-button>
      <el-button>返回</el-button>
      <div class="clear"></div>
    </div>
    <header>
      <detail-page-header />
    </header>
    <main>
      <detail-page-image></detail-page-image>
    </main>
    <footer>
      <detail-page-file></detail-page-file>
    </footer>
  </div>
</template>

<script>
import DetailPageHeader from "../DetailPage/DetailPageHeader.vue";
import DetailPageImage from "../DetailPage/DetailPageImage.vue";
import DetailPageFile from "../DetailPage/DetailPageFile.vue";
import Anchor from "../the-form/Anchor.vue"
export default {
  components: { DetailPageHeader, DetailPageImage, DetailPageFile },
};
</script>

<style scoped>
.page {
  position: relative;
  width: 80%;
  height: 100%;
  overflow-y: auto;
}
header,
main,
footer {
  margin: 40px 10px 40px 10px;
}
.title {
  margin: 40px 0px;
}
.title span {
  float: left;
}
.title button {
  float: right;
  margin-right: 20px;
}
.clear {
  clear: both;
}
</style>