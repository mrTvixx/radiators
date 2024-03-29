<template>
  <div class="company-block">
    <div class="company-block__logo-container">
      <div
        v-if="width <= 1040"
        v-tooltip="{
          content: 'Нужна помощь? <br /> Закажи звонок.',
          show: isTooltip,
          trigger: 'none',
        }"
        class="company-block__get-call--mobile"
        @click="call"
      >
        <v-icon class="company-block__svg" name="phone-call"></v-icon>
        {{ " Заказать звонок" }}
      </div>
      <router-link to="/" class="company-block__logo">
        <span>Дом</span>
        <span class="red">В</span>
        <span>Тепле</span>
      </router-link>
    </div>
    <nav class="company-block__menu">
      <router-link
        v-for="item in linksList"
        :key="item.id"
        class="company-block__menu-item"
        :to="item.link"
      >
        {{ item.title }}
      </router-link>
    </nav>
    <div
      v-if="width > 1040"
      v-tooltip="{
        content: 'Нужна помощь? <br /> Закажи звонок.',
        show: isTooltip,
        trigger: 'none',
      }"
      class="company-block__get-call"
      @click="call"
    >
      <v-icon class="company-block__svg" name="phone-call"></v-icon>
      {{ "Заказать звонок" }}
    </div>
    <CallModal :withoutAutoOpen="true" ref="callModal" />
    <span class="company-block__number">
      <a href="tel:+79996917470" class="contact">+7 999 691 74 70</a>
      <a
        @click="onEmailClick"
        href="mailto:info@домвтепле.рф"
        v-tooltip.left="{
          content: 'Скопировано',
          show: showCopyTooltip,
          trigger: 'none',
        }"
      >
        info@домвтепле.рф
      </a>
      <span class="info">
        Ежедневно с 9
        <sup>00</sup>-20
        <sup>00</sup>
      </span>
    </span>
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
      isTooltip: false,
      width: 0,
      showCopyTooltip: false,
    };
  },
  mounted() {
    if (this.$route?.query?.isCallModal) {
      this.isTooltip = false;
      this.$refs.callModal.$refs.call.open();
    }

    window.addEventListener("resize", this.updateWidth);
    this.updateWidth();

    const isCall = localStorage.getItem("isCall");
    const currentDate = new Date().getDate();
    if (String(isCall) === String(currentDate)) return;
    this.isTooltip = true;
    setTimeout(() => {
      localStorage.setItem("isCall", currentDate);
      this.isTooltip = false;
    }, 5000);
  },
  methods: {
    updateWidth() {
      this.width = window.innerWidth;
    },
    call() {
      const { query } = this.$route;
      this.$router.push({ path: this.$route.path, query: { ...query, isCallModal: true } })
      this.isTooltip = false;
      this.$refs.callModal.$refs.call.open();
    },
    onEmailClick() {
      this.$clipboard("info@домвтепле.рф");
      this.showCopyTooltip = true;
      setTimeout(() => {
        this.showCopyTooltip = false;
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.company-block__menu-nav {
  // width: 100%;
}

.company-block {
  padding: 10px 0 0 0;
  display: flex;
  justify-content: space-between;

  &__get-call {
    white-space: nowrap;
    font-size: 20px;
    cursor: pointer;
    width: 350px;
    padding: 15px 5px 4px;
    display: flex;
    align-items: flex-end;

    &--mobile {
      display: none;
    }
  }

  &__svg {
    width: 18px;
    padding: 0 10px 0 0;
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
    align-items: flex-end;
    display: flex;
    justify-content: space-around;

    &-container {
      display: flex;
    }

    span {
      font-size: 2.3rem;
      font-weight: 500;
    }
  }

  &__menu {
    max-width: 1000px;
    width: 100%;
    display: flex;
    padding: 0 0 4px 30px;
    align-items: flex-end;

    &-item {
      padding: 0 15px 0 0;
      color: $project-color;
      transition: 0.3s;
      white-space: nowrap;

      &:hover {
        color: $project-red;
      }
    }
  }
}

.contact {
  color: $project-red;
}

@media (max-width: 1040px) {
  .company-block {
    &__menu {
      display: none;
    }
    &__logo {
      min-width: 165px;
      display: flex;

      &-container {
        flex-flow: column;
      }

      span {
        font-size: 1.8rem;
      }
    }

    &__get-call {
      width: unset;
      padding: 10px 0 0 20px;
      display: none;
      width: 190px;

      &--mobile {
        width: 100%;
        font-size: 16px !important;
        display: block;
      }
    }

    .red {
      font-size: 1.8rem;
    }

    &__svg {
      padding: 0;
    }
  }
}

@media (max-width: 720px) {
  .company-block {
    &__number {
      min-width: 125px;
    }

    &__logo {
      min-width: 165px;
      display: flex;

      &-container {
        flex-flow: column;
      }

      span {
        font-size: 1.8rem;
      }
    }

    &__get-call {
      width: unset;
      padding: 10px 0 0 20px;
      display: none;

      &--mobile {
        width: 100%;
        font-size: 16px !important;
        display: block;
      }
    }

    &__svg {
      padding: 0;
    }

    .info {
      font-size: 0.7rem;
    }

    .phone {
      font-size: 1rem;
    }

    .red {
      font-size: 1.8rem;
    }
  }
}
</style>
