<template>
  <div class="distribution-channel-list">
    <h1>品牌列表</h1>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="品牌名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="dialogVisible = true">新建</el-button>
        <el-dialog
          title="新建品牌"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <el-form :model="newBrand">
            <el-form-item label="名称">
              <el-input v-model="newBrand.name" placeholder="品牌名称">
              </el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input
                type="textarea"
                v-model="newBrand.desc"
                placeholder="描述"
              >
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="listTable"
      stripe
    >
      <el-table-column prop="date" label="品牌名称" width="180">
        <template slot-scope="scope">
          <el-input
            placeholder="请输入内容"
            v-show="scope.row.edit"
            v-model="scope.row.tab1"
          >
          </el-input>
          <span v-show="!scope.row.edit">{{ scope.row.tab1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="描述" width="180"> </el-table-column>
      <el-table-column prop="address" label="创建日期"> </el-table-column>
      <el-table-column prop="edit" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="scope.row.edit = true">
            编辑
          </el-button>
          <el-button type="primary" size="small" v-show="scope.row.edit" @click="scope.row.edit = false">保存</el-button>
          <el-button type="danger" size="small" v-show="scope.row.edit">取消</el-button>
          <el-button @click="scope.row.edit = false" type="danger" size="small" v-show="!scope.row.edit">
            删除
          </el-button>
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
  },
};
</script>
<style scoped>
.distribution-channel-list {
  /* width: 80%; */
  padding: 24px;
  margin: 0 auto;
}
.listTable {
  margin-bottom: 20px;
}
</style>