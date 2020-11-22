<template>
  <fragment>
    <div :class="['menu-block', { 'menu-block--fixed': isBlockFixed }]" id="menu-block">
      <div class="products">
        <Menu field="title" :showMenu="showMenu" :options="menuElementsList" :onClose="toggleMenu">
          <button @click="toggleMenu" type="button" class="btn">
            <div :class="['burger', { 'burger--active': showMenu }]">
              <div :class="['burger-row', { 'burger-row--hide': showMenu }]"></div>
              <div class="burger-row"></div>
              <div :class="['burger-row', { 'burger-row--hide': showMenu }]"></div>
            </div>
            <span class="burger-title">Каталог товаров</span>
          </button>
        </Menu>
        <div class="search">
          <input id="search" type="text" class="search-field" placeholder="Поиск" v-model="searchV" @focus="search" @keyup.enter="goTo" />
          <span @click="goTo">
            <v-icon class="search__loop" name="search"></v-icon>
          </span>
          <Menu :showMenu="list && list.length > 0" :options="list" :onClose="toggleSearchMenu" :styleWidthObject="{ width: '100%' }" field="name" />
        </div>
      </div>
      <router-link to="/cart" class="cart">
        <v-icon class="cart-svg" name="shopping-cart"></v-icon>
        <span class="cart__total">{{ cartTotalPrice | financFormat }}</span>
        <span class="cart__count">{{ cartCount }}</span>
      </router-link>
    </div>
    <div v-if="isBlockFixed" class="blank-block" />
    <div :class="['sidebar', { 'sidebar--open': showBar }]">
      <div class="sidebar-menu">
        <div class="sidebar-header">
          <b>Каталог:</b>
          <div class="sidebar-close" @click="toggleMenu">X</div>
        </div>
        <ul>
          <li v-for="item in menuElementsList" :key="item.id">
            <router-link :to="item.link">{{ item.title }}</router-link>
          </li>
        </ul>
        <div class="sidebar-header">
          <b>Навигация:</b>
        </div>
        <ul>
          <li v-for="item in navElemensList" :key="item.id">
            <router-link :to="item.link">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </fragment>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

import Menu from "../../DropMenu";
import { GET_PRODUCTS, GET_FULL_PRODUCTS_LIST } from "../../../store/actions.type";
import { CLEAR_SEARCH_PRODUCTS, CHECK_CART_DATA, SAVE_SEARCH_VALUE, SET_PAGINATION_PAGE } from "../../../store/mutations.type";
import { catalog, links } from "../../../constants/links";

export default {
  components: {
    Menu,
  },
  data() {
    return {
      showMenu: false,
      showBar: false,
      searchElement: null,
      isBlockFixed: false,
      menuElementsList: [
        {
          id: 99,
          title: "Все товары",
          link: "/search",
        },
        ...catalog,
      ],
      navElemensList: links,
    };
  },
  watch: {
    searchV() {
      this.debouncedSearch();
    },
  },
  filters: {
    financFormat(value = 0) {
      return `${value.toLocaleString("ru")}р.`;
    },
  },
  computed: {
    ...mapGetters(["list", "cartCount", "cartTotalPrice", "searchValue"]),
    searchV: {
      get() {
        return this.searchValue;
      },
      set(newValue) {
        this.$store.commit(SAVE_SEARCH_VALUE, newValue);
      },
    },
  },
  methods: {
    goTo() {
      const { path } = this.$route;
      const pages = [/radiator/, /accessories/];
      this.$store.commit(CLEAR_SEARCH_PRODUCTS);
      this.$store.commit(SET_PAGINATION_PAGE, 1);
      this.$store.dispatch(GET_FULL_PRODUCTS_LIST);
      if (!pages.some((item) => item.test(path))) this.$router.push("/search");
    },
    search() {
      this.$store.dispatch(GET_PRODUCTS, { name: this.searchV, limit: 5 });
    },
    toggleMenu() {
      if (document.documentElement.clientWidth > 1040) {
        this.showMenu = !this.showMenu;
      } else {
        this.showBar = !this.showBar;
      }
    },
    toggleSearchMenu() {
      this.$store.commit(CLEAR_SEARCH_PRODUCTS);
    },
    changeSearchType() {
      if (this.searchElement) {
        this.isBlockFixed = this.searchElement.scrollTop > 65;
      }
    },
  },
  created() {
    this.debouncedSearch = _.debounce(this.search, 350);
  },
  mounted() {
    this.$store.commit(CHECK_CART_DATA);
    document.addEventListener("scroll", this.changeSearchType);
    this.searchElement = document.documentElement;
  },
  destroyed() {
    document.removeEventListener("scroll", this.changeSearchType);
  },
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.blank-block {
  height: 67px;
}

.sidebar {
  position: fixed;
  transition: 0.5s;
  top: 0;
  left: -100%;
  height: 100%;
  width: 55%;
  z-index: 5;
  background-color: white;
  box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 1rem;

  &-menu {
    width: 100%;
  }

  * {
    font-size: 1.3rem;
  }

  &-header {
    display: flex;
    justify-content: space-between;
  }

  &--open {
    left: 0;
  }

  &-close {
    cursor: pointer;
  }
}

.menu-block {
  padding: 25px 0 0 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  &--fixed {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1;
    background-color: $project-bkg;
    padding: 20px 35px 10px 50px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.2);
  }

  .search-field {
    font-size: 1.2rem;
  }

  .cart {
    cursor: pointer;
    min-width: 156px;
    display: flex;
    align-items: center;
    font-size: 1rem;
    position: relative;

    &__count {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 13px;
      background-color: $project-red;
      color: white;
      padding: 1px 4px;
      border-radius: 50%;
    }

    &--fixed {
      margin: 0 20px 0 20px;
    }

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
    position: relative;

    &__loop {
      position: absolute;
      top: 0;
      right: 0;
      width: 25px;
      height: 100%;
      padding: 0 10px;
      background-color: white;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
    }

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
    height: 43px;
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

    &-title {
      color: white;
    }

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

@media (max-width: 1400px) {
  .menu-block {
    &--fixed {
      padding: 10px !important;
    }
  }
}

@media (max-width: 1040px) {
  .menu-block {
    .burger-title {
      display: none;
    }

    .burger {
      margin: 0;
    }

    .search {
      width: calc(100% - 30px);
    }
    .btn {
      width: 40px;
    }
  }
}

@media (max-width: 720px) {
  .sidebar {
    width: 80%;
  }

  .menu-block {
    padding: 20px 0 10px 0;

    &--fixed {
      padding: 8px 11px 10px 10px !important;
    }

    .products {
      width: 100%;
      margin: 0 6px 0 0;
    }

    .cart {
      min-width: 40px;
      padding: 0 0 0 10px;

      &__total {
        display: none;
      }
    }
  }
}
</style>
