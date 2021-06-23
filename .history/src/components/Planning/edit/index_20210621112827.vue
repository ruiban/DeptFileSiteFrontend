<template>
  <div class="page">
    <planning-create form-type="detail" />
  </div>
</template>

<script>
import PlanningCreate from "../the-form/PlanningCreate.vue";

export default {
  components: { PlanningCreate },
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