<template>
  <PageTemplate :path="[{link: '/search', name: 'Поиск'}]">
    <div class="search">
      <ContentFilter />
      <div class="search__block">
        <div class="search__filter">
          <span class="filter__item filter__item--active">Все</span>
          <span class="filter__item">Buderus</span>
          <span class="filter__item">Kermi</span>
          <span class="filter__item">Refar</span>
        </div>
        <div v-if="fullProductsList && fullProductsList.length" class="search__list">
          <ProductPreview v-for="item in fullProductsList" :key="item.id" :product="item" />
        </div>
        <div v-else>Ниче не найдено</div>
      </div>
    </div>
  </PageTemplate>
</template>

<script>
import { mapGetters } from "vuex";

import { GET_FULL_PRODUCTS_LIST } from "../store/actions.type";
import PageTemplate from "../components/PageTemplate";
import ContentFilter from "../components/ContentFilter";
import ProductPreview from "../components/ProductPreview";

export default {
  components: {
    PageTemplate,
    ProductPreview,
    ContentFilter
  },
  computed: {
    ...mapGetters(["reg", "fullProductsList"])
  },
  mounted() {
    this.$store.dispatch(GET_FULL_PRODUCTS_LIST, {
      name: this.reg || "",
      productType: 0
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.filter {
  &__item {
    background-color: white;
    color: #f12d05;
    border-radius: 15px;
    font-size: 18px;
    padding: 3px 20px;
    cursor: pointer;
    transition: 0.3s;
    margin: 0 0 0 10px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);

    &--active {
      background-color: $project-red;
      color: white;
    }
  }
}

.search {
  padding: 30px 0;
  display: flex;

  &__block {
    padding: 0 20px;
    width: calc(100% - 320px);
  }

  &__list {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>