<template>
  <div class="detailPageImage">
    <div class="imageInfo">
      <el-card>
          <el-row>
        <el-col
          :span="4"
          v-for="(o, index) in 5"
          :key="o"
          :offset="index > 0 ? 1 : 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <hr>
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
  name: "DetailPageImage",
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

.clearfix:after {
  clear: both;
}
</style>