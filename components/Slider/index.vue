<template>
  <div class="slider">
    <hooper ref="carousel" :autoPlay="false" :playSpeed="10000">
      <slide>Slide content 1</slide>
      <slide>Slide content 2</slide>
      <slide>Slide content 3</slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
  </div>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination
} from "hooper";
import "hooper/dist/hooper.css";

export default {
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination
  }
};
</script>

<style lang="scss">
@import "./constants/_default.scss";

.slider {
  padding: 25px 0 25px 0;
  position: relative;

  .cart-svg {
    height: 25px;
    cursor: pointer;
  }
}

.hooper {
  height: 300px;

  &-prev,
  &-next {
    height: 100%;
    cursor: pointer;

    svg:last-child {
      transform: scale(3.4);
      fill: $project-red;
    }
  }

  &-indicator {
    margin: 0 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;

    &.is-active,
    &:hover {
      background-color: $project-red;
    }
  }

  &-slide {
    background-color: #333333;
    color: white;
    font-size: 46px;
    text-align: center;
    border-radius: 12px;
  }

  &-track {
    outline: none;
  }
}
</style>