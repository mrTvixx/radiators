<template>
  <PageTemplate :path="[{link: '/cart', name: 'Корзина'}]">
    <div class="cart">
      <div class="cart__title">Корзина</div>
      <div class="cart__list">
        <div class="cart__element" v-for="item in cart" :key="item.id">
          <div
            class="cart__image"
            :style="{backgroundImage: `url(${item.image && item.image.file})`}"
          />
          <router-link :to="`/product/${item.id}`" class="cart__name">{{item.name}}</router-link>
          <div class="cart__count">
            <span @click="() => onCount({ id: item.id, value: Number(item.count) - 1})">-</span>
            <input
              type="number"
              @input="({ target }) => onCount({ id: item.id, value: target.value})"
              :value="item.count"
            />
            <span @click="() => onCount({ id: item.id, value: Number(item.count) + 1})">+</span>
          </div>
          <div class="cart__price">{{(Number(item.price_nds) * Number(item.count)).toFixed(2)}} ₽.</div>
          <div class="cart__remove" @click="() => onRemove(item.id)">X</div>
        </div>
        <div class="cart__final-price">
          <span>ИТОГО:</span>
          <span>{{ cartTotalPrice | financFormat}}</span>
        </div>
      </div>
      <div class="cart__order">
        <h2>
          <b>Оформление заказа</b>
        </h2>
        <div class="order__row">
          <h3>
            Укажите ФИО
            <sup class="order__info" title="Обязательно для заполнения">*</sup>
          </h3>
          <input type="text" v-model="username" class="order__input" />
        </div>
        <div class="order__row">
          <h3>
            Номер контактного телефона
            <sup class="order__info" title="Обязательно для заполнения">*</sup>
          </h3>
          <input type="number" v-model="phonenumber" class="order__input" />
        </div>
        <div class="order__row">
          <h3>Укажите электронную почту (для получения копии заказа)</h3>
          <input type="email" v-model="email" class="order__input" />
        </div>
        <div class="order__row">
          <h3>Выберите способ доставки</h3>
          <div>
            <input
              type="radio"
              :checked="delivery === 0"
              value="0"
              id="delivery_0"
              name="delivery"
              @change="handleDalivery"
            />
            <label for="delivery_0">Доставка</label>
            <p>
              Стоимость доставки 500р. по Москве, доставка за пределы МКАДа 60р/км,
              при заказе от 20 000 рублей доставка по Москве бесплатно
            </p>
          </div>
          <div>
            <input
              type="radio"
              :checked="delivery === 1"
              value="1"
              id="delivery_1"
              name="delivery"
              @change="handleDalivery"
            />
            <label for="delivery_1">Безналичный расчет</label>
            <p>Вы можете оплатить заказ с помощью банковского перевода</p>
          </div>
        </div>
        <div class="order__row">
          <h3>Выберите способ оплаты</h3>
          <div>
            <input
              type="radio"
              name="payment"
              :checked="payment === 0"
              value="0"
              id="payment_0"
              @change="handlePayment"
            />
            <label for="payment_0">Наличными при получении</label>
            <p>Вы можете оплатить заказ курьеру при получении, либо на кассе в случае самовывоза</p>
          </div>
          <div>
            <input
              type="radio"
              name="payment"
              :checked="payment === 1"
              value="1"
              id="payment_1"
              @change="handlePayment"
            />
            <label for="payment_1">Самовывоз</label>
            <p>Вы можете забрать товар самостоятельно с нашего склада</p>
          </div>
        </div>
        <div class="order__row">
          <h3>Укажите адрес доставки и любую дополнительную информацию</h3>
          <textarea type="text" v-model="comment" class="order__input order__input--area" />
        </div>
        <div class="order__row">
          <h3>Добавить файл к заказу</h3>
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, .excel, .xlsx"
            id="file"
            class="order__input-file"
            @change="handleFile"
          />
        </div>
        <div class="order__row">
          <input id="policy" type="checkbox" v-model="policy" />
          <label for="policy">
            <span>Я даю свое</span>
            <router-link to="/privacy">согласие на обработку</router-link>
            <span>моих персональных данных.</span>
          </label>
        </div>
        <div class="order__row">
          <button :disabled="!isReady" @click="onCheckout" class="order__button">Оформить</button>
        </div>
      </div>
    </div>
  </PageTemplate>
