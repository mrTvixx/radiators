<template>
  <header>
    <InfoBlock />
    <MenuBlock />
  </header>
</template>

<script>
import InfoBlock from './InfoBlock';
import MenuBlock from './MenuBlock';

export default {
  components: {
    InfoBlock,
    MenuBlock,
  }
}
</script>

<style lang="scss" scoped>
@import "@/constants/_variables.scss";

header {
  padding: 10px 35px 10px 50px;
  background-color: $project-bkg;
}
</style>