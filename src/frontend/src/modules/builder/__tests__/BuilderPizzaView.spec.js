import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_CURRENT_PIZZA } from "@/store/mutations-types";
import doughLayer from "@/common/enums/doughLayer";
import ingredientsIndex from "@/common/enums/ingredientsIndex";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockCurrentPizzaData = {
  title: "Тестовая пицца",
  dough: "large",
  diameter: "big",
  sauce: "creamy",
  ingredients: [
    "mushrooms",
    "mushrooms",
    "mushrooms",
    "ham",
    "salami",
    "ananas",
    "ananas",
    "cheddar"
  ],
  count: 1
};

const addCurrentPizza = store => {
  store.commit(`Builder/${SET_CURRENT_PIZZA}`, mockCurrentPizzaData);
};

describe("BuilderPizzaView", () => {
  let store;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("shows current pizza foundation class modificators", () => {
    addCurrentPizza(store);
    createComponent({ localVue, store });
    const foundation = wrapper.find('[data-test="pizza-foundation"]');
    expect(foundation.exists()).toBeTruthy();
    expect(foundation.attributes("class")).toContain(
      doughLayer[mockCurrentPizzaData.dough.toUpperCase()]
    );
    expect(foundation.attributes("class")).toContain(
      mockCurrentPizzaData.sauce
    );
  });

  it("renders current pizza filling", () => {
    addCurrentPizza(store);
    createComponent({ localVue, store });
    const fillingHtml = wrapper.findAll('[data-test="pizza-filling"]');
    expect(Array.from(fillingHtml).length).toEqual(
      mockCurrentPizzaData.ingredients.length
    );
  });

  it("shows current pizza filling ingredient class with count", () => {
    addCurrentPizza(store);
    createComponent({ localVue, store });
    const filling = wrapper.findAll('[data-test="pizza-filling"]');
    const firstIngredient = filling.at(0);
    const secondIngredient = filling.at(1);
    expect(firstIngredient.attributes("class")).toContain(
      mockCurrentPizzaData.ingredients[0]
    );
    expect(secondIngredient.attributes("class")).toContain(
      mockCurrentPizzaData.ingredients[1]
    );
    expect(secondIngredient.attributes("class")).toContain(ingredientsIndex[1]);
  });
});
