import {
  SET_ENTITY,
  UPDATE_CURRENT_PIZZA,
  SET_CURRENT_PIZZA,
  RESET_CURRENT_PIZZA,
} from "@/store/mutations-types";
import { countItemsInArray, getPrice } from "@/common/helpers";
import { normalizeData, capitalize } from "@/common/helpers";
import pizza from "@/static/pizza.json";
import {
  doughTypes,
  pizzaSizes,
  sauceTypes,
  ingredientsTypes,
} from "@/common/constants";

const entity = "builder";
const module = capitalize(entity);
const namespace = { entity, module };

const setupDefaultPizza = () => ({
  title: "",
  dough: "light",
  diameter: "normal",
  sauce: "tomato",
  ingredients: ["ananas", "bacon", "cheddar"],
  count: 1,
});

export default {
  namespaced: true,
  state: {
    builder: {
      dough: [],
      sizes: [],
      sauces: [],
      ingredients: [],
    },
    pizza: setupDefaultPizza(),
  },

  getters: {
    getPizzaCost({ builder, pizza }) {
      const doughCost = getPrice(builder.dough, pizza.dough);
      const sizeCost = getPrice(builder.sizes, pizza.diameter);
      const sauceCost = getPrice(builder.sauces, pizza.sauce);

      const ingredientsCount = countItemsInArray(pizza.ingredients);
      let ingredientsTotalCost = 0;
      builder.ingredients.map((item) => {
        if (ingredientsCount[item.value]) {
          ingredientsTotalCost += item.price * ingredientsCount[item.value];
        }
      });

      return (doughCost + sauceCost + ingredientsTotalCost) * sizeCost || 0;
    },
    getBuilderItem: (state) => (item) => state.builder[item],
    getPizzaItem: (state) => (item) => state.pizza[item],
    isPizzaReady({ pizza }) {
      return pizza.ingredients.length !== 0 && pizza.title !== "";
    },
  },

  mutations: {
    [UPDATE_CURRENT_PIZZA]({ pizza }, { item, payload, isAddition }) {
      if (item === "ingredients") {
        if (isAddition) {
          pizza[item].push(payload);
        } else {
          const index = pizza[item].indexOf(payload);
          if (~index) {
            pizza[item].splice(index, 1);
          }
        }
      } else {
        pizza[item] = payload;
      }
    },
    [SET_CURRENT_PIZZA](state, payload) {
      state.pizza = payload;
    },
    [RESET_CURRENT_PIZZA](state) {
      state.pizza = setupDefaultPizza();
    },
  },

  actions: {
    async query({ commit }) {
      const builderData = {
        dough: pizza.dough.map((dough) => normalizeData(dough, doughTypes)),
        sizes: pizza.sizes.map((size) => normalizeData(size, pizzaSizes)),
        sauces: pizza.sauces.map((sauce) => normalizeData(sauce, sauceTypes)),
        ingredients: pizza.ingredients.map((ingredient) =>
          normalizeData(ingredient, ingredientsTypes)
        ),
      };

      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: builderData,
        },
        { root: true }
      );
    },
  },
};
