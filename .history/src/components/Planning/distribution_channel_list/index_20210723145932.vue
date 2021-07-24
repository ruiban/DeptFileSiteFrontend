<template>
  <div class="distribution-channel-list">
    <el-card class="box-card header-box">
      <div class="box-title">
        <span>销售渠道列表</span>
      </div>
      <div class="box-detail">
        <span>
          销售渠道列表，可以修改产品策划页面中销售渠道的一、二级列表选项
        </span>
      </div>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button class="new_channel">+新增一级渠道</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card channel-box">
            <div slot="header" class="clearfix channel_header">
              <span>线下普通渠道</span>
              <el-button @click="dialogTableVisible = true" style="float: right; padding: 3px 0" type="text"
                >编辑</el-button
              >
            </div>

            <div v-for="o in 6" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card channel-box">
            <div slot="header" class="clearfix channel_header">
              <span>线下专供渠道</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >编辑</el-button
              >
            </div>

            <div v-for="o in 6" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card channel-box">
            <div slot="header" class="clearfix channel_header">
              <span>线上专供渠道</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >编辑</el-button
              >
            </div>

            <div v-for="o in 6" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card channel-box">
            <div slot="header" class="clearfix channel_header">
              <span>工程机</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >编辑</el-button
              >
            </div>

            <div v-for="o in 6" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: 'false',
      formInline: {
        user: "",
        region: "",
      },
      newBrand: {
        name: "",
        desc: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
.distribution-channel-list {
  margin: 40px auto;
}
.listTable {
  margin-bottom: 20px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.channel_item {
  text-align: left;
  height: 200px;
  overflow: auto;
}
.channel-box >>> .el-card__body {
  overflow: auto;
  height: 60%;
  text-align: left;
}
.clearfix:after {
  clear: both;
}

.header-box {
  margin-bottom: 16px;
  padding: 24px;
}
.channel-box {
  height: 300px;
  padding: 24px;
  box-sizing: border-box;
  margin-bottom: 16px;
}
.box-title {
  text-align: left;
  font-size: 20px;
}
.box-detail {
  text-align: left;
  color: gray;
  font-size: 14px;
}
.channel_header {
  text-align: left;
}
.new_channel {
  height: 298px;
  width: 100%;
  border: dashed 1px gray;
}
</style>