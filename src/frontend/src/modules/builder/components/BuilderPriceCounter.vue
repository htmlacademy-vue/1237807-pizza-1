<template>
  <div class="content__result">
    <p>Итого: {{ pizzaCost }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="disabled"
      @click="finalizePizza"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import { RESET_CURRENT_PIZZA } from "@/store/mutations-types";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", ["pizza"]),
    ...mapGetters("Builder", ["getPizzaCost", "isPizzaReady"]),
    pizzaCost() {
      return this.getPizzaCost;
    },
    disabled() {
      return !this.isPizzaReady;
    },
  },
  methods: {
    ...mapActions("Cart", ["addPizza", "updatePizza"]),
    ...mapMutations("Builder", {
      resetPizza: RESET_CURRENT_PIZZA,
    }),
    finalizePizza() {
      const finalPizza = { ...this.pizza, cost: this.pizzaCost };

      if (finalPizza.id) {
        this.updatePizza(finalPizza);
      } else {
        this.addPizza(finalPizza);
      }

      this.resetPizza();
    },
  },
};
</script>
