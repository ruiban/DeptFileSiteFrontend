<template>
  <div class="planningCreateFileList">
    <el-button @click="handleClick"> test </el-button>
    <div class="fileListWrapper text">
      <el-card class="box-card">
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="80px"
          size="small"
          :disabled="formDisabled"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item class="file__upload"> </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import SuperFormMixin from "@/mixins/super-form-mixin";
import { postRequest } from "@/api/api";
export default {
  name: "PlanningCreateFileList",
  mixins: [SuperFormMixin],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value1: "",
      value2: "",
      value3: "",

      disabled: false,
      rules: {},
      fileList: [],
      currentDate: new Date(),
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "删除",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "删除",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "删除",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "删除",
        },
      ],
      formData: {
        fileList: [],
      },
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.formData.fileList = this.$refs.fileUpload.uploadFiles;
      console.log("data:", file, this.formData.fileList);
    },
    handleClick() {
      console.log("testStart");
      console.log(this.$refs.fileUpload);
      console.log("testOver");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.planningCreateFileList {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.file__upload {
  /* border: solid 2px green; */
}
.file__upload >>> .el-upload-list {
  /* display: none; */
}
.file__upload >>> .el-form-item__content {
  margin-left: 0;
}
</style>