import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import OrdersItemPizzaView from "@/modules/orders/components/OrdersItemPizzaView";
import PizzaItem from "@/common/components/PizzaItem";

const localVue = createLocalVue();
localVue.use(Vuex);

const propsData = {
  pizza: {
    id: 1,
    title: "Тестовая Пицца",
    sauce: "tomato",
    dough: "large",
    diameter: "small",
    count: 2,
    ingredients: ["bacon", "mushrooms", "cheddar"],
  },
};

describe("OrdersItemPizzaView", () => {
  let store;
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(OrdersItemPizzaView, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders PizzaItem ", async () => {
    createComponent({ localVue, store, propsData });
    const pizzaItem = wrapper.findComponent(PizzaItem);
    expect(pizzaItem.exists()).toBeTruthy();
  });

  it("renders pizza cost", () => {
    createComponent({ localVue, store, propsData });
    const costOfPizza = store.getters.getPizzaCost(propsData.pizza);
    const costHtml = wrapper.find("p");
    expect(costHtml.text()).toBe(`${propsData.pizza.count}х${costOfPizza} ₽`);
  });
});
