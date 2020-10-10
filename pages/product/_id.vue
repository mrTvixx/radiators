<template>
  <PageTemplate
    :path="[{ link: '/product', name: `Товар | ${productData.name}` }]"
  >
    <div class="product-page" >
      <img
        class="product-page__image"
        :src="productData.image && productData.image.file"
      />
      <div class="product-page__content">
        <div class="content__title">
          {{`${productData.name} - ${getManufacturName(productData.manufacturer)}`}}
        </div>
        <div class="content__price">
          <b>{{ `Цена: ${getPrice(productData)} ₽.` }}</b>
          {{ getOptPrice(productData) }}
        </div>

        <div class="content__info" v-html="getProductInfoList(productData)" />
        <button
          :class="[
            'product-page__button',
            {
              'product-page__button--active': cartIds.includes(productData.id),
            },
          ]"
          @click="() => addToCart(productData)"
        >
          {{ getName() }}
        </button>
        <div class="product-page__info">
          <div v-if="productData.category === '0'">
            <span>
              <v-icon class="product-page__icon" name="info" />Рекомендуем Вам
              ознакомиться с
            </span>
            <router-link
              class="product-page__link"
              :to="{
                path: '/accessories',
                query: { type: productData.manufacturer.key },
              }"
              >комплектующими</router-link
            >
            <span>для радиаторов данного производителя.</span>
          </div>
        </div>
      </div>
    </div>
  </PageTemplate>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_PRODUCT_DATA } from "../../store/actions.type";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../../store/mutations.type";
import PageTemplate from "../../components/PageTemplate";
import {
  getProductInfoList,
  getValidPrice,
  getManufacturName,
} from "../../utils";

export default {
  components: {
    PageTemplate,
  },
  computed: {
    ...mapGetters(["productData", "cartIds"]),
    id() {
      return this.$route.params.id;
    },
  },
  jsonld() {
    return {
      '@context': 'http://schema.org',
      '@type': 'Product',
      "image": [(this.productData.image || {}).file],
      offers: {
        "@type": "Offer",
        "priceCurrency": "RUB",
        "price": this.getSchemaPrice(this.productData),
      },
      name: this.productData.name,
      description: `${this.productData.name} - ${getManufacturName(this.productData.manufacturer)} по самой выгодной цене, только в магазине ДомВТепле.`
    };
  },
  head() {
    return {
      title: this.productData.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.productData.name} - ${getManufacturName(this.productData.manufacturer)} по самой выгодной цене, только в магазине ДомВТепле.`
        }
      ],
    };
  },
  methods: {
    getManufacturName,
    getProductInfoList,
    getPrice({ final_price }) {
      if (!final_price) return 0;
      return getValidPrice(final_price);
    },
    getOptPrice({ price_nds, category, manufacturer }) {
      // 2 - rifar key
      if (
        Boolean(price_nds) &&
        Number(category) === 0 &&
        [2,21,22,23,24,25,26].includes(manufacturer.key)
      )
        return `(${getValidPrice(price_nds)}₽. от 4х шт.)`;
      return "";
    },
    getSchemaPrice({ price_nds, final_price, category, manufacturer }) {
      // 2 - rifar key
      if (!final_price) return 0;
      if (
        Boolean(price_nds) &&
        Number(category) === 0 &&
        [2,21,22,23,24,25,26].includes(manufacturer.key)
      )
        return getValidPrice(price_nds);
      return getValidPrice(final_price);
    },
    addToCart({
      id,
      final_price,
      name,
      image,
      price_nds,
      manufacturer,
      category,
      }) {
      if (this.cartIds.includes(this.productData.id)) {
        this.$store.commit(REMOVE_FROM_CART, id);
      } else {
        const data = {
          id,
          final_price,
          name,
          image,
          category,
        };
        if ([2,21,22,23,24,25,26].includes(manufacturer.key)) data.price_nds = price_nds;
        this.$store.commit(ADD_TO_CART, data);
      }
    },
    getName() {
      return this.cartIds.includes(this.productData.id)
        ? "Удалить"
        : "В корзину";
    },
  },
  mounted() {
    this.$store.dispatch(GET_PRODUCT_DATA, this.id);
  },
};
</script>

<style lang="scss">
@import "../../constants/_default.scss";

.product-page {
  margin: 30px 0;
  padding: 10px;
  color: #333;
  box-shadow: 0 0 14px -5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;

  &__icon {
    width: 20px;
    margin: 0 10px -4px 0;
  }

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

  &__link {
    transition: 0.3s;
    text-decoration: underline;

    &:hover {
      color: $project-red;
    }
  }

  &__btn {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    height: 100%;
  }

  &__image {
    max-width: 450px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    padding: 0 10px 0 0;
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
        margin: 10px 0 0;
      }
    }
  }
}

@media (max-width: 1040px) {
  .product-page {
    display: flex;
    flex-flow: column;

    &__image {
      max-width: 450px;
      max-height: 600px;
      padding: 0 0 15px 0;
    }
  }
}

@media (max-width: 720px) {
  .product-page {
    &__content {
      .content {
        &__info {
          li {
            flex-wrap: wrap;

            span {
              margin-bottom: unset;
            }
          }
        }
      }
    }
  }
}
</style>
