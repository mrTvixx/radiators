<template>
  <PageTemplate :path="[{ link: '/accessories', name: 'Комплектующие' }]">
    <div class="protect">
      <ContentFilter />
      <div class="protect__list">
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
  head() {
    return {
      title: "Комплектующие",
    };
  },
  mounted() {
    this.currentPath = this.$route.path;
    const { type } = this.$route.query;
    if (type === undefined) this.$store.dispatch(GET_FULL_PRODUCTS_LIST, { productType: 2 });
  }
};
</script>

<style lang="scss" scoped>
.protect {
  padding: 30px 0;
  display: flex;

  &__list {
    padding: 0 20px;
    width: calc(100% - 360px);
  }
}

@media (max-width: 720px) {
  .protect {
    flex-flow: column;

    &__list {
      padding: unset;
      width: 100%;
    }
  }
}
</style>