<template>
  <div class="planning_list_wrapper">
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
};
</script>
<style scoped>
.planning_list_wrapper {

}
.list_col {
    margin: 20px 0;
}
.item_pic img{
    width: 320px;
    height: 320px;
}
</style>