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
  computed: mapGetters(["cart"]),
  methods: {
    onRemove(id) {
      this.$store.commit(REMOVE_FROM_CART, id);
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