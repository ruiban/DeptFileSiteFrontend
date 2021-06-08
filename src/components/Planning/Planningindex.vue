<template>
  <div class="page">
    <planning-create-main form-type="add" />
  </div>
</template>

<script>
import PlanningCreateMain from "./PlanningCreateMain";

export default {
  components: { PlanningCreateMain },
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