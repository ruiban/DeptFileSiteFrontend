<template>
  <div class="work_beacn_wrapper">
    <el-row :gutter="40">
      <el-col :span="6">
        <el-card> </el-card>
      </el-col>
      <el-col :span="18">
        <el-tabs type="border-card">
          <el-tab-pane label="用户管理">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.work_beacn_wrapper {
  margin-top: 40px;
}
</style>