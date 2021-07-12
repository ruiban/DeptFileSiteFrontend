<template>
  <div class="page">
    <header>
      <div class="title">
        <span>产品策划详情</span>
        <el-button>a</el-button>
        <el-button type="primary">导出数据</el-button>
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
</style>