<template>
  <div class="page" ref="pageBlock">
    <div class="title">
      <span><b>产品策划详情</b></span>
      <el-button type="primary">导出文档</el-button>
      <el-button>返回</el-button>
      <div class="clear"></div>
    </div>
    <header>
      <div data-section="基础信息" data-ismain></div>
      <detail-page-header />
    </header>
    <main>
      <detail-page-image></detail-page-image>
    </main>
    <footer>
      <detail-page-file></detail-page-file>
    </footer>
    <div class="anchor-wrapper">
      <anchor v-if="pageBlock" :page-block="pageBlock" />
    </div>
  </div>
</template>

<script>
import DetailPageHeader from "../DetailPage/DetailPageHeader.vue";
import DetailPageImage from "../DetailPage/DetailPageImage.vue";
import DetailPageFile from "../DetailPage/DetailPageFile.vue";
import Anchor from "../the-form/Anchor.vue";
export default {
  components: { DetailPageHeader, DetailPageImage, DetailPageFile, Anchor },
  data() {
    return {
      pageBlock: null,
    };
  },
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
.anchor-wrapper {
  position: fixed;
  opacity: 0.6;
  right: 0;
  width: 220px;
  height: 300px;
  top: 30%;
  transform: translate(0, -50%);
}
</style>