<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number" data-test="order-number">
        <b>Заказ #{{ order.id }}</b>
      </div>
      <div class="order__sum" data-test="order-sum">
        <span>Сумма заказа: {{ orderTotalCost }} ₽</span>
      </div>
      <div class="order__button">
        <Button
          class="button--border"
          data-test="delete-button"
          @click="deleteOrder"
        >
          Удалить
        </Button>
      </div>
      <div class="order__button">
        <Button data-test="repeat-button" @click="setOrderToCart">
          Повторить
        </Button>
      </div>
    </div>
    <ul class="order__list">
      <OrdersItemPizzaView
        v-for="pizza in pizzasOrder"
        data-test="pizza-item"
        :key="pizza.id"
        :pizza="pizza"
      />
    </ul>
    <ul class="order__additional">
      <li
        v-for="miscItem in miscOrder"
        data-test="misc-item"
        :key="miscItem.id"
      >
        <img
          :src="miscItem.image"
          width="20"
          height="30"
          :alt="miscItem.name"
        />
        <p>
          <span>{{ miscItem.name }}</span>
          <b>{{ miscItem.price }} ₽</b>
        </p>
      </li>
    </ul>
    <p class="order__address" data-test="address">Адрес доставки: {{ address }}</p>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import OrdersItemPizzaView from "@/modules/orders/components/OrdersItemPizzaView";
import { SET_CART } from "@/store/mutations-types";

export default {
  name: "OrdersItem",
  components: { OrdersItemPizzaView },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["miscData"]),
    ...mapGetters(["getOrderCost"]),
    pizzasOrder() {
      return this.order.pizzasOrder;
    },
    miscOrder() {
      return this.miscData.filter(
        (item) => this.order.miscOrder[item.value] > 0
      );
    },
    address() {
      return this.order.address?.name || "Самовывоз";
    },
    orderTotalCost() {
      return this.getOrderCost({
        miscOrder: this.order.miscOrder,
        pizzasOrder: this.pizzasOrder,
      });
    },
  },
  methods: {
    ...mapActions("Orders", ["delete"]),
    deleteOrder() {
      this.delete(this.order.id);
    },
    ...mapMutations("Cart", {
      setCart: SET_CART,
    }),
    setOrderToCart() {
      this.setCart(this.order);
      this.$router.push("/cart");
    },
  },
};
</script>
