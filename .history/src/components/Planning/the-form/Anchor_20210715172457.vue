<template>
  <div class="anchor">
    <div>
      {{ currentSection}}
    </div>
    <div
      v-for="node in sections"
      :key="node.label"
      :label="node.index"
      :class="[
        node.ismain ? 'anchor-main-node' : 'anchor-sub-node',
        { 'anchor-node-active': currentSection === node.label },
      ]"
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
      currentSection: "",
      sections: [],
    };
  },
  mounted() {
    this.sections = this.getSectionsData(this.pageBlock);
    this.currentSection = this.getCurrentSection();
    window.addEventListener("scroll", this.handlePageScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handlePageScroll);
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
          label: item.dataset.section,
          top: item.offsetTop,
        };
      });
    },
    handleClick(label) {
      this.currentSection = label;
      console.log(this.currentSection);
      const section = this.pageBlock.querySelector(`[data-section=${label}]`);
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    handlePageScroll(e) {
      e.stopPropagation();
      console.log('scroll')
      this.currentSection = this.getCurrentSection();
    },
    getCurrentSection() {
      const currentScrollTop = document.documentElement.scrollTop - 140 ;
      console.log("scrollTop", currentScrollTop);
      const sections = this.sections;
      console.log("sections", sections);
      const length = sections.length;
      console.log('length', length)
      let currentSection;
      for (let i = 0; i < length; i++) {
        if (
          currentScrollTop === sections[i].top ||
          (i < length - 1 &&
            currentScrollTop > sections[i].top &&
            currentScrollTop < sections[i + 1].top)
        ) {
          console.log('xh', 1)
          currentSection = sections[i].label;
          break;
        } else if (i === length - 1) {
          if (currentScrollTop > sections[i].top) {
            console.log('xh', 2)
            currentSection = sections[i].label;
            break;
          }
          console.log('xh', 3)
        }
      }
      
      console.log("currentSection", currentSection);
      return currentSection;
    },
  },
};
</script>

<style lang="scss" scoped>
.anchor-node-active {
  color: #38f !important;
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