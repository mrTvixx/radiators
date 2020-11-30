<template>
  <fragment>
    <span v-if="isMobile" name="showCountry" @click="toggleFilter" class="title btn">
      {{ filterStatus }}
      <v-icon :class="['cart-svg', { 'cart-svg--open': showFilter }]" name="arrow-down"></v-icon>
    </span>
    <div :class="['filter', { 'collapse-content--open': showFilter, 'collapse-content': isMobile }]">
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
      <!-- <div v-if="currentPath.includes('radiator')" class="row">
        <span class="title">
          <b>Высота:</b>
        </span>
        <div class="content">
          От
          <input type="number" v-model="minOs" :min="minOs" :max="maxOs" />
          до
          <input type="number" v-model="maxOs" :min="minOs" :max="maxOs" />
          мм.
        </div>
      </div>
      <div class="row">
        <span class="title">
          <b>Гарантия:</b>
        </span>
        <div class="content">
          От
          <input
            type="number"
            v-model="minGarant"
            :min="minGarant"
            :max="maxGarant"
          />
          до
          <input
            type="number"
            v-model="maxGarant"
            :min="minGarant"
            :max="maxGarant"
          />
          лет
        </div>
      </div> -->
      <div v-if="currentPath.includes('radiator')" class="row">
        <span @click="() => toggleCollapse('showConnectType')" class="title btn">
          Тип подключения:
          <v-icon :class="['cart-svg', { 'cart-svg--open': toggled === 'showConnectType' }]" name="arrow-down"></v-icon>
        </span>
        <div :class="['collapse-content', { 'collapse-content--open': toggled === 'showConnectType' }]">
          <label v-for="item in connectTypes" :key="item.id" :for="item.id + 'cn'">
            <input type="checkbox" v-model="selectedTypes" :id="item.id + 'cn'" :value="item.id" class="check" />
            {{ item.name }}
          </label>
        </div>
      </div>
      <div class="row">
        <span @click="() => toggleCollapse('showCountry')" class="title btn">
          Страна производитель:
          <v-icon :class="['cart-svg', { 'cart-svg--open': toggled === 'showCountry' }]" name="arrow-down"></v-icon>
        </span>
        <div :class="['collapse-content', { 'collapse-content--open': toggled === 'showCountry' }]">
          <label v-for="item in countries" :key="item.id" :for="item.id + 'ct'">
            <input type="checkbox" v-model="selectedCountries" :id="item.id + 'ct'" :value="item.id" class="check" />
            {{ item.name }}
          </label>
        </div>
      </div>
      <div class="row">
        <span @click="() => toggleCollapse('showProducers')" class="title btn">
          Поставщики:
          <v-icon :class="['cart-svg', { 'cart-svg--open': toggled === 'showProducers' }]" name="arrow-down"></v-icon>
        </span>
        <div :class="['collapse-content', { 'collapse-content--open': toggled === 'showProducers' }]">
          <label v-for="item in producers" :key="item.id" :for="item.id + 'pr'">
            <input type="checkbox" v-model="selectedProducers" :id="item.id + 'pr'" :value="item.id" class="check" />
            {{ item.name }}
            <ul v-if="item.childrens.length" class="check__block">
              <li v-for="ch in item.childrens" :key="ch.id">
                <label :for="ch.id + 'pr'">
                  <input type="checkbox" v-model="selectedSubTypes" :id="ch.id + 'pr'" :value="ch.id" class="check__sub" />
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
import { GET_FULL_PRODUCTS_LIST } from "../../store/actions.type";
import { CLEAR_FILTERS_LIST, SET_PAGINATION_PAGE, SAVE_SEARCH_VALUE } from "../../store/mutations.type";

