<template>
  <PageTemplate :path="[{ link: '/radiator', name: 'Радиаторы' }]">
    <div class="radiators">
      <ContentFilter
        :clearManufacturer="clearManufacturer"
        :selectedManufacturer="manufacturer"
        :clearType="clearType"
        :selectedType="type"
        :selectSavedType="selectSavedType"
        :selectSavedHeight="selectSavedHeight"
        :clearHeight="clearHeight"
        :selectedHeight="height"
        :setManufacturer="setManufacturer"
      />
      <div class="radiators__list">
        <div class="radiators__filter">
          <span
            v-for="item in manufacturersList"
            :key="item.id"
            @click="setManufacturer(item.key)"
            :class="[
              'filter__item',
              { 'filter__item--active': item.key === manufacturer },
            ]">
              {{ item.name }}
            </span>
        </div>
        <div
          :class="[
            'radiators__filter',
            { 'radiators__filter--disable': manufacturer === 2 },
          ]"
        >
          <span
            v-for="item in types"
            :key="item.id"
            @click="setType(item.id)"
            :class="['filter__item', { 'filter__item--active': item.id === type }]"
            >{{ item.name }}</span
          >
        </div>
        <div class="radiators__filter radiators__filter--last">
          <span
            v-for="item in heights"
            :key="item.id"
            @click="setHeight(item.id)"
            :class="[
              'filter__item',
              'filter__item--last',
              { 'filter__item--active': item.id === height },
            ]"
            >{{ item.name }}</span
          >
        </div>
        <div class="radiators__mobile-filter">
          <label> Поставщик: </label>
          <select :value="manufacturer" @change="setManufacturer">
            <option
              :selected="item.key === null"
              v-for="item in manufacturersList"
              :value="item.key"
              :key="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="radiators__mobile-filter">
          <label> Тип: </label>
          <select :disabled="manufacturer === 2" :value="type" @change="setType">
            <option
              :selected="item.id === null"
              v-for="item in types"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="radiators__mobile-filter">
          <label> Высота: </label>
          <select :value="height" @change="setHeight">
            <option
              :selected="item.id === null"
              v-for="item in heights"
              :value="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <ProductsList />
      </div>
    </div>
  </PageTemplate>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import PageTemplate from "../components/PageTemplate";
import ContentFilter from "../components/ContentFilter";
import ProductsList from "../components/ProductsList";
import { GET_FULL_PRODUCTS_LIST } from "../store/actions.type";

export default {
  components: {
    PageTemplate,
    ContentFilter,
    ProductsList,
  },
  head() {
    return {
      title: "Радиаторы",
    };
  },
  data() {
    return {
      manufacturer: null,
      type: null,
      height: null,
      manufacturersList: [
        {
          id: -1,
          key: null,
          name: "Поставщик",
        },
      ],
      types: [
        {
          id: null,
          name: "Тип",
        },
        {
          id: 11,
          name: "11",
        },
        {
          id: 12,
          name: "12 (21)",
        },
        {
          id: 22,
          name: "22",
        },
        {
          id: 33,
          name: "33",
        },
      ],
      heights: [
        {
          id: null,
          name: "Высота",
        },
        {
          id: 200,
          name: "200",
        },
        {
          id: 300,
          name: "300",
        },
        {
          id: 350,
          name: "350",
        },
        {
          id: 400,
          name: "400",
        },
        {
          id: 500,
          name: "500",
        },
        {
          id: 600,
          name: "600",
        },
        {
          id: 900,
          name: "900",
        },
      ],
    };
  },
  watch: {
    manufacturers() {
      this.manufacturersList = [...this.manufacturersList, ...this.manufacturers];
    },
  },
  methods: {
    setManufacturer(data) {
      data = typeof data !== "object" ? data : _.get(data, "target.value");
      if (Number(data) === 2) this.type = null;
      this.manufacturer = data ? Number(data) : data;
    },
    setType(data) {
      if (this.manufacturer === 2) return;
      data = typeof data !== "object" ? data : _.get(data, "target.value");
      this.type = data ? Number(data) : data;
    },
    clearManufacturer() {
      this.manufacturer = null;
    },
    clearType() {
      this.type = null;
    },
    selectSavedType(type) {
      // set type from url
      this.type = type;
    },
    selectSavedHeight(height) {
      // set height from url
      this.height = height;
    },
    setHeight(data) {
      data = typeof data !== "object" ? data : _.get(data, "target.value");
      this.height = data ? Number(data) : data;
    },
    clearHeight() {
      this.height = null;
    },
  },
  mounted() {
    this.currentPath = this.$route.path;
    const { query } = this.$route;
    if (!Object.keys(query).length) this.$store.dispatch(GET_FULL_PRODUCTS_LIST, { productType: 0 });
  },
  computed: {
    ...mapGetters(["manufacturers"]),
  },
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
    height: 30px;
    padding: 3px 0;

    &--disable {
      span {
        cursor: not-allowed;
        background-color: $project-bkg;
        color: $project-red;
      }
    }

    &--last {
      height: 40px;
    }
  }

  &__mobile-filter {
    display: none;
  }

  &__list {
    padding: 0 20px;
    width: calc(100% - 360px);
  }
}

@media (max-width: 720px) {
  .radiators {
    flex-flow: column;

    &__mobile-filter {
      max-width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
    }

    &__list {
      padding: unset;
      width: 100%;
    }

    &__filter {
      display: none;
    }

    .filter {
      &__item {
        margin-top: 10px;
      }
    }
  }
}
</style>
