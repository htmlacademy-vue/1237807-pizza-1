<template>
  <div
    v-if="pizzasOrder.length === 0"
    data-test="cart-empty-text"
    class="sheet cart__empty"
  >
    <p>В корзине нет ни одного товара</p>
  </div>
  <ul
    v-else
    class="cart-list sheet"
  >
    <CartPizzasViewItem
      v-for="pizza in pizzasOrder"
      :key="pizza.id"
      :pizza="pizza"
      data-test="pizza-item"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import CartPizzasViewItem from "@/modules/cart/components/CartPizzasViewItem";

export default {
  name: "CartPizzasView",
  components: { CartPizzasViewItem },
  computed: {
    ...mapState("Cart", ["pizzasOrder"])
  }
};
</script>
