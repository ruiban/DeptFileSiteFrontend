<template>
  <div class="planningCreateFileList">
    <el-button @click="handleClick"> test </el-button>
    <div class="fileListWrapper text">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文档附件</span>
        </div>
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
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>外观任务书</span>
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </div>
                <el-form-item class="file__upload">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange"
                    :file-list="fileList"
                  >
                    <div slot="file" slot-scope="{ file }">
                      <div>
                        {{ file.name }}
                      </div>
                    </div>
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-card>
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
.planningCreateFileList >>> .el-form-item__content {
  margin-left: 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix span {
  float: left;
  font-size: 16px;
}
.clearfix:after {
  clear: both;
}
</style>