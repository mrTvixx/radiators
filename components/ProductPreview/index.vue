<template>
  <div class="product">
    <img class="product__image" :src="product.image.file" :alt="product.image.name" />
    <span class="product__manufacturer">{{ getManufacturName(product.manufacturer) }}</span>
    <b class="product__title">{{product.name}}</b>
    <button class="product__button">В корзину</button>
  </div>
</template>

<script>
import { getManufacturName } from "../../utils";

export default {
  props: {
    product: {
      type: Object,
      default: {}
    }
  },
  methods: {
    getManufacturName: getManufacturName
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.product {
  box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.2);
  margin: 10px 0;
  width: 280px;
  display: flex;
  flex-flow: column;
  padding: 5px 10px;

  &__image {
    max-width: 100%;
  }

  &__manufacturer {
    font-size: 16px;
    margin: 10px 0;
  }

  &__title {
    margin: 10px 0;
  }

  &__button {
    border-radius: 5px;
    height: 40px;
    color: white;
    cursor: pointer;
    background-color: $project-red;
    margin: 10px 0;

    &:active {
      box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>