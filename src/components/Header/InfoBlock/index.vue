<template>
  <div class="company-block">
    <span class="company-block__logo">
      <span>Дом</span>
      <span class="red">В</span>
      <span>Тепле</span>
    </span>
    <nav class="company-block__menu">
      <router-link
        v-for="item in linksList"
        :key="item.id"
        class="company-block__menu-item"
        :to="item.link"
      >
        {{item.title}}
      </router-link>
    </nav>
    <span class="company-block__number">
      <a href="tel:+79459999999" class="phone">+7 945 999 99 99</a>
      <span class="info">Каждый день с 9<sup>00</sup>-20<sup>00</sup></span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linksList: [
        {
          id: 0,
          link: '/warranty',
          title: 'Гарантии',
        },
        {
          id: 1,
          link: '/payment',
          title: 'Оплата',
        },
        {
          id: 2,
          link: '/delivery',
          title: 'Доставка',
        },
        {
          id: 3,
          link: '/return',
          title: 'Возврат',
        },
        {
          id: 4,
          link: '/contacts',
          title: 'Контакты',
        },
        {
          id: 5,
          link: '/about',
          title: 'О компании',
        },
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/constants/_variables.scss";

.company-block {
  padding: 10px 0 0 0;
  display: flex;
  justify-content: space-between;

  .red {
    color: $project-red
  }

  .info {
    font-size: 14px;
  }

  &__number {
    display: flex;
    flex-flow: column;
    width: 250px;
  }

  &__logo {
    font-size: 36px;
    font-weight: 500;
  }

  &__menu {
    max-width: 1000px;
    width: 100%;
    display: flex;
    padding: 0 0 6px 30px;
    align-items: flex-end;

    &-item {
      font-size: 18px;
      padding: 0 15px 0 0;
      color: $project-color;
      transition: 0.3s;

      &:hover {
        color: $project-red;
      }
    }
  }
}

.phone {
  color: $project-red;
  font-size: 22px;
}
</style>