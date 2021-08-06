<template>
  <div ref="pageBlock" class="planningCreateMain">
    <el-dialog
      v-if="imageResult.length != 0"
      class="create_plan_dialog"
      title="附件上传情况"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div class="image_progress_group">
        <h1>图片附件上传</h1>
        <div
          class="image_progress_item"
          v-for="item in imageResult"
          v-bind:key="item.id"
        >
          <span>{{ item.name }}</span>
          <el-progress
            :stroke-width="10"
            :percentage="item.percentage"
            :color="colors"
          >
          </el-progress>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">返回列表</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          查看详情</el-button
        >
      </span>
    </el-dialog>
    <div class="anchor-wrapper">
      <anchor v-if="pageBlock" :page-block="pageBlock" />
    </div>

    <div data-section="基础信息" data-ismain data-for="form1"></div>
    <keep-alive>
      <planning-create-base-info ref="form1" :data="formDataMap.form1" />
    </keep-alive>

    <div data-section="产品图片" data-ismain></div>
    <planning-create-image ref="form2" :data="formDataMap.form2" />
    <div data-section="文档信息" data-ismain></div>
    <planning-create-file-list ref="form3" :data="formDataMap.form3" />
    <el-button
      type="primary"
      @click="handleSave"
      v-loading.fullscreen.lock="fullscreenLoading"
      >创建</el-button
    >
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
  beforeDestroy() {
    // window.removeEventListener("scroll", this.pageScrollHandler);
    console.log("s");
  },
  //data数据
  data() {
    return {
      dialogVisible: false,
      fullscreenLoading: false,
      imageTest: "",
      params: {
        id: parseInt(this.$route.params.id),
      },
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "red", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "green", percentage: 100 },
      ],
      count: "",
      pageBlock: null,
      formDataMap: {
        form1: {
          options: [
            {
              value: "新风",
              label: "新风",
            },
            {
              value: "制热",
              label: "制热",
            },
            {
              value: "智眠",
              label: "智眠",
            },
          ],
          extraFunction: "",
          categoryOptions: [
            {
              value: "柜机",
              label: "柜机",
            },
            {
              value: "挂机",
              label: "挂机",
            },
          ],
        },
        form2: {
          imageList: [],
        },
        form3: {
          appearance_issue_state: "1",
          appearance_file_list: [],
        },
      },
      imageResult: {},
      fileResult: {},
    };
  },
  provide() {
    return {
      formType: this.formType,
    };
  },
  //methods方法
  created() {
    console.warn("create");
    // 根据页面类型获取数据
    if (~["edit", "detail"].findIndex((i) => i === this.formType)) {
      this.postPlanning();
    } else {
      let _this = this;
      // let formDataMap = this.resolveDataToChannel(
      //   this.getDistributionChannelList()
      // );
      // _this.formDataMap = Object.assign(_this.formDataMap, formDataMap);
      console.log("createFormDataMap:", _this.formDataMap);
    }
  },
  mounted() {
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
    startDivi() {
      const TIME_COUNT = 5;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.$router.push({
              path: "/planning_list",
            });
          }
        }, 1000);
      }
    },
    // 表单上传
    handleSave() {
      var _this = this;
      // _this.dialogVisible = true;
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
          console.log("partFormData", partFormData);
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
        formData.delete("appearance_file_list");
        if (fullFormData.appearance_file_list) {
          for (let i = 0; i < fullFormData.appearance_file_list.length; i++) {
            formData.append(
              "appearance_file_list",
              fullFormData.appearance_file_list[i].raw
            );
          }
        }
        console.log("formData", formData);
        console.log("fullformData:", fullFormData);

        // 调试前端，中断数据传递至后端
        // return;
        uploadFileRequest("/plan/insert", formData).then((resp) => {
          if (resp.status == 200) {
            if (resp.data.code == 1000) {
              _this.$message({ type: "success", message: "创建成功" });
              let planningId = resp.data.data;
              console.log("id:", planningId);
              // _this.imageResult = resp.data.data.pictureList;
              console.log("imageResult", _this.imageResult);
              for (let i = 0; i < resp.data.data.pictureList.length; i++) {
                if ((resp.data.data.pictureList[i].status = true)) {
                  _this.imageResult[i].percentage = 100;
                } else {
                  _this.imageResult[i].percentage = 50;
                }
              }
              // this.startDivi();
              // let path = "/planning_list";
              // this.$router.push(path);
            } else {
              this.$message({ type: "warning", message: resp.data.msg });
            }
          } else {
            this.$message({ type: "warning", message: resp.data.msg });
          }
          console.log("end");
        });
      } else {
        this.$message.warning("校验未通过");
        formKeys.map((formKey, index) => {
          const section = this.pageBlock.querySelector(`[data-for=${formKey}]`);
          if (!validResults[index]) {
            section.setAttribute("data-tip", "");
          } else {
            section.removeAttribute("data-tip");
          }
        });
      }
    },
  },
};
</script>
<style scoped>
.planningCreateMain {
  position: relative;
  padding: 16px;
  margin-top: 20px;
}
.anchor-wrapper {
  position: fixed;
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
}
div[data-section]::before {
  content: attr(data-section);
}

div[data-ismain] {
  font-size: 16px;
  font-weight: bold;
  margin-left: 28px;
}
div[data-ismain] ::after {
  content: "";
  position: absolute;
  left: -16px;
  top: 14px;
  width: 4px;
  height: 16px;
  background: #5c658d;
  border-radius: 2px;
}
</style>