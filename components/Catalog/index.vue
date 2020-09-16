<template>
  <div class="catalog">
    <h1 class="catalog__title">Каталог</h1>
    <section class="catalog__list">
      <CatalogElement
        v-for="item in catalogList"
        :key="item.id"
        :title="item.title"
        :link="item.link"
        :image="item.img"
        :alt="item.title"
      />
    </section>
    <CatalogText />
  </div>
</template>

<script>
import CatalogElement from "./CatalogElement";
import CatalogText from "./CatalogText";

import { catalog } from "../../constants/links";

export default {
  components: {
    CatalogElement,
    CatalogText
  },
  data() {
    return {
      catalogList: catalog
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.catalog {
  &__title {
    font-size: 1.7rem;
    color: $project-color;
    font-weight: 600;
  }

  &__list {
    padding: 10px 0 70px 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, 270px);
    justify-content: space-around;
  }
}

@media (max-width: 830px) {
  .catalog {
    &__list {
      justify-content: space-around;
    }
  }
}

@media (max-width: 720px) {
  .catalog {
    &__list {
      grid-template-columns: repeat(auto-fit, 100%);
    }
  }
}
</style>