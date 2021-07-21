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
                      :file-list="formData.imageList"
                    >
                      <i slot="default" class="el-icon-plus"></i>

                      <div slot="file" slot-scope="{ file }">
                        <el-card :body-style="{ padding: '0px' }">
                          <img
                            src="file.url"
                            class="image"
                          />
                          <div style="padding: 14px">
                            <span>好吃的汉堡</span>
                            <div class="bottom clearfix">
                              <time class="time">{{ currentDate }}</time>
                              <hr />
                              <el-button
                                icon="el-icon-zoom-in"
                                circle
                              ></el-button>
                              <el-button
                                type="primary"
                                icon="el-icon-download"
                                circle
                              ></el-button>
                            </div>
                          </div>
                        </el-card>
                        <!-- <img
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
                            @click="handleRemove(file)"
                          >
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                        <el-tooltip
                          class="item"
                          effect="dark"
                          placement="bottom"
                        >
                          <div slot="content">{{ file.name }}</div>
                          <el-button class="file_name">{{
                            file.name
                          }}</el-button>
                        </el-tooltip> -->
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
      imageList: [],
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
      this.imageList = fileList;
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
      console.log("imageList:", this.imageList);
      let imageName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      const findCommonNameIndex = this.imageList.findIndex((item) => {
        console.log("name:", item.name);
        return item.name == imageName;
      });
      if (findCommonNameIndex !== -1) {
        this.$message.warning("不能上传同名文件");
        const selectFileList = fileList.filter((item) => {
          return item.uid != uid;
        });
        console.log("selectFileList:", selectFileList);
        this.imageList = selectFileList;
        return;
      } else {
        this.imageList = fileList;
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

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
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

</style>