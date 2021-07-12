<template>
  <div class="detailPageFile">
    <div class="fileInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文件列表</span>
        </div>
        <el-row>
          <el-col
            :span="11"
            v-for="(o, index) in 2"
            :key="o"
            :offset="index > 0 ? 2 : 0"
          >
            
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