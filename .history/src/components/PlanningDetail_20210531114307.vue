<template>
  <div class="planning_detail">
    <el-card class="box-card detail_container">
      <div slot="header" class="clearfix">
        <h1>策划详情</h1>
      </div>

      <!-- 第一行 -->
      <el-row :gutter="80" class="left">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>名称：</span>
            <span>{{ planning_detail.name }}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>品牌：</span>
            <span>{{ planning_detail.brand }}</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>系列名称：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>产品代号：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>产品型号：</span>
          </div>
        </el-col>
      </el-row>

      <!-- 第二行 -->
      <el-row :gutter="80" class="left">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>能效等级：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>类别：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>开发平台：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>产品规格：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>产品定位：</span>
          </div>
        </el-col>
      </el-row>

      <!-- 第三行 -->
      <el-row :gutter="80" class="left">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <span>项目类型：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>任务来源：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>产品策划负责人：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>项目经理/负责人：</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>责任科室：</span>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="80" class="left">
        <el-col :span="4">
          <el-row>
            <el-col>
              <span>功能：</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span> 外观颜色： </span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-col>
              <span>基础机型：</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <span> 外观材质： </span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">
            <div class="change_point">较基础机型变更点：</div>
            <div class="change_point">一段很长很长很长很长很长的描述</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card image_card">
      <div slot="header" class="clearfix">
        <h1>外观图片</h1>
      </div>
      <el-upload
        ref="imageUpload"
        action="#"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :auto-upload="false"
        :on-change="changeImage"
        :disabled="true"
        multiple
        :file-list="planning_detail.images_list"
      >
        <i slot="default" class="el-icon-plus"></i>

        <div slot="file" slot-scope="{ file }">
          <img :src="file.url" alt="" class="el-upload-list__item-thumbnail" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"> </i>
            </span>
            <span
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
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
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
        <div class="text-center">
          <span>{{ dialogImageName }}</span>
        </div>
      </el-dialog>
    </el-card>

    <el-card class="box-card member_card">
      <div slot="header" class="clearfix">
        <h1>成员名单</h1>
      </div>

      <!-- 第一行 -->
      <el-row :gutter="80" class="left">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>项目负责人：</span>
            <span>{{ planning_detail.name }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>印刷板块负责人：</span>
            <span>{{ planning_detail.brand }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>内机控制器负责人：</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>外机控制器负责人：</span>
          </div>
        </el-col>
      </el-row>

      <!-- 第二行 -->
      <el-row :gutter="80" class="left">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>项目负责人主任：</span>
            <span>{{ planning_detail.name }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>印刷板块负责人主任：</span>
            <span>{{ planning_detail.brand }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>内机控制器负责人主任：</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>外机控制器负责人主任：</span>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="80" class="left">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>遥控器负责人：</span>
            <span>{{ planning_detail.name }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>智能板块负责人：</span>
            <span>{{ planning_detail.brand }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>产品策划负责人：</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80" class="left">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>遥控器负责人主任：</span>
            <span>{{ planning_detail.name }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>智能板块负责人主任：</span>
            <span>{{ planning_detail.brand }}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>产品策划负责人主任：</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card file_card">
      <div slot="header" class="clearfix">
        <h1>时间节点</h1>
      </div>
      <!-- 第一行 -->
      <el-row :gutter="80" class="left">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>项目负责人：</span>
            <span>{{ planning_detail.name }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>印刷板块负责人：</span>
            <span>{{ planning_detail.brand }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { postRequest } from "../api/api";
export default {
  data() {
    return {
      params: {
        id: parseInt(this.$route.params.id),
      },
      dialogVisible: false,
      dialogImageUrl: '',
      dialogImageName: '',
      planning_detail: {
        name: "",
        brand: "",
        images_list: [
          {
            name: "测试佐贺.jpg",
            url: "../static/images/测试佐贺.jpg",
          },
          {
            name: "测试佐贺.jpg",
            url: "../static/images/测试佐贺.jpg",
          },
        ],
      },
    };
  },
  mounted: function () {
    this.postPlanning();
  },
  methods: {
    postPlanning() {
      postRequest("/planning/planning_detail", this.params).then((res) => {
        let records = res.data.data;
        // this.planning_detail = records;
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      this.dialogImageName = file.name;
    },
    changeImage() {
      console.log("change");
    },
  },
};
</script>

<style scoped>
.el-card {
  margin-bottom: 20px;
}
.detail_container {
  margin-top: 40px;
  margin-bottom: 20px;
}
.left {
  text-align: left;
}
.el-row {
  margin-bottom: 20px;
}
.change_point {
  vertical-align: top;
  display: inline-block;
}
.image_card /deep/ .el-upload--picture-card {
  display: none;
}
.image_card /deep/ .el-upload--picture-card {
  height: 360px;
  width: 340px;
  line-height: 360px;
}
.image_card /deep/ .el-form-item__content {
  /* border: solid 2px #dcdfe6; */
  padding: 2px;
  text-align: left;
}
.image_card /deep/ .el-upload-list__item {
  height: 360px;
  width: 340px;
}
.image_card /deep/ .el-upload-list__item-thumbnail {
  width: 340px;
  height: 330px;
}
.image_card /deep/ .el-upload-list__item-actions {
  height: 330px;
}
</style>
