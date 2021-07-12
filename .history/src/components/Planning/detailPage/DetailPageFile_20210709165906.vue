<template>
  <div class="detailPageFile">
    <div class="fileInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文件列表</span>
        </div>
        <el-row>
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>外观任务单</span>
              </div>
              <div style="padding: 14px">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <hr />
                  <el-button icon="el-icon-zoom-in" circle></el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-download"
                    circle
                  ></el-button>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>外观任务单</span>
              </div>
              <div style="padding: 14px">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <hr />
                  <el-button icon="el-icon-zoom-in" circle></el-button>
                  <el-button
                    type="primary"
                    icon="el-icon-download"
                    circle
                  ></el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailPageFile",
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>
<style scoped>
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