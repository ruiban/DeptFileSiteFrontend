<template>
  <div ref="pageBlock" class="planningCreateMain">
    <h1>新建策划</h1>
    <div data-section="基础信息" data-ismain></div>
    <div data-section="产品信息"></div>
    <planning-create-base-info ref="form1" :data="formDataMap.form1" />
    <div data-section="产品图片"></div>
    <planning-create-image ref="form2" :data="formDataMap.form2" />
    <el-button type="primary" @click="handleSave">保存</el-button>
    <div class="anchor-wrapper">
      <anchor :page-block="pageBlock" />
    </div>
  </div>
</template>
<script>
import PlanningCreateBaseInfo from "../Planning/PlanningCreateBaseInfo.vue";
import PlanningCreateImage from "../Planning/PlanningCreateImage.vue";
import Anchor from "../Planning/Anchor.vue";
export default {
  name: "PlanningCreateMain",
  // 组件
  components: {
    PlanningCreateBaseInfo,
    PlanningCreateImage,
    Anchor
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
<style lang="scss" scoped>
  .planningCreaterMain {
    position: relative;
    width: 100%;
    padding: 16px;
    overflow-y: auto;
  }
  .anchor-wrapper {
    position: fixed;
    background: pink;
    right: 0;
    width: 220px;
    height: 300px;
    top: 30%;
    transform: translate(0, -50%);
  }
  div[data-section] {
    position: relative;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    padding: 14px 0;
    margin-left: 34px;
    &::before {
      content: attr(data-section);
    }
  }
  div[data-ismain] {
    font-size: 16px;
    font-weight: bold;
    margin-left: 28px;
    &::after {
      content: '';
      position: absolute;
      left: -16px;
      top: 14px;
      width: 4px;
      height: 16px;
      background: #5c658d;
      border-radius: 2px;
    }
  }
</style>