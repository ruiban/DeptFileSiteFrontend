<template>
  <div class="planningCreateBaseInfo">
    <div class="text item">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>产品信息</span>
        </div>
        <div class="text item">
          <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            :disabled="formDisabled"
            label-width="80px"
            label-position="left"
            size="small"
          >
            <el-row :gutter="30">
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="formData.name"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="系列名称">
                  <el-input v-model="formData.seriesName"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="品牌">
                  <el-input v-model="formData.brand"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="类别">
                  <el-select v-model="formData.category" placeholder="请选择">
                    <el-option
                      v-for="item in categoryOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="产品代号">
                  <el-input v-model="formData.productCode"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="产品型号">
                  <el-input v-model="formData.productModel"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="产品规格">
                  <el-input v-model="formData.name"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="产品定位">
                  <el-input v-model="formData.position"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="能效等级">
                  <el-input v-model="formData.energyLevel"> </el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="开发平台">
                  <el-input v-model="formData.developmentPlatform"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="外观颜色">
                  <el-input v-model="formData.brand"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="外观材质">
                  <el-input v-model="formData.brand"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="功能">
                  <el-input v-model="formData.brand"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="基础机型">
                  <el-input v-model="formData.name"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="12" :md="8" :xs="24">
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
            <el-row :gutter="20">
              <el-col :lg="12" :md="24" :xs="24">
                <el-form-item class="change__point" label="较基础机型变更点">
                  <el-input type="textarea" :rows="2" placeholder="请输入内容">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
      <hr />
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>成员信息</span>
        </div>
        <div class="text item">
          <el-form
            ref="form"
            :model="formData"
            :rules="rules"
            :disabled="formDisabled"
            label-width="180px"
            label-position="left"
            size="small"
          >
            <el-row :gutter="30">
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="项目负责人" prop="name">
                  <el-input v-model="formData.name"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="印刷板块负责人">
                  <el-input v-model="formData.seriesName"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="内机控制器负责人">
                  <el-input v-model="formData.brand"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="外机控制器负责人">
                  <el-input v-model="formData.category"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="项目负责人主任">
                  <el-input v-model="formData.productCode"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="印刷负责人主任">
                  <el-input v-model="formData.productModel"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="内机负责人主任">
                  <el-input v-model="formData.name"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="外机负责人主任">
                  <el-input v-model="formData.position"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="遥控器负责人">
                  <el-input v-model="formData.energyLevel"> </el-input>
                </el-form-item>
              </el-col>

              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="智能板块负责人">
                  <el-input v-model="formData.developmentPlatform"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="产品策划负责人">
                  <el-input v-model="formData.brand"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="遥控器负责人主任">
                  <el-input v-model="formData.brand"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item label="智能板块负责人主任">
                  <el-input v-model="formData.name"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :lg="6" :md="8" :xs="24">
                <el-form-item
                  label="产品策划负责人主任"
                  class="distribution_channel"
                >
                  <el-input v-model="formData.name"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import SuperFormMixin from "@/mixins/super-form-mixin";
import { postRequest } from "@/api/api";
export default {
  name: "PlanningCreateBaseInfo",
  mixins: [SuperFormMixin],
  data() {
    return {
      categoryOptions: [
        {
          value: "1",
          label: "柜机",
        },
        {
          value: "2",
          label: "挂机",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
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
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix span {
  float: left;
  font-size: 16px;
}
.box-card {
}
</style>