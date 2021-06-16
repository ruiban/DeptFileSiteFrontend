<template>
  <div class="page">
    <planning-create-main form-type="detail" />
  </div>
</template>

<script>
import PlanningCreate from "../the-form/PlanningCreate";

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