<template>
  <div class="page">
    <header>
      <h2>产品策划详情</h1>
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
h1 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
header {
  margin: 40px;
}
</style>