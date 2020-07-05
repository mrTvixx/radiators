<template>
  <PageTemplate>
    <div class="product-page">
      <div class="product-page__btn">
        <div
          class="product-page__image"
          :style="{backgroundImage: `url(${productData.image && productData.image.file})`}"
        />
      </div>
      <div class="product-page__content">
        <div class="content__title">{{productData.name}}</div>
        <div class="content__price">{{`Цена: ${productData.price_nds || 0} ₽.`}}</div>
        <div class="content__info" v-html="getProductInfoList(productData)" />
        <button
          :class="['product-page__button', {'product-page__button--active': cartIds.includes(productData.id)}]"
          @click="() => addToCart(productData)"
        >{{getName()}}</button>
      </div>
    </div>
  </PageTemplate>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "../../components/Loader";
import { GET_PRODUCT_DATA } from "../../store/actions.type";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../store/mutations.type";
import PageTemplate from "../../components/PageTemplate";
import { getProductInfoList } from "../../utils";

export default {
  components: {
    PageTemplate
  },
  computed: {
    ...mapGetters(["productData", "cartIds"]),
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    getProductInfoList: getProductInfoList,
    addToCart({ id, price_nds, name, image }) {
      if (this.cartIds.includes(this.productData.id)) {
        this.$store.commit(REMOVE_FROM_CART, id);
      } else {
        this.$store.commit(ADD_TO_CART, { id, price_nds, name, image });
      }
    },
    getName() {
      return this.cartIds.includes(this.productData.id)
        ? "Удалить"
        : "В корзину";
    }
  },
  mounted() {
    this.$store.dispatch(GET_PRODUCT_DATA, this.id);
  }
};
</script>

<style lang="scss">
@import "../../constants/_default.scss";

.product-page {
  margin: 50px 0;
  padding: 10px;
  color: #333;
  box-shadow: 0 0 14px -5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;

  &__button {
    border-radius: 5px;
    height: 40px;
    width: 100%;
    color: $project-color;
    cursor: pointer;
    background-color: white;
    margin: 30px 0 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    transition: 0.05s;

    &--active {
      color: white;
      background-color: $project-red;
    }

    &:active {
      box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
    }
  }

  &__btn {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
  }

  &__image {
    height: 360px;
    min-width: 450px;
    background-repeat: no-repeat;
    background-size: contain;
  }

  &__content {
    width: 100%;

    .content {
      &__info {
        padding: 20px 0 0;

        ul {
          padding: 0;
        }

        li {
          margin: 20px 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dotted;

          span {
            background-color: white;
            margin-bottom: -10px;
          }
        }
      }

      &__title {
        font-size: 22px;
        font-weight: bold;
      }

      &__price {
        font-size: 20px;
        font-weight: bold;
        margin: 10px 0 0;
      }
    }
  }
}
</style>