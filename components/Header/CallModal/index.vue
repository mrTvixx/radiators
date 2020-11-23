<template>
  <div>
    <sweet-modal class="sweet-modal-is-visible" ref="modal" blocking :hideCloseButton="true" :enableMobileFullscreen="false">
      <div class="close-icon" @click="onModalClose">x</div>
      <h3>Добро пожаловать на сайт магазина ДомВТепле!</h3>
      <p>Мы предоставляем широкий выбор товаров для отопления!</p>
      <p>Также вы можете заказать звонок, и наши специалисты помогут вам с подбором нужного оборудования (бесплатная консультация).</p>
      <div class="modal__buttons">
        <button class="modal__button modal__button--red" @click="onCall">Заказать звонок</button>
        <button class="modal__button" @click="onContinue">Продолжить</button>
      </div>
    </sweet-modal>

    <sweet-modal title="Заказать звонок" class="sweet-modal-is-visible" ref="call" :hideCloseButton="true" :enableMobileFullscreen="false">
      <div class="close-icon" @click="onCallClose">x</div>
      <div v-if="isLoading" class="call__loader">
        <Loader />
      </div>
      <div class="call__row">
        <h3>Номер телефона</h3>
        <vue-tel-input :dynamicPlaceholder="true" :onlyCountries="['RU']" v-model="phone" style="border: 1px solid rgba(0, 0, 0, 0.1); padding: 3px 0" class="call__input" />
      </div>
      <div class="call__row">
        <h3>Имя</h3>
        <input type="text" v-model="name" style="border: 1px solid rgba(0, 0, 0, 0.1)" class="call__input" />
      </div>
      <div class="call__row call__policy">
        <div class="order__row">
          <input id="policy" type="checkbox" v-model="isAgreement" />
          <label for="policy">
            <span>Я даю свое</span>
            <router-link to="/privacy">согласие на обработку</router-link>
            <span>моих персональных данных.</span>
          </label>
        </div>
      </div>
      <button :disabled="!isValid" class="call__button" @click="onSend">Отправить</button>
    </sweet-modal>

    <sweet-modal class="sweet-modal-is-visible" ref="success" icon="success" :hideCloseButton="true" :enableMobileFullscreen="false">
      <div class="close-icon" @click="onSuccClose">x</div>
      <h3>Спасибо!</h3>
      <h4>В ближайшее время с вами свяжутся наши специалисты.</h4>
    </sweet-modal>
  </div>
</template>

<script>
import { SweetModal } from "sweet-modal-vue";
import { mapGetters } from "vuex";

import { SEND_CALL } from "../../../store/actions.type";
import Loader from "../../Loader";

export default {
  components: {
    SweetModal,
    Loader,
  },
  props: ["withoutAutoOpen"],
  data() {
    return {
      isCallActive: false,
      name: "",
      phone: "",
      isAgreement: true,
    };
  },
  mounted() {
    const isCall = localStorage.getItem("isCall");
    if (!isCall && !this.withoutAutoOpen) this.$refs.modal.open();
  },
  computed: {
    ...mapGetters(["isLoading"]),
    isValid() {
      return Boolean(this.phone) && Boolean(this.name) && this.isAgreement;
    },
    modals() {
      this.$refs.modal;
    },
  },
  methods: {
    onContinue() {
      this.$refs.modal.close();
      localStorage.setItem("isCall", true);
    },
    onCallClose() {
      this.$refs.call.close();
    },
    onSuccClose() {
      this.$refs.success.close();
    },
    onModalClose() {
      this.$refs.modal.close();
    },
    onContinue() {
      this.$refs.modal.close();
      localStorage.setItem("isCall", true);
    },
    onCall() {
      this.$refs.modal.close();
      this.$refs.call.open();
    },
    onSend() {
      const data = {
        username: this.name,
        phone_number: this.phone,
        onSuccess: () => {
          this.$refs.call.close();
          this.$refs.success.open();
          localStorage.setItem("isCall", true);
          setTimeout(() => this.$refs.success.close(), 4000);
        },
      };
      this.$store.dispatch(SEND_CALL, data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./constants/_default.scss";
.close-icon {
  position: absolute;
  top: 0;
  right: 0px;
  padding: 8px 17px;
  font-size: 20px;
  cursor: pointer;
}
a {
  text-decoration: underline !important;
  transition: 0.3s;

  &:hover {
    color: $project-red;
  }
}
.call {
  &__loader {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  &__policy {
    padding: 15px 0;
  }
  &__input {
    -webkit-appearance: none;
    padding: 10px 0;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.2);

    &:focus,
    &:focus-within {
      box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.2);
    }
  }

  &__row {
    text-align: left;
  }

  &__button {
    border-radius: 5px;
    height: 40px;
    width: 100%;
    color: white;
    cursor: pointer;
    background-color: $project-red;
    margin: 30px 0 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
    transition: 0.05s;
    transition: 0.3s;

    &:disabled {
      cursor: not-allowed;
      background-color: grey;
    }

    &:active {
      box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
    }
  }
}

.modal {
  &__buttons {
    display: flex;
    justify-content: space-between;
  }
  &__button {
    border-radius: 5px;
    height: 40px;
    width: 40%;
    color: $project-color;
    cursor: pointer;
    background-color: white;
    margin: 30px 0 10px;
    transition: 0.05s;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);

    &--red {
      color: white;
      background-color: $project-red;
    }

    &:active {
      box-shadow: inset 0 0 5px 20px rgba(0, 0, 0, 0.2);
    }
  }
}

@media (max-width: 720px) {
  .modal {
    &__button {
      width: 100%;
    }

    &__buttons {
      flex-flow: column;
    }
  }
}
</style>
