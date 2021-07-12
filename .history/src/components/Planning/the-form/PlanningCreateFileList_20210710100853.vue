<template>
  <div class="planningCreateFileList">
    <el-button @click="handleClick"> test </el-button>
    <div class="fileListWrapper text">
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
            <el-form-item class="file__upload">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>外观任务单</span>
                </div>
                <el-upload
                  class="upload-demo"
                  action="#"
                  :on-change="handleChange"
                  :file-list="formData.fileList"
                  :auto-upload="false"
                  ref="fileUpload"
                >
                  <div slot="file" slot-scope="{ file }">
                    <div>
                      {{ file.name }}
                    </div>
                  </div>
                  <el-button
                    ref="fileSelect"
                    slot="trigger"
                    size="small"
                    type="primary"
                    >选取文件</el-button
                  >
                </el-upload>
              </el-card>
              <!-- <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span> -->
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
      disabled: false,
      rules: {},
      fileList: [],
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
      this.$refs.fileSelect.handleClick();
      console.log("testOver");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.file__upload {
  border: solid 2px green;
}
.file__upload >>> .el-upload-list {
  /* display: none; */
}
</style>