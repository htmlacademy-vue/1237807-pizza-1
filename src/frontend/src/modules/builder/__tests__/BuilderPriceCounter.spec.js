import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_CURRENT_PIZZA } from "@/store/mutations-types";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppButton from "@/common/components/AppButton";

const localVue = createLocalVue();

localVue.component("AppButton", AppButton);

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

const addCurrentPizza = (store, pizza) => {
  store.commit(`Builder/${SET_CURRENT_PIZZA}`, pizza);
};

describe("BuilderPriceCounter", () => {
  let actions;
  let store;
  let wrapper;

  const createComponent = options => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        addPizza: jest.fn(),
        updatePizza: jest.fn()
      }
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders pizza cost", () => {
    addCurrentPizza(store, mockCurrentPizzaData);
    createComponent({ localVue, store });
    const costOfCurrentPizza = store.getters.getPizzaCost(mockCurrentPizzaData);
    const costHtml = wrapper.find("p");
    expect(costHtml.text()).toBe(`Итого: ${costOfCurrentPizza} ₽`);
  });

  it("finalize button is not disabled when title and ingredients completed", () => {
    addCurrentPizza(store, mockCurrentPizzaData);
    createComponent({ localVue, store });
    const finalizeButton = wrapper.find('[data-test="finalize-button"]');
    expect(finalizeButton.attributes("disabled")).toBeFalsy();
  });

  it("finalize button disabled when title is empty", () => {
    addCurrentPizza(store, { ...mockCurrentPizzaData, title: "" });
    createComponent({ localVue, store });
    const finalizeButton = wrapper.find('[data-test="finalize-button"]');
    expect(finalizeButton.attributes("disabled")).toBeTruthy();
  });

  it("finalize button disabled when ingredients are empty", () => {
    addCurrentPizza(store, { ...mockCurrentPizzaData, ingredients: [] });
    createComponent({ localVue, store });
    const finalizeButton = wrapper.find('[data-test="finalize-button"]');
    expect(finalizeButton.attributes("disabled")).toBeTruthy();
  });

  it("updates pizza in cart if current pizza has id", async () => {
    addCurrentPizza(store, { ...mockCurrentPizzaData, id: 1 });
    createComponent({ localVue, store });
    const finalizeButton = wrapper.find('[data-test="finalize-button"]');
    await finalizeButton.trigger("click");
    expect(actions.Cart.updatePizza).toHaveBeenCalledWith(expect.any(Object), {
      ...mockCurrentPizzaData,
      id: 1
    });
  });

  it("add pizza in cart if current pizza has no id", async () => {
    addCurrentPizza(store, mockCurrentPizzaData);
    createComponent({ localVue, store });
    const finalizeButton = wrapper.find('[data-test="finalize-button"]');
    await finalizeButton.trigger("click");
    expect(actions.Cart.addPizza).toHaveBeenCalledWith(
      expect.any(Object),
      mockCurrentPizzaData
    );
  });

  it("calls the vuex mutation on click finalize button", async () => {
    addCurrentPizza(store, mockCurrentPizzaData);
    createComponent({ localVue, store });
    const spyOnMutation = jest.spyOn(wrapper.vm, "resetPizza");
    const finalizeButton = wrapper.find('[data-test="finalize-button"]');
    await finalizeButton.trigger("click");
    expect(spyOnMutation).toHaveBeenCalled();
  });
});
