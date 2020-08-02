<template>
  <div class="error-page">
    <h1>Извините, но ничего не найдено.</h1>
    <h3>Пожалуйста, вернитесь на главную страницу.</h3>
    <router-link to="/">
      <button class="error-page__button">На главную</button>
    </router-link>
  </div>
</template>

<style lang="scss">
@import "./constants/_default.scss";

.error-page {
  padding: 30px;
  
  &__button {
    border-radius: 5px;
    height: 40px;
    color: white;
    cursor: pointer;
    background-color: $project-red;
    margin: 10px 0;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    width: 350px;
    margin: 0 auto;

    &:active {
      box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
    }
  }
}

</style>