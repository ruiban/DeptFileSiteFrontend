<template>
  <div class="planning_edit">
    <h1 v-if="edit">策划详情</h1>
    <h1 v-else>新建策划</h1>
    <div class="planning_edit_container">
      <el-form
        v-model="detail_form"
        label-position="left"
        ref="detail_form"
        label-width="80px"
        class="detail_form"
        size="small"
      >
        <el-row>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="品牌">
              <el-input v-model="detail_form.brand" :readonly="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="名称">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="系列名称">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="产品代号">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="产品型号">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="能效等级">
              <el-input v-model="detail_form.brand"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="类别">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="开发平台">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="产品规格">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="产品定位">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col> </el-row
        ><el-row>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="功能">
              <el-input v-model="detail_form.brand"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="基础机型">
              <el-input v-model="detail_form.name"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="销售渠道" class="distribution_channel">
              <el-cascader
                style="width: 100%"
                v-model="detail_form.distribution_channel"
                :options="detail_form.channel_options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="外观颜色">
              <el-input v-model="detail_form.brand"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="4" :md="8" :xs="24">
            <el-form-item label="外观材质">
              <el-input v-model="detail_form.brand"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="9" :md="24" :xs="24">
            <el-form-item class="change__point" label="较基础机型变更点">
              <el-input type="textarea" :rows="2" placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 图片上传 -->
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
                :file-list="detail_form.images"
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

        <!-- 项目组人员名单表单 -->
        <h1>项目组名单</h1>
        <el-row>
          <el-col :lg="5">
            <el-form-item label="项目负责人" label-width="120px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目负责人主任" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5">
            <el-form-item label="项目负责人" label-width="120px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目负责人主任" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5">
            <el-form-item label="项目负责人" label-width="120px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目负责人主任" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5">
            <el-form-item label="项目负责人" label-width="120px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目负责人主任" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :lg="5">
            <el-form-item label="项目负责人" label-width="120px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目负责人主任" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5">
            <el-form-item label="项目负责人" label-width="120px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目负责人主任" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5">
            <el-form-item label="项目负责人" label-width="120px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目负责人主任" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="5">
            <el-form-item label="项目负责人" label-width="120px">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="项目负责人主任" label-width="120px">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!--系列任务单附件表单 -->
        <h1>任务书及其他附件</h1>
        <el-row class="file__upload">
          <el-col :lg="7" :md="24">
            <el-form-item label="外观任务单下发时间" label-width="200px">
              <el-date-picker type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="已完成">
              <el-switch></el-switch>
            </el-form-item>
            <el-form-item label="附件列表" class="appachment__list">
              <el-upload
                class="upload-demo"
                ref="fileUpload"
                action="#"
                :on-remove="handleRemove"
                :show-file-list="true"
                :file-list="detail_form.file_list"
                :auto-upload="false"
              >
                <el-button slot="trigger" size="small" type="primary"
                  >选取文件</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  状态为已完成才可以上传附件
                </div>
                <div slot="file" slot-scope="{ file }">
                  <span>{{ file.name }}</span>
                  <span v-if="!disabled" @click="handleDownload(file)">
                    <i class="el-icon-download"></i>
                  </span>
                  <span v-if="!disabled" @click="handleDownload(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :lg="7" :md="24">
            <el-form-item label="产品策划方案书下发时间" label-width="200px">
              <el-date-picker type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="已完成">
              <el-switch></el-switch>
            </el-form-item>
          </el-col>
          <el-col :lg="7">
            <el-row>
              <el-col>
                <el-form-item
                  label="产品策划方案书下发时间"
                  label-width="200px"
                >
                  <el-date-picker type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="已完成">
                  <el-switch></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item
                  label="产品策划方案书下发时间"
                  label-width="200px"
                >
                  <el-date-picker type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="已完成">
                  <el-switch></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getRequest } from "../api/api";
import { postRequest } from "../api/api";
import { uploadFileRequest } from "../api/api";
import axios from "axios";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      dialogImageName: "",
      edit: false,
      product: null,
      params: {
        id: parseInt(this.$route.params.id),
      },
      detail_form: {
        name: "",
        brand: "",
        distribution_channel: "",
        file_list: [
          {
            name: "测试佐贺.jpg",
            url: "../static/images/测试佐贺.jpg",
          },
        ],
        images: [],
        channel_options: [
          {
            value: "线下普通渠道",
            label: "线下普通渠道",
            children: [
              {
                value: "线下普通渠道",
                label: "线下普通渠道",
              },
            ],
          },
          {
            value: "线下专供渠道",
            label: "线下专供渠道",
            children: [
              {
                value: "苏宁卖场",
                label: "苏宁卖场",
              },
              {
                value: "国美卖场",
                label: "国美卖场",
              },
            ],
          },
        ],
      },
    };
  },
  beforeCreate: function () {
    if (id) {
      this.edit = true;
    }
  },
  mounted: function () {
    console.log("id:" + this.id);
    if (id) {
      this.postPlanning();
    }
  },
  methods: {
    postPlanning() {
      postRequest("/planning/planning_detail", this.params).then((res) => {
        let records = res.data.data;
        console.log(records);
        this.detail_form = records;
        this.handleHttpRequest();
      });
    },
    postImage() {},
    //图片列表改变钩子
    changeImage(image, imageList) {
      let imageName = image.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(imageName.toLowerCase())) {
        this.detail_form.image_list = imageList;
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
      for (let i = 0; i < this.detail_form.image_list.length; i++) {
        formData.append("image_list", this.detail_form.image_list[i].raw);
      }
      uploadFileRequest("/planning//multipleImageUpload", formData).then(() => {
        console.log("ss");
      });
    },
    onSubmit() {
      this.$refs.imageUpload.submit();
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.dialogImageName = file.name;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
};
</script>
<style scoped>
h1 {
  font-size: 30px;
}
.el-col {
  border-radius: 4px;
  margin-left: 30px;
}
.el-row {
  margin-left: 100px;
}
.el-input__inner {
  text-align: right;
}
.change__point >>> .el-form-item__content {
  padding-right: 40px;
}
.image__upload /deep/ .el-upload--picture-card {
  height: 360px;
  width: 340px;
  line-height: 360px;
}
.image__upload /deep/ .el-form-item__content {
  /* border: solid 2px #dcdfe6; */
  padding: 2px;
  text-align: left;
}
.image__upload /deep/ .el-upload-list__item {
  height: 360px;
  width: 340px;
}
.image__upload /deep/ .el-upload-list__item-thumbnail {
  width: 340px;
  height: 330px;
}
.image__upload /deep/ .el-upload-list__item-actions {
  height: 330px;
}
.text-center {
  text-align: center;
}
.planning_edit_container /deep/ .file__upload {
  text-align: right;
}
</style>