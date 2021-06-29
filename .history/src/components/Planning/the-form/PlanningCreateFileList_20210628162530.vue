<template>
  <div class="planningCreateFileList">
    <h1>FileList</h1>
    <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="80px"
          size="small"
          :disabled="formDisabled"
        >
          <el-row>
            <el-col :span="22">
              <el-form-item class="image__upload">
                <el-upload
                  ref="imageUpload"
                  action="#"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :auto-upload="false"
                  :on-change="changeImage"
                  multiple
                  :http-request="myUpload"
                  :file-list="formData.imageList"
                >
                  <i slot="default" class="el-icon-plus"></i>

                  <div slot="file" slot-scope="{ file }">
                    <img
                      :src="file.url"
                      alt=""
                      class="el-upload-list__item-thumbnail"
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"> </i>
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
                    </span>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                      <div slot="content">{{ file.name }}</div>
                      <el-button class="file_name">{{ file.name }}</el-button>
                    </el-tooltip>
                  </div>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png/gif文件，且不超过10mb。
                    点击图片可预览、下载、删除
                  </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                  <div class="text-center">
                    <span>{{ dialogImageName }}</span>
                  </div>
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
  </div>
</template>

<script>
import SuperFormMixin from "@/mixins/super-form-mixin";
import { postRequest } from "@/api/api";
export default {
  name: "PlanningCreateFileList",
  mixins: [SuperFormMixin],
  data() {
    return {};
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
</style>