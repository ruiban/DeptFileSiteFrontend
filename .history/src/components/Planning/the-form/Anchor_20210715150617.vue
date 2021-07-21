<template>
  <div class="anchor">
    <div
      v-for="node in sections"
      :key="node.label"
      :label="node.index"
      :class="[node.ismain ? 'anchor-main-node' : 'anchor-sub-node', {'anchor-node=active': currentSection===node.label}]"
      @click="handleClick(node.label)"
    >
      {{ node.label }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Anchor",
  props: {
    pageBlock: HTMLElement,
  },
  data() {
    return {
      sections: [],
    };
  },
  mounted() {
    this.sections = this.getSectionsData(this.pageBlock);
    this.pageBlock.addEventListener("scroll", this.handlePageScroll);
  },
  beforeDestroy() {
    this.pageBlock.removeEventListener("scroll", this.handlePageScroll);
  },
  methods: {
    getSectionsData(pageBlock) {
      let mainIndex = 0;
      let subIndex = 0;

      const sections = Array.from(pageBlock.querySelectorAll("[data-section]"));
      return sections.map((item, index) => {
        let ismain = false;
        if ("ismain" in item.dataset) {
          ismain = true;
          mainIndex++;
          subIndex = 0;
        } else {
          subIndex++;
        }
        return {
          ismain,
          index: ismain ? mainIndex : `${mainIndex}.${subIndex}`,
          label: item.dataset.section
        }
      });
    },
    handleClick(lable) {
      this.currentSection = label;
      const section = this.pageBlock.querySelector(`[data-section=${label}]`)
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    },
    handlePageScroll(e) {
      e.stopPropagation();
      this.currentSection = this.getCurrentSection();
    },
    getCurrentSection() {},
  },
};
</script>

<style lang="scss" scoped>
.anchor-node-active {
  color: #38f;
}
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