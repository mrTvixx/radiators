<template>
  <div class="filter">
    <div class="row">
      <span class="title">
        <b>Цена:</b>
      </span>
      <div class="content">
        От
        <input type="number" v-model="min" />
        до
        <input type="number" v-model="max" />
        р.
      </div>
    </div>
    <div class="row">
      <span class="title">
        <b>Межосевое расстояние:</b>
      </span>
      <div class="content">
        От
        <input type="number" v-model="minOs" />
        до
        <input type="number" v-model="maxOs" />
        мм.
      </div>
    </div>
    <div class="row">
      <span @click="showConnectType = !showConnectType" class="title btn">
        Тип подключения
        <v-icon :class="['cart-svg', {'cart-svg--open': showConnectType}]" name="arrow-down"></v-icon>
      </span>
      <div :class="['collapse-content', { 'collapse-content--open-cn': showConnectType }]">
        <label v-for="item in connectTypes" :key="item.id" :for="item.id">
          <input
            type="checkbox"
            v-model="selectedTypes"
            :id="item.id"
            :value="item.id"
            class="check"
          />
          {{ item.name }}
        </label>
      </div>
    </div>
    <div class="row">
      <span @click="showCountry = !showCountry" class="title btn">
        Страна производитель
        <v-icon :class="['cart-svg', {'cart-svg--open': showCountry}]" name="arrow-down"></v-icon>
      </span>
      <div :class="['collapse-content', { 'collapse-content--open-ct': showCountry }]">
        <label v-for="item in countries" :key="item.id" :for="item.id">
          <input
            type="checkbox"
            v-model="selectedCountries"
            :id="item.id"
            :value="item.id"
            class="check"
          />
          {{ item.name }}
        </label>
      </div>
    </div>
    <div class="row">
      <span @click="showProducers = !showProducers" class="title btn">
        Поставщики
        <v-icon :class="['cart-svg', {'cart-svg--open': showProducers}]" name="arrow-down"></v-icon>
      </span>
      <div :class="['collapse-content', { 'collapse-content--open-pr': showProducers }]">
        <label v-for="item in producers" :key="item.id" :for="item.id">
          <input
            type="checkbox"
            v-model="selectedProducers"
            :id="item.id"
            :value="item.id"
            class="check"
          />
          {{ item.name }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      min: 0,
      max: 100000,
      minOs: 50,
      maxOs: 500,
      showConnectType: false,
      showCountry: false,
      showProducers: false,
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

  .cart-svg {
    height: 20px;
    transition: 0.3s;

    &--open {
      transform: rotate(180deg);
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
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    padding: 0 0 0 10px;

    &--open {
      &-ct {
        height: $countriesCount * 21px + $countriesCount * 3px;
      }
      &-cn {
        height: $connectsCount * 21px + $connectsCount * 3px;
      }
      &-pr {
        height: $producersCount * 21px + $producersCount * 3px;
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