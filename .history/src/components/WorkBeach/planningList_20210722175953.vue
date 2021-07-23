<template>
  <div class="planning_list_wrapper">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="formInline.user" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="formInline.region" placeholder="类型">
          <el-option label="柜机" value="shanghai"></el-option>
          <el-option label="挂机" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="状态">
            <el-option label="已完成" value="shanghai"></el-option>
            <el-option label="进行中" value="beijing"></el-option>
            <el-option label="已关闭" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20" class="list_row">
      <el-col :lg="8" :md="12" class="list_col">
        <el-card class="list_item">
          <div class="item_pic">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png"
            />
          </div>
          <div class="item_body">
            <div class="item_detail">
              <div class="item_title">
                <span class="info_name">画时代II</span>
              </div>
              <div class="item_description">
                <span class="info_brand">画时代</span>
                <span class="info_type">柜机</span>
              </div>
            </div>

            <div class="item_time">
              <span class="info_time"> 2021-05-25 </span>
              <span class="info_detail"
                ><el-link type="primary">详情</el-link></span
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" class="list_col">
        <el-card class="list_item">
          <div class="item_pic">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png"
            />
          </div>
          <div class="item_body">
            <div class="item_info">
              <span class="info_name"> 名称：名称 </span>
            </div>
            <div class="item_info">
              <span class="info_brand">品牌：brand</span>
              <span class="info_type">类型: 柜机</span>
            </div>
            <div class="item_time">
              <span class="info_time"> 2021-05-25 </span>
              <span class="info_detail"
                ><el-link type="primary">详情</el-link></span
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" class="list_col">
        <el-card class="list_item">
          <div class="item_pic">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png"
            />
          </div>
          <div class="item_body">
            <div class="item_info">
              <span class="info_name"> 名称：名称 </span>
            </div>
            <div class="item_info">
              <span class="info_brand">品牌：brand</span>
              <span class="info_type">类型: 柜机</span>
            </div>
            <div class="item_time">
              <span class="info_time"> 2021-05-25 </span>
              <span class="info_detail"
                ><el-link type="primary">详情</el-link></span
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="list_row">
      <el-col :lg="8" :md="12" class="list_col">
        <el-card class="list_item">
          <div class="item_pic">
            <img
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
          <div class="item_body">
            <div class="item_info">
              <span class="info_name"> 名称：名称 </span>
            </div>
            <div class="item_info">
              <span class="info_brand">品牌：brand</span>
              <span class="info_type">类型: 柜机</span>
            </div>
            <div class="item_time">
              <span class="info_time"> 2021-05-25 </span>
              <span class="info_detail"
                ><el-link type="primary">详情</el-link></span
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" class="list_col">
        <el-card class="list_item">
          <div class="item_pic">
            <img
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
          <div class="item_body">
            <div class="item_info">
              <span class="info_name"> 名称：名称 </span>
            </div>
            <div class="item_info">
              <span class="info_brand">品牌：brand</span>
              <span class="info_type">类型: 柜机</span>
            </div>
            <div class="item_time">
              <span class="info_time"> 2021-05-25 </span>
              <span class="info_detail"
                ><el-link type="primary">详情</el-link></span
              >
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" class="list_col">
        <el-card class="list_item">
          <div class="item_pic">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png"
            />
          </div>
          <div class="item_body">
            <div class="item_info">
              <span class="info_name"> 名称 </span>
            </div>
            <div class="item_info">
              <span class="info_brand">品牌：brand</span>
              <span class="info_type">类型: 柜机</span>
            </div>
            <div class="item_time">
              <span class="info_time"> 2021-05-25 </span>
              <span class="info_detail"
                ><el-link type="primary">详情</el-link></span
              >
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="6"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "PlanningList",
  data() {
    return {
      total: 20,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style scoped>
.planning_list_wrapper {
}
.list_item {
  margin-bottom: 16px;
}
.list_item >>> .el-card__body {
  padding: 0;
}
.item_pic img {
  width: 100%;
  height: 220px;
}
.item_body {
  padding: 24px;
}
.item_title,
.item_description {
  text-align: left;
}
.item_time{
  text-align: left;
  color: gray;
  font-size: 12px;
}
.item_time .info_detail {
  float: right;
}
.info_name {
  font-size: 16px;
  font-weight: 500;
}
.info_brand,
.info_type {
  font-size: 14px;
  color: gray;
}
</style>