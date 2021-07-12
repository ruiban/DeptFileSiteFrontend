<template>
  <div class="planningCreateFileList">
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
              <el-upload
                class="upload-demo"
                action="#"
                :on-change="handleChange"
                :file-list="formData.fileList"
                :auto-upload="false"
                ref="fileUpload"
              >
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>卡片名称</span>
                    <el-button style="float: right; padding: 3px 0" type="text"
                      >操作按钮</el-button
                    >
                     <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </div>
                  <div v-for="o in 4" :key="o" class="text item">
                    {{ "列表内容 " + o }}
                  </div>
                </el-card>
                
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
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
      console.log("data:", file, this.$refs.fileUpload);
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
</style>