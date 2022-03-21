import { cloneDeep } from "lodash";
import { mutations, getters } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";
import pizza from "@/static/pizza";
import misc from "@/static/misc";
import VuexPlugins from "@/plugins/vuexPlugins";

const initState = () => ({
  pizzaData: {
    dough: [],
    sizes: [],
    sauces: [],
    ingredients: [],
  },
  miscData: [],
  error: "",
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: initState(),
    mutations,
    getters,
    modules: modulesCopy,
    plugins: [VuexPlugins],
  });
};