</template>

<script>
import { mapGetters } from "vuex";

import {
  REMOVE_FROM_CART,
  CHANGE_PRODUCT_COUNT
} from "../store/mutations.type";
import PageTemplate from "../components/PageTemplate";

export default {
  components: {
    PageTemplate
  },
  data() {
    return {
      delivery: 0,
      payment: 0,
      username: "",
      phonenumber: "",
      email: "",
      comment: "",
      file: null,
      policy: true
    };
  },
  computed: {
    ...mapGetters(["cart", "cartTotalPrice"]),
    isReady() {
      return this.phonenumber && this.username && this.policy;
    }
  },
  filters: {
    financFormat(value = 0) {
      return `${value.toLocaleString("ru")}р.`;
    }
  },
  methods: {
    onRemove(id) {
      this.$store.commit(REMOVE_FROM_CART, id);
    },
    handleDalivery({ target }) {
      this.delivery = Number(target.value);
    },
    handlePayment({ target }) {
      this.payment = Number(target.value);
    },
    handleFile({ target }) {
      this.file = target.files[0];
    },
    onCheckout() {
      const deliveryData = {
        delivery: this.delivery,
        payment: this.payment,
        username: this.username,
        phonenumber: this.phonenumber,
        email: this.email,
        comment: this.comment,
        file: this.file
      };

      console.log(deliveryData);
    },
    onCount({ id, value }) {
      if (Number(value) < 1) {
        this.$store.commit(CHANGE_PRODUCT_COUNT, { id, value: 1 });
        return;
      }
      this.$store.commit(CHANGE_PRODUCT_COUNT, { id, value });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.cart {
  padding: 30px 0 0;

  &__final-price {
    display: flex;
    justify-content: flex-end;
    padding: 15px 0 0;

    span {
      color: $project-color;
      font-size: 26px;

      &:last-child {
        margin: 0 0 0 10px;
      }
    }
  }

  &__order {
    margin: 50px 0;
    padding: 20px;
    background-color: $project-bkg;
    border-radius: 5px;

    h2 {
      margin: unset;
    }

    .order {
      &__button {
        border-radius: 5px;
        height: 40px;
        color: white;
        cursor: pointer;
        background-color: $project-red;
        margin: 10px 0;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        width: 350px;
        margin: 0 auto;

        &:active {
          box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        &:disabled {
          cursor: not-allowed;
          box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
        }
      }

      &__input {
        padding: 10px;
        width: 450px;
        border-radius: 5px;
        box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.2);
        border: unset;

        &--area {
          height: 100px;
          width: 450px;
          resize: none;
        }
      }

      &__info {
        cursor: pointer;
        color: $project-red;
      }

      &__row {
        margin: 30px 0;

        &:last-child {
          display: flex;
        }

        a {
          text-decoration: underline;

          &:hover {
            color: $project-red;
          }
        }

        p {
          margin-top: 5px;
        }

        h3 {
          margin-bottom: 15px;
        }

        label {
          cursor: pointer;
          color: black;
          font-weight: bold;
        }
      }
    }
  }

  &__name {
    transition: 0.3s;
    cursor: pointer;
    padding: 0 15px;
    width: 600px;
    word-break: break-word;

    &:hover {
      color: $project-red;
    }
  }

  &__remove {
    font-size: 24px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: $project-red;
    }
  }

  &__count {
    padding: 0 30px;
    display: flex;

    input {
      width: 60px;
      border-bottom: 1px solid $project-bkg;
      border-top: 1px solid $project-bkg;
      padding: 4px;
      text-align: center;
      font-size: 22px;
    }

    span {
      border: 1px solid $project-bkg;
      background-color: $project-bkg;
      width: 28px;
      cursor: pointer;
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      user-select: none;
      transition: 0.3s;

      &:hover {
        color: $project-red;
      }
    }
  }

  &__price {
    font-size: 24px;
    width: 200px;
    text-align: end;
    padding: 0 10px;
  }

  &__title {
    font-size: 32px;
  }

  &__list {
    padding: 30px 0 0;
  }

  &__element {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__image {
    background-repeat: no-repeat;
    background-size: contain;
    height: 120px;
    width: 120px;
  }
}
</style>