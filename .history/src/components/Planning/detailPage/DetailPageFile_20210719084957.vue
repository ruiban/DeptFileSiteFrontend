<template>
  <div class="detailPageFile">
    <div class="fileInfo">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文件列表</span>
        </div>
        <el-row gutter="20" class="infoRow">
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>外观任务单</span>
              </div>
              <div style="padding: 14px">
                <span>外观任务单下发完成时间</span>
                <el-tag type="danger">未完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">暂无</time>
                  <hr />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>产品策划方案书</span>
              </div>
              <div style="padding: 14px">
                <span>产品策划方案书下发完成时间</span>
                <el-tag type="success">完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <hr />
                  <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column label="日期" width="240">
                      <template slot-scope="scope">{{
                        scope.row.date
                      }}</template>
                    </el-table-column>

                    <el-table-column
                      prop="address"
                      label="操作"
                      show-overflow-tooltip
                    >
                    </el-table-column>
                  </el-table>
                  <hr />
                  <el-button type="primary" icon="el-icon-download"
                    >批量下载</el-button
                  >
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row gutter="20" class="infoRow">
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>外观任务单</span>
              </div>
              <div style="padding: 14px">
                <span>外观任务单下发完成时间</span>
                <el-tag type="danger">未完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">暂无</time>
                  <hr />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>外观任务单</span>
              </div>
              <div style="padding: 14px">
                <span>外观任务单下发完成时间</span>
                <el-tag type="danger">未完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">暂无</time>
                  <hr />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>外观任务单</span>
              </div>
              <div style="padding: 14px">
                <span>外观任务单下发完成时间</span>
                <el-tag type="danger">未完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">暂无</time>
                  <hr />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>产品策划方案书</span>
              </div>
              <div style="padding: 14px">
                <span>产品策划方案书下发完成时间</span>
                <el-tag type="success">完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <hr />
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row gutter="20" class="infoRow">
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>外观任务单</span>
              </div>
              <div style="padding: 14px">
                <span>外观任务单下发完成时间</span>
                <el-tag type="danger">未完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">暂无</time>
                  <hr />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <span>外观任务单</span>
              </div>
              <div style="padding: 14px">
                <span>外观任务单下发完成时间</span>
                <el-tag type="danger">未完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">暂无</time>
                  <hr />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <i class="iconfont icon-liangchan"></i>
                <span class="red">量产下发完成时间</span>
              </div>
              <div style="padding: 14px">
                <span>外观任务单下发完成时间</span>
                <el-tag type="danger">未完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">暂无</time>
                  <hr />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <div slot="header" class="clearfix">
                <i class="iconfont icon-xinpinshangshi"></i>
                <span>上市时间</span>
              </div>
              <div style="padding: 14px">
                <span>上市时间</span>
                <el-tag type="success">完成</el-tag>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <hr />
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
import "@/assets/icons/iconfont.css";
export default {
  name: "DetailPageFile",
  data() {
    return {
      currentDate: new Date(),
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
.fileInfo >>> .infoRow {
  margin: 20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix span,
i {
  float: left;
}
.clearfix:after {
  clear: both;
}
</style>