export default {
  components: {},
  data() {
    return {
      width: null,
      currentPath: "",
      showFilter: false,
      min: 0,
      max: 100000,
      minOs: 0,
      maxOs: 500,
      minGarant: 5,
      maxGarant: 50,
      toggled: "",
      selectedCountries: [],
      selectedTypes: [],
      selectedSubTypes: [],
      selectedProducers: [],
      producers: [
        {
          id: 0,
          name: "Kermi",
          childrens: [],
        },
        {
          id: 1,
          name: "Buderus",
          childrens: [],
        },
        {
          id: 2,
          name: "Rifar",
          childrens: [
            {
              id: 21,
              name: "Base",
            },
            {
              id: 22,
              name: "Base Ventil",
            },
            {
              id: 23,
              name: "Monolit",
            },
            {
              id: 24,
              name: "Monolit Ventil",
            },
            {
              id: 25,
              name: "Supremo",
            },
            {
              id: 26,
              name: "Supremo Ventil",
            },
            {
              id: 27,
              name: "Alum",
            },
            {
              id: 28,
              name: "Alum Ventil",
            },
          ],
        },
        // {
        //   id: 3,
        //   name: "Belux",
        // },
        // {
        //   id: 4,
        //   name: "Itap",
        // },
        // {
        //   id: 5,
        //   name: "Herz",
        // },
        // {
        //   id: 6,
        //   name: "Danfoss",
        // },
        // {
        //   id: 7,
        //   name: "Rehau",
        // },
        // {
        //   id: 8,
        //   name: "Meibis",
        // },
        {
          id: 9,
          name: "Axis",
          childrens: [],
        },
      ],
      countries: [
        {
          id: 0,
          name: "Россия",
        },
        {
          id: 1,
          name: "Италия",
        },
        {
          id: 2,
          name: "Германия",
        },
        {
          id: 3,
          name: "Китай",
        },
        {
          id: 4,
          name: "Австрия",
        },
        {
          id: 5,
          name: "Дания",
        },
      ],
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
    };
  },
  props: {
    selectedManufacturer: {
      type: Number,
      default: null,
    },
    setManufacturerList: {
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
    const { type } = this.$route.query;
    const newSelectedList = [`${type}`];

    if (newSelectedList.length && type !== undefined) {
      this.selectedProducers = newSelectedList;
      this.applyFilter();
    }

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
    min() {
      if (Number(this.min) > Number(this.max)) this.max = this.min;
    },
    minOs() {
      if (Number(this.minOs) > Number(this.maxOs)) this.maxOs = this.minOs;
    },
    minGarant() {
      if (Number(this.minGarant) > Number(this.maxGarant)) this.maxGarant = this.minGarant;
    },
    selectedSubTypes() {
      if (this.selectedSubTypes.length && this.selectedSubTypes.length !== 6) {
        this.selectedProducers = this.selectedProducers.filter((item) => item !== 2);
      }
    },
    selectedProducers() {
      if (this.selectedProducers.includes(2)) {
        this.selectedSubTypes = this.producers[2].childrens.map((item) => item.id);
      }
    },
    selectedType() {
      this.applyFilter();
    },
    selectedHeight() {
      this.applyFilter();
    },
    selectedManufacturer() {
      if (this.selectedManufacturer === null) this.clearFilter();
      if (this.selectedManufacturer !== null) {
        this.toggled = "showProducers";
        this.selectedSubTypes = [];
        this.selectedProducers = [this.selectedManufacturer];
        this.applyFilter();
      }
    },
  },
  computed: {
    filterStatus() {
      return this.showFilter ? "Скрыть фильтр" : "Показать фильтр";
    },
    isMobile() {
      const size = this.width < 721;
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showFilter = !size;
      return size;
    },
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    toggleCollapse(name) {
      this.toggled = this.toggled === name ? "" : name;
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
      this.toggled = "";

      this.clearManufacturer();
      this.clearType();
      this.clearHeight();

      this.applyFilter();
    },
    applyFilter() {
      if (this.isMobile) this.showFilter = false;
      let data = {
        price: {
          min: this.min || 0,
          max: this.max || 100000,
        },
        garant: {
          min: this.minGarant || 5,
          max: this.maxGarant || 50,
        },
        countries: this.selectedCountries,
        producers: [...this.selectedProducers, ...this.selectedSubTypes],
        rediatorType: this.selectedType,
        height: this.selectedHeight,
      };
      if (this.selectedProducers.includes(2)) data.producers = [...data.producers, 21, 22, 23, 24, 25, 26, 27, 28];
      this.$store.commit(SET_PAGINATION_PAGE, 1);
      this.$store.commit(SAVE_SEARCH_VALUE, "");
      data = {
        ...data,
        os: {
          min: this.minOs || 0,
          max: this.maxOs || 500,
        },
        types: this.selectedTypes,
        productType: this.getType(this.currentPath),
      };

      this.$store.dispatch(GET_FULL_PRODUCTS_LIST, data);
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
  position: sticky;
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
