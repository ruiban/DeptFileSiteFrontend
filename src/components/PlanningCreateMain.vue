<template>
  <div class="planningCreateMain">
    <el-button type="primary" @click="handleSave">保存</el-button>
    <el-form
      ref="form1"
      :model="form1"
      :rules="rules1"
      label-width="80px"
      size="small"
    >
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form1.name"></el-input>
        </el-form-item>
    </el-form>
    <el-form ref="form2" :model="form2" :rules="rules2" label-width="80px" size="small">
        <el-form-item label="公司" prop="company">
            <el-input v-model="form2.company"></el-input>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
    data() {
        return {
            form1: {
                name: '',
                age: ''
            },
            form2: {
                company: ''
            },
            rules1: {
                name: [
                    {required: true, message: '请输入姓名', trigger: 'blur'}
                ]
            }
        }
    }
};
</script>
<style scoped>
</style>