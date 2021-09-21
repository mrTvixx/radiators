<template>
  <fragment>
    <span v-if="isMobile" name="showCountry" @click="toggleFilter" class="title btn">
      {{ filterStatus }}
      <v-icon
        :class="['cart-svg', { 'cart-svg--open': showFilter }]"
        name="arrow-down"
      ></v-icon>
    </span>
    <div
      :class="[
        'filter',
        { 'collapse-content--open': showFilter, 'collapse-content': isMobile },
      ]"
    >
      <div class="row">
        <span class="title">
          <b>Цена:</b>
        </span>
        <div class="content">
          От
          <input type="number" v-model="min" :min="min" :max="max" />
          до
          <input type="number" v-model="max" :min="min" :max="max" />
          р.
        </div>
      </div>
      <div v-if="currentPath.includes('radiator')" class="row">
        <span @click="() => toggleCollapse('showColors')" class="title btn">
          Цвет:
          <v-icon
            :class="['cart-svg', { 'cart-svg--open': toggled.includes('showColors') }]"
            name="arrow-down"
          ></v-icon>
        </span>
        <div
          :class="[
            'collapse-content',
            { 'collapse-content--open': toggled.includes('showColors') },
          ]"
        >
          <label v-for="item in colorTypes" :key="item.id" :for="item.id + 'cl'">
            <input
              type="radio"
              v-model="selectedColor"
              :id="item.id + 'cl'"
              :value="item.id"
              class="check"
            />
            {{ item.name }}
          </label>
        </div>
      </div>
      <div v-if="currentPath.includes('radiator')" class="row">
        <span @click="() => toggleCollapse('showConnectType')" class="title btn">
          Тип подключения:
          <v-icon
            :class="['cart-svg', { 'cart-svg--open': toggled.includes('showConnectType') }]"
            name="arrow-down"
          ></v-icon>
        </span>
        <div
          :class="[
            'collapse-content',
            { 'collapse-content--open': toggled.includes('showConnectType') },
          ]"
        >
          <label v-for="item in connectTypes" :key="item.id" :for="item.id + 'cn'">
            <input
              type="checkbox"
              v-model="selectedTypes"
              :id="item.id + 'cn'"
              :value="item.id"
              class="check"
            />
            {{ item.name }}
          </label>
        </div>
      </div>
      <div class="row">
        <span @click="() => toggleCollapse('showProducers')" class="title btn">
          Поставщики:
          <v-icon
            :class="['cart-svg', { 'cart-svg--open': toggled.includes('showProducers') }]"
            name="arrow-down"
          ></v-icon>
        </span>
        <div
          :class="[
            'collapse-content',
            { 'collapse-content--open': toggled.includes('showProducers') },
          ]"
        >
          <label v-for="item in producers" :key="item.id" :for="item.id + 'pr'">
            <input
              type="checkbox"
              v-model="selectedProducers"
              :id="item.id + 'pr'"
              :value="item.key"
              class="check"
            />
            {{ item.name }}
            <ul v-if="item.childrens.length" class="check__block">
              <li v-for="ch in item.childrens" :key="ch.id">
                <label :for="ch.id + 'pr'">
                  <input
                    type="checkbox"
                    v-model="selectedSubTypes"
                    :id="ch.id + 'pr'"
                    :value="ch.key"
                    class="check__sub"
                  />
                  {{ ch.name }}
                </label>
              </li>
            </ul>
          </label>
        </div>
      </div>
      <div class="row">
        <button @click="applyFilter" class="filter__apply-btn">Применить</button>
        <button @click="clearFilter" class="filter__clear-btn">Сбросить</button>
      </div>
    </div>
  </fragment>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_FULL_PRODUCTS_LIST } from "../../store/actions.type";
import {
  CLEAR_FILTERS_LIST,
  SET_PAGINATION_PAGE,
  SAVE_SEARCH_VALUE,
} from "../../store/mutations.type";

