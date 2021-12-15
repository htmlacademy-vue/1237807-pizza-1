export const normalizeData = (data, items) => {
  const requiredItem = items.find((item) => item.name === data.name);

  return {
    ...data,
    type: requiredItem.type,
    value: requiredItem.value,
    checked: requiredItem.checked ? true : false,
  };
};

export const countItemsInArray = (arr) => {
  const count = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return count;
};

export const getPrice = (arr, value) => {
  const requiredData = arr.filter((item) => item.value === value)[0];

  if (requiredData.multiplier) {
    return requiredData.multiplier;
  } else {
    return requiredData.price;
  }
};
