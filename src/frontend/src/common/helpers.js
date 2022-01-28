import resources from "@/common/enums/resources";
import { AuthApiService, DataApiService } from "@/services/api.service";

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.DOUGH]: new DataApiService(resources.DOUGH),
    [resources.SIZES]: new DataApiService(resources.SIZES),
    [resources.SAUCES]: new DataApiService(resources.SAUCES),
    [resources.INGREDIENTS]: new DataApiService(resources.INGREDIENTS),
    [resources.MISC]: new DataApiService(resources.MISC),
  };
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
