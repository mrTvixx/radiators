<template>
  <div class="product">
    <img
      class="product__image"
      :src="product.image && product.image.file"
      :alt="product.image && product.image.name"
    />
    <span class="product__manufacturer">{{ getManufacturName(product.manufacturer) }}</span>
    <div v-if="product.category === '2'" class="product__title">{{product.name}}</div>
    <router-link v-else :to="`/product/${product.id}`" class="product__title">{{product.name}}</router-link>
    <span>
      <div><b>Розничная:</b>{{` ${getPrice(product)}₽.`}}</div>
      <div v-if="product.manufacturer.key === 2 && product.category === '0'"><b>Оптовая:{{` ${getOptPrice(product)}₽. `}}</b>от 4х шт.</div>
    </span>
    <button
      :class="['product__button', {'product__button--active': cartIds.includes(product .id)}]"
      @click="() => addToCart(product)"
    >{{getName()}}</button>
  </div>
</template>

<script>
import { getManufacturName, getValidPrice } from "../../utils";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../store/mutations.type";
import { mapGetters } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getManufacturName: getManufacturName,
    addToCart({
      id,
      final_price,
      name,
      image,
      price_nds,
      manufacturer,
      category,
      }) {
      if (this.cartIds.includes(this.product.id)) {
        this.$store.commit(REMOVE_FROM_CART, id);
      } else {
        const data = {
          id,
          final_price,
          name,
          image,
          category,
        };
        if (manufacturer.key === 2) data.price_nds = price_nds;
        this.$store.commit(ADD_TO_CART, data);
      }
    },
    getPrice({ final_price }) {
      if (!final_price) return 0;
      return getValidPrice(final_price);
    },
    getOptPrice({ price_nds, category, manufacturer }) {
      // 2 - rifar key
      if (
        Boolean(price_nds) &&
        Number(category) === 0 &&
        manufacturer.key === 2
      )
        return getValidPrice(price_nds);
      return "";
    },
    getName() {
      return this.cartIds.includes(this.product.id) ? "Удалить" : "В корзину";
    },
  },
  computed: mapGetters(["cartIds"]),
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.product {
  box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.2);
  margin: 0 0 20px 0;
  width: 280px;
  display: flex;
  flex-flow: column;
  padding: 5px 10px;
  justify-content: space-between;

  &__price {
    padding: 4px 0;
  }

  &__image {
    max-width: 100%;
    max-height: 235px;
    height: 100%;
  }

  &__manufacturer {
    font-size: 16px;
    margin: 10px 0;
  }

  &__title {
    margin: 10px 0;
    cursor: pointer;
    font-weight: bold;
    transition: 0.1s;

    &:hover {
      color: $project-red;
    }
  }

  &__button {
    border-radius: 5px;
    height: 40px;
    color: $project-color;
    cursor: pointer;
    background-color: white;
    margin: 10px 0;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);

    &--active {
      color: white;
      background-color: $project-red;
    }

    &:active {
      box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
    }
  }
}

@media (max-width: 720px) {
  .product {
    width: 100%;
  }
}
</style>