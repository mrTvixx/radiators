<template>
  <PageTemplate :path="[{link: '/about', name: 'О компании'}]">О компании</PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";

export default {
  components: {
    PageTemplate
  }
};
</script>