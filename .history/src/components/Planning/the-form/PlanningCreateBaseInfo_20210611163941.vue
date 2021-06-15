<template>
  <div class="planningCreateBaseInfo">
    <div class="text item">
      <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        :disabled="formDisabled"
        label-width="80px"
        size="small"
      >
        <el-row :gutter="20">
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="名称" prop="name"> 
              <el-input v-model="formData.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="系列名称">
              <el-input v-model="formData.seriesName"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="品牌">
              <el-input v-model="formData.brand"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="产品代号">
              <el-input v-model="formData.productCode"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="产品型号">
              <el-input v-model="formData.productModel"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="能效等级">
              <el-input v-model="formData.energyLevel"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="类别">
              <el-input v-model="formData.category"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="开发平台">
              <el-input v-model="formData.developmentPlatform"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="产品规格">
              <el-input v-model="formData.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="产品定位">
              <el-input v-model="formData.position"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="功能">
              <el-input v-model="formData.brand"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="基础机型">
              <el-input v-model="formData.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="8" :xs="24">
            <el-form-item label="销售渠道" class="distribution_channel">
              <el-cascader
                style="width: 100%"
                v-model="formData.distribution_channel"
                :options="formData.channel_options"
                :props="{ expandTrigger: 'hover' }"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter=20>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="外观颜色">
              <el-input v-model="formData.brand"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="外观材质">
              <el-input v-model="formData.brand"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="24" :xs="24">
            <el-form-item
              class="change__point"
              label="较基础机型变更点"
            >
              <el-input type="textarea" :rows="2" placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import SuperFormMixin from "@/mixins/super-form-mixin";
export default {
  name: "PlanningCreateBaseInfo",
  mixins: [SuperFormMixin],
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  methods: {},
};
</script>

<style scoped>
.planningCreateBaseInfo {
  margin-left: 40px;
  margin-bottom: 20px;
}
.planningCreateBaseInfo /deep/ .is-disabled .el-input__inner {
  cursor: text;
  text-align: left;
  background: white;
  border: none;
}
.planningCreateBaseInfo /deep/ .is-disabled .el-input__inner:hover {
  border: solid 2px paleturquoise;
}
.planningCreateBaseInfo /deep/ .el-textarea.is-disabled .el-textarea__inner {
  cursor: text;
  border: none;
  background: none;
  outline: none;
}
.planningCreateBaseInfo
  /deep/
  .el-textarea.is-disabled
  .el-textarea__inner:hover {
  cursor: text;
  border: solid 2px paleturquoise;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>