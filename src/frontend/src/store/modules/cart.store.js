import {
  ADD_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_MISC_ORDER,
  SET_POP_UP,
  RESET_CART,
} from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";

const entity = "cart";
const module = capitalize(entity);

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
    isPopUp: false,
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
    [RESET_CART](state) {
      state.pizzasOrder = setupDefaultPizzasOrder();
      state.miscOrder = setupDefaultMiscOrder();
    },
    [SET_POP_UP](state, status) {
      state.isPopUp = status;
    },
  },

  actions: {
    async query({ commit }) {
      const miscData = await this.$api.misc.query();

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
