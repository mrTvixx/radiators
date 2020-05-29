<template>
  <div class="menu-block">
    <div class="products">
      <button @click="openMenu" type="button" class="btn">
        <div :class="['burger', {'burger--active': isBtnMenuOpen}]">
          <div :class="['burger-row', {'burger-row--hide': isBtnMenuOpen}]"></div>
          <div class="burger-row"></div>
          <div :class="['burger-row', {'burger-row--hide': isBtnMenuOpen}]"></div>
        </div>
          Каталог товаров
      </button>
      <div class="search">
      <input
        type="text"
        class="search-field"
        placeholder="Что искать?"
      >
      </div>
    </div>
    <div class="cart">
      <v-icon class="cart-svg" name="shopping-cart"></v-icon>
      {{ summ | financFormat}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      summ: 23540,
      isBtnMenuOpen: false,
      items: [
        {
          id: 0,
          title: 'Радиаторы',
        },
        {
          id: 1,
          title: 'Трубы',
        },
        {
          id: 2,
          title: 'Комплектующие',
        },
        {
          id: 3,
          title: 'Системы защиты от протечек воды',
        },
      ]
    }
  },
  filters: {
    financFormat(value) {
      return `${(value).toLocaleString('ru')}р.`;
    }
  },
  methods: {
    openMenu() {
      this.isBtnMenuOpen = !this.isBtnMenuOpen;
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/constants/_variables.scss";

.menu-block {
  padding: 15px 0 0 0;
  display: flex;
  justify-content: space-between;

  .cart {
    font-size: 20px;
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
    box-shadow: 0px 0px 0px .5px rgba(0,0,0,0.20);
    border-radius: 0 12px 12px 0;
    width: calc(100% - 210px);

    &-field {
      width: 100%;
      height: 100%;
      padding: 0 0 0 10px;
      font-size: 18px;
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
    justify-content: space-between;
    align-items: center;
    background-color: $project-red;
    color: white;
    box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.20);
    border-radius: 12px 0 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 10px;
    font-size: 20px;
    font-weight: 500;

    & div {
      border-color: white;
    }

    // maybe be use in future
    // &:hover {
    //   background-color: $project-red;
    //   color: white;

    //   & div {
    //     border-color: white;
    //   }
    // }
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
    transition: .3s;

    &--active {
      transform: rotate(180deg);
    }

    &-row {
      width: 100%;
      height: 1px;
      border-radius: 2px;
      border: 2px solid $project-red;
      transition: .3s;

      &--hide {
        opacity: 0;
        border-color: transparent;
      }
    }
  }
}
</style>