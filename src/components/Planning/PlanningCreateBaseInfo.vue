<template>
  <div class="planningCreateBaseInfo">
    <el-card class="box-card">
      <div class="text item">
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="80px"
          size="small"
        >
          <el-row :gutter="20">
            <el-col :lg="4" :md="8" :xs="24">
              <el-form-item label="名称">
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
                <el-input v-model="formData.name"> </el-input>
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
            <el-col :lg="4" :md="8" :xs="24">
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
          </el-row>
          <el-row>
            <el-col :lg="9" :md="24" :xs="24">
              <el-form-item class="change__point" label="较基础机型变更点">
                <el-input type="textarea" :rows="2" placeholder="请输入内容">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PlanningCreateBaseInfo",
  data() {
    return {
      formData: {
        channel_options: [
          {
            value: "线下普通渠道",
            label: "线下普通渠道",
            children: [
              {
                value: "线下普通渠道",
                label: "线下普通渠道",
              },
            ],
          },
          {
            value: "线下专供渠道",
            label: "线下专供渠道",
            children: [
              {
                value: "苏宁卖场",
                label: "苏宁卖场",
              },
              {
                value: "国美卖场",
                label: "国美卖场",
              },
            ],
          },
        ],
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },

  methods: {
    validForm() {
      let result = false;
      this.$refs["form"].validate((valid) => {
        result = valid;
      });
      return result;
    },
  },
};
</script>

<style scoped>
.planningCreateBaseInfo {
  margin-bottom: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>