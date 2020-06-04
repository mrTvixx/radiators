<template>
  <no-ssr>
    <fragment>
      <Header />
      <main class="main">
        <Slider />
        <article>
          <Catalog />
        </article>
      </main>
    </fragment>
  </no-ssr>
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
  width: calc(100% - 20px);
  margin: 0 auto;
}
</style>
