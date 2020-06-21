<template>
  <router-link :to="link">
    <div class="cart">
      <img :alt="title" :src="image" class="cart__image" />
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
  margin: 10px 0;
  padding: 10px;
  color: $project-color;
  box-shadow: 0 0 14px -5px rgba(0, 0, 0, 0.3);

  &__title {
    text-align: center;
    height: 40px;
    font-size: 1rem;
  }

  &__image {
    height: 290px;
  }

  &:hover {
    box-shadow: 0 4px 14px -2px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
  }
}

@media (max-width: 720px) {
  .cart {
    margin: 25px auto;
    width: 85%;
  }

  a {
    width: 100%;
  }
}
</style>