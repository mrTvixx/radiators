<template>
  <div class="company-block">
    <router-link to="/" class="company-block__logo">
      <span>Дом</span>
      <span class="red">В</span>
      <span>Тепле</span>
    </router-link>
    <nav class="company-block__menu">
      <router-link v-for="item in linksList" :key="item.id" class="company-block__menu-item" :to="item.link">{{ item.title }}</router-link>
    </nav>
    <div class="company-block__get-call" @click="call">
      <v-icon class="company-block__svg" name="phone-call"></v-icon>
      <span class="company-block__get-call-text">Заказать звонок</span>
    </div>
    <span class="company-block__number">
      <a href="tel:+74994443465" class="phone">+7 499 444 34 65</a>
      <span class="info">
        Ежедневно с 9
        <sup>00</sup>-20
        <sup>00</sup>
      </span>
    </span>
    <CallModal :withoutAutoOpen="true" ref="callModal" />
  </div>
</template>

<script>
import { links } from "../../../constants/links";
import CallModal from "../CallModal";

export default {
  components: {
    CallModal,
  },
  data() {
    return {
      linksList: links,
    };
  },
  methods: {
    call() {
      this.$refs.callModal.$refs.call.open();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.company-block {
  padding: 10px 0 0 0;
  display: flex;
  justify-content: space-between;

  &__get-call {
    font-size: 20px;
    cursor: pointer;
    width: 350px;
    padding: 15px 5px 0;
  }

  &__svg {
    width: 18px;
  }

  .red {
    color: $project-red;
    font-size: inherit;
    font-size: 2.3rem;
    margin: 0 -4px 0 -4px;
  }

  .info {
    font-size: 0.9rem;
    letter-spacing: 0.1px;
  }

  &__number {
    display: flex;
    flex-flow: column;
    min-width: 175px;
    text-align: end;
  }

  &__logo {
    cursor: pointer;
    min-width: 210px;

    span {
      font-size: 2.3rem;
      font-weight: 500;
    }
  }

  &__menu {
    max-width: 1000px;
    width: 100%;
    display: flex;
    padding: 0 0 6px 30px;
    align-items: flex-end;

    &-item {
      padding: 0 15px 0 0;
      color: $project-color;
      transition: 0.3s;

      &:hover {
        color: $project-red;
      }
    }
  }
}

.phone {
  color: $project-red;
  font-size: 1.24rem;
}

@media (max-width: 1040px) {
  .company-block {
    &__menu {
      display: none;
    }
  }
}

@media (max-width: 720px) {
  .company-block {
    &__number {
      min-width: 125px;
    }

    &__get-call {
      padding: 10px 10px 0;
      display: flex;
      justify-content: flex-end;

      &-text {
        display: none;
      }
    }

    .info {
      font-size: 0.7rem;
    }

    .phone {
      font-size: 1rem;
    }

    &__logo {
      min-width: 165px;

      span {
        font-size: 1.8rem;
      }
    }

    .red {
      font-size: 1.8rem;
    }
  }
}
</style>
