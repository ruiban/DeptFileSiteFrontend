<template>
  <div class="planningCreateFileList">
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
          <!-- 第一行 -->
          <el-row :gutter="140">
            <!-- 第一行第一列 -->
            <el-col :span="12">
              <el-row :gutter="40">
                <el-col :span="8">
                  <div class="grid-content bg-purple text-left">
                    <span class="red">外观任务书下发完成时间</span>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple text-right">
                    <el-date-picker
                      v-model="appearanceData"
                      type="date"
                      placeholder="选择日期"
                      size="medium"
                    >
                    </el-date-picker>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple text-left">
                    <el-switch
                      style="display: block"
                      v-model="appearanceState"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="已完成"
                      inactive-text="未完成"
                    >
                    </el-switch>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple text-right">
                    <el-button @click="selectAppearanceFile" size="small"
                      >选择文件</el-button
                    >
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple text-left">
                    <span>附件列表</span>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <el-form-item class="file__upload">
                      <div class="fileListBorder">
                        <el-upload
                          class="upload-demo"
                          action="#"
                          ref="appearanceFileUpload"
                          :on-remove="handleRemove"
                          :auto-upload="false"
                          :on-change="handleChange"
                          :file-list="fileList"
                        >
                          <div slot="file" slot-scope="{ file }">
                            <div class="fileListItem clearfix">
                              <el-row :gutter="15">
                                <el-col :span="12">
                                  <div class="grid-content text-left">
                                    <!-- <span>{{file.name}}</span> -->
                                    <el-tooltip
                                      :content="file.name"
                                      placement="top"
                                      effect="light"
                                    >
                                      <span>{{ file.name }}</span>
                                    </el-tooltip>
                                  </div>
                                </el-col>
                                <el-col :span="8">
                                  <div class="grid-content">
                                    <el-tooltip
                                      content="2021-07-14"
                                      placement="top"
                                      effect="light"
                                    >
                                      <span>2021-07-14</span>
                                    </el-tooltip>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="grid-content text-right">
                                    <el-button
                                      type="danger"
                                      @click="handleRemove(file)"
                                      >删除</el-button
                                    >
                                  </div>
                                </el-col>
                              </el-row>
                            </div>
                          </div>
                        </el-upload>
                      </div>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <!-- 第一行第二列 -->
            <el-col :span="12">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple text-left">
                    <span class="red">产品策划方案书完成时间</span>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple text-right">
                    <el-date-picker
                      v-model="planningData"
                      type="date"
                      placeholder="选择日期"
                      size="medium"
                    >
                    </el-date-picker>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple text-left">
                    <el-switch
                      style="display: block"
                      v-model="planningState"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="已完成"
                      inactive-text="未完成"
                    >
                    </el-switch>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple text-right">
                    <el-button @click="selectPlanningFile" size="small"
                      >选择文件</el-button
                    >
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple text-left">
                    <span>附件列表</span>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                    <el-form-item class="file__upload">
                      <div class="fileListBorder">
                        <el-upload
                          class="upload-demo"
                          action="#"
                          ref="planningFileUpload"
                          :auto-upload="false"
                          :on-change="handleChange"
                          :file-list="planningFileList"
                        >
                          <div slot="file" slot-scope="{ file }">
                            <div class="fileListItem clearfix">
                              <el-row :gutter="15">
                                <el-col :span="12">
                                  <div class="grid-content text-left">
                                    <!-- <span>{{file.name}}</span> -->
                                    <el-tooltip
                                      :content="file.name"
                                      placement="top"
                                      effect="light"
                                    >
                                      <span>{{ file.name }}</span>
                                    </el-tooltip>
                                  </div>
                                </el-col>
                                <el-col :span="8">
                                  <div class="grid-content">
                                    <el-tooltip
                                      content="2021-07-14"
                                      placement="top"
                                      effect="light"
                                    >
                                      <span>2021-07-14</span>
                                    </el-tooltip>
                                  </div>
                                </el-col>
                                <el-col :span="4">
                                  <div class="grid-content text-right">
                                    <el-button
                                      type="danger"
                                      @click="handleRemove(file)"
                                      >删除</el-button
                                    >
                                  </div>
                                </el-col>
                              </el-row>
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
      appearanceData: "",
      appearanceState: "",
      planningData: "",
      planningState: "",
      disabled: false,
      rules: {},
      fileList: [],
      currentDate: new Date(),
      formData: {
        appearanceFileList: [],
        planningFileList: [],
      },
    };
  },
  methods: {
    handleAppearanceChange(file, fileList) {
      this.formData.appearanceFileList = this.$refs.appearanceFileUpload.uploadFiles;
      console.log("data:", file, this.formData.appearancefileList);
    },
    selectAppearanceFile() {
      this.$refs["appearanceFileUpload"].$refs["upload-inner"].handleClick();
    },
    selectPlanningFile() {
      this.$refs["planningFileUpload"].$refs["upload-inner"].handleClick();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
  margin-left: 0 !important;
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
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.red {
  color: red;
}
.fileListBorder {
  border: solid 1px gainsboro;
  height: 120px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.fileListItem .fileName {
  display: inline-block;
  border: 1px solid black;
  float: left;
  margin: 2px;
}
.fileListItem .deleteIcon {
  display: inline-block;
  border: 1px solid grey;
  float: right;
  margin: 2px;
}
.fileListItem .grid-content span {
  display: inline-block;
  line-height: 36px;
  width: 100%;
  margin-left: 4px;
  margin-right: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* .fileListItem .grid-content span{
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
} */
.fileListItem .el-col {
  margin-bottom: 0px;
}
</style>