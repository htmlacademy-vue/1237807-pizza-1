<template>
  <li class="order__item">
    <PizzaItem :pizza="pizza" />
    <p class="order__price">
      {{ pizzaCost }} ₽
    </p>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
import PizzaItem from "@/common/components/PizzaItem";

export default {
  name: "OrdersItemPizzaView",
  components: { PizzaItem },

  props: {
    pizza: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(["getPizzaCost"]),

    pizzaCost() {
      if (this.pizza.count > 1) {
        return `${this.pizza.count}х${this.getPizzaCost(this.pizza)}`;
      } else {
        return this.getPizzaCost(this.pizza);
      }
    }
  }
};
</script>
