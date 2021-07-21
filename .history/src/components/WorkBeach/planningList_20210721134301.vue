<template>
  <div class="planning_list_wrapper">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="审批人">
    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="formInline.region" placeholder="活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    <el-row :gutter="20" class="list_row">
      <el-col :lg="8" :md="12" class="list_col">
        <el-card class="list_item">
          <div class="item_pic">
            <img
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            >
            </img>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" class="list_col">
        <el-card>
          <div>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            >
            </el-avatar>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" class="list_col">
        <el-card>
          <div>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            >
            </el-avatar>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "PlanningList",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
    };
  },
};
</script>
<style scoped>
.planning_list_wrapper {
}
.list_col {
  margin: 20px 0;
}
.item_pic img {
  width: 320px;
  height: 320px;
}
</style>