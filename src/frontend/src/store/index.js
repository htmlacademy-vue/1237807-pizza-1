import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  CREATE_ERROR,
  DELETE_ERROR,
} from "@/store/mutations-types";
import { ERROR_LIVE_TIME } from "@/common/constants";
import { getPrice, countItemsInArray } from "@/common/helpers";

Vue.use(Vuex);

const state = () => ({
  pizzaData: {
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
  },
  miscData: [],
  error: "",
});

const actions = {
  async init({ dispatch }) {
    await dispatch("fetchPizzaData");
    await dispatch("fetchMiscData");
  },
  async fetchPizzaData({ commit }) {
    const dough = await this.$api.dough.query();
    const sizes = await this.$api.sizes.query();
    const sauces = await this.$api.sauces.query();
    const ingredients = await this.$api.ingredients.query();

    const data = { dough, sizes, sauces, ingredients };

    commit(SET_ENTITY, { module: null, entity: "pizzaData", value: data });
  },
  async fetchMiscData({ commit }) {
    const data = await this.$api.misc.query();

    commit(SET_ENTITY, { module: null, entity: "miscData", value: data });
  },
  async fetchAuthorizedOnlyData({ dispatch }) {
    await dispatch("Addresses/query");
    await dispatch("Orders/query");
  },
  async createError(store, text) {
    store.commit(CREATE_ERROR, text);
    setTimeout(() => store.commit(DELETE_ERROR), ERROR_LIVE_TIME);
  },
};

const getters = {
  getPizzaDataItem: (state) => (item) => state.pizzaData[item],
  getPizzaCost:
    ({ pizzaData }) =>
    (pizza) => {
      const doughCost = getPrice(pizzaData.dough, pizza.dough);
      const sizeCost = getPrice(pizzaData.sizes, pizza.diameter);
      const sauceCost = getPrice(pizzaData.sauces, pizza.sauce);

      const ingredientsCount = countItemsInArray(pizza.ingredients);
      let ingredientsTotalCost = 0;
      pizzaData.ingredients.map((item) => {
        if (ingredientsCount[item.value]) {
          ingredientsTotalCost += item.price * ingredientsCount[item.value];
        }
      });

      return (doughCost + sauceCost + ingredientsTotalCost) * sizeCost || 0;
    },
  getOrderCost:
    ({ miscData }, getters) =>
    ({ miscOrder, pizzasOrder }) => {
      let total = 0;

      pizzasOrder.forEach((pizza) => {
        total += getters.getPizzaCost(pizza) * pizza.count;
      });
      miscData.forEach((item) => {
        total += item.price * miscOrder[item.value];
      });

      return total;
    },
};

const mutations = {
  [CREATE_ERROR](state, error) {
    state.error = error;
  },
  [DELETE_ERROR](state) {
    state.error = "";
  },
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },
  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },
  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );
      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },
  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [VuexPlugins],
});
