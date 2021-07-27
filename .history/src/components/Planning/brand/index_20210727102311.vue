<template>
  <div class="distribution-channel-list">
    <el-card class="box-card header-box">
      <div class="box-title">
        <span>品牌列表</span>
      </div>
      <div class="box-detail">
        <span> 品牌列表，可以对现有品牌进行管理、编辑 </span>
      </div>
      <el-form :model="formInline" class="demo-form-inline">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="审批人">
                <el-input v-model="formInline.user" placeholder="审批人">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="描述">
                <el-input v-model="formInline.user" placeholder="描述">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="创建时期">
                <el-input v-model="formInline.user" placeholder="时间">
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="handleCreate">新建</el-button>
              </el-form-item>
              
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-table :data="tableData" border class="listTable" stripe height="600px">
      <el-table-column prop="date" label="品牌名称">
        <template slot-scope="scope">
          <div>
            <span>{{ scope.row.tab1 }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="描述"> </el-table-column>
      <el-table-column prop="address" label="创建日期"> </el-table-column>
      <el-table-column>
        <template slot="header"> 操作 </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="scope.row.edit = true"
          >
            编辑
          </el-button>
          <el-button type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small layout="prev, pager, next" :total="50">
    </el-pagination>
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
        { tab1: "111", tab2: "222", edit: true },
        { tab1: "aaa", tab2: "bbb", edit: false },
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
    handleCreate() {
      
    }
  },
};
</script>
<style scoped>
.distribution-channel-list {
  /* width: 80%; */
  padding: 24px;
  margin: 0 auto;
}
.el-input {
  max-width: 75%;
}
.listTable {
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
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
</style>