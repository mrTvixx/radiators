<template>
  <div class="catalog">
    <h1 class="catalog__title">Каталог</h1>
    <section class="catalog__list">
      <CatalogElement
        v-for="item in fullCatalogList"
        :key="item.id"
        :title="item.title"
        :link="item.link"
        :image="item.img"
        :alt="item.title"
      />
    </section>
    <ShortCatalogText />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import CatalogElement from "./CatalogElement";
import ShortCatalogText from "./ShortCatalogText";

import { catalog } from "../../constants/links";
import { GET_CATALOG_LIST } from "../../store/actions.type";

export default {
  components: {
    CatalogElement,
    ShortCatalogText
  },
  mounted() {
    this.$store.dispatch(GET_CATALOG_LIST);
  },
  computed: {
    ...mapGetters(['catalogList']),
    fullCatalogList() {
      const list = this.catalogList.map((item, idx) => ({
        id: `${idx}-ctl`,
        title: item.name,
        link: item.route,
        img: item?.image?.file,
      }));
      return [catalog[0], ...list, ...catalog.slice(1)];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.catalog {
  &__title {
    font-size: 1.7rem;
    color: $project-color;
    font-weight: 600;
  }

  &__list {
    padding: 10px 0 70px 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, 270px);
    justify-content: space-around;
  }
}

@media (max-width: 830px) {
  .catalog {
    &__list {
      justify-content: space-around;
    }
  }
}

@media (max-width: 720px) {
  .catalog {
    &__list {
      grid-template-columns: repeat(auto-fit, 100%);
    }
  }
}
</style>