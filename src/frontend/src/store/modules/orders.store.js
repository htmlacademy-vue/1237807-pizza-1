import { SET_ENTITY, DELETE_ENTITY } from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";
import { cloneDeep } from "lodash";

const entity = "orders";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    orders: [],
  },

  actions: {
    async query({ commit }) {
      const ordersData = await this.$api.orders.query();
      console.log(ordersData);
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: ordersData,
        },
        { root: true }
      );
    },
    async post({ dispatch }, order) {
      const orderCopy = cloneDeep(order);
      await this.$api.orders.post(orderCopy);
      dispatch("query");
      dispatch("Addresses/query", null, { root: true });
    },
    async delete({ commit }, id) {
      await this.$api.orders.delete(id);

      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          id,
        },
        { root: true }
      );
    },
  },
};