export default {
  components: {},
  data() {
    return {
      randomTrigger: null,
      isFirstSet: true,
      width: null,
      currentPath: "",
      showFilter: false,
      min: 0,
      max: 100000,
      toggled: ["showProducers", "showCountry", "showConnectType", "showColors"],
      selectedTypes: [],
      selectedSubTypes: [],
      selectedProducers: [],
      selectedColor: 0,
      producers: [],
      connectTypes: [
        {
          id: 0,
          name: "Нижнее",
        },
        {
          id: 1,
          name: "Боковое",
        },
      ],
      colorTypes: [
        {
          id: 0,
          name: "Все",
        },
        {
          id: 1,
          name: "Цветные",
        }
      ],
    };
  },
  props: {
    selectedManufacturer: {
      type: Number,
      default: null,
    },
    setManufacturer: {
      type: Function,
      default: () => null,
    },
    clearManufacturer: {
      type: Function,
      default: () => null,
    },
    clearType: {
      type: Function,
      default: () => null,
    },
    selectedType: {
      type: Number,
      default: null,
    },
    selectSavedType: {
      type: Function,
      default: () => null,
    },
    selectSavedHeight: {
      type: Function,
      default: () => null,
    },
    clearHeight: {
      type: Function,
      default: () => null,
    },
    selectedHeight: {
      type: Number,
      default: null,
    },
  },
  mounted() {
    this.currentPath = this.$route.path;
    this.applyQueryParamsToFilters();

    this.$nextTick(() => {
      this.width = document.documentElement.clientWidth;
      window.addEventListener("resize", () => {
        this.width = document.documentElement.clientWidth;
      });
    });
  },
  destroyed() {
    this.$store.commit(CLEAR_FILTERS_LIST);
  },
  watch: {
    paginationPage() {
      const { query } = this.$route;
      const newQuery = {
        ...query,
        paginationPage: this.paginationPage,
      };
      this.applyFilter();
      this.$router.push({ path: this.$route.path, query: newQuery })
    },
    min() {
      if (Number(this.min) > Number(this.max)) this.max = this.min;
    },
    manufacturers() {
      this.producers = this.manufacturers;
    },
    selectedSubTypes() {
      if (this.selectedSubTypes.length && this.selectedSubTypes.length !== 6) {
        this.selectedProducers = this.selectedProducers.filter((item) => item !== 2);
      }
    },
    selectedProducers() {
      if (this.selectedProducers.includes(2)) {
        this.selectedSubTypes = (this.producers[2]?.childrens || []).map((item) => item.key);
      }
    },
    allValuesSum() {
      if (!this.isFirstSet) {
        this.$store.commit(SET_PAGINATION_PAGE, 1);
      }
      this.applyFilter();
    },
    selectedManufacturer() {
      if (this.selectedManufacturer === null) this.clearFilter();
      if (this.selectedManufacturer !== null) {
        this.toggled = [...this.toggled, "showProducers"];
        this.selectedSubTypes = [];
        this.selectedProducers = [this.selectedManufacturer];
      }
    },
  },
  computed: {
    ...mapGetters(["manufacturers", "page"]),
    paginationPage: {
      get() {
        return this.page;
      },
      set(value) {
        this.$store.commit(SET_PAGINATION_PAGE, parseInt(value));
      },
    },
    filterStatus() {
      return this.showFilter ? "Скрыть фильтр" : "Показать фильтр";
    },
    isMobile() {
      const size = this.width < 721;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showFilter = !size;
      return size;
    },
    allValuesSum() {
      return `${this.min}
      ${this.max}
      ${this.selectedProducers}
      ${this.selectedType}
      ${this.selectedHeight}
      ${this.selectedTypes}
      ${this.selectedSubTypes}
      ${this.selectedColor}
      ${this.randomTrigger}`;
    },
  },
  methods: {
    applyQueryParamsToFilters() {
      const { query } = this.$route;
      if (Object.keys(query).length) {
        this.randomTrigger = Math.random().toString(32).slice(2);
        this.min = query.min || this.min;
        this.max = query.max || this.max;
        this.selectedColor = parseInt(query.selectedColor ) || this.selectedColor;
        this.paginationPage = query.paginationPage || this.page;

        this.selectedProducers = this.safeGetArray(query.selectedProducers) || this.selectedProducers,
        this.selectedTypes = this.safeGetArray(query.selectedTypes) || this.selectedTypes,
        this.selectedSubTypes = this.safeGetArray(query.selectedSubTypes) || this.selectedSubTypes,
        
        this.selectSavedType(parseInt(query.selectedType) || this.selectedType);
        this.selectSavedHeight(parseInt(query.selectedHeight) || this.selectedHeight);

        if (this.selectedProducers.length === 1) this.setManufacturer(parseInt(this.selectedProducers[0]));
      }
    },
    safeGetArray(data) {
      if (!data) return false;

      if (Array.isArray(data)) {
        return data;
      }
      let res = data.split(',');
      res = res.length ? res : false;
      return res;
    },
    setQueryParam() {
      const query = {
        min: this.min,
        max: this.max,
        selectedProducers: this.selectedProducers,
        selectedType: this.selectedType,
        selectedHeight: this.selectedHeight,
        selectedTypes: this.selectedTypes,
        selectedSubTypes: this.selectedSubTypes,
        selectedColor: this.selectedColor,
        paginationPage: this.paginationPage,
      };

      this.$router.push({ path: this.$route.path, query });
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    toggleCollapse(name) {
      this.toggled = this.toggled.includes(name) 
        ? this.toggled.filter((item) => item !== name)
        : [...this.toggled, name];
    },
    getType(path) {
      if (path.includes("radiator")) return 0;
      if (path.includes("accessories")) return 2;
      return -1;
    },
    clearFilter() {
      this.min = 0;
      this.max = 100000;
      this.minOs = 0;
      this.maxOs = 500;
      this.minGarant = 5;
      this.maxGarant = 50;
      this.selectedCountries = [];
      this.selectedTypes = [];
      this.selectedProducers = [];
      this.selectedSubTypes = [];
      this.toggled = ["showProducers", "showCountry", "showConnectType", "showColors"];
      this.color = 0;
      this.$store.commit(SET_PAGINATION_PAGE, 1);

      this.clearManufacturer();
      this.clearType();
      this.clearHeight();

      this.applyFilter();
    },
    applyFilter() {
      this.$nextTick(() => {
        this.setQueryParam();
        this.isFirstSet = false;
        if (this.isMobile) this.showFilter = false;
        let data = {
          price: {
            min: this.min || 0,
            max: this.max || 100000,
          },
          producers: [...this.selectedProducers, ...this.selectedSubTypes],
          rediatorType: this.selectedType,
          height: this.selectedHeight,
        };
        if (this.selectedProducers.includes(2))
          data.producers = [...data.producers, 21, 22, 23, 24, 25, 26, 27, 28, 29];
        this.$store.commit(SAVE_SEARCH_VALUE, "");
        data = {
          ...data,
          types: this.selectedTypes,
          color: this.selectedColor,
          productType: this.getType(this.currentPath),
        };
        this.$store.dispatch(GET_FULL_PRODUCTS_LIST, data);
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";
$countriesCount: 6;
$connectsCount: 2;
$producersCount: 9;

ul {
  margin: 5px 0;
  padding: 0 0 0 20px;
}

.btn {
  cursor: pointer;
  font-weight: 600;
  align-items: center;
  display: flex;
  justify-content: space-between;

  &:first-child {
    padding: 0 0 10px 0;
  }
}

.collapse-content {
  max-height: 0px;
  overflow: hidden;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  padding: 0 0 0 10px;
  transition: 0.3s;
  max-height: 0px !important;

  &--open {
    max-height: 100vh !important;
  }
}

.cart-svg {
  height: 20px;
  transition: 0.3s;

  &--open {
    transform: rotate(180deg);
  }
}

.filter {
  width: 300px;
  height: 100%;
  max-height: 80vh;
  overflow: auto;
  border-radius: 5px;
  padding: 0 10px;
  box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-flow: column;
  top: 80px;

  .cart-svg {
    height: 20px;
    transition: 0.3s;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__apply-btn {
    border-radius: 5px;
    height: 40px;
    color: white;
    cursor: pointer;
    background-color: $project-red;

    &:active {
      box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
    }
  }

  &__clear-btn {
    margin: 15px 0 0 0;
    border-radius: 5px;
    height: 40px;
    color: $project-color;
    cursor: pointer;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:active {
      box-shadow: inset 0 0 5px 0px rgba(0, 0, 0, 0.2);
    }
  }

  .row {
    display: flex;
    flex-flow: column;
    padding: 10px 0;
  }

  .content {
    padding: 5px 0 0 0;

    input {
      width: 80px;
      padding: 3px;
      border: 1px solid rgba(51, 51, 51, 0.2);
      border-radius: 5px;
    }
  }
}

@media (max-width: 720px) {
  .filter {
    position: unset;
    width: unset;
    overflow: hidden;
  }
}
</style>
