import { shallowMount } from "@vue/test-utils";
import PizzaItem from "@/common/components/PizzaItem";

describe("PizzaItem", () => {
  const propsData = {
    pizza: {
      title: "Тестовая",
      dough: "light",
      diameter: "normal",
      sauce: "creamy",
      ingredients: ["salami", "bacon", "bacon", "bacon", "ham", "cheddar"]
    }
  };

  let wrapper;

  const createComponent = options => {
    wrapper = shallowMount(PizzaItem, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("It renders out the prop title", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain(propsData.pizza.title);
  });

  it("It renders out correct description", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain("32 см, на тонком тесте");
  });

  it("It renders out correct dressing", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain("Соус: сливочный");
  });

  it("It renders out correct filling with unique ingredients", () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain("Начинка: салями, бекон, ветчина, чеддер");
  });
});
