<template>
  <no-ssr>
    <fragment>
      <Header />
      <main class="main">
        <div v-if="path && Boolean(path.length)" class="path">
          <a href="/" class="link">Главная</a>
          <fragment v-for="item in path" :key="item.name">
            <span class="delimitr">|</span>
            <a class="link" :href="item.link">{{item.name}}</a>
          </fragment>
        </div>
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
  },
  props: ["path"]
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.root {
  text-align: center;
}

.main {
  max-width: 1300px;
  width: calc(100% - 20px);
  margin: 0 auto 40px auto;
  min-height: calc(100vh - 365px);
}

.delimitr {
  font-size: 0.8rem;
}

.link {
  font-size: 0.8rem;
  transition: 0.8s;

  &:hover {
    color: $project-red;
  }
}
</style>
