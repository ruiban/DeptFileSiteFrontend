<template>
  <div class="create__planning">
    <el-upload action="#" list-type="picture-card" :auto-upload="false">
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete">
            <i class="el-icon-download"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <el-button @click="handleTest"> test </el-button>
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
      class="planning__form"
      size="small"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="名称">
            <el-input :model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌">
            <el-input :model="form.brand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
          ><el-form-item label="系列名称">
            <el-input :model="form.series_name"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <!-- 策划列表 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column
          prop="imageNumber"
          label="图片数"
          show-overflow-tooltip
        >
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])"
          >切换第二、第三行的选中状态</el-button
        >
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
      <!-- 策划列表结束 -->
    </el-form>
  </div>
</template>

<script>
import { getRequest } from "../api/api";
export default {
  data() {
    return {
      tableData: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      multipleSelection: [],
      form: {
        name: "",
        brand: "",
        series_name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        dialogImageUrl: "",
        dialogVisible: false,
        disabled: false,
      },
    };
  },
  //方法列表
  methods: {
    getPlanningList() {
      getRequest("/planning/all").then((res) => {
        console.log(res.data.data.records);
        let records = res.data.data.records;
        this.tableData = records;
      });
    },
    handleTest() {
      getRequest("/planning/all").then((res) => {
        console.log(res.data.data.records);
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  //mounted列表
  mounted() {
    this.getPlanningList();
  },
};
</script>
<style type="text/css">
.create__planning {
  margin-top: 50px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>