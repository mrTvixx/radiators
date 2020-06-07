<template>
  <div class="filter">
    <div class="row">
      <span class="title">
        <b>Цена:</b>
      </span>
      <div class="content">
        От
        <input type="number" v-model="min" />
        до
        <input type="number" v-model="max" />
        р.
      </div>
    </div>
    <div class="row">
      <span class="title">
        <b>Межосевое расстояние (мм):</b>
      </span>
      <div class="content">
        От
        <input type="number" v-model="minOs" />
        до
        <input type="number" v-model="maxOs" />
        р.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      min: 0,
      max: 100000,
      minOs: 50,
      maxOs: 500
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.filter {
  width: 300px;
  border-radius: 5px;
  padding: 0 10px;
  box-shadow: 0 0 15px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-flow: column;

  .row {
    display: flex;
    flex-flow: column;
    padding: 10px 0;
  }

  .content {
    padding: 5px 0 0 0;

    input {
      width: 80px;
      padding: 3px;
      border: 1px solid rgba(51, 51, 51, 0.2);
      border-radius: 5px;
    }
  }
}
</style>