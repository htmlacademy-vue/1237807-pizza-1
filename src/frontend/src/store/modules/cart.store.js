import {
  ADD_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_MISC_ORDER,
} from "@/store/mutations-types";
import { capitalize, normalizeData } from "@/common/helpers";
import misc from "@/static/misc.json";
import { miscTypes } from "@/common/constants";

const entity = "cart";
const module = capitalize(entity);
//   const namespace = { entity, module };

const setupDefaultPizzasOrder = () => [];
const setupDefaultMiscOrder = () => ({
  cola: 0,
  sauce: 0,
  potato: 0,
});

export default {
  namespaced: true,
  state: {
    misc: [],
    pizzasOrder: setupDefaultPizzasOrder(),
    miscOrder: setupDefaultMiscOrder(),
  },

  getters: {
    orderTotalCost({ misc, miscOrder, pizzasOrder }) {
      let total = 0;

      pizzasOrder.forEach((item) => {
        total += item.cost * item.count;
      });

      misc.forEach((item) => {
        total += item.price * miscOrder[item.value];
      });

      return total;
    },
  },

  mutations: {
    [UPDATE_MISC_ORDER]({ miscOrder }, { item, isAddition }) {
      if (isAddition) {
        miscOrder[item] += 1;
      } else {
        miscOrder[item] -= 1;
      }
    },
  },

  actions: {
    async query({ commit }) {
      const miscData = misc.map((miscItem) =>
        normalizeData(miscItem, miscTypes)
      );

      commit(
        SET_ENTITY,
        {
          module: module,
          entity: "misc",
          value: miscData,
        },
        { root: true }
      );
    },
    addPizza({ state, commit }, pizza) {
      const id = state.pizzasOrder.length + 1;
      const newPizza = { ...pizza, id };

      commit(
        ADD_ENTITY,
        {
          module: module,
          entity: "pizzasOrder",
          value: newPizza,
        },
        { root: true }
      );
    },
    updatePizza({ commit }, updatedPizza) {
      commit(
        UPDATE_ENTITY,
        {
          module: module,
          entity: "pizzasOrder",
          value: updatedPizza,
        },
        { root: true }
      );
    },
    deletePizza({ commit }, id) {
      commit(
        DELETE_ENTITY,
        {
          module: module,
          entity: "pizzasOrder",
          id,
        },
        { root: true }
      );
    },
  },
};
