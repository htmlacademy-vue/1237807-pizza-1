import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import { SET_ENTITY } from "@/store/mutations-types";
import CartPizzasView from "@/modules/cart/components/CartPizzasView";

const localVue = createLocalVue();
localVue.use(Vuex);

const mockPizzasOrder = [
  {
    id: 1,
    title: "Тестовая Пицца",
    sauce: "tomato",
    dough: "large",
    diameter: "small",
    count: 2,
    ingredients: ["bacon", "mushrooms", "cheddar"],
  },
  {
    id: 2,
    title: "Моковая Пицца",
    sauce: "creamy",
    dough: "light",
    diameter: "big",
    count: 1,
    ingredients: ["ham", "onion", "onion", "jalapeno"],
  },
];

const setPizzasOrder = (store) => {
  store.commit(SET_ENTITY, {
    module: "Cart",
    entity: "pizzasOrder",
    value: mockPizzasOrder,
  });
};

describe("CartPizzasView", () => {
  let store;
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(CartPizzasView, options);
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

  it("renders pizzas", async () => {
    setPizzasOrder(store);
    createComponent({ localVue, store });
    const pizzaItemsHtml = wrapper.findAll('[data-test="pizza-item"]');
    expect(Array.from(pizzaItemsHtml).length).toEqual(mockPizzasOrder.length);
  });

  it("doesn't render cart-empty text", async () => {
    setPizzasOrder(store);
    createComponent({ localVue, store });
    const text = wrapper.find('[data-test="cart-empty-text"]');
    expect(text.exists()).toBeFalsy();
  });

  it("doesn't render pizzas", async () => {
    createComponent({ localVue, store });
    const pizzaItemsHtml = wrapper.findAll('[data-test="pizza-item"]');
    expect(pizzaItemsHtml.exists()).toBeFalsy();
  });

  it("renders cart-empty text", async () => {
    createComponent({ localVue, store });
    const text = wrapper.find('[data-test="cart-empty-text"]');
    expect(text.exists()).toBeTruthy();
  });
});
