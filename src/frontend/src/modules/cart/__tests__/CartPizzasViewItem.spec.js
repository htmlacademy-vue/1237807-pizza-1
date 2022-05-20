import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";
import CartPizzasViewItem from "@/modules/cart/components/CartPizzasViewItem";
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

describe("CartPizzasViewItem", () => {
  let store;
  let wrapper;

  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };

  const createComponent = (options) => {
    wrapper = mount(CartPizzasViewItem, options);
  };

  beforeEach(() => {
    mocks.$router.push = jest.fn();
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, mocks, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders PizzaItem ", async () => {
    createComponent({ localVue, store, mocks, propsData });
    const pizzaItem = wrapper.findComponent(PizzaItem);
    expect(pizzaItem.exists()).toBeTruthy();
  });

  it("shows correct pizzas count", () => {
    createComponent({ localVue, store, mocks, propsData });
    const counter = wrapper.find('[data-test="pizza-counter"]');
    expect(counter.exists()).toBeTruthy();
    expect(counter.vm.$props.value).toEqual(propsData.pizza.count);
  });

  it("calls pizza update action on adding pizza", () => {
    createComponent({ localVue, store, mocks, propsData });
    const spyOnUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");
    const counter = wrapper.find('[data-test="pizza-counter"]');
    counter.vm.$emit("addItem");
    expect(spyOnUpdatePizza).toHaveBeenCalled();
  });

  it("calls pizza update action on removing pizza", () => {
    createComponent({ localVue, store, mocks, propsData });
    const spyOnUpdatePizza = jest.spyOn(wrapper.vm, "updatePizza");
    const counter = wrapper.find('[data-test="pizza-counter"]');
    counter.vm.$emit("removeItem");
    expect(spyOnUpdatePizza).toHaveBeenCalled();
  });

  it("calls pizza delete action on removing pizza if count equals 1", () => {
    createComponent({
      localVue,
      store,
      mocks,
      propsData: { pizza: { ...propsData.pizza, count: 1 } },
    });
    const spyOnDeletePizza = jest.spyOn(wrapper.vm, "deletePizza");
    const counter = wrapper.find('[data-test="pizza-counter"]');
    counter.vm.$emit("removeItem");
    expect(spyOnDeletePizza).toHaveBeenCalled();
  });

  it("renders total cost", () => {
    createComponent({ localVue, store, mocks, propsData });
    const costOfCurrentPizza = store.getters.getPizzaCost(propsData.pizza);
    const costHtml = wrapper.find("b");
    expect(costHtml.text()).toBe(
      `${costOfCurrentPizza * propsData.pizza.count} ₽`
    );
  });

  it("calls the vuex mutation on click change button and redirects to the main page", async () => {
    createComponent({ localVue, store, mocks, propsData });
    const spyOnMutation = jest.spyOn(wrapper.vm, "setPizzaToBuilder");
    const changeButton = wrapper.find('[data-test="change-button"]');
    await changeButton.trigger("click");
    expect(spyOnMutation).toHaveBeenCalledWith(propsData.pizza);
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
