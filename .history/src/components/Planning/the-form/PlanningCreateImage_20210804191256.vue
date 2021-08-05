<template>
  <div class="planningCreateImage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>产品图片</span>
      </div>
      <div class="text item">
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
                <el-col :span="6">
                  <el-form-item class="image__upload">
                    <el-upload
                      ref="imageUpload"
                      action="#"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :auto-upload="false"
                      :on-change="changeImage"
                      :file-list="formData.imageList"
                    >
                      <i slot="default" class="el-icon-plus"></i>

                      <div slot="file" slot-scope="{ file }">
                        <el-card :body-style="{ padding: '0px' }">
                          <img :src="file.url" class="image" />
                          <div class="image-content" style="padding: 14px">
                            <el-tooltip
                              class="item"
                              effect="dark"
                              placement="bottom"
                            >
                              <div slot="content">{{ file.name }}</div>
                              <span class="file_name">{{ file.name }}</span>
                            </el-tooltip>
                            <div class="bottom clearfix">
                              <!-- <time class="time">{{ currentDate }}</time> -->
                              <hr />
                              <el-button
                                icon="el-icon-zoom-in"
                                @click="handlePictureCardPreview(file)"
                                circle
                              >
                              </el-button>
                              <el-button
                                type="primary"
                                icon="el-icon-download"
                                circle
                              >
                              </el-button>
                              <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="handleRemove(file)"
                              >
                              </el-button>
                            </div>
                          </div>
                        </el-card>
                      </div>
                      <div slot="tip" class="el-upload__tip">
                        只能上传jpg/png/gif文件，且不超过10mb。
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
    </el-card>
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
      formData: {
        imageList: [],
      },
    };
  },
  mounted() {
    console.log("form2", this.$data);
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
    changeImage(file, fileList) {
      const { uid, raw, size } = file;
      console.log("file:", file);
      console.log("fileList:", fileList);
      console.log("imageList:", this.formData.imageList);
      let imageName = file.name;
      console.log("imageName:", imageName);
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(imageName.toLowerCase())) {
        const findCommonNameIndex = this.formData.imageList.findIndex(
          (item) => {
            return item.name == imageName;
          }
        );
        console.log("result:", findCommonNameIndex);
        if (findCommonNameIndex !== -1) {
          this.$message.warning("不能上传同名文件");
          const selectFileList = fileList.filter((item) => {
            return item.name != imageName;
          });
          console.log("selectFileList:", selectFileList);
          this.fileList = fileList.splice(-1);
          return;
        } else {
          this.formData.imageList = this.$refs.imageUpload.uploadFiles;
          this.imageList = fileList;
        }
        console.log(this.formData);
      } else {
        this.$message.error("请选择图片文件");
        this.fileList = fileList.splice(-1);
        return;
      }
    },
    // 覆盖默认的上传行为
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
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix span {
  float: left;
}
.clearfix:after {
  clear: both;
}
.image_card /deep/ .el-upload--picture-card {
  height: 360px;
  margin-left: 20px;
  width: 340px;
  line-height: 360px;
}
.image_card /deep/ .el-form-item__content {
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
.image-content span {
  display: inline-block;
  /* line-height: 36px; */
  width: 100%;
  margin-left: 4px;
  margin-right: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.image {
  width: 100%;
  display: block;
  height: 280px;
}
.bottom {
  text-align: center;
}
</style>