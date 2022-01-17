import { SET_DATA, UPDATE_ORDER } from "@/store/mutations-types";
import { countItemsInArray, getPrice } from "@/common/helpers";
import { normalizeData } from "@/common/helpers";
import pizza from "@/static/pizza.json";
import {
  doughTypes,
  pizzaSizes,
  sauceTypes,
  ingredientsTypes,
} from "@/common/constants";

const defaultOrder = {
  title: "",
  dough: "light",
  diameter: "normal",
  sauce: "tomato",
  ingredients: ["ananas", "bacon", "cheddar"],
};

export default {
  namespaced: true,
  state: {
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
    order: defaultOrder,
  },

  getters: {
    orderSum({ dough, sizes, sauces, ingredients, order }) {
      const doughCost = getPrice(dough, order.dough);
      const sizeCost = getPrice(sizes, order.diameter);
      const sauceCost = getPrice(sauces, order.sauce);

      const ingredientsCount = countItemsInArray(order.ingredients);
      let ingredientsTotalCost = 0;
      ingredients.map((item) => {
        if (ingredientsCount[item.value]) {
          ingredientsTotalCost += item.price * ingredientsCount[item.value];
        }
      });

      return (doughCost + sauceCost + ingredientsTotalCost) * sizeCost || 0;
    },
    getOrderItem: (state) => (item) => state.order[item],
  },

  mutations: {
    [SET_DATA](state, { name, data }) {
      state[name] = data;
    },
    [UPDATE_ORDER]({ order }, { item, payload }) {
      order[item] = payload;
    },
  },

  actions: {
    async query({ commit }) {
      const pizzaData = [
        {
          name: "dough",
          data: pizza.dough.map((dough) => normalizeData(dough, doughTypes)),
        },
        {
          name: "sizes",
          data: pizza.sizes.map((size) => normalizeData(size, pizzaSizes)),
        },
        {
          name: "sauces",
          data: pizza.sauces.map((sauce) => normalizeData(sauce, sauceTypes)),
        },
        {
          name: "ingredients",
          data: pizza.ingredients.map((ingredient) =>
            normalizeData(ingredient, ingredientsTypes)
          ),
        },
      ];

      Promise.all(pizzaData).then((data) => {
        data.map((item) => {
          commit(SET_DATA, { name: item.name, data: item.data });
        });
      });
    },
  },
};
