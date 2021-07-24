<template>
  <div class="distribution-channel-list">
    <el-card class="box-card">
      <div class="box-title">
        <span>销售渠道列表</span>
      </div>
      <div class="box-detail">
        <span
          >销售渠道列表，可以修改产品策划页面中销售渠道的一、二级列表选项</span
        >
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
          <el-card class="box-card">
            <div slot="header" class="clearfix channel_header">
              <span>线下普通渠道</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >编辑</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>线下专供渠道</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >新增渠道</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>线上渠道</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >新增渠道</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>工程机</span>
              <el-button style="float: right; padding: 3px 0" type="text"
                >新增渠道</el-button
              >
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "列表内容 " + o }}
            </div>
          </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
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
  /* width: 80%; */
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
.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 240px; */
  margin-bottom: 16px;
  padding: 24px;
}
.box-title {
  text-align: left;
  font-size: 20px;
}
.box-detail {
  text-align: left;
  color: gray;
  font-size: 16px;
}
.channel_header {
  text-align: left;
}
.box_add {
  padding: 0;
  height: 294px;
  text-align: center;
  border: dashed 1px gray;
}
.new_channel {
  height: 298px;
  width: 370px;
}
</style>