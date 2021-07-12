<template>
  <div class="page">
    <header>
      <h3>header</h3>
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
import DetailPageHeader from "../DetailPage/Header.vue";

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
</style>