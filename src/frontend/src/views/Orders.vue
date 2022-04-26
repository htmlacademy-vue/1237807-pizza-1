<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <div
      v-if="orders.length === 0"
      class="sheet cart__empty"
      data-test="no-orders-text"
    >
      <p>У вас пока нет заказов</p>
    </div>
    <OrdersItem
      v-else
      v-for="order in orders"
      :key="order.id"
      :order="order"
      data-test="orders"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import OrdersItem from "@/modules/orders/components/OrdersItem";

export default {
  name: "Orders",
  components: { OrdersItem },
  computed: {
    ...mapState("Orders", ["orders"]),
  },
};
</script>
