<template>
  <div class="content__result">
    <p>Итого: {{ pizzaCost }} ₽</p>
    <Button :disabled="disabled" @click="finalizePizza"> Готовьте! </Button>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import { RESET_CURRENT_PIZZA } from "@/store/mutations-types";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapState("Builder", ["pizza"]),
    ...mapGetters(["getPizzaCost"]),
    ...mapGetters("Builder", ["isPizzaReady"]),
    pizzaCost() {
      return this.getPizzaCost(this.pizza);
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
      if (this.pizza.id) {
        this.updatePizza(this.pizza);
      } else {
        this.addPizza(this.pizza);
      }

      this.resetPizza();
    },
  },
};
</script>
