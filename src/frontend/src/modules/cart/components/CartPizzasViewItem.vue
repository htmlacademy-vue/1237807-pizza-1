<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.title"
      />
      <div class="product__text">
        <h2>{{ pizza.title }}</h2>
        <ul>
          <li>{{ description }}</li>
          <li>{{ dressing }}</li>
          <li>{{ filling }}</li>
        </ul>
      </div>
    </div>
    <ItemCounter
      :class="`cart-list__counter`"
      :value="pizza.count || 0"
      :buttonClass="`counter__button--orange`"
      @removeItem="updatePizzasCount"
      @addItem="updatePizzasCount(true)"
    />
    <div class="cart-list__price">
      <b>{{ totalCost }} ₽</b>
    </div>
    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="changePizza">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";
import { SET_CURRENT_PIZZA } from "@/store/mutations-types";
import { getRequiredValue, lowercase } from "@/common/helpers";
import {
  doughTypes,
  pizzaSizes,
  sauceTypes,
  ingredientsTypes,
} from "@/common/constants";

export default {
  name: "CartPizzasViewItem",
  components: { ItemCounter },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    description() {
      const diameter = getRequiredValue(pizzaSizes, this.pizza.diameter);
      const dough = getRequiredValue(doughTypes, this.pizza.dough);

      return `${diameter.name}, на ${dough.label} тесте`;
    },
    dressing() {
      const sauce = getRequiredValue(sauceTypes, this.pizza.sauce);

      return `Соус: ${lowercase(sauce.name)}`;
    },
    filling() {
      const allIngredients = this.pizza.ingredients.map((ingredient) => {
        const ingredientData = getRequiredValue(ingredientsTypes, ingredient);
        return lowercase(ingredientData.name);
      });
      const uniqueIngredients = Array.from(new Set(allIngredients)).join(", ");

      return `Начинка: ${uniqueIngredients}`;
    },
    totalCost() {
      return this.pizza.cost * this.pizza.count;
    },
  },
  methods: {
    ...mapActions("Cart", ["updatePizza", "deletePizza"]),
    ...mapMutations("Builder", {
      setPizzaToBuilder: SET_CURRENT_PIZZA,
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
    },
  },
};
</script>
