export const normalizeData = (data, items) => {
  const requiredItem = items.find((item) => item.name === data.name);

  return {
    ...data,
    value: requiredItem.value,
    checked: requiredItem.checked ? true : false,
  };
};