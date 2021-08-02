<template>
  <div ref="pageBlock" class="planningCreateMain">
    <el-dialog
      class="create_plan_dialog"
      title="创建产品策划中"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="image_progress_group">
        <!-- <div class="image_progress_item" :v-for="(item , i) in formData">
          <span>图片1</span>
          <el-progress :stroke-width="10" :type="line" :percentage="percentage" :color="customColor">
          </el-progress>
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="anchor-wrapper">
      <anchor v-if="pageBlock" :page-block="pageBlock" />
    </div>
    <div data-section="基础信息" data-ismain></div>
    <planning-create-base-info ref="form1" :data="formDataMap.form1" />
    <div data-section="产品图片" data-ismain></div>
    <planning-create-image ref="form2" :data="formDataMap.form2" />
    <div data-section="文档信息" data-ismain></div>
    <planning-create-file-list ref="form3" :data="formDataMap.form3" />
    <el-button type="primary" @click="handleSave">创建</el-button>
  </div>
</template>
<script>
import PlanningCreateBaseInfo from "./PlanningCreateBaseInfo.vue";
import PlanningCreateImage from "./PlanningCreateImage.vue";
import PlanningCreateFileList from "./PlanningCreateFileList.vue";
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
    PlanningCreateFileList,
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
      percentage: 10,
      dialogVisible: false,
      colors: [{ color: "#6f7ad3", percentage: 100 }],
      imageTest: "",
      params: {
        id: parseInt(this.$route.params.id),
      },
      pageBlock: null,
      formDataMap: {
        form1: {},
        form2: {},
        form3: {},
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
    console.log(this.$refs["form3"].validForm());
    this.pageBlock = this.$refs["pageBlock"];
  },
  methods: {
    //编辑页面获取策划详细数据
    postPlanning() {
      postRequest("/plan/plan_detail", this.params).then((res) => {
        let records = res.data.data;
        var _this = this;
        let formDataMap = this.resolveDataToMap(records);
        console.log("postFormDataMap:", formDataMap);
        formDataMap.form1.channel_options = this.getDistributionChannelList();
        _this.formDataMap = Object.assign(formDataMap);
      });
      console.log("this.formDataMap:", this.formDataMap);
    },
    // 获取销售渠道列表
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
    // 数据转换
    resolveDataToMap(data) {
      let base = process.env.API_HOST;
      for (let i = 0; i < data.pictureList.length; i++) {
        console.log(base + data.pictureList[i].path);
        data.pictureList[i].url = base + data.pictureList[i].path;
      }
      const form1 = {
        name: data.name,
        brand: data.brand,
        distribution_channel: [
          Number(data.distribution_channel_first),
          Number(data.distribution_channel_second),
        ],
      };
      const form2 = {
        imageList: data.pictureList,
      };
      const form3 = {};
      return { form1, form2, form3 };
    },
    resolveDataToChannel(data) {
      const form1 = {
        channel_options: data,
      };
      const form2 = {};
      const form3 = {};
      return { form1, form2, form3 };
    },
    // 表单上传
    handleSave() {
      var _this = this;
      _this.dialogVisible = true;
      const formKeys = Object.keys(_this.formDataMap);
      console.log("formKeys", _this.formDataMap);
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
        formData.delete("fileList");
        if (fullFormData.fileList) {
          for (let i = 0; i < fullFormData.fileList.length; i++) {
            formData.append("fileList", fullFormData.fileList[i].raw);
          }
        }
        console.log("formData", fullFormData);
        console.log("fullformData:", fullFormData);
        _this.formDataMap = fullFormData;
        // uploadFileRequest("/plan/insert", formData).then((resp) => {
        //   if (resp.status == 200) {
        //     if (resp.data.code == 1000) {
        //       _this.$message({ type: "success", message: "创建成功" });
        //       let planningId = resp.data.data;
        //       console.log("id:", planningId);
        //       for (let i = 0; i < resp.data.data.pictureList.length; i++) {
        //         if(resp.data.data.pictureList[i].status = true) {
        //           this.percentage = 100;
        //         }
        //       }
        //       // let path = "/planning_list";
        //       // this.$router.push(path);
        //     } else {
        //       _this.$message({ type: "error", message: resp.data.msg });
        //     }
        //   } else {
        //     _this.$message({ type: "error", message: resp.data.msg });
        //   }
        //   console.log("end");
        // });
      } else {
        this.$message.warning("校验未通过");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.planningCreateMain {
  position: relative;
  // width: 100%;
  padding: 16px;
  margin-top: 20px;
}
.anchor-wrapper {
  position: fixed;
  // background: grey;
  opacity: 0.6;
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