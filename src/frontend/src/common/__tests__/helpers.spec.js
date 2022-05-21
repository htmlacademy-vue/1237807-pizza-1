import {
  capitalize,
  lowercase,
  countItemsInArray,
  getRequiredValue,
  getPrice,
  getId,
  getValueById,
  getRequestDataFromObject,
  getObjectFromResponseData,
  getIngredientsArray
} from "@/common/helpers";

const mockArray = [
  {
    id: 1,
    value: "one",
    price: 100
  },
  {
    id: 2,
    value: "two",
    price: 200,
    multiplier: 5
  },
  {
    id: 3,
    value: "three",
    price: 300
  }
];

describe("test helpers functions", () => {
  it("test capitalize", () => {
    expect(capitalize("word")).toBe("Word");
    expect(capitalize("hello world")).toBe("Hello world");
  });

  it("test lowercase", () => {
    expect(lowercase("Word")).toBe("word");
    expect(lowercase("Hello world")).toBe("hello world");
  });

  it("test countItemsInArray", () => {
    const arr = ["one", "two", "two", "three", "three", "three"];

    const result = {
      one: 1,
      two: 2,
      three: 3
    };
    expect(countItemsInArray(arr)).toStrictEqual(result);
  });

  it("test getRequiredValue", () => {
    const requiredValue = "two";

    const result = {
      id: 2,
      value: "two",
      price: 200,
      multiplier: 5
    };
    expect(getRequiredValue(mockArray, requiredValue)).toStrictEqual(result);
  });

  it("test getPrice", () => {
    expect(getPrice(mockArray, "one")).toBe(100);
    expect(getPrice(mockArray, "two")).toBe(5);
  });

  it("test getId", () => {
    expect(getId(mockArray, "three")).toBe(3);
  });

  it("test getValueById", () => {
    expect(getValueById(mockArray, 1)).toBe("one");
  });

  it("test getRequestDataFromObject", () => {
    const obj = {
      one: 1,
      two: 2,
      three: 3
    };

    const data = [
      { id: 1, value: "one" },
      { id: 2, value: "two" },
      { id: 3, value: "three" }
    ];

    const result = [
      { numberId: 1, quantity: 1 },
      { numberId: 2, quantity: 2 },
      { numberId: 3, quantity: 3 }
    ];
    expect(getRequestDataFromObject(obj, data, "numberId")).toStrictEqual(
      result
    );
  });

  it("test getObjectFromResponseData", () => {
    const arr = [
      { miscId: 1, quantity: 1 },
      { miscId: 2, quantity: 2 },
      { miscId: 3, quantity: 3 }
    ];

    const data = [
      { id: 1, value: "one" },
      { id: 2, value: "two" },
      { id: 3, value: "three" }
    ];

    const result = {
      one: 1,
      two: 2,
      three: 3
    };
    expect(getObjectFromResponseData(arr, data)).toStrictEqual(result);
  });

  it("test getIngredientsArray", () => {
    const arr = [
      { ingredientId: 1, quantity: 1 },
      { ingredientId: 2, quantity: 2 },
      { ingredientId: 3, quantity: 3 }
    ];

    const data = [
      { id: 1, value: "bacon" },
      { id: 2, value: "salmon" },
      { id: 3, value: "ananas" }
    ];

    const result = ["bacon", "salmon", "salmon", "ananas", "ananas", "ananas"];
    expect(getIngredientsArray(arr, data)).toStrictEqual(result);
  });
});
