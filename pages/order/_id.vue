<template>
  <PageTemplate :path="[{link: '/product', name: 'Заказ'}]">
    <div class="order-cart">
      <div class="order-cart__row">
        <b>ФИО:</b>
        <ul>
          <li>{{orderData.username}}</li>
        </ul>
      </div>
      <div class="order-cart__row">
        <b>Номер телефона:</b>
        <ul>
          <li>{{orderData.phone_number}}</li>
        </ul>
      </div>
      <div class="order-cart__row">
        <b>Способ доставки:</b>
        <ul>
          <li>{{orderData.delivery}}</li>
        </ul>
      </div>
      <div class="order-cart__row">
        <b>Способ оплаты:</b>
        <ul>
          <li>{{orderData.payment}}</li>
        </ul>
      </div>
      <div v-if="orderData.comment" class="order-cart__row">
        <b>Комментарий к заказу:</b>
        <ul>
          <li>{{orderData.comment}}</li>
        </ul>
      </div>
      <div v-if="orderData.email" class="order-cart__row">
        <b>E-mail:</b>
        <ul>
          <li>{{orderData.email}}</li>
        </ul>
      </div>
      <div v-if="orderData.file" class="order-cart__row">
        <b>Файл:</b>
        <ul>
          <li>
            <a target="_blank" :href="orderData.file.file">{{orderData.file.name}}</a>
          </li>
        </ul>
      </div>
      <div class="order-cart__row">
        <b>Товары:</b>
        <ul>
          <li v-for="item in orderData.order" :key="item.id">
            <router-link :to="`/product/${item.product.id}`">{{item.product.name}}</router-link>
            - {{item.count}} шт. x {{getPrice(item.product)}}
          </li>
          <li class="order-cart__total-sum">
            <b>Итого:</b>{{getTotalSum(orderData.order)}}
          </li>
        </ul>
      </div>
    </div>
  </PageTemplate>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "../../components/Loader";
import PageTemplate from "../../components/PageTemplate";
import { GET_ORDER } from "../../store/actions.type";

import { getValidPrice } from '../../utils';

export default {
  components: {
    PageTemplate
  },
  computed: {
    ...mapGetters(["orderData"]),
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    getPrice({ final_price }) {
      if (!final_price) return 0;
      return `${getValidPrice(final_price)} ₽.`
    },
    getTotalSum(data = []) {
      const sum = data.reduce((acc, item) => {
        acc += Number(item.product.final_price * item.count);
        return acc;
      }, 0);
      return ` ${sum || 0} ₽.`;
    }
  },
  mounted() {
    this.$store.dispatch(GET_ORDER, this.id);
  }
};
</script>

<style lang="scss">
@import "../../constants/_default.scss";

.order-cart {
  margin: 30px 0;
  padding: 10px;
  box-shadow: 0 0 14px -5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &__total-sum {
    margin: 15px 0 0 !important;
  }

  &__row {
    display: flex;
    flex-flow: column;
    padding: 0 0 15px;

    ul {
      list-style: none;
      padding: 0 0 0 20px;
      margin: 5px 0;

      li {
        margin: 5px 0 0;
      }

      a {
        text-decoration: underline;
        transition: 0.3s;

        &:hover {
          color: $project-red;
        }
      }
    }
  }
}
</style>