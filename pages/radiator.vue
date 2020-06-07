<template>
  <PageTemplate :path="[{ link: '/radiator', name: 'Радиаторы' }]">
    <div class="radiators">
      <ContentFilter />
    </div>
  </PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";
import ContentFilter from "../components/ContentFilter";

export default {
  components: {
    PageTemplate,
    ContentFilter
  }
};
</script>

<style lang="scss" scoped>
.radiators {
  padding: 30px 0;
}
</style>