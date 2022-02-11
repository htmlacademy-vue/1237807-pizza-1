import {
  ADD_ENTITY,
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_MISC_ORDER,
  SET_POP_UP,
  SET_CART,
  RESET_CART,
} from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";
import { addressValues } from "@/common/constants";

const entity = "cart";
const module = capitalize(entity);

const setupDefaultMiscOrder = () => ({
  cola: 0,
  sauce: 0,
  potato: 0,
});

export default {
  namespaced: true,
  state: {
    pizzasOrder: [],
    miscOrder: setupDefaultMiscOrder(),
    phone: "",
    address: {},
    deliveryOption: "pickup",
    isPopUp: false,
  },

  mutations: {
    [UPDATE_MISC_ORDER]({ miscOrder }, { item, isAddition }) {
      if (isAddition) {
        miscOrder[item] += 1;
      } else {
        miscOrder[item] -= 1;
      }
    },
    [SET_CART](state, { pizzasOrder, miscOrder, phone, address }) {
      console.log(address);
      state.pizzasOrder = pizzasOrder;
      state.miscOrder = miscOrder;
      state.phone = phone;
      state.address = address || {};

      if (address && address.id) {
        state.deliveryOption = address.id;
      } else {
        state.deliveryOption = "pickup";
      }
    },
    [RESET_CART](state) {
      state.pizzasOrder = [];
      state.miscOrder = setupDefaultMiscOrder();
      state.phone = "";
      state.address = {};
      state.deliveryOption = "pickup";
    },
    [SET_POP_UP](state, status) {
      state.isPopUp = status;
    },
  },

  actions: {
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
    setAddressValue({ state, commit, rootState }) {
      const selectedOption = state.deliveryOption;
      if (addressValues[selectedOption]) {
        commit(
          SET_ENTITY,
          {
            module: module,
            entity: "address",
            value: addressValues[selectedOption],
          },
          { root: true }
        );
      } else {
        const selectedAddress = rootState.Addresses.addresses.find(
          ({ id }) => id === Number(selectedOption)
        );

        commit(
          SET_ENTITY,
          {
            module: module,
            entity: "address",
            value: selectedAddress,
          },
          { root: true }
        );
      }
    },
  },
};
