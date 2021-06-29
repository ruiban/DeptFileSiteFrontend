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

    <div data-section="附件列表">
      <planning-create-filelist></planning-create-filelist>
    </div>
  </div>
</template>
<script>
import PlanningCreateBaseInfo from "./PlanningCreateBaseInfo.vue";
import PlanningCreateImage from "./PlanningCreateImage.vue";
import Anchor from "./Anchor.vue";
import { postRequest } from "@/api/api";
import { getRequest } from "@/api/api";
import { uploadFileRequest } from "@/api/api";
export default {
  name: "PlanningCreateIndex",
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
      params: {
        id: parseInt(this.$route.params.id),
      },
      pageBlock: null,
      formDataMap: {
        form1: {},
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
  created() {
    // 根据页面类型获取数据
    if (~["edit", "detail"].findIndex((i) => i === this.formType)) {
      this.postPlanning();
    } else {
      let _this = this;
      let formDataMap = this.resolveDataToChannel(
        this.getDistributionChannelList()
      );
      _this.formDataMap = Object.assign(formDataMap);
      console.log("createFormDataMap:", _this.formDataMap);
    }
  },
  mounted() {
    this.pageBlock = this.$refs["pageBlock"];
  },
  methods: {
    postPlanning() {
      postRequest("/planning/planning_detail", this.params).then((res) => {
        let records = res.data.data;
        var _this = this;
        let formDataMap = this.resolveDataToMap(records);
        console.log("postFormDataMap:", formDataMap);
        formDataMap.form1.channel_options = this.getDistributionChannelList();
        _this.formDataMap = Object.assign(formDataMap);
      });
      console.log("this.formDataMap:", this.formDataMap);
    },
    getDistributionChannelList() {
      var channel_options = [];
      getRequest("/distribution_channel/withChildren").then((res) => {
        let list = res.data.data;
        var _this = this;
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
            for (let j = 0; j < list[i].children.length; j++) {
              children.push({
                label: list[i].children[j].name,
                value: list[i].children[j].id,
              });
            }
            channel_options.push({
              label: list[i].name,
              value: list[i].id,
              children: children,
            });
          }
        }
      });
      return channel_options;
    },
    resolveDataToMap(data) {
      const form1 = {
        name: data.name,
        brand: data.brand,
        distribution_channel: [
          Number(data.distribution_channel_first),
          Number(data.distribution_channel_second),
        ],
      };
      const form2 = {
        imageList: data.images,
      };
      return { form1, form2 };
    },
    resolveDataToChannel(data) {
      const form1 = {
        channel_options: data,
      };
      const form2 = {};
      return { form1, form2 };
    },
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
        console.log("fullformData:", fullFormData);
        uploadFileRequest("/planning/insert", formData).then((resp) => {
          if (resp.status == 200) {
            if (resp.data.code == 1000) {
              _this.$message({ type: "success", message: "创建成功" });
              let planningId = resp.data.data;
              console.log("id:", planningId);
              let path = "/planning_list";
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