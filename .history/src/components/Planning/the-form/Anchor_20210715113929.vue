<template>
  <div class="anchor">
    <div
      v-for="node in sections"
      :key="node.label"
      :label="node.index"
      :class="[node.ismain ? 'anchor-main-node' : 'anchor-sub-node']"
    >
      {{ node.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Anchor",
  data() {
    return {
      sections: [
        { label: "基础信息", ismain: true, index: "1" },
        { label: "产品信息", index: "1.1" },
        { label: "成员信息", index: "1.2" },
        { label: "成员信息", ismain: true, index: "2" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.anchor-main-node {
  position: relative;
  margin: 8px 0;
  font-size: 14px;
  font-weight: bold;
  color: black;
  cursor: pointer;
  &::before {
    content: attr(label);
    margin-left: 6px;
    margin-right: 6px;
  }
}
.anchor-sub-node {
  position: relative;
  margin: 8px 0;
  padding-left: 22px;
  font-size: 14px;
  color: gray;
  cursor: pointer;
  &::before {
    content: attr(label);
    margin-right: 4px;
  }
}
</style>