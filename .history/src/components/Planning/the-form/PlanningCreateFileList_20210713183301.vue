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
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>外观任务书下发完成时间</span>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <el-switch
                      style="display: block"
                      v-model="value2"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="已完成"
                      inactive-text="未完成"
                    >
                    </el-switch>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">
                    <el-button @click="selectFile" size="small"
                      >选择文件</el-button
                    >
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <span>附件列表</span>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple">
                    <el-form-item class="file__upload">
                      <div class="fileListBorder">
                        <el-upload
                          class="upload-demo"
                          action="#"
                          ref="fileUploadDemo"
                          :auto-upload="false"
                          :on-change="handleChange"
                          :file-list="fileList"
                        >
                          <div slot="file" slot-scope="{ file }">
                            <div class="fileListItem">
                              <span>{{ file.name }}</span>
                              <span>{{ currentDate}}</span>
                            </div>
                          </div>
                        </el-upload>
                      </div>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
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
    selectFile() {
      this.$refs["fileUploadDemo"].$refs["upload-inner"].handleClick();
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
.el-col {
  margin-bottom: 10px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.file__upload {
  /* border: solid 2px green; */
}
.file__upload >>> .el-upload-list {
  /* display: none; */
}
.upload-demo >>> .el-upload {
  display: none;
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
.fileListBorder {
  border: solid 2px gray;
  height: 120px;
}
</style>