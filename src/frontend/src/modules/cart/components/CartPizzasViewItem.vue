<template>
  <li class="cart-list__item">
    <PizzaItem
      class="cart-list__product"
      :pizza="pizza"
    />
    <ItemCounter
      :class="`cart-list__counter`"
      :value="pizza.count || 0"
      :button-class="`counter__button--orange`"
      data-test="pizza-counter"
      @removeItem="updatePizzasCount"
      @addItem="updatePizzasCount(true)"
    />
    <div class="cart-list__price">
      <b>{{ totalCost }} ₽</b>
    </div>
    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        data-test="change-button"
        @click="changePizza"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import PizzaItem from "@/common/components/PizzaItem";
import ItemCounter from "@/common/components/ItemCounter";
import { SET_CURRENT_PIZZA } from "@/store/mutations-types";

export default {
  name: "CartPizzasViewItem",
  components: { PizzaItem, ItemCounter },

  props: {
    pizza: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters(["getPizzaCost"]),

    totalCost() {
      return this.getPizzaCost(this.pizza) * this.pizza.count;
    }
  },

  methods: {
    ...mapActions("Cart", ["updatePizza", "deletePizza"]),

    ...mapMutations("Builder", {
      setPizzaToBuilder: SET_CURRENT_PIZZA
    }),

    updatePizzasCount(isAddition) {
      let newCount;

      if (isAddition) {
        newCount = this.pizza.count + 1;
      } else {
        if (this.pizza.count === 1) {
          this.deletePizza(this.pizza.id);
          return;
        } else {
          newCount = this.pizza.count - 1;
        }
      }

      this.updatePizza({ ...this.pizza, count: newCount });
    },

    changePizza() {
      this.setPizzaToBuilder(this.pizza);
      this.$router.push("/");
    }
  }
};
</script>
