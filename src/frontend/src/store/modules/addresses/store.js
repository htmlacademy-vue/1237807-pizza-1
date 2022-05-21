import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY
} from "@/store/mutations-types";
import { capitalize } from "@/common/helpers";
import { cloneDeep } from "lodash";

const entity = "addresses";
const module = capitalize(entity);
const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    addresses: []
  },

  actions: {
    async query({ commit }) {
      const addressesData = await this.$api.addresses.query();
      commit(
        SET_ENTITY,
        {
          ...namespace,
          value: addressesData
        },
        { root: true }
      );
    },
    async post({ commit }, address) {
      const addressCopy = cloneDeep(address);
      const data = await this.$api.addresses.post(addressCopy);

      commit(
        ADD_ENTITY,
        {
          ...namespace,
          value: data
        },
        { root: true }
      );
      return data;
    },
    async put({ commit }, address) {
      await this.$api.addresses.put(address);

      commit(
        UPDATE_ENTITY,
        {
          ...namespace,
          value: address
        },
        { root: true }
      );
    },
    async delete({ commit }, id) {
      await this.$api.addresses.delete(id);

      commit(
        DELETE_ENTITY,
        {
          ...namespace,
          id
        },
        { root: true }
      );
    }
  }
};
