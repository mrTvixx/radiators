<template>
  <div>
    <slot></slot>
    <popper
      trigger="clickToOpen"
      v-show="isRestParams"
      :options="{
        placement: 'bottom',
      }"
    >
      <div class="popper">
        <div class="rest-container" ref="restContainer" />
      </div>

      <span class="more" slot="reference">>>></span>
    </popper>
  </div>
</template>

<script>
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";

export default {
  components: {
    Popper,
  },
  data: () => ({
    isRestParams: false,
    parentWidth: 0,
  }),
  mounted() {
    this.parentWidth = this.$slots.default[0].elm.offsetWidth;
    this.handleRest();
    window.addEventListener("resize", this.handleRest);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleRest);
  },
  methods: {
    handleRest() {
      this.$refs.restContainer.innerHTML = "";
      this.isRestParams = false;

      let totalElmsWidth = 0;

      const nodes = this.$slots.default[0].elm.children;

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.display = "inline";
        totalElmsWidth = totalElmsWidth + nodes[i].offsetWidth;

        if (totalElmsWidth < this.parentWidth) continue;
        this.isRestParams = true;

        this.$refs.restContainer.appendChild(nodes[i].cloneNode(true));
        nodes[i].style.display = "none";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.more {
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -2px;
  cursor: pointer;
}
.rest-container {
  display: flex;
  flex-flow: column;
  text-align: left;

  & > * {
    margin: 5px 0;
  }
}
.popper {
  box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 5px;
}
</style>
