<template>
  <footer class="footer">
    <div class="row">
      <span>
        Есть вопросы? Звоните ежедневно с 9
        <sup>00</sup>-20
        <sup>00</sup>
      </span>
      <a href="tel:+79459999999" class="footer__phone">+7 945 999 99 99</a>
    </div>
    <div class="row">
      <div class="footer__catalog">
        <span class="title">Каталог:</span>
        <div class="footer__catalog-links">
          <router-link
            class="footer__catalog-links-element"
            v-for="item in catalogList"
            :key="item.id"
            :to="item.link"
          >{{ item.title }}</router-link>
        </div>
      </div>
      <nav class="footer__menu">
        <span class="title">Навигация:</span>
        <div class="footer__menu-links">
          <router-link
            v-for="item in linksList"
            :key="item.id"
            class="footer__menu-links-element"
            :to="item.link"
          >{{item.title}}</router-link>
        </div>
      </nav>
    </div>
    <hr />
    <div class="row">
      <div class="year">2020</div>
    </div>
  </footer>
</template>

<script>
import { links, catalog } from "../../constants/links";

export default {
  data() {
    return {
      linksList: links,
      catalogList: catalog
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.footer {
  width: 100%;
  background-color: $project-bkg;

  sup {
    font-size: 0.8rem;
  }

  hr {
    margin: 0;
  }

  .row {
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    width: calc(100% - 20px);
    margin: 0 auto;
    padding: 8px 0 8px 0;

    .year {
      width: 100%;
      font-size: 0.8rem;
      display: flex;
      justify-content: space-around;
    }

    &:first-child {
      margin: 0 auto 10px auto;
    }
  }

  &__phone {
    font-size: 1.4rem;
    color: $project-red;
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    padding: 0 10px 0 0;
  }

  &__catalog,
  &__menu {
    max-width: 550px;
    height: 85px;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;

    &-links {
      padding: 15px 0 0 0;
      height: 65px;
      display: flex;
      flex-wrap: wrap;

      &-element {
        transition: 0.3s;
        padding: 0 35px 0 0;
        cursor: pointer;
        font-size: 1rem;
        min-width: 130px;

        &:hover {
          color: $project-red;
        }
      }
    }
  }

  // &__menu {
  //   max-width: 600px;
  //   height: 110px;
  //   width: 100%;
  //   display: flex;
  //   flex-flow: column;
  //   justify-content: space-around;

  //   &-links {
  //     height: 100px;
  //     display: flex;
  //     flex-wrap: wrap;

  //     &-item {
  //       color: $project-color;
  //       transition: 0.3s;
  //       font-size: 1rem;
  //       padding: 10px 0 10px 0;
  //       height: 18px;
  //       width: 90px;

  //       &:hover {
  //         color: $project-red;
  //       }
  //     }
  //   }
  // }
}
</style>