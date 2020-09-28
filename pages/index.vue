<template>
  <PageTemplate>
    <fragment>
      <!-- maybe be use in future -->
      <!-- <Slider /> -->
      <Catalog />
    </fragment>
  </PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";
// import Slider from "../components/Slider";
import Catalog from "../components/Catalog";

export default {
  components: {
    // Slider,
    Catalog,
    PageTemplate,
  },
  head() {
    return {
      title: "ДомВТепле",
    };
  },
};
</script>

<style scoped>
.root {
  text-align: center;
}

.main {
  max-width: 1300px;
  width: calc(100% - 20px);
  margin: 0 auto;
}
</style>
