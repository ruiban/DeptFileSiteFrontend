<template>
  <div class="planningCreateImage">
    <div class="box-card image_card">
      <div class="text item">
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
                  :file-list="fileList"
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
    </div>
  </div>
</template>

<script>
import SuperFormMixin from "@/mixins/super-form-mixin";
export default {
  name: "PlanningCreaterImage",
  mixins: [SuperFormMixin],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      dialogImageName: "",
      disabled: false,
      rules: {},
      fileList: [],
      formData: {
        imageList: [],
      },
    };
  },
  methods: {
    handleRemove(file) {
      let fileList = this.$refs.imageUpload.uploadFiles;
      console.log(fileList);
      let index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid;
      });
      fileList.splice(index, 1);
      this.formData.imageList = fileList;
      console.log(this.formData);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.dialogImageName = file.name;
    },
    handleDownload(file) {
      console.log(file);
    },
    changeImage(file) {
      let imageName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      const findCommonNameIndex = this.formData.imageList.findIndex(
        (item) => item.name == imageName
      );
      if (findCommonNameIndex !== -1) {
        this.$message.warning("不能上传同名文件");
        const selectFileList = this.formData.imageList.filter((item) => {
          return item.uid != uid;
        });
        this.formData.imageList = selectFileList;
        return;
      }
      if (regex.test(imageName.toLowerCase())) {
        this.formData.imageList = this.$refs.imageUpload.uploadFiles;
        console.log(this.formData);
      } else {
        this.$message.error("请选择图片文件");
        return;
      }
    },
    // 覆盖默认的上传行为
    myUpload() {
      console.log("http");
      const postFormData = new FormData();
      let obj = this.formData;
      Object.keys(obj).forEach((key) => {
        postFormData.append(key, obj[key]);
      });
      for (let i = 0; i < this.formData.imageList.length; i++) {
        postFormData.append("imageList", this.formData.imageList[i].raw);
      }
      uploadFileRequest("/planning//multipleImageUpload", postFormData).then(
        () => {
          console.log("ss");
        }
      );
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
/* .image_card /deep/ .el-upload--picture-card {
  display: none;
} */
.image_card /deep/ .el-upload--picture-card {
  height: 360px;
  margin-left: 20px;
  width: 340px;
  line-height: 360px;
}
.image_card /deep/ .el-form-item__content {
  /* border: solid 2px #dcdfe6; */
  padding: 2px;
  text-align: left;
}
.image_card /deep/ .el-upload-list__item {
  height: 380px;
  width: 340px;
}
.image_card /deep/ .el-upload-list__item-thumbnail {
  width: 340px;
  height: 330px;
}
.image_card /deep/ .el-upload-list__item-actions {
  height: 330px;
}
.text-center {
  text-align: center;
}
.image_card /deep/ .el-upload-list__item .file_name {
  width: 100%;
  display: block;
}
.image_card /deep/ .el-upload-list__item .file_name span {
  width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>