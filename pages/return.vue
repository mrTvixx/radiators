<template>
  <PageTemplate :path="[{link: '/return', name: 'Возврат'}]">
    <p>Обмен или возврат товар выполняется <b>только</b> при условии соблюдения требований установленных законом:</p>

    <ul>
      <li>Сохранение товарного вида, целостности изделия, наличия всех комплектующих (идущих в комплекте).</li>
      <li>Наличие товарного чека, накладной и выданного нами гарантийного талона.</li>
      <li>Скорость и способ возврата денежных средств зависит от метода оплаты.</li>
    </ul>
  </PageTemplate>
</template>

<script>
import PageTemplate from "../components/PageTemplate";

export default {
  components: {
    PageTemplate
  }
};
</script>