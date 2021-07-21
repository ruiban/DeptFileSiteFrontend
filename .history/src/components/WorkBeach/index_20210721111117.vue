<template>
  <div class="work_beacn_wrapper">
    <el-row :gutter="40">
      <el-col :span="6">
        <el-card>
          <div class="demo-basic--circle user_basic_info">
            <div class="block item_avatar">
              <el-avatar
                shape="square"
                :size="100"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
            </div>
          </div>
          <div class="user_position">

          </div>
          <div class="work_state">
              
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="我负责的策划" name="planning"></el-tab-pane>
          <el-tab-pane label="我上次的文件" name="file"></el-tab-pane>
          <component :is="isComponent"></component>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import planningList from "./planningList.vue";
export default {
  components: { planningList },
  data() {
    return {
      activeName: "planning",
      componentsList: {
        planning: "planningList",
        file: "fileList",
      },
    };
  },
  computed: {
    isComponent() {
      return this.componentsList[this.activeName];
    },
  },
};
</script>

<style scoped>
.work_beacn_wrapper {
  margin-top: 40px;
}
</style>