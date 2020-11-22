<template>
  <section class="main-page__text">
    <div class="text__best">
      <div class="best-content">
        <div class="best-content__element">
          <v-icon class="icon--red" name="check-circle" />
          <span>Профессиональные консультации и помощь в подборе оборудования</span>
        </div>
        <div class="best-content__element">
          <v-icon class="icon--red" name="check-circle" />
          <span>Оптимальные цены и гибкая система скидок</span>
        </div>
        <div class="best-content__element">
          <v-icon class="icon--red" name="check-circle" />
          <span>Оперативная доставка по всей России</span>
        </div>
        <div class="best-content__element">
          <v-icon class="icon--red" name="check-circle" />
          <span>Оплата наличными, картой, безналичный расчет</span>
        </div>
      </div>
    </div>
    <h2>
      <b>КАК МЫ РАБОТАЕМ</b>
    </h2>
    <ol>
      <li><v-icon class="icon" name="shopping-cart" />вы оформляете заказ через корзину ИМ;</li>
      <li><v-icon class="icon" name="headphones" />мы связываемся с Вами и уточняем детали, при необходимости вносим изменения в заказе;</li>
      <li><v-icon class="icon" name="file-text" />мы формируем окончательный заказ, уточняем наличие товара, согласовываем сроки поставки, условия оплаты и доставки;</li>
      <li><v-icon class="icon" name="truck" />доставка заказа или самовывоз из нашего магазина;</li>
      <li><v-icon class="icon" name="phone-call" />также наши операторы всегда готовы помочь вам подобрать необходимое оборудование и принять у вас заказ в телефонном режиме.</li>
    </ol>
  </section>
</template>

<style lang="scss">
@import "./constants/_default.scss";

.main-page {
  &__text {
    .icon {
      width: 20px;
      margin: 0 10px -4px 0;
    }

    font-size: 16px;

    ul,
    ol {
      padding-left: 20px;
    }

    li {
      margin: 10px 0 0;
    }

    .text__best {
      background-color: $project-bkg;
      padding: 60px 0;
      width: 100%;
      margin: 0 0 60px 0;

      .best-content {
        max-width: 1300px;
        display: flex;

        &__element {
          display: flex;
          width: 300px;
          padding: 0 35px;
          align-items: flex-start;
        }
      }

      .icon {
        width: 30px;
        min-width: 30px;

        &--red {
          color: $project-red;
        }
      }
    }
  }
}

@media (max-width: 720px) {
  .main-page__text {
    .text__best {
      .best-content {
        flex-flow: column;

        &__element {
          padding: 0 10px;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
