<template>
  <fragment>
    <Header />
    <main class="main">
      <Slider />
      <article>
        <Catalog />
      </article>
    </main>
  </fragment>
</template>

<script>
import Header from "../components/Header";
import Slider from "../components/Slider";
import Catalog from "../components/Catalog";

export default {
  components: {
    Header,
    Slider,
    Catalog
  }
};
</script>

<style scoped>
.root {
  text-align: center;
}

.main {
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
}
</style>
