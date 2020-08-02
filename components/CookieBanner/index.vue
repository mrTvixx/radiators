<template>
  <div v-if="isShow" class="cookies">
    <p>
      <span>Продолжая использование сайта, Вы даете свое согласие на обработку</span>
      <router-link class="cookies__link" to="/cookie_info">файлов cookie.</router-link>
    </p>
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
  width: calc(100% - 40px);
  height: 50px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-top: 1px solid $project-red;
  z-index: 9999999;
  padding: 15px 25px 15px 15px;

  &__link {
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