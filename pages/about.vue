<template>
  <PageTemplate :path="[{link: '/about', name: 'О компании'}]">
    <CatalogText />
  </PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";
import CatalogText from "../components/Catalog/CatalogText";


export default {
  components: {
    PageTemplate,
    CatalogText
  },
  head() {
    return {
      title: "О нас",
    };
  },
};
</script>