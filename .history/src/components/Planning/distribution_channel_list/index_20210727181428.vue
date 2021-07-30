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
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
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
              <el-button
                @click="dialogTableVisible = true"
                style="float: right; padding: 3px 0"
                type="text"
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
    <!-- dialog -->
    <el-dialog title="渠道管理" :visible.sync="dialogTableVisible">
      <el-form :model="form">
        <el-form-item label="一级渠道名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width: 50%">
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <span>删除</span>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { uploadFileRequest } from "@/api/api";
export default {
  data() {
    return {
      dialogTableVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      newBrand: {
        name: "",
        desc: "",
      },
      fileList: {},
      form: {
        name: "",
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
    submitUpload() {
      uploadFileRequest("/planning/insert", formData).then((resp) => {
        if (resp.status == 200) {
          if (resp.data.code == 1000) {
            _this.$message({ type: "success", message: "创建成功" });
            let planningId = resp.data.data;
            console.log("id:", planningId);
            let path = "/planning_list";
            this.$router.push(path);
          } else {
            _this.$message({ type: "error", message: resp.data.data });
          }
        } else {
          _this.$message({ type: "error", message: resp.data.data });
        }
        console.log("end");
      });
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