<template>
  <div class="page">
    <planning-create-main form-type="add" />
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
  width: 99%;
}
</style>