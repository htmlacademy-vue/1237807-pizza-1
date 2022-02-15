<template>
  <div class="product">
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
</template>

<script>
import { getRequiredValue, lowercase } from "@/common/helpers";
import {
  doughTypes,
  pizzaSizes,
  sauceTypes,
  ingredientsTypes,
} from "@/common/constants";

export default {
  name: "PizzaItem",
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
  },
};
</script>
