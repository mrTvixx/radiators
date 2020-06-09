<template>
  <router-link :to="link">
    <div class="cart">
      <img :src="image" class="cart__image" />
      <span class="cart__title">{{ title }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["title", "link", "image"]
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.cart {
  width: 250px;
  height: 320px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 10px;
  color: $project-color;
  box-shadow: 0 0 14px -5px rgba(0, 0, 0, 0.3);

  &__title {
    text-align: center;
    height: 40px;
    font-size: 1rem;
  }

  &__image {
    width: 100%;
  }

  &:hover {
    box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
  }
}

@media (max-width: 1000px) {
  .cart {
    margin: 70px 0 0 0;
    width: 650px;
    height: 920px;
  }
}
</style>