import { cloneDeep } from "lodash";
import { mutations, getters } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import pizza from "@/static/pizza";
import misc from "@/static/misc";
import { dataTypes } from "@/common/constants";

const normalizeData = (data, types) => {
  const requiredItem = types.find((type) => type.name === data.name);

  return {
    ...data,
    type: requiredItem.type,
    value: requiredItem.value,
  };
};

const initState = () => ({
  pizzaData: {
    dough: pizza.dough.map((item) => normalizeData(item, dataTypes.dough)),
    sizes: pizza.sizes.map((item) => normalizeData(item, dataTypes.sizes)),
    sauces: pizza.sauces.map((item) => normalizeData(item, dataTypes.sauces)),
    ingredients: pizza.ingredients.map((item) =>
      normalizeData(item, dataTypes.ingredients)
    ),
  },
  miscData: misc.map((item) => normalizeData(item, dataTypes.misc)),
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
