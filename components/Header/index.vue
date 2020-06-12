<template>
  <header>
    <InfoBlock />
    <MenuBlock />
  </header>
</template>

<script>
import InfoBlock from "./InfoBlock";
import MenuBlock from "./MenuBlock";

export default {
  components: {
    InfoBlock,
    MenuBlock
  },
  head() {
    return {
      title: "ДомВТепле",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: `
          Купить радиаторы, системы защиты от протечек воды, трубы и комплекующие в Москве.
          Низкие цены, поставки прямо от производителя.`
        }
      ],
      htmlAttrs: {
        lang: "ru"
      }
    };
  }
};
</script>

<style lang="scss">
@import "./constants/_default.scss";

header {
  padding: 10px 35px 10px 50px;
  background-color: $project-bkg;
}

@media (max-width: 720px) {
  header {
    padding: 10px 10px 10px 10px;
  }
}
</style>