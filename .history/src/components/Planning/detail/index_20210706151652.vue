<template>
  <div class="page">
    <planning-create-index form-type="detail" />
  </div>
</template>

<script>
import PlanningCreateIndex from '../the-form/PlanningCreateIndex.vue';

export default {
  components: { PlanningCreateIndex },
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