<template>
  <PageTemplate :path="[{ link: '/radiator', name: 'Радиаторы' }]">
    <div class="radiators">
      <ContentFilter />
      <div class="radiators__list">
        <ProductsList />
      </div>
    </div>
  </PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";
import ContentFilter from "../components/ContentFilter";
import ProductsList from "../components/ProductsList";
import { GET_FULL_PRODUCTS_LIST } from "../store/actions.type";

export default {
  components: {
    PageTemplate,
    ContentFilter,
    ProductsList
  },
  mounted() {
    this.currentPath = this.$route.path;
    const { type } = this.$route.query;
    if (!type) this.$store.dispatch(GET_FULL_PRODUCTS_LIST, { productType: 0 });
  }
};
</script>

<style lang="scss" scoped>
.radiators {
  padding: 30px 0;
  display: flex;

  &__list {
    padding: 0 20px;
    width: calc(100% - 360px);
  }
}

@media (max-width: 720px) {
  .radiators {
    flex-flow: column;

    &__list {
      padding: unset;
      width: 100%;
    }
  }
}
</style>