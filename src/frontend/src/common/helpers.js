import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  DataApiService,
} from "@/services/api.service";

export const createResources = (error) => {
  return {
    [resources.AUTH]: new AuthApiService(error),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, error),
    [resources.DOUGH]: new DataApiService(resources.DOUGH, error),
    [resources.SIZES]: new DataApiService(resources.SIZES, error),
    [resources.SAUCES]: new DataApiService(resources.SAUCES, error),
    [resources.INGREDIENTS]: new DataApiService(resources.INGREDIENTS, error),
    [resources.MISC]: new DataApiService(resources.MISC, error),
  };
};

export const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export const normalizeData = (data, items) => {
  const requiredItem = items.find((item) => item.name === data.name);

  return {
    ...data,
    type: requiredItem.type,
    value: requiredItem.value,
  };
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const lowercase = (string) =>
  `${string.charAt(0).toLowerCase()}${string.slice(1)}`;

export const countItemsInArray = (arr) => {
  const count = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return count;
};

export const getRequiredValue = (arr, value) => {
  return arr.filter((item) => item.value === value)[0];
};

export const getPrice = (arr, value) => {
  const requiredData = getRequiredValue(arr, value);

  if (requiredData) {
    return requiredData.multiplier
      ? requiredData.multiplier
      : requiredData.price;
  }
};
