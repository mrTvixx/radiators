<template>
  <section class="catalog">
    <span class="catalog__title">Каталог</span>
    <div class="catalog__list">
      <CatalogElement
        v-for="item in catalogList"
        :key="item.id"
        :title="item.title"
        :link="item.link"
        :image="item.img"
      />
    </div>
  </section>
</template>

<script>
import CatalogElement from "./CatalogElement";
import RadiatorImage from "../../assets/images/radiator.jpg";
import ComponentImage from "../../assets/images/component.jpg";
import PipesImage from "../../assets/images/pipes.jpg";
import ProtectImage from "../../assets/images/protect.png";

export default {
  components: {
    CatalogElement
  },
  data() {
    return {
      catalogList: [
        {
          id: 0,
          title: "Радиоторы",
          link: "/radiator",
          img: RadiatorImage
        },
        {
          id: 1,
          title: "Запорно регулирующая арматура",
          link: "/components",
          img: ComponentImage
        },
        {
          id: 2,
          title: "Трубы и фитинги",
          link: "/pipes",
          img: PipesImage
        },
        // {
        //   id: 3,
        //   title: 'Краны',
        //   link: '/crane',
        //   img: '',
        // },
        {
          id: 4,
          title: "Системы защиты от протечек воды",
          link: "/protect",
          img: ProtectImage
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.catalog {
  &__title {
    font-size: 28px;
    color: $project-color;
    font-weight: 600;
  }

  &__list {
    padding: 30px 0 50px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>