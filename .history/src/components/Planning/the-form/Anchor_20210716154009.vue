<template>
  <div class="anchor">
    <img src="@/assets/cute.png" alt="">
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
import debounce from "lodash.debounce";
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
    this.debouncePageScrollHandler = debounce(this.handlePageScroll, 100);
    window.addEventListener("scroll", this.debouncePageScrollHandler);
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
          top: this.getElementToPageTop(item) + 10,
        };
      });
    },
    getElementToPageTop(el) {
      if (el.offsetParent) {
        return this.getElementToPageTop(el.offsetParent) + el.offsetTop;
      }
      return el.offsetTop;
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
      console.log("scroll");
      this.currentSection = this.getCurrentSection();
    },
    getCurrentSection() {
      const currentScrollTop = document.documentElement.scrollTop;
      console.log("scrollTop", currentScrollTop);
      const sections = this.sections;
      const length = sections.length;
      let currentSection;
      for (let i = 0; i < length; i++) {
        if (
          currentScrollTop === sections[i].top ||
          (i < length - 1 &&
            currentScrollTop > sections[i].top - 30 &&
            currentScrollTop < sections[i + 1].top - 30)
        ) {
          console.log("xh", i);
          console.log("sectionTop", sections[i].top);
          currentSection = sections[i].label;
          break;
        } else if (i === length - 1) {
          console.log("xh", i);
          console.log("sectionTop", sections[i].top);
          if (currentScrollTop > sections[i].top - 30) {
            console.log("xh", i);
            console.log("sectionTop", sections[i].label);
            currentSection = sections[i].label;
            break;
          }
          console.log("xh", i);
          currentSection = sections[0].label;
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
img {
  width: 200px;
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