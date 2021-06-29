<template>
  <div class="planningCreateFileList">
    <h1>FileList</h1>
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
              >
                <el-button size="small" type="primary">点击上传</el-button>
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
      fileList:[],
      formData: {
        fileList: [],
      },
    };
  },
  methods: {
    handleChange(file, fileList) {
      console.log("data:", file, this.fileList);
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