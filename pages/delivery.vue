<template>
  <PageTemplate :path="[{link: '/delivery', name: 'Доставка'}]">
  <h2>Доставка</h2>
  <p>Наша компания осуществляет доставку по г. Москва и области (собственная служба доставки), также по России (через транспортные компании).</p>

  <b>Доставка по г. Москва и Московской области</b>

  <ul>
    <li> по г. Москва в пределах МКАД – от 0 до 500 руб (точная стоимость будет сообщена оператором)</li>
    <li> за пределы МКАД – 500 руб + 60 руб/км</li>
  </ul>

  <b>Условия доставки</b>

  <ul>
    <li> При наличии товара доставка осуществляется на следующий день после заказа. </li>
    <li> Доставка товара осуществляется только до подъезда!</li>
    <li> Экспедитор за 1 час обязательно связывается с Вами.</li>
    <li> Весь товар проверяется на комплектность до того, как он начинает свой путь с нашего склада к Вам.</li>
    <li> При заказе крупногабаритного товара просьба при доставке — обеспечить его разгрузку.</li>
  </ul>
  
  <b>Самовывоз товара:</b>

  <p>По предварительному согласованию с менеджером возможен самовывоз товара со склада по адресу: adress</p>
  </PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";

export default {
  components: {
    PageTemplate
  },
  head() {
    return {
      title: "Доставка",
    };
  },
};
</script>