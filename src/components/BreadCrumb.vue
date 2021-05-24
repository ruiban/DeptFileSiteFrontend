<template>
  <div class="breadcrumb">
    <div class="breadcrumb_item">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in list" :key="item.path + item.name">
          <router-link :to="item">{{ item.meta.breadcrumb }}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$route.matched;
    },
  },
};
</script>