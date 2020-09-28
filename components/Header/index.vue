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
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
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


@media (max-width: 1400px) { 
    header {
      padding: 10px;
    }
}

@media (max-width: 720px) {
  header {
    padding: 10px 10px 10px 10px;
  }
}
</style>