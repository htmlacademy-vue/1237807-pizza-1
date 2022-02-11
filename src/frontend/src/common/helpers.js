import resources from "@/common/enums/resources";
import {
  AuthApiService,
  CrudApiService,
  DataApiService,
  OrdersApiService,
} from "@/services/api.service";

export const createResources = (error, store) => {
  return {
    [resources.AUTH]: new AuthApiService(error),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, error),
    [resources.ORDERS]: new OrdersApiService(resources.ORDERS, error, store),
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

export const getId = (arr, value) => {
  const requiredData = getRequiredValue(arr, value);

  if (requiredData) {
    return requiredData.id;
  }
};

export const getValueById = (arr, id) => {
  const requiredData = arr.filter((item) => item.id === id)[0];

  if (requiredData) {
    return requiredData.value;
  }
};

export const getRequestDataFromObject = (obj, data, detailId) => {
  const requestArray = Object.entries(obj).reduce((acc, [key, value]) => {
    acc.push({
      [detailId]: getId(data, key),
      quantity: value,
    });
    return acc;
  }, []);

  return requestArray;
};

export const getObjectFromResponseData = (arr, data) => {
  const obj = arr.reduce((acc, item) => {
    const title = getValueById(data, item.miscId);
    acc[title] = item.quantity;
    return acc;
  }, {});

  return obj;
};

export const getIngredientsArray = (arr, data) => {
  const ingredients = arr.reduce((acc, item) => {
    const title = getValueById(data, item.ingredientId);
    if (item.quantity > 1) {
      const fewTitles = new Array(item.quantity).fill(title, 0);
      acc = [...acc, ...fewTitles];
    } else {
      acc.push(title);
    }

    return acc;
  }, []);

  return ingredients;
};
