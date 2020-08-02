<template>
  <div v-if="isShow" class="cookies">
    <span>Продолжая использование сайта, Вы даете свое согласие на обработку</span>
    <router-link class="cookies__link" to="/cookie_info">файлов cookie.</router-link>
    <button @click="cookieAccept" class="cookies__close">х</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    cookieAccept() {
      this.isShow = false;
      localStorage.setItem("cookieInfo", true);
    }
  },
  mounted() {
    const isShow = localStorage.getItem("cookieInfo");
    if (isShow) return;
    this.isShow = true;
  }
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.cookies {
  position: fixed;
  bottom: 0;
  background-color: $project-bkg;
  width: 100%;
  height: 50px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-top: 1px solid $project-red;
  z-index: 9999999;

  &__link {
    margin: 0 0 0 5px;
    transition: 0.3s;
    text-decoration: underline;

    &:hover {
      color: $project-red;
    }
  }

  &__close {
    position: absolute;
    transition: 0.3s;
    right: 15px;
    top: 5px;
    font-size: 24px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    background-color: $project-bkg;

    &:hover {
      color: $project-red;
    }
  }
}
</style>