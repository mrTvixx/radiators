<template>
  <div class="filter">
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
    <div v-if="currentPath === '/radiator'" class="row">
      <span class="title">
        <b>Межосевое расстояние:</b>
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
        <input type="number" v-model="minGarant" :min="minGarant" :max="maxGarant" />
        до
        <input type="number" v-model="maxGarant" :min="minGarant" :max="maxGarant" />
        лет
      </div>
    </div>
    <div v-if="currentPath === '/radiator'" class="row">
      <span name="showConnectType" @click="toggleCollapse" class="title btn">
        Тип подключения:
        <v-icon
          :class="['cart-svg', {'cart-svg--open': toggled === 'showConnectType'}]"
          name="arrow-down"
        ></v-icon>
      </span>
      <div
        :class="['collapse-content', { 'collapse-content--open-cn': toggled === 'showConnectType' }]"
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
      <span name="showCountry" @click="toggleCollapse" class="title btn">
        Страна производитель:
        <v-icon
          :class="['cart-svg', {'cart-svg--open': toggled === 'showCountry'}]"
          name="arrow-down"
        ></v-icon>
      </span>
      <div
        :class="['collapse-content', { 'collapse-content--open-ct': toggled === 'showCountry' }]"
      >
        <label v-for="item in countries" :key="item.id" :for="item.id + 'ct'">
          <input
            type="checkbox"
            v-model="selectedCountries"
            :id="item.id + 'ct'"
            :value="item.id"
            class="check"
          />
          {{ item.name }}
        </label>
      </div>
    </div>
    <div class="row">
      <span name="showProducers" @click="toggleCollapse" class="title btn">
        Поставщики:
        <v-icon
          :class="['cart-svg', {'cart-svg--open': toggled === 'showProducers'}]"
          name="arrow-down"
        ></v-icon>
      </span>
      <div
        :class="['collapse-content', { 'collapse-content--open-pr': toggled === 'showProducers' }]"
      >
        <label v-for="item in producers" :key="item.id" :for="item.id + 'pr'">
          <input
            type="checkbox"
            v-model="selectedProducers"
            :id="item.id + 'pr'"
            :value="item.id"
            class="check"
          />
          {{ item.name }}
        </label>
      </div>
    </div>
    <div class="row">
      <button @click="applyFilter" class="filter__apply-btn">Применить</button>
      <button @click="clearFilter" class="filter__clear-btn">Сбросить</button>
    </div>
  </div>
</template>

<script>
import { GET_FULL_PRODUCTS_LIST } from "../../store/actions.type";

export default {
  components: {},
  data() {
    return {
      currentPath: "",
      min: 0,
      max: 100000,
      minOs: 50,
      maxOs: 500,
      minGarant: 5,
      maxGarant: 50,
      toggled: "",
      selectedCountries: [],
      selectedTypes: [],
      selectedProducers: [],
      producers: [
        {
          id: 0,
          name: "Kermi"
        },
        {
          id: 1,
          name: "Buderus"
        },
        {
          id: 2,
          name: "Refar"
        },
        {
          id: 3,
          name: "Belux"
        },
        {
          id: 4,
          name: "Itap"
        },
        {
          id: 5,
          name: "Herz"
        },
        {
          id: 6,
          name: "Danfoss"
        },
        {
          id: 7,
          name: "Rehau"
        },
        {
          id: 8,
          name: "meibis"
        }
      ],
      countries: [
        {
          id: 0,
          name: "Россия"
        },
        {
          id: 1,
          name: "Италия"
        },
        {
          id: 2,
          name: "Германия"
        },
        {
          id: 3,
          name: "Китай"
        },
        {
          id: 4,
          name: "Австрия"
        },
        {
          id: 5,
          name: "Дания"
        }
      ],
      connectTypes: [
        {
          id: 0,
          name: "Нижнее"
        },
        {
          id: 1,
          name: "Боковое"
        }
      ]
    };
  },
  mounted() {
    this.currentPath = this.$route.path;
  },
  watch: {
    min() {
      if (Number(this.min) > Number(this.max)) this.max = this.min;
    },
    minOs() {
      if (Number(this.minOs) > Number(this.maxOs)) this.maxOs = this.minOs;
    },
    minGarant() {
      if (Number(this.minGarant) > Number(this.maxGarant))
        this.maxGarant = this.minGarant;
    }
  },
  methods: {
    toggleCollapse({ target }) {
      const name = target.getAttribute("name");

      this.toggled = this.toggled === name ? "" : name;
    },
    clearFilter() {
      this.min = 0;
      this.max = 100000;
      this.minOs = 50;
      this.maxOs = 500;
      this.minGarant = 5;
      this.maxGarant = 50;
      this.selectedCountries = [];
      this.selectedTypes = [];
      this.selectedProducers = [];

      this.applyFilter();
    },
    applyFilter() {
      let data = {
        price: {
          min: this.min || 0,
          max: this.max || 100000
        },
        garant: {
          min: this.minGarant || 5,
          max: this.maxGarant || 50
        },
        countries: this.selectedCountries,
        producers: this.selectedProducers
      };

      if (this.currentPath === "/radiator") {
        data = {
          ...data,
          os: {
            min: this.minOs || 50,
            max: this.maxOs || 500
          },
          types: this.selectedTypes
        };
      }

      this.$store.dispatch(GET_FULL_PRODUCTS_LIST, data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";
$countriesCount: 6;
$connectsCount: 2;
$producersCount: 9;

.filter {
  width: 300px;
  border-radius: 5px;
  padding: 0 10px;
  box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-flow: column;
  height: 100%;
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

  .btn {
    cursor: pointer;
    font-weight: 600;
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .collapse-content {
    height: 0px;
    transition: 0.3s;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    padding: 0 0 0 10px;

    &--open {
      &-ct {
        height: $countriesCount * 24px;
      }
      &-cn {
        height: $connectsCount * 24px;
      }
      &-pr {
        height: $producersCount * 24px;
      }
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
</style>