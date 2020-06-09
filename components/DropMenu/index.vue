<template>
  <div class="dropdown" :style="styleWidthObject">
    <div class="dropdown-button">
      <slot></slot>
    </div>
    <ul class="dropdown-menu" v-if="showMenu" :style="styleWidthObject">
      <li
        v-html="option[field || 'name']"
        class="dropdown-menu__element"
        v-for="option in options"
        :key="option.id"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: ["field", "options", "showMenu", "onClose", "styleWidthObject"],
  mounted() {
    document.addEventListener("click", this.clickHandler);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.clickHandler);
  },
  methods: {
    clickHandler(event) {
      const { target } = event;
      const { $el } = this;
      if (!$el.contains(target) && this.showMenu) {
        this.onClose();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.dropdown {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  &-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 275px;
    padding: 0;
    margin: 2px 0 0;
    list-style: none;
    text-align: left;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;

    &__element {
      cursor: pointer;
      padding: 10px 20px 10px 20px;
      color: $project-color;
      white-space: nowrap;
      font-size: 1rem;

      &:hover {
        background: $project-bkg;
        color: $project-red;
      }
    }
  }
}

@media (max-width: 1000px) {
  .dropdown {
  }
}
</style>