<template>
  <fragment>
    <div :class="['menu-block', {'menu-block--fixed': isBlockFixed}]" id="menu-block">
      <div class="products">
        <Menu :showMenu="showMenu" :options="menuElementsList" :onClose="toggleMenu">
          <button @click="toggleMenu" type="button" class="btn">
            <div :class="['burger', {'burger--active': showMenu}]">
              <div :class="['burger-row', {'burger-row--hide': showMenu}]"></div>
              <div class="burger-row"></div>
              <div :class="['burger-row', {'burger-row--hide': showMenu}]"></div>
            </div>Каталог товаров
          </button>
        </Menu>
        <div class="search">
          <input
            type="text"
            class="search-field"
            placeholder="Что искать?"
            v-model="searchValue"
            @focus="search"
          />
          <Menu
            :showMenu="list && list.length > 0"
            :options="list"
            :onClose="toggleSearchMenu"
            :styleWidthObject="{ width: '100%'}"
          />
        </div>
      </div>
      <div class="cart">
        <v-icon class="cart-svg" name="shopping-cart"></v-icon>
        {{ summ | financFormat}}
      </div>
    </div>
    <div v-if="isBlockFixed" class="blank-block" />
  </fragment>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

import Menu from "../../DropMenu";
import { GET_PRODUCTS } from "../../../store/actions.type";
import { CLEAR_SEARCH_PRODUCTS } from "../../../store/mutations.type";

export default {
  components: {
    Menu
  },
  data() {
    return {
      summ: 23540,
      showMenu: false,
      searchElement: null,
      isBlockFixed: false,
      searchValue: "",
      menuElementsList: [
        {
          id: 0,
          name: "Радиаторы"
        },
        {
          id: 1,
          name: "Комплектующие"
        },
        {
          id: 2,
          name: "Трубы"
        },
        {
          id: 3,
          name: "Системы защиты от протечек"
        }
      ],
      items: [
        {
          id: 0,
          title: "Радиаторы"
        },
        {
          id: 1,
          title: "Трубы"
        },
        {
          id: 2,
          title: "Комплектующие"
        },
        {
          id: 3,
          title: "Системы защиты от протечек воды"
        }
      ]
    };
  },
  watch: {
    searchValue() {
      this.debouncedSearch();
    }
  },
  filters: {
    financFormat(value) {
      return `${value.toLocaleString("ru")}р.`;
    }
  },
  computed: mapGetters(["list"]),
  methods: {
    search() {
      this.$store.dispatch(GET_PRODUCTS, { name: this.searchValue, limit: 5 });
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleSearchMenu() {
      this.$store.commit(CLEAR_SEARCH_PRODUCTS);
    },
    changeSearchType() {
      if (this.searchElement) {
        this.isBlockFixed = this.searchElement.scrollTop > 65;
      }
    }
  },
  created() {
    this.debouncedSearch = _.debounce(this.search, 350);
  },
  mounted() {
    document.addEventListener("scroll", this.changeSearchType);
    this.searchElement = document.documentElement;
  },
  destroyed() {
    document.removeEventListener("scroll", this.changeSearchType);
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.blank-block {
  height: 67px;
}

.menu-block {
  padding: 25px 0 0 0;
  display: flex;
  justify-content: space-between;

  &--fixed {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1;
    background-color: $project-bkg;
    padding: 20px 0 10px 50px;
    display: flex;
    justify-content: space-between;
  }

  .cart {
    cursor: pointer;
    min-width: 156px;
    display: flex;
    align-items: center;

    &-svg {
      width: 30px;
      margin: 0 10px 0 0;
    }
  }

  .search {
    background-color: white;
    box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.2);
    border-radius: 0 5px 5px 0;
    width: calc(100% - 210px);

    &-field {
      height: 100%;
      width: calc(100% - 10px);
      border-radius: 0 5px 5px 0;
      padding: 0 0 0 10px;
      color: $project-color;
    }
  }

  .products {
    width: calc(100% - 200px);
    display: flex;
  }

  .btn {
    width: 210px;
    height: 40px;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    background-color: $project-red;
    color: white;
    box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px 0 0 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 10px;
    font-weight: 500;

    & div {
      border-color: white;
    }
  }

  .v-application {
    height: 40px;
    width: 150px;
  }

  .burger {
    width: 25px;
    height: 24px;
    display: flex;
    flex-flow: column;
    margin: 0 20px 0 0;
    justify-content: space-around;
    transition: 0.3s;

    &--active {
      transform: rotate(180deg);
    }

    &-row {
      width: 100%;
      height: 1px;
      border-radius: 2px;
      border: 2px solid $project-red;
      transition: 0.3s;
      box-sizing: border-box;

      &--hide {
        opacity: 0;
        border-color: transparent;
      }
    }
  }
}
</style>