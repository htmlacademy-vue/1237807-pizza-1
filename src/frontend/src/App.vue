<template>
  <div id="app">
    <AppLayout :sum="result">
      <router-view v-bind="routeProps" @updatePizzaOrder="updatePizzaOrder" />
    </AppLayout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppLayout from "@/layouts/AppLayout";
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
    AppLayout,
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
    ...mapState("Builder", ["dough"]),
    ...mapState("Builder", ["sizes"]),
    ...mapState("Builder", ["sauces"]),
    ...mapState("Builder", ["ingredients"]),
    routeProps() {
      const routes = {
        Index: {
          data: this.pizzaData,
          order: this.pizzaOrder,
          sum: this.result,
        },
        Login: {
          data: null,
          order: null,
          sum: null,
        },
        Cart: {
          data: this.pizzaData,
          order: this.pizzaOrder,
          sum: this.result,
        },
        Orders: {
          data: null,
          order: null,
          sum: null,
        },
        Profile: {
          data: null,
          order: null,
          sum: null,
        },
      };
      return routes[this.$route.name] || {};
    },
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
  created() {
    this.$store.dispatch("Builder/query");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
