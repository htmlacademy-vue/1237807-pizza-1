export const doughTypes = [
  {
    type: "dough",
    name: "Тонкое",
    value: "light",
    label: "тонком",
  },
  {
    type: "dough",
    name: "Толстое",
    value: "large",
    label: "толстом",
  },
];

export const pizzaSizes = [
  {
    type: "diameter",
    name: "23 см",
    value: "small",
  },
  {
    type: "diameter",
    name: "32 см",
    value: "normal",
  },
  {
    type: "diameter",
    name: "45 см",
    value: "big",
  },
];

export const sauceTypes = [
  {
    type: "sauce",
    name: "Томатный",
    value: "tomato",
  },
  {
    type: "sauce",
    name: "Сливочный",
    value: "creamy",
  },
];

export const ingredientsTypes = [
  {
    type: "ingredients",
    name: "Грибы",
    value: "mushrooms",
  },
  {
    type: "ingredients",
    name: "Чеддер",
    value: "cheddar",
  },
  {
    type: "ingredients",
    name: "Салями",
    value: "salami",
  },
  {
    type: "ingredients",
    name: "Ветчина",
    value: "ham",
  },
  {
    type: "ingredients",
    name: "Ананас",
    value: "ananas",
  },
  {
    type: "ingredients",
    name: "Бекон",
    value: "bacon",
  },
  {
    type: "ingredients",
    name: "Лук",
    value: "onion",
  },
  {
    type: "ingredients",
    name: "Чили",
    value: "chile",
  },
  {
    type: "ingredients",
    name: "Халапеньо",
    value: "jalapeno",
  },
  {
    type: "ingredients",
    name: "Маслины",
    value: "olives",
  },
  {
    type: "ingredients",
    name: "Томаты",
    value: "tomatoes",
  },
  {
    type: "ingredients",
    name: "Лосось",
    value: "salmon",
  },
  {
    type: "ingredients",
    name: "Моцарелла",
    value: "mozzarella",
  },
  {
    type: "ingredients",
    name: "Пармезан",
    value: "parmesan",
  },
  {
    type: "ingredients",
    name: "Блю чиз",
    value: "blue_cheese",
  },
];

export const miscTypes = [
  {
    type: "misc",
    name: "Cola-Cola 0,5 литра",
    value: "cola",
  },
  {
    type: "misc",
    name: "Острый соус",
    value: "sauce",
  },
  {
    type: "misc",
    name: "Картошка из печи",
    value: "potato",
  },
];

export const dataTypes = {
  dough: doughTypes,
  sizes: pizzaSizes,
  sauces: sauceTypes,
  ingredients: ingredientsTypes,
  misc: miscTypes,
};

export const MAX_INGREDIENTS = 3;
export const MOVE = "move";
export const DATA_TRANSFER_PAYLOAD = "payload";
