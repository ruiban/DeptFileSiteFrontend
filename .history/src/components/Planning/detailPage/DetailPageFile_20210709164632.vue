<template>
    <div class="detailPageFile">
        <div class="fileInfo">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>文件列表</span>
                </div>
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
}
</script>
<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }
</style>