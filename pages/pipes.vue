<template>
  <PageTemplate :path="[{ link: '/pipes', name: 'Трубы и фитинги' }]">
    <div class="pipes" style="flex-flow: column">
      <div>
        <h2>Раздел находится в стадии наполнения.</h2>
      </div>
      <div>
        <h3>Спасибо за понимание!</h3>
      </div>
      <!-- <ContentFilter />
      <div class="radiators__list">
        <ProductsList />
      </div>-->
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
    this.$store.dispatch(GET_FULL_PRODUCTS_LIST, { productType: 0 });
  }
};
</script>

<style lang="scss" scoped>
.pipes {
  padding: 30px 0;
  display: flex;

  &__list {
    padding: 0 20px;
    width: calc(100% - 360px);
  }
}

@media (max-width: 720px) {
  .pipes {
    flex-flow: column;

    &__list {
      padding: unset;
      width: 100%;
    }
  }
}
</style>