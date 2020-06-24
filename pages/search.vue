<template>
  <PageTemplate :path="[{link: '/search', name: 'Поиск'}]">
    <div class="search">
      <ContentFilter />
      <div class="search__block">
        <div class="search__filter">
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
import { mapGetters } from "vuex";

import { GET_FULL_PRODUCTS_LIST } from "../store/actions.type";
import PageTemplate from "../components/PageTemplate";
import ContentFilter from "../components/ContentFilter";
import ProductPreview from "../components/ProductPreview";
import ProductsList from "../components/ProductsList";

export default {
  components: {
    PageTemplate,
    ProductPreview,
    ContentFilter,
    ProductsList
  },
  data() {
    return {
      manufacturer: "",
      manufacturers: [
        {
          id: "",
          name: "Все"
        },
        {
          id: 1,
          name: "Kermi"
        },
        {
          id: 2,
          name: "Buderus"
        },
        {
          id: 3,
          name: "Refar"
        }
      ]
    };
  },
  methods: {
    setManufacturer(id) {
      this.manufacturer = id;
    }
  },
  computed: {
    ...mapGetters(["searchValue", "fullProductsList"])
  },
  mounted() {
    this.$store.dispatch(GET_FULL_PRODUCTS_LIST, { productType: "" });
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

.search {
  padding: 30px 0;
  display: flex;

  &__filter {
    height: 40px;
    padding: 3px 0;
  }

  &__block {
    padding: 0 20px;
    width: calc(100% - 360px);
  }
}
</style>