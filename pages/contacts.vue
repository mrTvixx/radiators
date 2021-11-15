<template>
  <PageTemplate :path="[{ link: '/contacts', name: 'Контакты' }]">
    <p>
      Вы можете позвонить нам по номеру
      <a href="tel:+74994443465">+7 499 444 34 65</a>
    </p>
    <p>
      Или написать на e-mail
      <a href="mailto:info@домвтепле.рф">info@домвтепле.рф</a>
    </p>
    <p>
      Также можно
      <span @click="call" style="cursor: pointer; text-decoration: underline">оставить</span>
      заявку на бесплатную консультацию.
    </p>
    <h3><p>Мы с радостью ответим на все ваши вопросы!</p></h3>
    <CallModal ref="callModal" :withoutAutoOpen="true" />
  </PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";
import CallModal from "../components/Header/CallModal";

export default {
  components: {
    PageTemplate,
    CallModal,
  },
  methods: {
    call() {
      this.$refs.callModal.$refs.call.open();
    },
  },
  head() {
    return {
      title: "Контакты",
    };
  },
};
</script>
