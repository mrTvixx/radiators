<template>
  <PageTemplate :path="[{link: '/contacts', name: 'Контакты'}]">
    <h3>
      <p>
        Вы можете позвонить нам по номеру
        <a href="tel:+79459999999">+7 945 999 99 99</a>
      </p>
    </h3>
    <h3>
      <p>
        Или написать на e-mail
        <a href="mailto:info@домвтепле.рф">info@домвтепле.рф</a>
      </p>
    </h3>
    <h3>
      <p>Мы с радостью ответим на все ваши вопросы!</p>
    </h3>
  </PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";

export default {
  components: {
    PageTemplate,
  },
  head() {
    return {
      title: "Контакты",
    };
  },
};
</script>