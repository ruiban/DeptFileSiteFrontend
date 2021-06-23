<template>
  <div ref="pageBlock" class="planningCreateMain">
    <div data-section="基础信息" data-ismain></div>

    <div data-section="产品信息"></div>
    <planning-create-base-info ref="form1" :data="formDataMap.form1" />

    <div data-section="产品图片"></div>
    <planning-create-image ref="form2" :data="formDataMap.form2" />

    <el-button type="primary" @click="handleSave">保存</el-button>
    <div class="anchor-wrapper">
      <!-- <anchor /> -->
    </div>
  </div>
</template>
<script>
import PlanningCreateBaseInfo from "./PlanningCreateBaseInfo.vue";
import PlanningCreateImage from "./PlanningCreateImage.vue";
import Anchor from "./Anchor.vue";
import { postRequest } from "@/api/api";
import { uploadFileRequest } from "@/api/api";
export default {
  name: "PlanningCreate",
  // 组件
  components: {
    PlanningCreateBaseInfo,
    PlanningCreateImage,
    Anchor,
  },
  props: {
    formType: {
      type: String,
      default: "add",
    },
  },
  provide() {
    return {
      formType: this.formType,
    };
  },
  //data数据
  data() {
    return {
      pageBlock: null,
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
  provide() {
    return {
      formType: this.formType,
    };
  },
  //methods方法
  methods: {
    handleSave() {
      var _this = this;
      const formKeys = Object.keys(this.formDataMap);
      const validResults = formKeys.map((formKey) =>
        this.$refs[formKey].validForm()
      );
      // 开始校验
      if (validResults.every((r) => r)) {
        const formData = new FormData();
        let fullFormData = {};
        formKeys.map((formKey) => {
          const partFormData = this.$refs[formKey].formData;
          Object.assign(fullFormData, partFormData);
        });
        Object.keys(fullFormData).forEach((key) => {
          formData.append(key, fullFormData[key]);
        });
        // 校验结束
        formData.delete("imageList");
        if (fullFormData.imageList) {
          for (let i = 0; i < fullFormData.imageList.length; i++) {
            formData.append("imageList", fullFormData.imageList[i].raw);
          }
        }
        console.log(fullFormData);
        console.log("formData:", fullFormData);
        uploadFileRequest("/planning/insert", formData).then((resp) => {
          if (resp.status == 200) {
            if (resp.data.code == 1000) {
              _this.$message({ type: "success", message: "创建成功" });
              let planningId = resp.data.data;
              console.log("id:", planningId);
              let path = "/planning_list/planning_detail/" + planningId;
              this.$router.push(path);
            } else {
              _this.$message({ type: "error", message: resp.data.data });
            }
          } else {
            _this.$message({ type: "error", message: resp.data.data });
          }
          console.log("end");
        });
      } else {
        this.$message.warning("校验未通过");
      }
    },
    myUpload() {
      console.log("myUpload");
    },
  },
};
</script>
<style lang="scss" scoped>
.planningCreateMain {
  position: relative;
  width: 100%;
  padding: 16px;
  margin-top: 20px;
}
.anchor-wrapper {
  position: fixed;
  // background: grey;
  opacity: 0.5;
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
    content: "";
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