<template>
  <div class="planningCreateImage">
    <el-card class="box-card">
      <div class="text item">
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="80px"
          size="small"
        >
          <el-row>
            <el-col :span="22">
              <el-form-item label="外观图片" class="image__upload">
                <el-upload
                  ref="imageUpload"
                  action="#"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :auto-upload="false"
                  :on-change="changeImage"
                  multiple
                  :http-request="myUpload"
                  :file-list="formData.images"
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
                    <div class="text-center">
                      <span> {{ file.name }}</span>
                    </div>
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
    </el-card>
  </div>
</template>

<script>
export default {
  name: "PlanningCreaterImage",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      dialogImageName: "",
      disabled: false,
      rules: {},
      formData: {},
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.dialogImageName = file.name;
    },
    handleDownload(file) {
      console.log(file);
    },
    changeImage(image, imageList) {
      let imageName = image.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(imageName.toLowerCase())) {
        this.formData.image_list = imageList;
      } else {
        this.$message.error("请选择图片文件");
      }
    },
    // 覆盖默认的上传行为
    myUpload() {
      console.log("http");
      const formData = new FormData();
      let obj = this.detail_form;
      Object.keys(obj).forEach((key) => {
        formData.append(key, obj[key]);
      });
      for (let i = 0; i < this.formData.image_list.length; i++) {
        formData.append("image_list", this.formData.image_list[i].raw);
      }
      uploadFileRequest("/planning//multipleImageUpload", formData).then(() => {
        console.log("ss");
      });
    },
    validForm() {
      let result = false;
      this.$refs["form"].validate((valid) => {
        result = valid;
      });
      return result;
    },
  },
};
</script>

<style scoped>
.planningCreateImage {
  margin-bottom: 20px;
}
</style>