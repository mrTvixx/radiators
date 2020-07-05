<template>
  <PageTemplate :path="[{link: '/contacts', name: 'Контакты'}]">Контакты</PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";

export default {
  components: {
    PageTemplate
  }
};
</script>