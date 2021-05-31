<template>
  <div class="planningCreateMain">
    <h1>新建策划</h1>
    <planning-create-base-info ref="form1" :data="formDataMap.form1" />
    <planning-create-image ref="form2" :data="formDataMap.form2" />
    <el-button type="primary" @click="handleSave">保存</el-button>
  </div>
</template>
<script>
import PlanningCreateBaseInfo from "../Planning/PlanningCreateBaseInfo.vue";
import PlanningCreateImage from "../Planning/PlanningCreateImage.vue";
export default {
  name: "PlanningCreateMain",
  // 组件
  components: {
    PlanningCreateBaseInfo,
    PlanningCreateImage,
  },
  //data数据
  data() {
    return {
      formDataMap: {
        form1: {
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
        form2: {},
      },
    };
  },
  //methods方法
  methods: {
    handleSave() {
      const formKeys = Object.keys(this.formDataMap);
      const validResults = formKeys.map((formKey) =>
        this.$refs[formKey].validForm()
      );
      if (validResults.every((r) => r)) {
        const formData = {};
        formKeys.map((formKey) => {
          const partFormData = this.$refs[formKey].formData;
          Object.assign(formData, partFormData);
        });
        console.log(formData);
      } else {
        this.$message.warning("校验未通过");
      }
    },
  },
};
</script>
<style scoped>
</style>