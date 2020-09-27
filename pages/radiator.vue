<template>
  <PageTemplate :path="[{ link: '/radiator', name: 'Радиаторы' }]">
    <div class="radiators">
      <ContentFilter :clearManufacturer="clearManufacturer" :selectedManufacturer="manufacturer" />
      <div class="radiators__list">
        <div class="radiators__filter">
          <span
            v-for="item in manufacturers"
            :key="item.id"
            @click="setManufacturer(item.id)"
            :class="['filter__item', { 'filter__item--active': item.id === manufacturer}]"
          >{{item.name}}</span>
        </div>
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
  data() {
    return {
      manufacturer: null,
      manufacturers: [
        {
          id: null,
          name: "Все",
        },
        {
          id: 0,
          name: "Kermi",
        },
        {
          id: 1,
          name: "Buderus",
        },
        {
          id: 2,
          name: "Rifar",
        },
        {
          id: 9,
          name: "Axis",
        },
      ]
    }
  },
  methods: {
    setManufacturer(id) {
      this.manufacturer = id;
    },
    clearManufacturer() {
      this.manufacturer = null;
    }
  },
  mounted() {
    this.currentPath = this.$route.path;
    const { type } = this.$route.query;
    if (!type) this.$store.dispatch(GET_FULL_PRODUCTS_LIST, { productType: 0 });
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.filter {
  &__item {
    background-color: white;
    color: $project-red;
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

.radiators {
  padding: 30px 0;
  display: flex;

  &__filter {
    height: 40px;
    padding: 3px 0;
  }

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

    &__filter {
      display: flex;
      flex-wrap: wrap;
    }

    .filter {
      &__item {
        margin-top: 10px;
      };
    }
  }
}
</style>