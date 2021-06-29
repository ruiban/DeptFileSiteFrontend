<template>
  <div class="planningCreateFileList">
    
  </div>
</template>

<script>
import SuperFormMixin from "@/mixins/super-form-mixin";
import { postRequest } from "@/api/api";
export default {
  name: "PlanningCreateFileList",
  mixins: [SuperFormMixin],
  data() {
    return {
      rules: {
      },
    };
  },
  mounted() {
    console.log("form:", this.data);
  },
};
</script>

<style scoped>
.planningCreateBaseInfo {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  /* border: solid gray 2px; */
}
.planningCreateBaseInfo /deep/ .is-disabled .el-input__inner {
  cursor: text;
  text-align: left;
  background: white;
  border: none;
  color: black;
}
.planningCreateBaseInfo /deep/ .is-disabled .el-input__inner:hover {
  border: solid 2px black;
}
.planningCreateBaseInfo /deep/ .el-textarea.is-disabled .el-textarea__inner {
  cursor: text;
  border: none;
  background: none;
  color: black;
  outline: none;
}
.planningCreateBaseInfo
  /deep/
  .el-textarea.is-disabled
  .el-textarea__inner:hover {
  cursor: text;
  border: solid 2px black;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>