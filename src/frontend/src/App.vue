<template>
  <div id="app">
    <AppLayoutHeader :total="result" />
    <Index
      :data="pizzaData"
      :order="pizzaOrder"
      :sum="result"
      @updatePizzaOrder="updatePizzaOrder"
    />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import Index from "@/views/Index";
import pizza from "@/static/pizza.json";
import { normalizeData, countItemsInArray, getPrice } from "@/common/helpers";
import {
  doughTypes,
  pizzaSizes,
  sauceTypes,
  ingredientsTypes,
} from "@/common/constants";

export default {
  name: "App",
  components: {
    AppLayoutHeader,
    Index,
  },
  data() {
    return {
      pizzaData: {
        dough: pizza.dough.map((dough) => normalizeData(dough, doughTypes)),
        sizes: pizza.sizes.map((size) => normalizeData(size, pizzaSizes)),
        sauces: pizza.sauces.map((sauce) => normalizeData(sauce, sauceTypes)),
        ingredients: pizza.ingredients.map((ingredient) =>
          normalizeData(ingredient, ingredientsTypes)
        ),
      },
      pizzaOrder: {
        title: "",
        dough: "light",
        diameter: "normal",
        sauce: "tomato",
        ingredients: ["ananas", "bacon", "cheddar"],
      },
    };
  },
  computed: {
    result() {
      const doughCost = getPrice(this.pizzaData.dough, this.pizzaOrder.dough);
      const sizeCost = getPrice(this.pizzaData.sizes, this.pizzaOrder.diameter);
      const sauceCost = getPrice(this.pizzaData.sauces, this.pizzaOrder.sauce);
      const ingredientsCount = countItemsInArray(this.pizzaOrder.ingredients);
      let ingredientsTotalCost = 0;
      this.pizzaData.ingredients.map((item) => {
        if (ingredientsCount[item.value]) {
          ingredientsTotalCost += item.price * ingredientsCount[item.value];
        }
      });

      return (doughCost + sauceCost + ingredientsTotalCost) * sizeCost || 0;
    },
  },
  methods: {
    updatePizzaOrder({ payload, action }) {
      console.log(payload);
      switch (action) {
        case "title":
          this.pizzaOrder.title = payload;
          break;
        case "dough":
          this.pizzaOrder.dough = payload;
          break;
        case "diameter":
          this.pizzaOrder.diameter = payload;
          break;
        case "sauce":
          this.pizzaOrder.sauce = payload;
          break;
        case "ingredients":
          if (payload.addition) {
            this.pizzaOrder.ingredients.push(payload.ingredient);
          } else {
            const index = this.pizzaOrder.ingredients.indexOf(
              payload.ingredient
            );
            if (index > -1) {
              this.pizzaOrder.ingredients.splice(index, 1);
            }
          }
          break;
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
