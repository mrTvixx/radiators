<template>
  <no-ssr>
    <fragment>
      <Header />
      <main class="main">
        <article>
          <slot></slot>
        </article>
      </main>
      <Footer />
    </fragment>
  </no-ssr>
</template>

<script>
import Header from "../Header";
import Footer from "../Footer";

export default {
  components: {
    Header,
    Footer
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
  margin: 0 auto 40px auto;
}
</style>
