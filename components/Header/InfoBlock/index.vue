<template>
  <div class="company-block">
    <router-link to="/" class="company-block__logo">
      <span>Дом</span>
      <span class="red">В</span>
      <span>Тепле</span>
    </router-link>
    <nav class="company-block__menu">
      <router-link
        v-for="item in linksList"
        :key="item.id"
        class="company-block__menu-item"
        :to="item.link"
      >{{item.title}}</router-link>
    </nav>
    <span class="company-block__number">
      <a href="tel:+79459999999" class="phone">+7 945 999 99 99</a>
      <span class="info">
        Ежедневно с 9
        <sup>00</sup>-20
        <sup>00</sup>
      </span>
    </span>
  </div>
</template>

<script>
import { links } from "../../../constants/links";

export default {
  data() {
    return {
      linksList: links
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.company-block {
  padding: 10px 0 0 0;
  display: flex;
  justify-content: space-between;

  .red {
    color: $project-red;
    font-size: inherit;
    font-size: 2.3rem;
    margin: 0 -4px 0 -4px;
  }

  .info {
    font-size: 0.9rem;
    letter-spacing: 0.1px;
  }

  &__number {
    display: flex;
    flex-flow: column;
    min-width: 156px;
  }

  &__logo {
    cursor: pointer;
    min-width: 210px;

    span {
      font-size: 2.3rem;
      font-weight: 500;
    }
  }

  &__menu {
    max-width: 1000px;
    width: 100%;
    display: flex;
    padding: 0 0 6px 30px;
    align-items: flex-end;

    &-item {
      padding: 0 15px 0 0;
      color: $project-color;
      transition: 0.3s;

      &:hover {
        color: $project-red;
      }
    }
  }
}

.phone {
  color: $project-red;
  font-size: 1.24rem;
}
</style>