import {
  UPDATE_CURRENT_PIZZA,
  SET_CURRENT_PIZZA,
  RESET_CURRENT_PIZZA,
} from "@/store/mutations-types";

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
    pizza: setupDefaultPizza(),
  },

  getters: {
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
};
