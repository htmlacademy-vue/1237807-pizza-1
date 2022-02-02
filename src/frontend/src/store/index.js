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

Vue.use(Vuex);

const state = () => ({
  error: "",
});

const actions = {
  async init({ dispatch }) {
    dispatch("Builder/query");
    dispatch("Cart/query");
    dispatch("Addresses/query");
  },
  async createError(store, text) {
    store.commit(CREATE_ERROR, text);
    setTimeout(() => store.commit(DELETE_ERROR), ERROR_LIVE_TIME);
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
  mutations,
  actions,
  modules,
  plugins: [VuexPlugins],
});
